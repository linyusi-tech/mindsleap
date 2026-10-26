#!/usr/bin/env node
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { existsSync, readFileSync, readdirSync, createReadStream, statSync } from "node:fs";
import { homedir } from "node:os";
import { basename, dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteDir = resolve(__dirname, "..");
const publicDir = join(siteDir, "public");
const decksDir = join(publicDir, "decks");

const args = process.argv.slice(2);
const deckFilters = [];
for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];
  if (arg === "--deck" && args[i + 1]) deckFilters.push(args[++i]);
  else if (arg.startsWith("--deck=")) deckFilters.push(arg.slice("--deck=".length));
}

const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".gif", "image/gif"],
  [".webp", "image/webp"],
  [".pdf", "application/pdf"],
  [".otf", "font/otf"],
  [".ttf", "font/ttf"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

async function loadPlaywright() {
  try {
    return await import("playwright");
  } catch {}

  const moduleDirs = [
    process.env.PLAYWRIGHT_NODE_MODULES,
    ...(process.env.NODE_PATH ? process.env.NODE_PATH.split(":") : []),
    join(homedir(), ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules"),
  ].filter(Boolean);

  for (const dir of moduleDirs) {
    try {
      const requireFrom = createRequire(join(dir, "playwright-loader.js"));
      return requireFrom("playwright");
    } catch {}
  }

  throw new Error(
    "Playwright is required to generate deck PDFs. Install it in the project or set PLAYWRIGHT_NODE_MODULES to a node_modules directory that contains playwright."
  );
}

function walk(dir, out = []) {
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, item.name);
    if (item.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function deckIndexes() {
  return walk(decksDir)
    .filter((file) => basename(file) === "index.html")
    .filter((file) => readFileSync(file, "utf8").includes("<deck-stage"))
    .filter((file) => {
      if (!deckFilters.length) return true;
      const rel = relative(publicDir, dirname(file)).split(sep).join("/");
      return deckFilters.some((filter) => rel === filter.replace(/^\/+/, "").replace(/\/index\.html$/, "").replace(/\/$/, ""));
    })
    .sort();
}

function startStaticServer() {
  const server = createServer((req, res) => {
    const url = new URL(req.url || "/", "http://127.0.0.1");
    let pathname;
    try {
      pathname = decodeURIComponent(url.pathname);
    } catch {
      res.writeHead(400);
      res.end("Bad request");
      return;
    }

    let file = resolve(publicDir, "." + pathname);
    if (!file.startsWith(publicDir)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
    if (!existsSync(file)) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, { "Content-Type": mime.get(extname(file).toLowerCase()) || "application/octet-stream" });
    createReadStream(file).pipe(res);
  });

  return new Promise((resolveServer, reject) => {
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => resolveServer(server));
  });
}

const indexes = deckIndexes();
if (!indexes.length) {
  console.log("No deck index.html files found.");
  process.exit(0);
}

const { chromium } = await loadPlaywright();
const server = await startStaticServer();
const port = server.address().port;
const browser = await chromium.launch({ headless: true });

function imgTag(src) {
  return `<section class="page"><img src="${src}" alt="" /></section>`;
}

try {
  for (const indexFile of indexes) {
    const dir = dirname(indexFile);
    const slug = basename(dir);
    const pdfPath = join(dir, `${slug}.pdf`);
    const relIndex = relative(publicDir, indexFile).split(sep).join("/");
    const url = `http://127.0.0.1:${port}/${relIndex}?pdf=1`;

    console.log(`Generating ${relative(siteDir, pdfPath)} from ${relIndex}`);
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
    await page.addInitScript(() => {
      window.sessionStorage.setItem("mindsleap:decks:access", "1");
    });
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    await page.evaluate(() => document.fonts?.ready);
    await page.waitForFunction(() => {
      const deck = document.querySelector("deck-stage");
      return deck && deck.shadowRoot && (deck._slides?.length || deck.querySelectorAll(":scope > *").length);
    }, { timeout: 30000 });

    const { total, width, height } = await page.evaluate(() => {
      const deck = document.querySelector("deck-stage");
      return {
        total: deck._slides?.length || deck.querySelectorAll(":scope > *").length || 1,
        width: parseInt(deck.getAttribute("width") || "", 10) || 1920,
        height: parseInt(deck.getAttribute("height") || "", 10) || 1080,
      };
    });

    await page.setViewportSize({ width, height });
    await page.evaluate(() => {
      const deck = document.querySelector("deck-stage");
      const style = document.createElement("style");
      style.textContent = ".progress,.pdf-download,.overlay,.tapzones{display:none!important}";
      deck.shadowRoot.appendChild(style);
    });

    const images = [];
    for (let i = 0; i < total; i += 1) {
      await page.evaluate((index) => {
        const deck = document.querySelector("deck-stage");
        if (typeof deck._go === "function") deck._go(index, "api");
        else location.hash = `#${index + 1}`;
      }, i);
      await page.waitForTimeout(120);
      const shot = await page.screenshot({ type: "jpeg", quality: 92, fullPage: false });
      images.push(`data:image/jpeg;base64,${shot.toString("base64")}`);
    }
    await page.close();

    const pdfPage = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    const html = `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            @page { size: ${width}px ${height}px; margin: 0; }
            html, body { margin: 0; padding: 0; background: #fff; }
            .page {
              width: ${width}px;
              height: ${height}px;
              margin: 0;
              padding: 0;
              page-break-after: always;
              break-after: page;
              overflow: hidden;
            }
            .page:last-child { page-break-after: auto; break-after: auto; }
            img { display: block; width: 100%; height: 100%; object-fit: contain; }
          </style>
        </head>
        <body>${images.map(imgTag).join("")}</body>
      </html>`;
    await pdfPage.setContent(html, { waitUntil: "load" });
    await pdfPage.pdf({
      path: pdfPath,
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
    });
    await pdfPage.close();

    const size = statSync(pdfPath).size;
    if (size < 1000) throw new Error(`Generated PDF is too small: ${pdfPath}`);
  }
} finally {
  await browser.close();
  await new Promise((resolveClose) => server.close(resolveClose));
}

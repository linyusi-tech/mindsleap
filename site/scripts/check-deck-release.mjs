#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { basename, dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteDir = resolve(__dirname, "..");
const publicDir = join(siteDir, "public");
const decksDir = join(publicDir, "decks");

function walk(dir, out = []) {
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, item.name);
    if (item.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

const deckStages = walk(decksDir).filter((file) => basename(file) === "deck-stage.js").sort();
for (const file of deckStages) {
  const text = readFileSync(file, "utf8");
  const rel = relative(siteDir, file);
  if (!text.includes("Public decks should present cleanly")) fail(`${rel}: missing default no-rail rule`);
  if (!text.includes("className = 'progress export-hidden'")) fail(`${rel}: missing top progress bar`);
  if (!text.includes("className = 'pdf-download export-hidden'")) fail(`${rel}: missing PDF download button`);
  if (!text.includes("_updateDownloadButton()")) fail(`${rel}: missing PDF download visibility update`);
}

const deckIndexes = walk(decksDir)
  .filter((file) => basename(file) === "index.html")
  .filter((file) => readFileSync(file, "utf8").includes("<deck-stage"))
  .sort();

for (const indexFile of deckIndexes) {
  const dir = dirname(indexFile);
  const slug = basename(dir);
  const pdf = join(dir, `${slug}.pdf`);
  const rel = relative(siteDir, indexFile).split(sep).join("/");
  if (!existsSync(pdf)) {
    fail(`${rel}: missing generated PDF ${slug}.pdf`);
    continue;
  }
  if (statSync(pdf).size < 1000) fail(`${rel}: generated PDF is suspiciously small`);
}

if (!process.exitCode) {
  console.log(`Checked ${deckStages.length} deck-stage scripts and ${deckIndexes.length} deck PDFs.`);
}

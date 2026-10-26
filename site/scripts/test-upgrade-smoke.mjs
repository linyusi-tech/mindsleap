import assert from "node:assert/strict";

const base = new URL(process.env.SMOKE_BASE_URL || "http://127.0.0.1:3026");
assert.ok(["localhost", "127.0.0.1", "[::1]"].includes(base.hostname), "Only test a local server");
let checks = 0;
async function request(path, options = {}) {
  return fetch(new URL(path, base), { redirect: "manual", signal: AbortSignal.timeout(60000), ...options });
}
async function page(path) {
  const response = await request(path);
  assert.equal(response.status, 200, path);
  assert.match(response.headers.get("content-type"), /text\/html/);
  const html = await response.text();
  assert.match(html, /MindsLeap/i, path);
  assert.match(html, /<h1[\s>]/, path);
  checks++;
  console.log("PASS", path);
  return html;
}

for (const locale of ["zh", "en"]) {
  for (const path of ["", "/services", "/services/ai-club", "/services/ai-transformation", "/news", "/contact"])
    await page(`/${locale}${path}`);
}
const article = await page("/zh/news/ceibs-marketing-ai-agent-workflow-training-2026");
assert.match(article, /application\/ld\+json/);
assert.match(article, /rel="canonical"/);
await page("/program/ai-native-organization");

const redirect = await request("/zh/services/training");
assert.equal(redirect.status, 308);
assert.equal(new URL(redirect.headers.get("location"), base).pathname, "/zh/services/ai-transformation");
checks++;
for (const path of ["/sitemap.xml", "/feed.xml", "/llms.txt"]) {
  const response = await request(path);
  assert.equal(response.status, 200, path);
  assert.match(await response.text(), /mindsleap/i, path);
  checks++;
}
const feed = await request("/feed.json");
assert.equal(feed.status, 200);
assert.ok((await feed.json()).items.length > 0);
checks++;
const markdown = await request("/zh/ai", { headers: { accept: "text/markdown" } });
assert.equal(markdown.status, 200);
assert.match(markdown.headers.get("content-type"), /text\/markdown/);
assert.match(await markdown.text(), /MindsLeap/);
checks++;
const params = new URLSearchParams({ url: "/images/news/ai-native-enterprise-conference-shanghai-2026-cover1.jpg", w: "640", q: "75" });
const optimized = await request(`/_next/image?${params}`, { headers: { accept: "image/webp" } });
assert.equal(optimized.status, 200);
assert.match(optimized.headers.get("content-type"), /image\//);
assert.ok((await optimized.arrayBuffer()).byteLength > 1000);
checks++;
// Invalid requests exercise the HTTP boundary without sending mail or creating leads.
for (const body of [{}, { name: "Upgrade test", email: "test@example.com" }, { name: "Upgrade test", phone: "invalid" }]) {
  const response = await request("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  assert.equal(response.status, 400);
  checks++;
}
console.log(`Upgrade smoke tests passed (${checks} checks). Email delivery is not tested here.`);

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

const files = {
  content: await read("../src/lib/services-hub.ts").catch(() => ""),
  page: await read("../src/app/[locale]/services/page.tsx"),
  hero: await read("../src/components/services/ServicesHero.tsx"),
  agent: await read("../src/lib/agent-content.ts"),
  llms: await read("../src/app/llms.txt/route.ts"),
  sitemap: await read("../src/app/sitemap.ts"),
};

const contentAndPage = `${files.content}\n${files.page}`;

for (const copy of [
  "MindsLeap 企业 AI 转型与 AI 原生创业加速服务",
  "MindsLeap Enterprise AI Transformation and AI-Native Venture Acceleration Services",
  "MindsLeap 企业家 AI 俱乐部",
  "MindsLeap Founders AI Club",
]) {
  assert.ok(contentAndPage.includes(copy), `services hub missing required copy: ${copy}`);
}

for (const href of [
  "/services/ai-club",
  "/services/ai-transformation",
  "/services/accelerator",
  "/services/global-growth",
]) {
  assert.ok(contentAndPage.includes(href), `services hub missing service link: ${href}`);
}

for (const slug of [
  "goger-office-ai-training-consulting-2026",
  "ceibs-marketing-ai-agent-workflow-training-2026",
  "pudong-ecommerce-ai-native-organization-training-2026",
]) {
  assert.ok(files.content.includes(slug), `services hub missing verified case: ${slug}`);
}

const detailedCasesSource = files.content.match(
  /export const verifiedServicesCases[\s\S]*?export const servicesHubContent/,
)?.[0] ?? "";
assert.equal(/FANUC|发那科/.test(detailedCasesSource), false, "FANUC must not appear in detailed cases before evidence is complete");

for (const schema of ["CollectionPage", "BreadcrumbList", "ItemList", "FAQPage"]) {
  assert.ok(files.page.includes(schema), `services hub missing JSON-LD type: ${schema}`);
}

assert.ok(
  files.hero.includes("/images/news/ai-native-enterprise-conference-shanghai-2026-cover1.jpg"),
  "services hero must use the approved conference venue image",
);
assert.equal(files.hero.includes("useEffect"), false, "services hero must not autoplay or rotate");

const servicesVisualSource = `${files.page}\n${files.hero}`.toLowerCase();
for (const color of [
  "#28756f",
  "#16867f",
  "#7fd4c8",
  "#c58a28",
  "#245388",
  "#1e4f82",
  "#112f52",
  "#102b4c",
  "#173f70",
]) {
  assert.equal(
    servicesVisualSource.includes(color),
    false,
    `services hub contains an off-brand accent: ${color}`,
  );
}
assert.ok(
  servicesVisualSource.includes("bg-brand-gradient"),
  "services hub CTA must use the approved brand gradient",
);

assert.ok(files.agent.includes("renderServicesHub"), "Agent Markdown renderer missing services hub");
assert.ok(
  files.agent.includes('segments[1] === "services" && segments.length === 2'),
  "Agent route missing /:locale/services",
);
assert.ok(files.llms.includes("${siteUrl}/zh/services"), "llms.txt missing Chinese services hub");
assert.ok(files.llms.includes("${siteUrl}/en/services"), "llms.txt missing English services hub");
assert.ok(files.sitemap.includes('"/services"'), "sitemap missing services hub");
assert.ok(files.sitemap.includes('page === "/services" ? 0.9'), "sitemap must prioritize services hub");

console.log("Services hub check passed.");

import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";

async function readTextTree(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const contents = await Promise.all(entries.map(async (entry) => {
    const path = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, directory);
    if (entry.isDirectory()) return readTextTree(path);
    if (!/\.(?:json|md|mdx|mjs|ts|tsx)$/.test(entry.name)) return "";
    return readFile(path, "utf8");
  }));

  return contents.flat(Infinity).join("\n");
}

const files = {
  geo: await readFile(new URL("../src/lib/geo.ts", import.meta.url), "utf8"),
  llms: await readFile(new URL("../src/app/llms.txt/route.ts", import.meta.url), "utf8"),
  zh: JSON.parse(await readFile(new URL("../src/messages/zh.json", import.meta.url), "utf8")),
  en: JSON.parse(await readFile(new URL("../src/messages/en.json", import.meta.url), "utf8")),
};

const publicCorpus = [
  await readTextTree(new URL("../src/", import.meta.url)),
  await readTextTree(new URL("../content/news/", import.meta.url)),
  await readFile(new URL("../../PROJECT_CONTEXT.md", import.meta.url), "utf8"),
].join("\n");

const canonical = {
  categoryZh: "MindsLeap 心智悦动是一家企业 AI 转型与 AI 原生创业加速平台。",
  categoryEn: "MindsLeap is an enterprise AI transformation and AI-native startup acceleration platform.",
  clubZh: "MindsLeap 企业家 AI 俱乐部",
  clubEn: "MindsLeap Founders AI Club",
  lincolnZh: "Lincoln 王林，MindsLeap 创始人兼 CEO，Founders Space 合伙人兼中国区 CEO。",
  partnershipZh: "MindsLeap 心智悦动是 Founders Space 的全球合作伙伴。",
};

for (const value of Object.values(canonical)) {
  assert.ok(files.geo.includes(value), `geo.ts is missing canonical copy: ${value}`);
}

assert.equal(files.zh.metadata.description.startsWith(canonical.categoryZh), true);
assert.equal(files.en.metadata.description.startsWith(canonical.categoryEn), true);
assert.equal(files.zh.hero.slide1Title, canonical.clubZh);
assert.equal(files.en.hero.slide1Title, canonical.clubEn);
assert.equal(files.zh.about.lincolnRole2, "Founders Space 合伙人兼中国区 CEO");
assert.equal(files.en.about.lincolnRole2, "Partner and CEO, Founders Space China");
assert.ok(files.llms.includes("brandCategory"), "llms.txt must use the canonical brand category source");
assert.ok(files.llms.includes("clubName"), "llms.txt must use the canonical club name source");

const banned = [
  "MindsLeap = AI 原生企业的产业加速平台",
  "AI 原生企业的产业加速平台",
  "industrial accelerator for AI-native enterprises",
  "Entrepreneur AI Club",
  "AI Entrepreneurs Club",
  "MindsLeap AI Club",
  "Founders Space 全球合伙人",
  "Global Partner at Founders Space",
  "Global Partner, Founders Space",
  "China partner of Founders Space",
  "中国区合作机构",
  "大中华区独家合作伙伴",
  "exclusive Greater China partner",
];

for (const phrase of banned) {
  assert.equal(publicCorpus.includes(phrase), false, `public content contains legacy copy: ${phrase}`);
}

console.log("GEO entity copy check passed.");

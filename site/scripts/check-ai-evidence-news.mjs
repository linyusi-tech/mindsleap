import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

const articles = [
  {
    slug: "deloitte-china-council-ai-native-organization-sharing-2026",
    date: "2026-08-21",
    zh: ["德勤中国区理事会", "蒋颖", "刘明华", "AI 原生组织"],
    en: ["Deloitte China", "Vivian Jiang", "Dora Liu", "AI-native organization"],
    images: ["cover", "council"],
  },
  {
    slug: "tsinghua-emba-hangzhou-ai-study-tour-2026",
    date: "2026-09-23",
    zh: ["清华大学", "EMBA", "杭州 AI 研学", "Rokid", "强脑科技", "AI 第二大脑", "企业 GEO"],
    en: ["Tsinghua", "EMBA", "Hangzhou AI study tour", "Rokid", "BrainCo", "AI second brain", "enterprise GEO"],
    images: ["cover", "brainco", "rokid", "second-brain", "ai-native-organization"],
  },
];

for (const article of articles) {
  for (const locale of ["zh", "en"]) {
    const articlePath = path.join(siteRoot, "content", "news", locale, `${article.slug}.mdx`);
    if (!fs.existsSync(articlePath)) {
      errors.push(`missing article: ${articlePath}`);
      continue;
    }

    const source = fs.readFileSync(articlePath, "utf8");
    const required = locale === "zh" ? article.zh : article.en;
    for (const value of required) {
      if (!source.includes(value)) errors.push(`${article.slug} ${locale} missing: ${value}`);
    }
    for (const suffix of article.images) {
      const publicPath = `/images/news/${article.slug}-${suffix}.jpg`;
      const imagePath = path.join(siteRoot, "public", "images", "news", `${article.slug}-${suffix}.jpg`);
      if (!source.includes(publicPath)) errors.push(`${article.slug} ${locale} missing image reference: ${suffix}`);
      if (!fs.existsSync(imagePath) || fs.statSync(imagePath).size === 0) errors.push(`missing image asset: ${imagePath}`);
    }
    for (const needle of [`date: "${article.date}"`, 'category: "events"', 'author: "MindsLeap"']) {
      if (!source.includes(needle)) errors.push(`${article.slug} ${locale} missing frontmatter: ${needle}`);
    }
  }
}

const geoSource = fs.readFileSync(path.join(siteRoot, "src", "lib", "geo.ts"), "utf8");
for (const slug of [
  "deloitte-china-council-ai-native-organization-sharing-2026",
  "tsinghua-emba-hangzhou-ai-study-tour-2026",
]) {
  if (!geoSource.includes(`/news/${slug}`)) errors.push(`geo topic/person links missing: ${slug}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("AI evidence news check passed.");

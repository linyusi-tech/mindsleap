import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

const cases = [
  {
    slug: "ceibs-marketing-ai-agent-workflow-training-2026",
    date: "2026-06-10",
    requiredZh: ["中欧商学院", "MindsLeap", "AI Agent 工作流", "Spec", "Skill", "Workflow"],
    requiredEn: ["CEIBS", "MindsLeap", "AI Agent workflow", "Spec", "Skill", "Workflow"],
    images: ["cover", "workshop", "discussion"],
  },
  {
    slug: "pudong-ecommerce-ai-native-organization-training-2026",
    date: "2026-06-24",
    requiredZh: ["浦东电商协会", "MindsLeap", "AI 原生组织", "Skill", "Memory", "Workflow", "Agent"],
    requiredEn: ["Pudong", "MindsLeap", "AI-native organization", "Skill", "Memory", "Workflow", "Agent"],
    images: ["cover", "framework"],
  },
  {
    slug: "goger-office-ai-training-consulting-2026",
    date: "2026-07-18",
    requiredZh: ["高格办公空间", "MindsLeap", "2026 年 7 月 17 日至 18 日", "AI 培训", "AI 咨询", "诊断"],
    requiredEn: ["Goger Office Space", "MindsLeap", "July 17-18, 2026", "AI training", "AI consulting", "diagnostic"],
    images: ["cover", "consulting"],
  },
];

const canonicalAbout = {
  zh: "MindsLeap 心智悦动是一家企业 AI 转型与 AI 原生创业加速平台。",
  en: "MindsLeap is an enterprise AI transformation and AI-native startup acceleration platform.",
};

const forbidden = [
  "提升了",
  "增长了",
  "节省了",
  "guaranteed",
  "delivered measurable",
  "/proposal/goger-",
  "报价",
  "pricing proposal",
];

for (const item of cases) {
  for (const locale of ["zh", "en"]) {
    const articlePath = path.join(siteRoot, "content", "news", locale, `${item.slug}.mdx`);
    if (!fs.existsSync(articlePath)) {
      errors.push(`missing article: ${articlePath}`);
      continue;
    }

    const article = fs.readFileSync(articlePath, "utf8");
    const expectedCover = `/images/news/${item.slug}-cover.jpg`;
    const required = locale === "zh" ? item.requiredZh : item.requiredEn;
    const assertions = [
      [`date: "${item.date}"`, "date"],
      ['category: "events"', "event category"],
      ['author: "MindsLeap"', "MindsLeap author"],
      [`image: "${expectedCover}"`, "cover image"],
      [canonicalAbout[locale], "canonical About copy"],
      ...required.map((value) => [value, `required copy: ${value}`]),
    ];

    for (const [needle, label] of assertions) {
      if (!article.includes(needle)) errors.push(`${item.slug} ${locale} missing ${label}`);
    }

    for (const needle of forbidden) {
      if (article.toLowerCase().includes(needle.toLowerCase())) {
        errors.push(`${item.slug} ${locale} contains forbidden copy: ${needle}`);
      }
    }

    for (const suffix of item.images) {
      const publicPath = `/images/news/${item.slug}-${suffix}.jpg`;
      if (!article.includes(publicPath)) errors.push(`${item.slug} ${locale} missing image reference: ${suffix}`);
    }
  }

  for (const suffix of item.images) {
    const imagePath = path.join(siteRoot, "public", "images", "news", `${item.slug}-${suffix}.jpg`);
    if (!fs.existsSync(imagePath) || fs.statSync(imagePath).size === 0) {
      errors.push(`missing image asset: ${imagePath}`);
    }
  }
}

const sharedServicePage = path.join(
  siteRoot,
  "src",
  "app",
  "[locale]",
  "services",
  "training",
  "page.tsx",
);
const transformationPage = path.join(
  siteRoot,
  "src",
  "app",
  "[locale]",
  "services",
  "ai-transformation",
  "page.tsx",
);
const sharedServiceSource = fs.readFileSync(sharedServicePage, "utf8");
const transformationSource = fs.readFileSync(transformationPage, "utf8");

for (const item of cases) {
  if (!sharedServiceSource.includes(item.slug)) {
    errors.push(`AI transformation service page missing case link: ${item.slug}`);
  }
}

for (const requiredCopy of [
  "真实项目案例：从共同认知走向业务现场",
  "Real Engagements: From Shared Understanding to Business Practice",
  '"@type": "ItemList"',
  "caseStudy.publishedDate",
]) {
  if (!sharedServiceSource.includes(requiredCopy)) {
    errors.push(`AI transformation service page missing: ${requiredCopy}`);
  }
}

if (!transformationSource.includes("showCaseStudies: true")) {
  errors.push("AI transformation route does not enable verified case studies");
}

if (!transformationSource.includes("/services/ai-transformation")) {
  errors.push("AI transformation route is missing its dedicated canonical URL");
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Client case news check passed.");

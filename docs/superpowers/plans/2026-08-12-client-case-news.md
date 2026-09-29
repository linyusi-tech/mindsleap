# MindsLeap Client Case News Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish three bilingual, evidence-backed project news articles for CEIBS, the Pudong e-commerce association, and Goger Office Space, with seven verified event photos and full search/Agent discoverability.

**Architecture:** Use the existing MDX news pipeline without adding a new case subsystem. Add one focused validation script that asserts the six localized articles, required metadata, canonical entity copy, dated project facts, image references, and seven image assets; then rely on the existing post loader, sitemap, RSS, JSON Feed, and Markdown negotiation to expose the content.

**Tech Stack:** Next.js 16 App Router, TypeScript, MDX content, Node.js validation scripts, existing news renderer, `sips` for lossless-orientation-aware JPEG resizing.

## Global Constraints

- Publish exactly three projects with dates `2026-06-10`, `2026-06-24`, and `2026-07-18`.
- Create Chinese and English MDX files with matching slugs and `category: "events"`.
- Use `author: "MindsLeap"` and the canonical MindsLeap category, club, partnership, and Lincoln identity copy already defined on the site.
- Do not publish raw interviews, internal operating data, pricing, personal information, forecasts, or unverified performance claims.
- Do not describe the Pudong talk as consulting or FDE delivery.
- Do not describe Goger strategy targets or projections as achieved outcomes.
- Preserve photo aspect ratios and prevent subject/head cropping on desktop and mobile.
- Do not hard-code these articles into `llms.txt`; discover them through news routes, sitemap, RSS, JSON Feed, and Agent Markdown.

---

## File Map

**Create validation:**
- `site/scripts/check-client-case-news.mjs` — asserts the complete bilingual article and image contract.

**Modify command registry:**
- `site/package.json` — adds `cases:check` for the validation script.

**Create localized content:**
- `site/content/news/zh/ceibs-marketing-ai-agent-workflow-training-2026.mdx`
- `site/content/news/en/ceibs-marketing-ai-agent-workflow-training-2026.mdx`
- `site/content/news/zh/pudong-ecommerce-ai-native-organization-training-2026.mdx`
- `site/content/news/en/pudong-ecommerce-ai-native-organization-training-2026.mdx`
- `site/content/news/zh/goger-office-ai-training-consulting-2026.mdx`
- `site/content/news/en/goger-office-ai-training-consulting-2026.mdx`

**Create public assets:**
- `site/public/images/news/ceibs-marketing-ai-agent-workflow-training-2026-cover.jpg`
- `site/public/images/news/ceibs-marketing-ai-agent-workflow-training-2026-workshop.jpg`
- `site/public/images/news/ceibs-marketing-ai-agent-workflow-training-2026-discussion.jpg`
- `site/public/images/news/pudong-ecommerce-ai-native-organization-training-2026-cover.jpg`
- `site/public/images/news/pudong-ecommerce-ai-native-organization-training-2026-framework.jpg`
- `site/public/images/news/goger-office-ai-training-consulting-2026-cover.jpg`
- `site/public/images/news/goger-office-ai-training-consulting-2026-consulting.jpg`

---

### Task 1: Add a Failing Publication Contract

**Files:**
- Create: `site/scripts/check-client-case-news.mjs`
- Modify: `site/package.json`

**Interfaces:**
- Consumes: repository files under `site/content/news/{zh,en}` and `site/public/images/news`.
- Produces: command `npm run cases:check`, exiting nonzero with a list of missing or invalid requirements.

- [ ] **Step 1: Add the validator before adding articles or assets**

Create the validator below so it asserts both locales, exact dates, event category, MindsLeap author, exact cover path, client/MindsLeap/service terms, canonical About copy, forbidden claims, referenced images, and physical image files.

```js
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

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Client case news check passed.");
```

- [ ] **Step 2: Register the command**

Add this exact script entry to `site/package.json`:

```json
"cases:check": "node scripts/check-client-case-news.mjs"
```

- [ ] **Step 3: Run the validator and verify RED**

Run: `npm run cases:check`

Expected: FAIL listing six missing MDX files and seven missing image assets.

- [ ] **Step 4: Commit the failing contract**

```bash
git add site/package.json site/scripts/check-client-case-news.mjs
git commit -m "Add client case news publication checks"
```

---

### Task 2: Prepare Verified Event Photos

**Files:**
- Create: the seven files listed in the File Map under `site/public/images/news/`.

**Interfaces:**
- Consumes: seven user-provided JPEG files from `/Users/lincoln/Downloads/`.
- Produces: stable public JPEG paths used by all six MDX articles.

- [ ] **Step 1: Inspect source dimensions and orientation**

Run `sips -g pixelWidth -g pixelHeight -g orientation` against all seven source files. Record which images exceed 2400 pixels on the longest side.

- [ ] **Step 2: Copy and normalize semantic filenames**

Map the files exactly as follows:

```text
Weixin Image_20260812151650_24_68.jpeg -> ceibs-marketing-ai-agent-workflow-training-2026-cover.jpg
Weixin Image_20260812151640_19_68.jpeg -> ceibs-marketing-ai-agent-workflow-training-2026-workshop.jpg
Weixin Image_20260812151641_20_68.jpeg -> ceibs-marketing-ai-agent-workflow-training-2026-discussion.jpg
Weixin Image_20260812151711_27_68.jpeg -> pudong-ecommerce-ai-native-organization-training-2026-cover.jpg
Weixin Image_20260812151709_26_68.jpeg -> pudong-ecommerce-ai-native-organization-training-2026-framework.jpg
Weixin Image_20260812150042_494_12.jpeg -> goger-office-ai-training-consulting-2026-cover.jpg
Weixin Image_20260812145812_490_12.jpeg -> goger-office-ai-training-consulting-2026-consulting.jpg
```

- [ ] **Step 3: Resize only oversized images**

For images over 2400 pixels on the longest side, use `sips --resampleWidth 2400` for landscape images. Do not crop, stretch, add text, or alter aspect ratio.

- [ ] **Step 4: Verify all outputs**

Run `file`, `sips -g pixelWidth -g pixelHeight`, and a file-size listing. Expected: seven valid JPEGs, landscape orientation, no zero-byte files, maximum width 2400.

- [ ] **Step 5: Commit photo assets**

```bash
git add \
  site/public/images/news/ceibs-marketing-ai-agent-workflow-training-2026-cover.jpg \
  site/public/images/news/ceibs-marketing-ai-agent-workflow-training-2026-workshop.jpg \
  site/public/images/news/ceibs-marketing-ai-agent-workflow-training-2026-discussion.jpg \
  site/public/images/news/pudong-ecommerce-ai-native-organization-training-2026-cover.jpg \
  site/public/images/news/pudong-ecommerce-ai-native-organization-training-2026-framework.jpg \
  site/public/images/news/goger-office-ai-training-consulting-2026-cover.jpg \
  site/public/images/news/goger-office-ai-training-consulting-2026-consulting.jpg
git commit -m "Add photos for client delivery news"
```

---

### Task 3: Write the CEIBS Bilingual Article

**Files:**
- Create: `site/content/news/zh/ceibs-marketing-ai-agent-workflow-training-2026.mdx`
- Create: `site/content/news/en/ceibs-marketing-ai-agent-workflow-training-2026.mdx`

**Interfaces:**
- Consumes: CEIBS deck at `site/public/decks/Lincoln/ceibs-ai-agent-marketing-training/index.html` and three CEIBS images.
- Produces: localized news routes `/zh/news/ceibs-marketing-ai-agent-workflow-training-2026` and `/en/news/ceibs-marketing-ai-agent-workflow-training-2026`.

- [ ] **Step 1: Add exact frontmatter**

Use date `2026-06-10`, `category: "events"`, `author: "MindsLeap"`, the semantic cover image, `imagePosition: "center 48%"`, and `imageLayout: "article"` in both locales.

- [ ] **Step 2: Write the Chinese article**

Use the approved title and these evidence-led sections:

```markdown
**2026 年 6 月 10 日 | 上海 · 中欧国际工商学院**

## 从 Prompt 试错走向可复用工作流
## 四类真实市场场景成为训练任务
## Spec、Skill、Workflow 与 Memory 如何协同
## 从个人效率走向团队操作系统
## 这次训练留下了什么
## 常见问题
## 关于 MindsLeap 心智悦动
```

Mention half-day lecture plus hands-on work, the four verified scenarios, and deliverables as drafts/templates/checklists rather than achieved performance. Insert the workshop and discussion images after the relevant sections with descriptive Chinese alt text.

- [ ] **Step 3: Write the English adaptation**

Use title `MindsLeap Delivers AI Agent Workflow Training for the CEIBS Marketing Team`. Preserve CEIBS and `中欧国际工商学院` in the opening entity sentence. Use natural English headings and the same fact boundary; end with the standard AI-assisted adaptation note.

- [ ] **Step 4: Run the focused validator**

Run: `npm run cases:check`

Expected: still FAIL only for the Pudong and Goger MDX files; CEIBS content requirements should pass.

- [ ] **Step 5: Commit the CEIBS article pair**

```bash
git add site/content/news/zh/ceibs-marketing-ai-agent-workflow-training-2026.mdx site/content/news/en/ceibs-marketing-ai-agent-workflow-training-2026.mdx
git commit -m "Publish CEIBS AI Agent workflow training recap"
```

---

### Task 4: Write the Pudong E-commerce Bilingual Article

**Files:**
- Create: `site/content/news/zh/pudong-ecommerce-ai-native-organization-training-2026.mdx`
- Create: `site/content/news/en/pudong-ecommerce-ai-native-organization-training-2026.mdx`

**Interfaces:**
- Consumes: Pudong deck at `site/public/decks/Lincoln/pudong-ecommerce-ai-native-enterprise/index.html` and two Pudong images.
- Produces: localized routes for `pudong-ecommerce-ai-native-organization-training-2026`.

- [ ] **Step 1: Add exact frontmatter**

Use date `2026-06-24`, event category, MindsLeap author, the semantic cover path, `imagePosition: "center 42%"`, and article image layout.

- [ ] **Step 2: Write the Chinese article**

Use the approved title and these sections:

```markdown
**2026 年 6 月 24 日 | 上海 · 浦东电商协会**

## AI 原生企业不是“多装几个 AI 工具”
## Skill、Memory、Workflow 与 Agent 构成组织能力
## 为什么电商企业适合率先重构工作流
## 从新品、内容、投放和客服开始
## 从个人提效走向组织学习
## 常见问题
## 关于 MindsLeap 心智悦动
```

Make clear this was a thematic training/share, not a consulting or FDE engagement. Use the wide classroom photo as cover and the close framework photo inline.

- [ ] **Step 3: Write the English adaptation**

Use title `How E-commerce Organizations Can Become AI-Native: MindsLeap at the Pudong E-commerce Association`. Identify the organization as `浦东电商协会` in the first paragraph. Preserve Skill, Memory, Workflow, and Agent as the four-part framework.

- [ ] **Step 4: Run the focused validator**

Run: `npm run cases:check`

Expected: still FAIL only for Goger MDX files; CEIBS and Pudong pass.

- [ ] **Step 5: Commit the Pudong article pair**

```bash
git add site/content/news/zh/pudong-ecommerce-ai-native-organization-training-2026.mdx site/content/news/en/pudong-ecommerce-ai-native-organization-training-2026.mdx
git commit -m "Publish Pudong e-commerce AI-native organization recap"
```

---

### Task 5: Write the Goger Bilingual Article

**Files:**
- Create: `site/content/news/zh/goger-office-ai-training-consulting-2026.mdx`
- Create: `site/content/news/en/goger-office-ai-training-consulting-2026.mdx`

**Interfaces:**
- Consumes: Goger diagnostic and V2 proposal as internal evidence, two public photos, and the approved confidentiality boundary.
- Produces: localized routes for `goger-office-ai-training-consulting-2026`.

- [ ] **Step 1: Add exact frontmatter**

Use date `2026-07-18`, event category, MindsLeap author, the semantic cover path, `imagePosition: "center 44%"`, and article image layout.

- [ ] **Step 2: Write the Chinese article**

Use the approved title and these sections:

```markdown
**2026 年 7 月 17 日至 18 日 | 高格办公空间**

## 第一天：先建立共同的 AI 工作语言
## 第二天：让咨询进入真实经营问题
## 从六位核心管理人员访谈到机会诊断
## 培训与咨询为什么必须衔接
## 已形成的交付与下一步方向
## 常见问题
## 关于 MindsLeap 心智悦动
```

State that the engagement produced diagnostic findings, opportunity directions, an implementation roadmap, and strategic recommendations. Never reproduce internal figures or describe roadmap targets as achieved results. Use the training photo as cover and consulting/data discussion photo inline.

- [ ] **Step 3: Write the English adaptation**

Use title `From AI Training to Transformation Diagnostics: MindsLeap Works with Goger Office Space`. Keep the two-day sequence explicit and distinguish delivered analysis from future implementation recommendations.

- [ ] **Step 4: Run the publication contract and verify GREEN**

Run: `npm run cases:check`

Expected: PASS with `Client case news check passed.`

- [ ] **Step 5: Commit the Goger article pair**

```bash
git add site/content/news/zh/goger-office-ai-training-consulting-2026.mdx site/content/news/en/goger-office-ai-training-consulting-2026.mdx
git commit -m "Publish Goger AI training and consulting recap"
```

---

### Task 6: Build and Verify Discoverability

**Files:**
- Verify all files created in Tasks 1-5.

**Interfaces:**
- Consumes: complete article and asset set.
- Produces: a locally reviewable production build and verified discovery surfaces.

- [ ] **Step 1: Run static checks**

Run:

```bash
npm run cases:check
npm run geo:check
git diff --check
```

Expected: all pass with no whitespace errors.

- [ ] **Step 2: Run the production build**

Run: `npm run build`

Expected: Next.js build succeeds and lists all six localized routes.

- [ ] **Step 3: Start a production preview on an available port**

Run `npm start -- --port 3013`, or use the next free port if 3013 is occupied.

- [ ] **Step 4: Verify desktop and mobile pages**

Inspect all three Chinese routes and at least one English route. For each Chinese route verify title, project date, client name, cover, inline images, headings, About copy, and no horizontal overflow. Check at desktop 1440x900 and mobile 390x844; reset viewport after testing.

- [ ] **Step 5: Verify machine discovery**

Confirm:

```text
/sitemap.xml contains six localized URLs
/feed.xml contains the new project titles where they fall within the latest 50 posts
/feed.json contains the new project titles where they fall within the latest 50 posts
Accept: text/markdown on each article returns title, client, service, date, and canonical source
```

Because these are backdated articles, RSS/JSON inclusion is chronological and may be absent if displaced beyond the latest 50; sitemap and direct Markdown routes are mandatory.

- [ ] **Step 6: Record review state without publishing**

Keep the local preview running and report the six local URLs. Do not push, merge, or deploy until the user reviews the rendered articles.

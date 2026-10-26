# MindsLeap Services Hub GEO Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `/zh/services` and `/en/services` with a server-rendered customer decision and evidence hub supported by verified cases, structured data, and agent-readable discovery surfaces.

**Architecture:** Store all bilingual service-hub facts in one typed module consumed by the HTML page and Agent Markdown renderer. Render a static single-image hero and full-width page bands on the server, then emit separate JSON-LD graphs for the collection, breadcrumbs, service list, verified cases, and visible FAQ. A focused source validator protects required copy, links, structured data, and discovery entries.

**Tech Stack:** Next.js 16 App Router, React 19 server components, TypeScript, Tailwind CSS, next-intl routing, JSON-LD, Node.js validation scripts.

## Global Constraints

- Use the approved Chinese and English positioning verbatim.
- Use `/images/news/ai-native-enterprise-conference-shanghai-2026-cover1.jpg` as the single hero image; remove the services carousel.
- Keep essential content in server-rendered HTML.
- Keep exactly one H1 on each localized page.
- Detailed cases are limited to Goger Office Space, CEIBS marketing team, and Pudong E-commerce Association until Beijing FANUC evidence is complete.
- Do not invent quantitative outcomes or imply consulting/FDE where only training or sharing occurred.
- Preserve the `/services/training` permanent redirect and link directly to `/services/ai-transformation` in new content.
- Use GitHub deployment workflows; do not deploy directly to Vercel.

---

### Task 1: Add the Services Hub Contract Validator

**Files:**
- Create: `site/scripts/check-services-hub.mjs`
- Modify: `site/package.json`

**Interfaces:**
- Consumes: service hub content, page source, Agent Markdown renderer, `llms.txt`, and sitemap source.
- Produces: `npm run services:check`, exiting `0` only when required copy, links, schemas, evidence boundaries, and discovery entries exist.

- [ ] **Step 1: Write the failing validator**

Create `check-services-hub.mjs` using `node:assert/strict` and `readFile`. Assert that:

```js
const requiredCopy = [
  "MindsLeap 企业 AI 转型与 AI 原生创业加速服务",
  "MindsLeap Enterprise AI Transformation and AI-Native Venture Acceleration Services",
  "MindsLeap 企业家 AI 俱乐部",
  "MindsLeap Founders AI Club",
];

const requiredCaseSlugs = [
  "goger-office-ai-training-consulting-2026",
  "ceibs-marketing-ai-agent-workflow-training-2026",
  "pudong-ecommerce-ai-native-organization-training-2026",
];

const requiredSchemas = [
  "CollectionPage",
  "BreadcrumbList",
  "ItemList",
  "FAQPage",
];
```

The validator must also assert that detailed case data does not contain `FANUC` or `发那科`, the page source references the approved hero image, the Agent renderer handles `/services`, and `llms.txt` includes both localized service hub URLs.

- [ ] **Step 2: Register and run the validator to verify it fails**

Add to `site/package.json`:

```json
"services:check": "node scripts/check-services-hub.mjs"
```

Run: `npm run services:check`
Expected: FAIL because the content model and page implementation do not yet satisfy the contract.

- [ ] **Step 3: Commit the failing contract**

```bash
git add site/package.json site/scripts/check-services-hub.mjs
git commit -m "Add services hub publication contract"
```

---

### Task 2: Build the Shared Bilingual Fact Model

**Files:**
- Create: `site/src/lib/services-hub.ts`

**Interfaces:**
- Produces: `servicesHubContent: Record<"zh" | "en", ServicesHubContent>` and `getServicesHubContent(locale: string): ServicesHubContent`.
- Consumed by: services page metadata/rendering, JSON-LD generation, and Agent Markdown rendering.

- [ ] **Step 1: Define typed content units**

Define exact types for:

```ts
export type ServicesHubLocale = "zh" | "en";
export type ServicePath = {
  title: string;
  description: string;
  links: Array<{ label: string; href: string }>;
};
export type ServiceFamily = {
  name: string;
  audience: string;
  problem: string;
  delivery: string;
  href: string;
  evidenceHref?: string;
};
export type VerifiedCase = {
  slug: string;
  organization: string;
  date: string;
  publishedDate: string;
  title: string;
  services: string;
  summary: string;
  image: string;
};
export type ServicesHubFaq = { question: string; answer: string };
```

- [ ] **Step 2: Add approved bilingual content**

Populate Chinese and English equivalents for:

- hero eyebrow, H1, supporting statement, and CTA labels;
- three customer paths with real service links;
- four canonical service families;
- the four-stage non-rigid enterprise AI delivery path;
- the three verified cases and dates already used by the project news pages;
- the four platform/global-resource evidence statements with links;
- seven visible FAQ answers;
- final business-diagnosis/contact CTA.

Use canonical links:

```ts
const serviceLinks = {
  club: "/services/ai-club",
  transformation: "/services/ai-transformation",
  accelerator: "/services/accelerator",
  growth: "/services/global-growth",
};
```

- [ ] **Step 3: Run the validator**

Run: `npm run services:check`
Expected: still FAIL because rendering and discovery surfaces are not implemented.

- [ ] **Step 4: Commit the fact model**

```bash
git add site/src/lib/services-hub.ts
git commit -m "Add bilingual services hub fact model"
```

---

### Task 3: Replace the Thin Services Index With the Decision Hub

**Files:**
- Rewrite: `site/src/components/services/ServicesHero.tsx`
- Rewrite: `site/src/app/[locale]/services/page.tsx`

**Interfaces:**
- Consumes: `getServicesHubContent(locale)`, `getSiteUrl()`, localized `Link`, `JsonLd`, and the existing image assets.
- Produces: server-rendered bilingual HTML, metadata, internal links, and five valid JSON-LD blocks.

- [ ] **Step 1: Replace the carousel hero with a static server component**

Change `ServicesHero` to a non-client component accepting:

```ts
type ServicesHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
};
```

Render the approved image with a full-bleed background, left-aligned copy, `<h1>`, an anchor to `#service-paths`, and a localized contact link. Use stable `min-h`/`max-h` constraints and explicit mobile/desktop object positions. Do not render carousel dots or timers.

- [ ] **Step 2: Add dedicated bilingual metadata**

Generate localized title, description, canonical, language alternates, and Open Graph URL for `/services` using `getSiteUrl()`.

- [ ] **Step 3: Render the six approved page bands**

In order, render:

1. customer problem paths (`id="service-paths"`);
2. four service families;
3. non-rigid enterprise AI delivery stages;
4. three verified project cases with images and article links;
5. platform and global-resource evidence with people/topic links;
6. visible FAQ and final contact CTA.

Use full-width bands with constrained inner containers, no nested cards, no emoji icons, card radius no larger than `rounded-lg`, and responsive grids that collapse to one column on mobile.

- [ ] **Step 4: Emit JSON-LD from the same content model**

Render separate `JsonLd` blocks for:

```ts
"CollectionPage"
"BreadcrumbList"
"ItemList" // service families
"ItemList" // verified cases
"FAQPage"
```

All URLs must be absolute and localized. FAQ structured answers must exactly match visible answers.

- [ ] **Step 5: Run focused validation and lint**

Run:

```bash
npm run services:check
npx eslint 'src/app/[locale]/services/page.tsx' src/components/services/ServicesHero.tsx src/lib/services-hub.ts scripts/check-services-hub.mjs
```

Expected: the services validator may still report missing Agent/llms discovery; ESLint passes.

- [ ] **Step 6: Commit the rendered hub**

```bash
git add site/src/app/[locale]/services/page.tsx site/src/components/services/ServicesHero.tsx site/src/lib/services-hub.ts
git commit -m "Build customer decision services hub"
```

---

### Task 4: Add Agent-Readable Services Discovery

**Files:**
- Modify: `site/src/lib/agent-content.ts`
- Modify: `site/src/app/llms.txt/route.ts`
- Modify: `site/src/app/sitemap.ts`
- Modify: `site/scripts/check-services-hub.mjs`

**Interfaces:**
- Consumes: `getServicesHubContent(locale)`.
- Produces: Markdown for `/zh/services` and `/en/services`, first-class `llms.txt` entries, and validator coverage for the existing sitemap entry.

- [ ] **Step 1: Add a services Markdown renderer**

Implement:

```ts
function renderServicesHub(locale: GeoLocale): AgentDocument
```

The document contains frontmatter, positioning, customer paths, four services, delivery stages, verified cases, platform evidence, FAQs, canonical links, and `Source`. Route it from `getAgentDocument()` when `segments[1] === "services" && segments.length === 2`.

- [ ] **Step 2: Promote the hub in agent indexes**

Add the services hub to the home and Agent Index core-content lists. Add both:

```ts
`${siteUrl}/zh/services`
`${siteUrl}/en/services`
```

to the `llms.txt` Core Pages section before individual service detail links.

- [ ] **Step 3: Verify sitemap priority and coverage**

Keep `/services` in `staticPages`, and assign it priority `0.9` while detail pages remain `0.8`. Extend the validator to assert this source rule.

- [ ] **Step 4: Run all source checks**

Run:

```bash
npm run services:check
npm run geo:check
npm run cases:check
git diff --check
```

Expected: all pass.

- [ ] **Step 5: Commit discovery updates**

```bash
git add site/src/lib/agent-content.ts site/src/app/llms.txt/route.ts site/src/app/sitemap.ts site/scripts/check-services-hub.mjs
git commit -m "Expose services hub to agents and search"
```

---

### Task 5: Production Build and Browser Verification

**Files:**
- Modify only if verification reveals a scoped defect in the files from Tasks 1-4.

**Interfaces:**
- Consumes: the completed services hub.
- Produces: verified local Chinese and English pages ready for user review and later GitHub publication.

- [ ] **Step 1: Run the production build**

Run: `npm run build` from `site/`
Expected: successful TypeScript compilation and static generation of `/zh/services` and `/en/services`.

- [ ] **Step 2: Start the production server on the next free local port**

Run: `npm start -- --port 3014` unless that port is occupied. Keep the session running through browser verification.

- [ ] **Step 3: Verify desktop Chinese and English pages**

At a desktop viewport, assert:

- one H1;
- approved hero image and copy;
- all three customer paths and four service families;
- three case links and no detailed FANUC case;
- five parseable JSON-LD types;
- no broken images or horizontal overflow;
- `/zh/services` and `/en/services` have localized canonical URLs.

- [ ] **Step 4: Verify mobile layout visually**

At `390 x 844`, capture the hero and representative lower sections. Confirm the conference image remains intelligible, no person is cropped through the head, text does not overlap, cards stack predictably, and the page has no horizontal overflow.

- [ ] **Step 5: Verify Markdown representations**

Request `/api/agent-content/zh/services` and `/api/agent-content/en/services`, or use the site's Markdown content-negotiation route. Confirm both include positioning, services, cases, FAQs, and canonical source URLs.

- [ ] **Step 6: Run final checks and commit any verification fixes**

Run:

```bash
npm run services:check
npm run geo:check
npm run cases:check
npm run build
git diff --check
```

If verification required changes, commit only those scoped files:

```bash
git add <scoped-files>
git commit -m "Polish services hub responsive layout"
```

- [ ] **Step 7: Present local review URLs**

Provide `/zh/services` and `/en/services` local URLs. Do not push either website repository until the user approves the implemented page.

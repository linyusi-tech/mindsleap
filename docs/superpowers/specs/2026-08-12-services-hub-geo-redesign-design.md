# MindsLeap Services Hub GEO Redesign

**Status:** Approved for implementation planning
**Date:** 2026-08-12
**Target routes:** `/zh/services`, `/en/services`

## 1. Objective

Replace the current thin services index with a customer decision and evidence hub that answers four questions clearly:

1. What is MindsLeap?
2. Which customer problem does each service address?
3. How are the services delivered and combined?
4. What public evidence supports each capability claim?

The page must help prospective customers choose a next step while giving search engines and AI answer engines a stable, source-linked representation of MindsLeap's service portfolio.

## 2. Confirmed Positioning

Chinese primary statement:

> MindsLeap 心智悦动是一家企业 AI 转型与 AI 原生创业加速平台。

Chinese supporting statement:

> 通过企业家 AI 俱乐部、AI 培训与战略咨询、FDE 落地、创业加速和全球增长服务，帮助传统企业把 AI 进入真实业务，也帮助 AI 原生项目连接产业场景与全球市场。

English primary statement:

> MindsLeap is an enterprise AI transformation and AI-native venture acceleration platform.

English supporting statement:

> Through the MindsLeap Founders AI Club, AI training and strategic advisory, FDE implementation, venture acceleration, and global growth services, MindsLeap helps established companies bring AI into real business operations and helps AI-native ventures connect with industry use cases and global markets.

These statements form the page's H1 and introductory copy. The page must contain one H1 only.

## 3. Chosen Direction

The page will use the approved **customer decision and evidence hub** direction.

It will not be:

- a generic four-card service directory;
- a brand manifesto without decision support;
- an intermediate page that merely sends users elsewhere.

The information model is:

`customer problem -> service path -> delivery method -> public evidence -> next action`

## 4. Hero Design

### 4.1 Image

Use the real AI Native Enterprise Conference wide venue photo:

`/images/news/ai-native-enterprise-conference-shanghai-2026-cover1.jpg`

The current service carousel will be removed. A single stable hero gives the page one durable business statement and avoids unpredictable person cropping.

### 4.2 Composition

- Use a full-width image with left-aligned copy over a restrained dark overlay.
- Preserve a visible hint of the next section at common desktop and mobile viewport heights.
- Configure separate desktop and mobile focal positions.
- Do not use a close-up group photograph in the hero.
- Do not crop through a person's head on any verified viewport.

### 4.3 Hero Copy

Chinese H1:

`MindsLeap 企业 AI 转型与 AI 原生创业加速服务`

English H1:

`MindsLeap Enterprise AI Transformation and AI-Native Venture Acceleration Services`

The supporting statement from section 2 appears beneath the H1. The primary call to action scrolls or links to the service-path selector. A secondary contact action may link to `/contact`.

## 5. Page Architecture

### 5.1 Start With the Customer Problem

Present three mutually understandable paths:

1. **推动企业 AI 转型 / Transform an enterprise with AI**
   - AI training
   - strategic advisory and transformation diagnostics
   - FDE pilot and implementation
   - MindsLeap Founders AI Club

2. **加速 AI 原生创业 / Accelerate an AI-native venture**
   - OPC and AI-native venture support
   - industry use-case validation
   - mentor and ecosystem access
   - venture acceleration

3. **连接全球市场 / Connect with global markets**
   - Silicon Valley resources
   - overseas market development
   - industry visits
   - global talent and partner connections

Each path must link to one or more concrete service detail pages rather than acting as a non-functional promotional card.

### 5.2 Four Core Service Families

Explain the existing service families as composable capabilities:

- MindsLeap 企业家 AI 俱乐部 / MindsLeap Founders AI Club
- 企业 AI 转型服务 / Enterprise AI Transformation Services
- AI 原生创业加速 / AI-Native Venture Acceleration
- 全球增长服务 / Global Growth Services

Each service family includes:

- the target customer;
- the problem it addresses;
- the delivery formats;
- a link to the canonical detail page;
- one evidence link where public evidence exists.

### 5.3 Enterprise AI Transformation Delivery Path

Show the delivery path as four stages without implying that every engagement must follow a rigid sequence:

1. shared understanding and AI training;
2. interviews, advisory, and diagnosis;
3. scenario prioritization and pilot validation;
4. FDE implementation and ongoing iteration when the scenario is ready.

Copy must make clear that actual engagements are configured around client conditions. The Goger engagement must not be described as a fixed training-first chronology.

### 5.4 Public Project Evidence

Initially include three verified public records:

- Goger Office Space: management interviews, AI training, advisory, and transformation diagnosis;
- CEIBS marketing team: AI Agent workflow training;
- Pudong E-commerce Association: AI-native organization themed sharing and training.

Each evidence item includes the organization name, delivery date, actual service types, a short factual summary, an event photo, and a link to the bilingual project news page.

Beijing FANUC will be added only after the delivery date, training scope, publishable photographs, and service description have been confirmed. It may remain in the general client-experience list, but must not be promoted as a detailed public case before those facts are available.

### 5.5 Platform and Global Resource Evidence

Explain why MindsLeap can connect these paths using only confirmed facts and direct internal links:

- MindsLeap platform positioning;
- Lincoln Wang as Founder and CEO of MindsLeap and Partner and China CEO of Founders Space;
- the confirmed institutional wording for Founders Space as a global partner;
- Steve Hoffman and Silicon Valley resources through existing people pages and public activity records.

Avoid terms such as "exclusive resources," unsupported rankings, or broad endorsements that cannot be verified from public records.

### 5.6 Frequently Asked Questions

Add concise visible answers to high-intent questions:

- MindsLeap 提供哪些企业 AI 转型服务？
- AI 培训、AI 咨询和 FDE 有什么区别？
- 企业应该如何选择第一个 AI 场景？
- 什么情况下适合进入 FDE 试点和生产落地？
- 什么是 AI 原生企业？
- MindsLeap 如何支持 OPC 和 AI 原生创业项目？
- MindsLeap 如何连接硅谷资源和全球市场？

Answers must be written for readers first. Structured data mirrors visible content and must not contain hidden claims.

### 5.7 Final Action

End with a focused decision CTA:

- primary: start with a business diagnosis or service-path conversation;
- secondary: enter the relevant service detail page.

Avoid generic transformation language such as "start your journey" when a more concrete action is available.

## 6. Fact and Evidence Rules

- Use only confirmed corporate positioning and identity language.
- Name an organization only where the relationship or delivery can be supported.
- Every detailed case includes organization, date, actual service type, and a public evidence page.
- Do not invent quantified outcomes when no public measurement exists.
- Do not claim consulting or FDE delivery for an engagement that only involved training or industry sharing.
- Keep the Beijing FANUC case out of the detailed evidence module until its evidence package is complete.
- Preserve the confirmed Chinese and English club names.
- Public content remains bilingual, with matching route structure and equivalent factual scope.

## 7. GEO and Technical Design

### 7.1 Server-Readable Content

Core positioning, service descriptions, evidence summaries, FAQ answers, and internal links must be present in server-rendered HTML. Essential content must not depend on carousel state, client-only tabs, or user interaction.

### 7.2 Metadata

Provide dedicated bilingual:

- page titles;
- meta descriptions;
- canonical URLs;
- `hreflang` alternates;
- Open Graph metadata.

### 7.3 Structured Data

Add valid JSON-LD for:

- `CollectionPage` for the services hub;
- `BreadcrumbList` for site hierarchy;
- `ItemList` for canonical service families;
- `ItemList` for verified public case records;
- `FAQPage` matching the visible FAQ content.

Reuse the site's existing organization identity graph where possible rather than creating contradictory organization objects.

### 7.4 Internal Linking

Create clear two-way links among:

- homepage and services hub;
- services hub and each service detail page;
- services hub and verified project news;
- services hub and relevant topic/research pages;
- services hub and Lincoln/Steve Hoffman people pages where contextually relevant.

The existing `/services/training` permanent redirect to `/services/ai-transformation` remains in place. New links should point directly to the canonical AI transformation route.

### 7.5 Agent and Discovery Surfaces

Add the services hub as a first-class entry in:

- sitemap generation;
- `/llms.txt`;
- agent-readable Markdown or agent content indexes;
- any existing GEO entity-copy validator.

These discovery surfaces summarize and link to the canonical HTML page; they do not replace it.

## 8. Visual and Interaction Rules

- Follow the existing MindsLeap visual system and header/footer patterns.
- Use Lucide icons where an icon is useful; do not use emoji as service icons.
- Keep cards at 8 px radius or less.
- Do not nest cards inside cards.
- Use restrained full-width bands to separate major sections.
- Use stable responsive grid dimensions to prevent content shift.
- Keep all text readable without viewport-based font scaling.
- Do not use autoplaying carousels on this page.
- All buttons and links must have a real destination or action.

## 9. Verification

Before release:

1. Run the production build.
2. Run existing GEO and client-case validation scripts.
3. Add a focused services-hub validation script or extend the GEO validator to check:
   - one H1;
   - required service links;
   - required evidence links;
   - visible FAQ and matching `FAQPage` data;
   - canonical and alternate URLs;
   - agent/sitemap discovery entries.
4. Verify Chinese and English pages in a real browser.
5. Capture and inspect desktop and mobile screenshots.
6. Confirm no horizontal overflow, broken images, clipped heads, or overlapping text.
7. Confirm all service, evidence, research, and people links resolve.
8. Publish through GitHub to the `.ai` repository first, then sync the same scoped change onto the latest `.cn` main branch without overwriting `.cn`-specific history.
9. Verify both public domains after their deployment pipelines complete.

## 10. Out of Scope

- Publishing a Beijing FANUC case before its evidence package is confirmed;
- redesigning every service detail page;
- adding unverified client results or metrics;
- changing the site's global navigation structure;
- replacing the existing bilingual routing model;
- publishing directly to Vercel outside the GitHub deployment workflow.

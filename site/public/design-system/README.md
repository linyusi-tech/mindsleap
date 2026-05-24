# MindsLeap Design System

A design system for **MindsLeap (心智悦动)** — an AI transformation accelerator that bridges Chinese enterprises with the Silicon Valley AI ecosystem. MindsLeap is a **Global Partner of Founders Space**, the renowned Silicon Valley incubator, and operates four core service pillars:

1. **AI Founders Club** — exclusive 30–50 person closed-door community for entrepreneurs
2. **Unicorn Incubation** — ToB scaling service with the Founders Space network
3. **AI Training & Consulting** — strategy workshops and execution programs for enterprises (Lenovo, Alibaba, etc.)
4. **Custom Study Tours** — Silicon Valley immersions (Stanford, NVIDIA GTC, Google)

The brand tagline is **"Upgrade AI Mindsets for Global Success"** and the bilingual product positioning is **"Joyful Transformation / 心智悦动"** — turning enterprise AI anxiety into a joyful cognitive-upgrade journey.

The core founder is **Lincoln Wang** (Founder & CEO, MindsLeap; Founders Space Global Partner; Founder of Founders AI Club; former COO of Emeritus China). The product also features **Steve Hoffman** ("Captain Hoff") as the Founders Space partnership figurehead.

## Sources

This design system was built from the following materials, in order of authority:

| Source | Path / URL | Notes |
|---|---|---|
| **Production codebase** | `github.com/wuyoukongque/mindsleap` (default branch `main`) — the marketing site under `site/` is a Next.js 16 App Router app | Source of truth for colors, type, layout, copy |
| **Project context doc** | `PROJECT_CONTEXT.md` in the repo root | Describes folder conventions, locale routing (`/zh`, `/en`), news taxonomy |
| **Site tracker** | `SITE_TRACKER.md` in the repo root | Active site iteration roadmap |
| **Content tracker** | `CONTENT_TRACKER.md` in the repo root | News article publication workflow |
| **Logo PNGs** | `uploads/MindsLeap-Logo-blue-260322.png`, `MindsLeap-logo-white-260322.png`, `MindsLeapxFoundersSpaceJointlogo.png` | Master logos — blue on light, white on dark, joint-lockup with Founders Space |

The Next.js site is the **only production surface** — there is no mobile app, dashboard, or product UI beyond the marketing site. All UI kits in this design system therefore replicate the marketing-site visual language.

## Index

Root files:

- `README.md` — this file
- `SKILL.md` — Agent Skill manifest, makes this folder usable as a Claude Code skill
- `colors_and_type.css` — CSS custom properties for color + type tokens (raw + semantic)
- `assets/` — logos, fonts, and visual assets ready to copy into work
- `fonts/` — font files (currently empty — system + Google Fonts are used; see Visual Foundations)
- `preview/` — small HTML cards that populate the Design System tab (one concept per card)
- `ui_kits/website/` — UI-kit recreations of the MindsLeap marketing site (the only product surface)

---

## Content Fundamentals

MindsLeap is a **bilingual brand (Chinese-first, English-parity)**. Every news article, page, and CTA exists in both `/zh` and `/en` with the same slug, and the brand bridges two cultures simultaneously: Chinese enterprise sensibility and Silicon Valley directness.

### Voice & tone

- **Authoritative but warm.** Lincoln writes as a peer to entrepreneurs and a guide for traditional-industry executives — not a vendor. Tone is consultative ("我们" / "we") rather than promotional.
- **Bilingual concept-pairing.** Brand and product names are presented as English + Chinese together, treated as one unit: *MindsLeap 心智悦动*, *AI Founders Club*, *Founders Space 创始人空间*. Never pick one — the bilingual pair *is* the name.
- **"Joyful transformation" framing.** The signature emotional move is reframing AI anxiety into a positive ("anxiety → joyful cognitive upgrade", "焦虑 → 心智悦动"). Copy consistently names the problem (transformation fear, anxiety gap) before offering the path.
- **Outcome-oriented, not feature-oriented.** Service descriptions lead with *what changes for the customer* ("Scaling Tomorrow's Tech Giants", "Mastering and Implementing AI Strategy") rather than deliverables. Deliverables show up as supporting detail in the second sentence.
- **Names brand partners explicitly.** Copy proudly name-drops the network — Founders Space, Steve Hoffman, Zack Kass (ex-OpenAI), Stanford D School, NVIDIA GTC, Lenovo, Alibaba. This is part of the value proposition, not decoration.

### Casing & punctuation

- **Title Case for headings** in English (`Joyful Transformation`, `Global Eco-system`, `Latest Events`).
- **Sentence case for body and subtitles** in English.
- **Chinese** uses normal Chinese typography — full-width punctuation, no extra spacing — but tech terms (`AI`, `GTC`, `ToB`) remain Latin and uppercase inside Chinese sentences.
- **Smart quotes for pull quotes** (`"…"` rendered as `&ldquo;…&rdquo;` / `“…”`), straight quotes only in code.
- **Brand spelling.** `MindsLeap` is one word, two caps — never `Mindsleap` or `Minds Leap`. `Founders Space` is two words. The Chinese name is `心智悦动` (no spaces). The slogan is `Upgrade AI Mindsets for Global Success` — title case, no period.

### Pronouns & framing

- English: **"you"** (the entrepreneur / executive). The brand is **"we"** or **"MindsLeap"** — rarely **"I"** outside of attributed quotes.
- Chinese: **"您"** for the most formal contexts (CEO-facing landing copy, contact forms), **"你"** for editorial Founders Talk and insight articles. Default to **"我们"** for the brand voice.
- Insight articles **always carry a signed author line** in both languages. Chinese: `作者：王林Lincoln | MindsLeap创始人 | Founders Space合伙人 | 企业家AI俱乐部创始人`. English: `Author: Lincoln Wang | Founder of MindsLeap | Global Partner at Founders Space | Founder of Founders AI Club`.

### What we don't do

- **No emoji in product UI.** The site uses Unicode glyphs (✓, →) and SVG icons. The only emoji in the codebase is a `📰` newspaper fallback for news cards missing a cover image — treat this as a placeholder, not a style.
- **No exclamation marks** in service copy. Energy comes from verbs ("Upgrade", "Scaling", "Mastering"), not punctuation.
- **No "revolutionary", "disrupt", "synergy", "leverage" buzzwords** in marketing copy. The brand prefers concrete nouns (workshop, site visit, study tour, GTC, Stanford).
- **No clichéd AI imagery in copy** (no "harness", no "unleash", no "unlock"). Verbs are quieter: *upgrade*, *bridge*, *accompany*, *partner*, *transform*.

### Example phrases (lifted from the production site)

- `Upgrade AI Mindsets for Global Success`
- `The AI Transformation Accelerator Bridging Chinese Enterprises with Global AI Innovation`
- `MindsLeap: Joyful Transformation`
- `Traditional entrepreneurs face an "anxiety gap" in the AI era — knowing AI matters but unable to find a clear path.`
- `Join us and "Leap" together.`
- `Witness the "Leap" in action across the globe.`
- `Managed by Founders Space Partners` (footer)
- `关于 MindsLeap 心智悦动` (the standard closing block for Chinese insight articles)
- `This article was translated and adapted from the Chinese original with AI assistance.` (English-version footer for translated insights)

---

## Visual Foundations

### Color

The palette is **deliberately minimal**: a single corporate blue, two neutral grays, white, and black. There is **no secondary accent color** — emphasis comes from weight, scale, and the brand blue. There are no purples, no warm accents, no gradients beyond a subtle same-hue blue ramp.

- **Brand blue: `#1e477c`** — used everywhere meaningful. Headings, primary buttons, footer ground, hero CTAs, link borders.
- **Brand blue light: `#2a5a9e`** — the lighter end of the brand gradient. Only used inside the `bg-brand-gradient` (135° gradient `#1e477c → #2a5a9e`) on the contact CTA section.
- **Brand blue dark: `#152f54`** — rarely used; reserved for `text-primary-dark` on very high-density layouts.
- **Tailwind `blue-500` (`#3b82f6`)** appears as a *one-off accent*: the short underline bar beneath section titles, the `Learn More →` link color, the small underline beneath card CTAs.
- **Neutrals.** `gray-50` (`#f9fafb`) for section backgrounds, `gray-100` (`#f3f4f6`) for borders, `gray-400/500/600` (`#9ca3af`/`#6b7280`/`#4b5563`) for body and meta text. Pure black `#111` for body text on white. Pure white for body text on the blue ground.
- **Translucent whites on the blue ground.** Quote cards inside `valueProp` and CTA pattern use `bg-white/10` with `border-white/10` and `backdrop-blur-sm` over the brand blue.

There are no semantic success/warning/error colors defined — the site has no transactional UI that needs them. If introducing them, use Tailwind defaults (`green-600`, `amber-500`, `red-600`) and document.

### Type

- **English/Latin: Inter** loaded from Google Fonts (`300, 400, 500, 600, 700, 800`). Inter is the substitute for the system stack — the codebase's `--font-sans` is actually `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", ...` with Inter loaded as an external face for legacy browsers / cross-OS parity.
- **Chinese: Noto Sans SC** loaded from Google Fonts (`300, 400, 500, 600, 700`), backed by `"PingFang SC", "Microsoft YaHei"` in the system stack.
- **Letter spacing:** body uses `letter-spacing: -0.01em` globally for tighter modern feel. Eyebrows (the small uppercase categories above heroes — `AI Founders Club`, `Networking`, etc.) use **wide tracking** (`tracking-widest`, ~`0.1em`) and uppercase.
- **Type rhythm.**
  - **Hero heading:** 5xl→7xl (48–80px), bold, often with an explicit `\n` line break.
  - **Section heading (h2):** 3xl–4xl (30–36px), bold, brand blue.
  - **Card title (h3):** 1.25rem (20px), bold, brand blue.
  - **Eyebrow:** 0.75rem (12px), bold, blue-500, uppercase, tracking-widest.
  - **Body:** 1rem–1.125rem (16–18px), 1.5–1.625 line-height. `text-gray-600` on white, `text-blue-100` / `text-blue-200` on the blue ground.
- **Italics** appear only inside pull-quotes (`<blockquote>`). Body copy is upright.

### Spacing & layout

- **Container width:** `max-w-7xl` (1280px) with `px-4 sm:px-6 lg:px-8` responsive padding.
- **Vertical rhythm.** Sections are spaced with `py-24` (96px desktop) for marquee sections, `py-20` for tighter ones, `py-16`/`pt-20 pb-10` for the footer.
- **Grid gaps:** `gap-8` between cards (32px), `gap-12` between major columns (48px), `gap-16` between major content blocks (64px).
- **Hero heights.** Home hero is `80vh`, sub-page hero is `60vh`. Both have a dark overlay (`bg-black/40`) over a background photo.
- **Sticky nav** at `h-20` (80px) with `bg-white/95 backdrop-blur-md` and `border-b border-gray-100 shadow-sm`.

### Backgrounds

- **Photographic full-bleed heroes** with a dark overlay (`bg-black/40`) and white text. Photos are real event photography — group shots at workshops, Silicon Valley campus shots, AI Club lobster-summit photos — never stock or generated imagery.
- **Solid white** is the default body ground.
- **`bg-gray-50` (`#f9fafb`)** alternates with white between sections to create banding.
- **Solid brand blue (`#1e477c`)** is used as a deliberate emphasis ground — the `ValueProposition` section, the footer, and primary CTA buttons.
- **Brand gradient** `linear-gradient(135deg, #1e477c 0%, #2a5a9e 100%)` is used sparingly — only on the `CTASection`, with two large translucent `bg-white/10` circles as decoration (top-right and bottom-left, off-canvas).
- **No repeating patterns, no textures, no hand-drawn illustration.** The brand is photographic + clean-typography.

### Cards

- **Default card** = `bg-white rounded-xl shadow-sm` (12px radius, very subtle shadow).
- **On hover** = `hover:shadow-lg` or `hover:shadow-xl` (no scale, no border change). News cards lift `transform: translateY(-2px)` and shadow `0 8px 30px rgba(0,0,0,0.08)` via `.card-hover`.
- **Quote cards on blue ground** = `bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8` (16px radius — larger than content cards).
- **News images** are `h-56` (224px) `object-cover`, with the slug-card title in brand blue and an underline `border-b-2 border-blue-500` on the "Learn More" link.
- **Cards never use a colored left border accent** — the brand does not use that pattern.

### Borders & radii

- **Radii**: `rounded-md` (6px) for primary CTAs and image thumbnails; `rounded-xl` (12px) for service / news cards; `rounded-2xl` (16px) for quote callouts and ecosystem chart; `rounded-full` (pill / circle) for the *Join the Club* nav CTA, mentor avatars, footer social icons, and the ✓ check markers in the ecosystem checklist.
- **Borders** are sparing — `border-b border-gray-100` for nav, `border border-white/10` for translucent cards on the blue ground, `border border-gray-100` for the ecosystem chart frame. Body content rarely has a visible border.
- **Underlines** are used semantically: section titles get a 20×4px `bg-blue-500` bar centered beneath; "Learn More" links use `border-b-2 border-blue-500`.

### Shadows & elevation

- **Three rungs**, mapped to Tailwind:
  - `shadow-sm` (`0 1px 2px rgba(0,0,0,0.05)`) — resting state of cards and the sticky nav.
  - `shadow-lg` (`0 10px 15px rgba(0,0,0,0.1)`) — primary CTA buttons (`Join the Club`), hovered cards.
  - `shadow-xl` (`0 20px 25px rgba(0,0,0,0.1)`) — full-bleed media cards (ecosystem chart), strong card hover.
- **`shadow-2xl`** is used once, on the ecosystem chart, to anchor the diagram.
- **Inner shadows** are not used.
- **Drop shadows on text** are not used. White text on dark photo relies on the 40% black overlay for contrast.

### Buttons

- **Primary, dark ground:** `bg-white text-[#1e477c] px-8 py-4 rounded-md font-bold hover:bg-gray-100` — hero CTAs on photos.
- **Primary, light ground:** `bg-[#1e477c] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-blue-800 shadow-lg` — the *Join the Club* pill in the nav.
- **CTA on gradient ground:** `bg-white text-primary px-10 py-4 rounded-full font-semibold hover:bg-gray-100 hover:shadow-lg` with a `→` icon trailing.
- **Tertiary / inline:** plain text in `text-blue-500 font-bold hover:underline` with a trailing `→`.
- Buttons **don't scale** on hover. They change background, shadow, or both. No press-state animation beyond default browser focus rings.

### Hover & press states

- **Cards:** lift via `translateY(-2px)` and deepen shadow over `0.25s ease`.
- **Nav links:** color shifts from `text-[#1e477c]` to `text-blue-600` on hover.
- **Buttons:** background lightens or darkens one step. The primary pill goes `bg-[#1e477c] → bg-blue-800`.
- **Mentor avatars:** outer `ring-gray-100` → `ring-primary/20` on group hover.
- **Service-pillar icon tile:** the `w-14 h-14 bg-blue-50` square fills to `bg-[#1e477c]` on hover and the icon flips white. Transition is `duration-500` — deliberately slow.
- No press / active-state animations beyond browser defaults.

### Animation

- **One global keyframe:** `fade-in` — `opacity 0 → 1` + `translateY(20px) → 0` over `0.8s ease-out forwards`. Applied to hero slide content when the slide becomes active.
- **Hero carousel:** cross-fades at `transition-opacity duration-700`, auto-advances every 5 seconds.
- **Client-logo marquee:** linear infinite `40s` horizontal scroll.
- **Page-level entrance** uses `framer-motion` (the dep is installed) — but the site uses it sparingly. Default to fading from `opacity 0, y: 20` over `0.6s ease-out`.
- **No bounces, no spring physics, no parallax, no scroll-jacking.** Movement is calm and brand-conservative.

### Transparency & blur

- **`backdrop-blur-md`** on the sticky nav (`bg-white/95`).
- **`backdrop-blur-sm`** on the blue-ground translucent cards (`bg-white/10`).
- **`bg-black/40`** is the standard photo overlay for hero text legibility.
- Blur is never used for decoration — it always serves legibility over photography.

### Imagery

- **Color vibe:** real event photography, naturally warm to neutral, lightly desaturated. Avoid heavy grading, no duotone, no grain effect, no monochrome.
- **Treatment:** photos run full-bleed under a `bg-black/40` overlay when text overlays them. When isolated (news cards, mentor avatars), they have no filter — clean `object-cover` at the card's aspect ratio.
- **Aspect ratios:** news cover images are 16:9 (the project doc says so explicitly). Mentor avatars are 1:1 circles at 112px. Hero photos are full-bleed, no fixed aspect — they crop to viewport.
- **People-first.** When you have a choice, choose a photo of real workshop attendees or speakers (Lincoln on stage, Hoffman lecturing, group shots) over abstract tech imagery.

### Fixed elements

- **Sticky nav** at top, `h-20`, scrolls with the page. Mobile gets a hamburger that opens a full-width drawer with `overflow: hidden` on body to lock background scroll.
- **No floating action buttons, no chat bubble, no cookie banner** are part of the brand surface — keep designs clean.

---

## Iconography

See `ICONOGRAPHY` section at the end of this README for the full audit. Short version: **inline Heroicons-style outline SVGs hand-written in JSX**, 2px stroke, `currentColor`, sized `w-8 h-8` for service-pillar icons and `w-5 h-5` for inline icons. No icon font, no SVG sprite, no `lucide` / `react-icons` dependency. The site does ship one custom **bouncy-figure brand mark** (the logo). Emoji is used **once as a placeholder** (`📰`) and should not be considered part of the brand vocabulary.

---

## Iconography (audit)

- **Source.** The MindsLeap codebase has **no icon library installed** (no `lucide`, no `heroicons`, no `react-icons`, no icon font, no `/icons` folder). Icons are **inline SVG paths** written directly inside the React components that use them — typically in Heroicons-outline style (2px stroke, rounded line caps).
- **Style.** Outline / line icons. `stroke="currentColor"`, `fill="none"`, `strokeLinecap="round"`, `strokeLinejoin="round"`, `strokeWidth="2"`. Color is inherited from the parent — brand blue `#1e477c` on white grounds, white on the blue ground.
- **Sizes.**
  - Service-pillar icons: `w-8 h-8` (32px) inside a `w-14 h-14` `bg-blue-50` rounded tile that fills with brand blue on hover.
  - Inline / action icons (arrow inside a CTA, social icon): `w-5 h-5` (20px).
  - Footer social icons: `w-5 h-5` inside a `w-10 h-10` `bg-white/10` circle.
- **Glyphs used in production today.** "People / community", "lightning bolt", "shield-with-document", "global / compass", LinkedIn (filled), and a generic right-arrow `M17 8l4 4m0 0l-4 4m4-4H3`. Plus a Unicode `✓` (`&#10003;`) for ecosystem checklist bullets and a right-arrow `&rarr;` for inline "View More →" / "Learn More →" links.
- **Emoji.** Used **once** as a placeholder for news cards missing a cover image (`📰`). Not part of the icon vocabulary — treat it as a placeholder only.
- **Logo as icon.** The MindsLeap logomark is a small **bouncy abstract figure** (head + body, blue) that reads as a person mid-leap. It's part of the logo lockup and shouldn't be reused as a generic icon.
- **Substitution policy.** When you need an icon not in the production codebase, **substitute Heroicons (outline)** as the closest match — 2px stroke, rounded caps, the same visual weight as the inline SVGs the site already ships. Available from `https://heroicons.com` and via CDN: `https://unpkg.com/heroicons@2.x/24/outline/<name>.svg`. **Flag any substitution** in the file you ship.
- **Inventory in this design system.**
  - `assets/logos/mindsleap-logo-blue.png` — primary mark, blue-on-light
  - `assets/logos/mindsleap-logo-white.png` — primary mark, white-on-dark
  - `assets/logos/mindsleap-x-foundersspace-joint.png` — joint lockup with Founders Space
  - `assets/icons/` — inline-SVG copies of the production glyphs (people, bolt, training, globe, arrow, check, linkedin)

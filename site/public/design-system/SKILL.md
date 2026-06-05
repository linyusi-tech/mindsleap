---
name: mindsleap-design
description: Use this skill to generate well-branded interfaces and assets for MindsLeap (心智悦动), an AI transformation accelerator that partners with Founders Space. Use for production code, throwaway prototypes, marketing site work, slide decks, mocks, and bilingual ZH/EN content. Contains essential design guidelines, colors, type, fonts, logos, icons, and a Next.js-style UI kit for the marketing site.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files. Key entry points:

- `README.md` — brand context, content fundamentals, visual foundations, iconography
- `colors_and_type.css` — drop-in CSS custom properties for color + type tokens
- `assets/logos/` — primary MindsLeap logos (blue on light, white on dark) and MindsLeap + Founders Space joint logos for light/dark backgrounds
- `assets/icons/` — production inline SVGs (people, bolt, training, globe, arrow-right, check, linkedin, menu)
- `ui_kits/website/` — high-fidelity recreation of the marketing site (Header, Hero, ValueProp, BusinessOverview, Ecosystem, LatestEvents, Footer)
- `preview/` — small specimen HTML files showing each token / component in isolation
- `deck-template/` — 1920×1080 HTML deck template; URL params `?logo=single|joint`, `?theme=light|brand|dark|magazine`, `?heading=brand|inter|noto`, `?density=spacious|standard|compact` control initial state; Tweaks panel allows live editing

**Visual browsing** — `index.html` is the human-friendly entry. It links to three category pages (`brand.html`, `deck.html`, `ui.html`), each embedding every preview inline and starting with a "Quick start" panel showing exact token names and copy-paste snippets. Open `http://127.0.0.1:3000/design-system/` with the Next.js dev server running, or `open site/public/design-system/index.html` offline.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc.), copy assets out of this folder and create static HTML files for the user to view. Default to bilingual EN + ZH where the surface is customer-facing — the brand is Chinese-first with English parity. If working on production code, you can copy assets and read the rules in the README to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design — confirm: surface (web / slide / asset / mock), language (EN, ZH, or bilingual), and which of the four core service pillars (AI Club, Unicorn Incubation, AI Training & Consulting, Custom Study Tours) the artifact is about — then act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Key non-negotiables:
- One brand color (`#1e477c`). No secondary accent beyond `#3b82f6` for links / underline bars.
- Inter / SF Pro for Latin, Noto Sans SC / PingFang SC for Chinese.
- No emoji in product UI. The codebase uses inline Heroicons-style SVGs at 2px stroke.
- "Joyful transformation" framing — reframe AI anxiety as a positive, never sell with FOMO.
- Always pair English + Chinese for brand names (MindsLeap 心智悦动) and proudly name partners (Founders Space, Steve Hoffman, Stanford, NVIDIA GTC).

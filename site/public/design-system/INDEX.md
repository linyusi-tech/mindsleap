# MindsLeap Design System

A design system for **MindsLeap (心智悦动)** — colors, type, components, and ready-to-use templates for the marketing site and brand decks.

> Imported from the design-system workspace. See `README.md` (below) for the full system documentation.

## What's in here

| Folder | What |
|---|---|
| `colors_and_type.css` | Single CSS file with all color + type tokens |
| `assets/` | Logos (MindsLeap blue / white + joint blue/white lockups) + inline-SVG icons |
| `fonts/` | `MindsLeap-Brand.otf` brand display face |
| `preview/` | One small HTML card per design concept — open any file in a browser |
| `ui_kits/website/` | UI-kit recreations of the marketing-site visual language |
| `deck-template/` | 1920×1080 brand deck template with `?logo=single|joint` support. |

## Quick start

```bash
# open the visual index (no dev server needed)
open site/public/design-system/index.html

# or via the Next.js dev server
cd site && npm run dev
# → http://127.0.0.1:3000/design-system/
```

The index has 3 tabs: **Brand** (colors / type / foundations / logos), **Deck** (single-logo and joint-logo variants in the original template), **UI & Site** (full marketing mockup + reusable components). Each tab opens with a "Quick start" panel showing the exact token names and copy-paste snippets.

— Last updated: May 2026

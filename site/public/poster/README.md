# Poster Archive

This folder powers the static poster pages on the MindsLeap site.

- `/poster/index.html` is the public archive page.
- `/poster/<slug>/index.html` is the poster page for one campaign.
- `/poster/_assets/` contains shared assets referenced by multiple posters.

When adding or updating a poster:

1. Use the source folder name as the slug, for example `ai-hermes-workshop`.
2. Put the poster HTML at `site/public/poster/<slug>/index.html`.
3. Put poster-specific assets beside that HTML.
4. Put shared assets under `site/public/poster/_assets/`.
5. Use root-relative URLs such as `/poster/<slug>/image.png` or `/poster/_assets/shared/logo.png` so the clean URL `/poster/<slug>` works online.
6. Add the clean URL rewrite in `site/next.config.ts`.
7. Add or update the card in `site/public/poster/index.html`.

Design QA rules for future poster templates:

- Never ship white text on a white/light panel, brand-blue text on a brand-blue panel, or any same-color foreground/background pairing. Every section must pass a basic contrast check before handoff.
- Do not use outlined, hollow, or stroke-only typography. Emphasis must use solid type; use the solid light blue `#93c5fd` for accent typography.
- Keep every major poster heading to no more than two deliberate lines at the 390px mobile width; reduce type size or rewrite the break before allowing a third line.
- If a poster uses icons with captions, center-align each icon and its caption as a single unit unless the whole row is explicitly left-aligned.
- Icons must match the meaning of the adjacent content and share one grid, stroke width, corner treatment, and color system across the page.
- For PNG-exported posters, center inline SVG icons through a parent flex container; do not rely on `margin: 0 auto` on the SVG itself because `html2canvas` can preserve its space while dropping the drawing.
- Speaker portraits must sit directly on the light-blue accent divider without a gap; use that accent line as the separator instead of adding a second neutral rule.
- Poster typography scale: use `51-68px` for the main display title, `30-34px` for section titles, `22-24px` for subtitles and card titles, `17px` for supporting copy, `15px` for body copy, and `12px` for labels. Preserve this hierarchy instead of sizing each block independently.
- Keyword emphasis: use solid light-blue type (`#93c5fd`) on brand-blue backgrounds and stronger blue (`#3b82f6`) on white backgrounds. Do not use underlines for title emphasis.
- Mobile poster pages should treat desktop as a preview frame only; verify the primary composition at 390px width.

# MindsLeap Website — UI Kit

A high-fidelity recreation of the MindsLeap marketing site (`github.com/wuyoukongque/mindsleap`, Next.js App Router under `site/`). This is the **only product surface** MindsLeap operates — there is no separate app, dashboard, or portal.

## Files

- `index.html` — full home-page click-through (Header → Hero carousel → ValueProp → BusinessOverview → Ecosystem → LatestEvents → Footer). Locale toggle and hero auto-advance work.
- `Header.jsx` — sticky nav with logo, links, locale switch, primary pill CTA.
- `Hero.jsx` — full-bleed photo hero with auto-advancing carousel and dots.
- `ValueProp.jsx` — brand-blue section with bilingual paragraph + two quote callouts (Lincoln, Hoffman).
- `BusinessOverview.jsx` — 4-up service pillar cards on `bg-gray-50`.
- `Ecosystem.jsx` — 2-column ecosystem checklist + chart placeholder.
- `LatestEvents.jsx` — 3-up news card grid.
- `Footer.jsx` — brand-blue footer with logo, link columns, social.

## What was simplified

- Real production uses `next-intl` for i18n; this kit uses a small `lang` state.
- Real production loads ecosystem chart, photos, and mentor headshots from `/public/images/`. This kit shows brand-blue gradient placeholders labeled with the photo's role (e.g. "Hero photo — AI Club workshop") so it's obvious what asset would go there.
- News images use the same `Apr 2026` slugs and copy as the production `CONTENT_TRACKER.md`.

## What's pixel-accurate

Colors, type ramp, spacing, radii, shadows, button styles, hover states, carousel timing, the `Learn More →` underline pattern, the section-title bar, the icon-tile hover-fill transition, the translucent quote cards, and the footer layout — all match `site/src/components/...` in the codebase.

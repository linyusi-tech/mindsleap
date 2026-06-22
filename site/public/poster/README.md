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

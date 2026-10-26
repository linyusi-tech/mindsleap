# .ai security upgrade: local validation

Scope: .ai only. Base: origin/main e5149c0, fetched on 2026-10-26.
Branch: codex/ai-security-upgrade-20261026.
No production deployment, .cn changes, credentials copied, or real lead submissions.

## Versions

| Package | Before | After |
| --- | --- | --- |
| next / eslint-config-next | 16.1.6 | 16.4.3 |
| react / react-dom | 19.2.3 | 19.2.9 |
| next-intl | 4.8.3 | 4.14.9 |
| sharp (transitive) | 0.34.5 | 0.35.5 |

Also refreshed compatible transitive dependency patches with npm update
js-yaml picomatch source-map-js yaml svix uuid. No force fix or overrides.

## Verification

- npm run build: passed, default Turbopack, including TypeScript and 249 static pages.
- npm run build -- --webpack: passed as an additional compatibility check.
- node scripts/test-contact.cjs: passed; mocks email delivery, does not prove inbox receipt.
- node scripts/check-services-hub.mjs: passed.
- node scripts/check-client-case-news.mjs: passed.
- node scripts/check-ai-evidence-news.mjs: passed.
- node scripts/test-upgrade-smoke.mjs: 24 local HTTP checks passed against both builds.
  Covers Chinese/English pages, news metadata, course rewrite, service redirect,
  feeds, sitemap, llms.txt, /zh/ai Markdown negotiation, image optimization and invalid leads.
- Browser QA: 1440x1000 and 390x844 on /zh, /en, course, club, contact.
  Initial webpack run: all ten samples had no page errors or horizontal overflow.
  Default-build browser recheck results are in /private/tmp/mindsleap-upgrade-qa/browser-results.json.

Local preview: http://127.0.0.1:3026/zh
Run HTTP checks against another loopback port with SMOKE_BASE_URL.
Temporary screenshot directory: /private/tmp/mindsleap-upgrade-qa.

## Remaining gates

- Production-only npm audit: 16 affected package entries before, 5 after;
  critical/high are now zero. Remaining moderate entries are typography /
  postcss-selector-parser and resend / svix / uuid chains. These are dependency
  matches, not confirmed exploits. Do not apply npm's typography downgrade blindly.
- Full npm run lint -- --quiet failed with 92 errors in untouched source/vendor
  files under the new tooling, including vendor this-alias rules, effect state
  updates, and static-course anchor links. Not a clean lint result. A baseline
  old-toolchain lint comparison was not performed.
- check-geo-entity-copy.mjs fails on existing English identity wording.
  Content files are unchanged by this branch; resolve separately with approved copy.
- Next.js warns that middleware naming is deprecated; it remains functional in
  tested routes. Migration to proxy is deliberately separate from this patch.
- Case authentication, rate limiting, CSV export, security headers and .cn
  deployment controls are NOT fixed by this dependency upgrade.
- No live email/Feishu delivery or Vercel preview has been verified in this run.

Before publishing: fetch main again, review the scoped diff, reconcile new changes,
create a reviewed GitHub PR (no automatic merge), verify Vercel preview and lead
delivery, then obtain release approval. Keep the previous Vercel deployment for rollback.

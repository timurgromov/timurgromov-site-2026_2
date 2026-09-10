# Articles hub UI repair — 2026-09-11

## Scope

Only the native Astro `/articles/` hub, shared responsive assertions and their
documentation. Article content/routes, calculator sources, homepage and
EventBudjet are unchanged.

## Cause

The hub kept a separate page-local portrait Hero after the individual wedding
articles moved to the shared UI kit. Its long H1 and absolutely positioned
service line exceeded the available `1280x720` composition and overlapped.
Generic overflow checks did not classify the hub as a wedding article surface.

## Change

- Replaced the local Hero with `WeddingArticleHero.astro`.
- Shortened the display H1 to «Статьи о свадьбе: по делу» while preserving the
  existing SEO title, metadata and explanatory lead.
- Removed obsolete hub-only Hero typography, portrait and breakpoint CSS.
- Added `/articles/` to the strict wedding Article UI assertions and a
  permanent `1280x720` route-specific probe.

## Verification

- `npm run build` — passed.
- `npm run verify:responsive-layout` — passed, 222 cases.
- Fresh local rendered checks passed at `1280x720` and `390x844`.
- Runtime commit `a3c2996` was pushed to `origin/main`; Code health and Deploy
  to gh-pages both completed successfully.
- `npm run verify:pages` confirmed that production was deployed from the exact
  commit, contains the shared Hero marker/new H1 and no longer contains the old
  long Hero heading.
- Fresh production screenshots matched local geometry at `1280x720` and
  `390x844`; no overlap, portrait scale or horizontal overflow remains.

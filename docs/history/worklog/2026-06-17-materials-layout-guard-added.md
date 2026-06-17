# 2026-06-17 - Add /materials/ layout guard

## Context

The `/materials/` page had repeated regressions around footer tail, CTA overlap, record heights, and viewport-specific desktop geometry. Existing `verify:materials-baseline` only proved that the page still uses Tilda records inside Astro; it did not prove the fragile layout zones were visually safe.

## Change

- Added `scripts/check-materials-layout.mjs` for Playwright geometry checks against an existing `/materials/` URL.
- Added `scripts/verify-materials-layout.mjs` to build/run against a local Astro preview and clean up the preview process.
- The Playwright navigation waits for page `load`, not `networkidle`, so long-lived video/Tilda network activity does not make the guard unnecessarily slow.
- Added npm scripts:
  - `check:materials-layout`
  - `verify:materials-layout`
- Documented the new required guard in `docs/do-not-break-this-site.md` and `docs/quick-edit-playbook.md`.

## What It Checks

- Desktop and mobile viewports: `1200x900`, `1440x900`, `1911x1064`, `390x844`.
- Footer bottom pixels are orange.
- Desktop footer record ends with the orange footer shape.
- Mobile footer keeps its orange artboard fallback.
- `/materials/` follow-up CTA buttons are not covered by the next Tilda record.
- The next Tilda record does not overlap the CTA.

## Verification

- `npm run verify:materials-layout`

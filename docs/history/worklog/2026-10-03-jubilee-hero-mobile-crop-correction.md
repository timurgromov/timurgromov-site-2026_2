# Jubilee hero mobile crop correction — 2026-10-03

## Intent

Reuse the corrected shared portrait crops on `/yubiley/` while preserving all
Jubilee copy, controls, commercial blocks and slider timing.

## Candidate

- Replaced frames `02` through `05` with byte-identical corporate AVIF/WebP
  derivatives using the approved source windows `295`, `165`, `100` and `135`.
- Added the shared `crop-20261003a` asset version to prevent stale browser cache.
- Original PNG sources remain outside `public/`; slide `01-smile` is unchanged.

## Local verification

- `npm run build`: passed.
- `npm run verify:responsive-layout`: passed after rerunning outside the managed
  sandbox required by headless Chrome.
- Fresh Codex in-app-browser inspection passed at `390x844`, `430x932` and
  `1440x900`; the full matrix covered `375x812` through `1984x1046`, including
  `767/768/769`.
- Horizontal overflow and console errors: `0`; no form was submitted.

Release details are recorded after the production deployment.

# Jubilee hero smile headroom — 2026-10-03

## Intent

Reuse the corrected first corporate portrait on `/yubiley/` while preserving
all Jubilee copy, controls, sections and slider timing.

## Candidate

- Replaced slide `01-smile` with byte-identical corporate AVIF/WebP
  derivatives using source crop `top=95` instead of `top=150`.
- Added `crop-20261003b` to the asset and preload URLs so browsers fetch the
  corrected crop.
- Original PNG remains outside `public/`.

## Local verification

- `npm run build`, `npm run verify:responsive-layout` and `git diff --check`:
  passed; the responsive gate covered 246 route/viewport cases.
- Fresh Codex in-app-browser review passed at `390x844` and `1440x900`.
- Jubilee matrix passed at `390x844`, `767/768/769x900`, `1180x820`,
  `1366x768`, `1440x900` and `1984x1046`; horizontal overflow and console
  errors: `0`.
- Strict media audit passed; the four delivery files are `18–60 KiB` and match
  the corporate derivatives byte-for-byte.
- No form was submitted.

## Release

- Source commit `66a58fd` is pushed to `origin/main`.
- `Code health` and `Deploy to gh-pages` completed successfully; production
  commit is `9d4a85e`.
- Fresh live checks passed on `/yubiley/` at `390x844` and `1440x900`: the
  versioned AVIF decoded, the new headroom is visible, and horizontal overflow
  and console errors are `0`.
- The live 1024px AVIF SHA-256 matches both local site copies:
  `b24fa574006f1b9f643e348a0498e87351c6b960cf129d7ffa1784ed211fe008`.

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

Pending commit, push, Pages deploy and fresh production verification.

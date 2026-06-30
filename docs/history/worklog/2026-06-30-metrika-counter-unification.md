# 2026-06-30 - Metrika Counter Unification

## Summary

Fixed the copied jubilee/corporate Metrika counter issue.

## Changes

- Added shared Metrika snippet in `src/site/metrika.ts` with primary counter `100295805`.
- Connected the primary counter to:
  - Tilda-derived homepage `/`;
  - `/materials/`;
  - all `BaseLayout` pages such as `/scenario/`, `/articles/`, `/privacy/`, `/offer/`;
  - `/yubiley/` and `/yubiley/contact/`.
- Replaced hardcoded jubilee counter `104468814` in `public/yubiley-assets/script.js` and `public/yubiley-assets/contact/script.js` with the shared primary counter fallback.

## Verification

- `npm run build` passed.
- Built HTML for `/`, `/scenario/`, `/materials/`, `/yubiley/`, `/yubiley/contact/`, `/articles/`, `/privacy/`, and `/offer/` contains `100295805`.
- No `104468814` remains in `src`, `public/yubiley-assets`, or `dist`.

## Status

Local change only at this point. Production still needs commit, push, deployment, and live verification.


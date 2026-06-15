# 2026-06-15 - Scenario CTA button font size reduced

## Summary
- Reduced the primary CTA button typography in the final meeting block on `/scenario/`.

## Changes
- Desktop `.scenario-cta__button` font size: `26px` -> `24px`
- Mobile `.scenario-cta__button` font size: `23px` -> `21px`

## Verification
- `npm run build`
- `git diff --check`
- Production check on `https://timurgromov.ru/scenario/`

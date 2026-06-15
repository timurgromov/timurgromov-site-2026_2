# 2026-06-15 - Scenario hero eyebrow name wrap fixed

## Summary
- Kept `Тимур Громов` as one unbroken name group in the `/scenario/` hero eyebrow.

## Changes
- Wrapped the author name in a dedicated span with `white-space: nowrap`.
- This allows the whole name to move to the next line together when space is tight.

## Verification
- `npm run build`
- production verification on `https://timurgromov.ru/scenario/`

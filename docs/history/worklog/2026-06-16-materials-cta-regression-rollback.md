# 2026-06-16 - Materials CTA regression rollback

## Summary

- Reverted the custom `/materials/` webinar CTA block because it overlapped the existing Tilda webinar scene on production.

## Cause

- The block was inserted after the webinar records but pulled upward with large negative margins.
- The webinar area is still controlled by extracted Tilda records with their own reserved geometry and scroll behavior.
- Pulling an Astro section into that area caused the CTA to overlap the video, proof cards, and review button.
- The block also did not match the provided reference direction: typography was too large and the orange panel dominated the page.

## Changes

- Reverted commit `a202390` with commit `6702e31`.
- Added a safety note to `docs/do-not-break-this-site.md`: do not pull custom Astro sections upward into the webinar area with large negative margins.

## Verification

- `npm run build`
- `npm run verify:materials-baseline`
- Production marker check confirmed `/materials/` no longer contains `materials-bonus-cta` or `Получить расширенный конспект подготовки к свадьбе`.

## Next Rule

Any future CTA for this page must be either:

- a small Tilda-like element inserted within the correct record using Tilda-style coordinates and breakpoints, or
- a normal section placed after the webinar Tilda records without negative overlap.

Do not use large custom sections with negative margins in the webinar area.

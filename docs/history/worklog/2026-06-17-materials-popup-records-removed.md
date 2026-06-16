# 2026-06-17 - Remove accidental popup records from /materials/

## Context

The desktop `/materials/` page started showing broken CTA behavior and extra popup-derived content. The root cause was that popup records from `page62008353.html` had been accidentally appended into the `/materials/` page body.

## Change

- removed the injected `materialPopupRecordIds` list from `src/pages/materials.astro`;
- removed the extra `materialPopupRecordsHtml` insertion from the `/materials/` body assembly;
- kept the actual webinar, CTA, reels, and footer records unchanged.

## Why

The desktop CTA should be fixed by removing the accidental extra layer, not by patching buttons on top of a polluted DOM.

## Verification

- `npm run build`
- `npm run verify:materials-baseline`

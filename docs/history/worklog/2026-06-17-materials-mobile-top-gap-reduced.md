# 2026-06-17 - Reduce mobile top gap on /materials/

## Context

On the mobile `/materials/` page, the gap between the fixed orange header and the first webinar heading still looked too tall after the recent footer and CTA fixes.

## Change

- reduced the mobile `#allrecords` top padding in `src/pages/materials.astro` from `76px` to `64px`;
- kept the fixed header, webinar records, and the rest of the page geometry unchanged.

## Why

The spacing issue was caused by the page-level offset under the fixed header, so the smallest safe fix was to tighten that offset instead of moving the webinar records themselves.

## Verification

- `npm run build`

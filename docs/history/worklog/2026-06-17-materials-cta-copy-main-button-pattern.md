# 2026-06-17 - Materials CTA Copy Main Button Pattern

## Context

The previous desktop overlay fix made `/materials/` CTA buttons visible, but added fallback button backgrounds and outlines on the anchor itself. That changed the button geometry compared with the established CTA buttons on the main page.

## Source Pattern

Canonical source is the main page plan CTA:

- file: `src/pages/index.astro`
- section: `#plan-evening`
- helper: `tildaCtaLink()`
- classes: `.tg-tilda-cta`, `.tg-plan-cta__button`, `.tg-tilda-cta__plate`, `.tg-tilda-cta__arrow-box`

## Change

- Removed the custom fallback `background`, `box-shadow`, forced child visibility, and extra `!important` rules from `/materials/`.
- Restored CTA layout variables, content gutters, button sizing, plate sizing, and responsive spacing from the main page source pattern.
- Kept only the section-level `z-index`/`isolation` needed to keep the CTA above the neighboring Tilda filter.

## Verification

- `npm run build` passed.
- Playwright desktop 1440px check: `/` and `/materials/` CTA buttons both render as `240x36`, plate `205x36`, arrow `36x36`.
- Playwright screenshots saved locally:
  - `/tmp/materials-cta-main-copy-desktop.png`
  - `/tmp/materials-cta-main-copy-mobile.png`

# 2026-06-18 - Homepage and scenario CTA unification

## Context

Mobile review found that the scenario page CTA used a plain rounded button instead of the site's Tilda split-button pattern. The newer homepage CTA sections also needed fixed, matching button widths instead of stretching differently per block.

## Changes

- Reused the shared `tildaCtaLink` helper for the scenario inline and final CTA buttons.
- Added scenario-page scoped global styles for the inserted split-button markup, including the right arrow square.
- Set the two new homepage CTA sections to the same fixed responsive button widths:
  - mobile: `min(300px, 100%)`
  - desktop: `clamp(200px, 16.6667vw, 320px)`

## Verification

- `npm run build`
- Browser measurement at `390x844`:
  - homepage plan CTA: `300x35`, arrow square `35x35`
  - homepage consultation CTA: `300x35`, arrow square `35x35`
  - scenario inline CTA: `300x35`, arrow square `35x35`
  - scenario final CTA: `300x35`, arrow square `35x35`
- Browser measurement at `1440x900`:
  - all four checked CTAs: `240x36`, arrow square `36x36`
- Mobile screenshots checked manually from `/tmp`, not committed.

## Notes

Hero mobile video autoplay was not changed. It remains a browser-policy-dependent behavior with the portrait poster as a fallback.

# 2026-06-16 - Materials CTA helper and mobile webinar cards swipe

## Context

`/materials/` needed to reuse the existing Tilda-like split CTA button pattern instead of locally redrawing it. The mobile webinar info cards also needed to match the main page behavior: stay in one horizontal row and scroll by finger, not stack vertically.

## Changed

- Moved the shared CTA markup helpers into `src/site/tilda-cta.ts`.
- Reused those helpers from both `src/pages/index.astro` and `src/pages/materials.astro`.
- Kept the existing CTA CSS/visual mechanics in place: split plate, arrow square, SVG mask icon and hover rotation.
- Wrapped only the two mobile `#rec862050095` webinar card groups in a static `tg-mobile-card-strip`, so horizontal scrolling applies to the card row, not the whole video artboard.
- Kept the black `О вебинаре` card style.
- Updated CTA reuse docs to point future agents at the shared helper.

## Checks

- `npm run build` passed.
- `npm run verify:materials-baseline` passed.
- Local mobile browser check at `390x844`: `bodyWidth=390`, mobile artboard `overflow-x=hidden`, card strip `overflow-x=auto`, video stays at `x=12..378`.
- Local horizontal gesture check on the visible card strip: `stripScrollLeft=120`, second card moves into view at `x=148..392`, while the video keeps `x=12..378`.

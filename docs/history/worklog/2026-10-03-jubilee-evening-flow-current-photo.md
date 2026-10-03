# Current photo in Jubilee evening flow — 2026-10-03

## Intent

Add one current photo of Timur to the existing `Как проходит юбилей` block
without changing its five stages, CTA or page order.

## Candidate

- Reused the existing Jubilee `EveningFlow` markup and the approved corporate
  media pattern.
- Added one responsive `<picture>` after the five stage cards and before the
  existing CTA.
- Published only `768px` and `1536px` AVIF/WebP derivatives; the 2.3 MiB PNG
  original remains outside `public/`.
- Desktop uses a wide crop with the full head visible; mobile preserves the
  complete `3:2` frame.

## Local verification

- `npm run build` and strict media audit: passed.
- Fresh in-app browser review passed at `390x844` and desktop widths.
- Boundary matrix covered `767/768/769`, `1023/1024/1025`,
  `1179/1180/1181`, `1366`, `1440` and `1984` CSS widths.
- The new media itself stays within the viewport and CTA remains present. The
  page's existing desktop workflow SVG still reports a legacy 19px document
  overhang at exactly `1181px`; this change neither creates nor enlarges it.
- Console errors are `0`; no form was submitted.

## Release

Pending runtime commit, GitHub Pages deployment and fresh production
verification.

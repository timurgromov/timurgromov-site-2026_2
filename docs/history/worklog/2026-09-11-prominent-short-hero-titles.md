# Prominent short Hero titles — 2026-09-11

## Decision

- Owner review found the short titles in the `/scenario/` and `/articles/`
  covers visually too slight inside their tall desktop lanes.
- A universal `68px` rule was measured before release, then rejected: the
  long-title preparation cover would retain only about `34px` above and below
  its centred content group at `1911x839`.
- Added the explicit owner-approved `prominent` role to
  `WeddingArticleHero.astro`, used only by `/scenario/` and `/articles/`.
  At desktop `>=1200px` wide and `>=781px` high it scales H1 to `52–68px`;
  short desktop and mobile retain their established smaller scales.
- Updated the shared responsive assertion so it verifies title font consistency
  within each explicit title role and fails if a route gains `prominent` outside
  the two approved covers.

## Verification

- At `1911x839`, the two selected H1s grow from `58px` to `68px`. Their
  centred group still has equal free space above/below: scenario `216.59px`
  each and articles `125.13px` each.
- The long-title preparation and budget covers remain at `58px`, with their
  readable `75.74px` and `111.97px` balanced lanes respectively.
- Mobile scenario Hero was inspected at `390x844`; it keeps the existing
  `40.95px` natural-flow title and has no horizontal overflow.
- `npm run build` and `npm run verify:responsive-layout` passed.

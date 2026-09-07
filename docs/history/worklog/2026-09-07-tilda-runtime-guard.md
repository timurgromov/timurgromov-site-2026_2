# Tilda runtime guard and materials responsive repair

Date: 2026-09-07
Scope: public site only; `/materials/`, homepage legacy scroll blocks and the responsive release gate.

## Incident

The sitewide responsive sweep correctly found uncaught Tilda-export runtime
errors that had been labeled non-blocking. `/materials/` registered a listener
before `document.body` existed, initialized its header outside `#allrecords`,
and let a legacy ScrollBooster callback resize a Zero Block before the block
was initialized. The same early resize pattern existed in two homepage price
scroll callbacks. On tablet widths, the materials carousel could also widen
the document while its off-canvas cards finished positioning.

## Repair

- Deferred the materials popup listener until `DOMContentLoaded` when needed.
- Put the exported materials header within `#allrecords`.
- Guarded the affected legacy resize/render calls until the matching Tilda
  functions and Zero Block state are present.
- Clipped intentional off-canvas carousel content at the records boundary.
- Changed the all-page responsive gate so an uncaught browser runtime error is
  a hard failure, not a warning. Geometry QA blocks external/media requests;
  popup/video behavior remains a separate browser check.

## Verification

- `npm run verify:responsive-layout`: 9 routes × 18 viewports = 162 cases.
- `npm run verify:materials-layout`: materials structure, footer and CTA at
  desktop and mobile widths.
- `npm run verify:contacts`: desktop and mobile contact layouts.
- Browser interaction: the first materials CTA opens its popup and the video
  reports `readyState: 4` locally.

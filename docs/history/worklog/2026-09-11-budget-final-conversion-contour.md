# Budget article final conversion contour — 2026-09-11

## Trigger and cause

Owner review found that `/articles/byudzhet-svadby-v-moskve/` ended after its
useful content at a page-local footer. It omitted the established «Всё для
подготовки к свадьбе» conversion island that already closes the scenario,
materials and preparation-plan expert routes.

The cause was an incomplete implementation boundary: `wedding_budget` existed
as a calculator entrypoint, but was not added to the shared
`renderExpertConversionContour` entrypoint type and therefore never rendered a
final materials/contact island.

## Change

- Added the literal `renderExpertConversionContour` and
  `renderConsultationContactPopup` after the complete budget article; removed
  only its duplicate local footer.
- Added the exact `wedding_budget` final sources:
  - `site_plan_timurgromov__wedding_budget__final` for materials;
  - `site_meeting_timurgromov__wedding_budget__final` for consultation,
    popup and form.
- Preserved the calculator-specific `site_calculator_timurgromov__wedding_budget__{hero|mid_article|final}`
  family; the final materials/contact contour does not rewrite calculator
  attribution.
- Recorded the durable default: every public wedding SEO/editorial article
  receives one final big CTA after useful content and before the common footer.
  `/articles/` is a catalogue and remains outside that default; other public
  page types need an explicit scenario decision.
- Recorded the universal attribution requirement: every public
  Telegram/MAX/Mini App start and consultation-form submit uses its own
  structured `intent/site/page/placement` source; provider is separate.

## Verification

- `npm run build` — passed.
- `npm run verify:responsive-layout` — passed for the full route and viewport
  matrix, with no browser runtime errors or horizontal overflow.
- Fresh in-app-browser review of the local candidate showed the final island,
  four controls, portrait, phone and shared footer after article content.
- Static output contains the six expected final material/contact source
  occurrences and the existing calculator-source family.
- EventBudjet's production source parser accepts the new plan and meeting
  source codes and derives their human-readable admin labels.

## Messenger boundary

Rendered deep links and form source are verified. A real Telegram/MAX start was
not clicked: that would create or update production bot/CRM data and requires
explicit test-lead approval.

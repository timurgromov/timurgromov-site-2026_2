# Expert-page split conversion contour — 2026-09-08

## Intent

Apply the approved conversion standard to the three public expert pages without
changing the homepage or Yandex Direct.

## Context

The prior routes used different CTA and footer patterns. Some contact CTA
links already carried a page source, but useful-content continuation had no
separate page-specific source across both Telegram and MAX.

## Changes

- Added a shared `src/site/expert-conversion.ts` renderer used by `/scenario/`,
  `/materials/` and `/articles/plan-podgotovki-k-svadbe/`.
- Each rendered module contains separate material and meeting CTA branches,
  Timur's author card, and the common materials/services/Dzen/reviews/contacts
  footer.
- Replaced the Materials export footer with the common footer rather than
  rendering two footers.
- Added the matching site and EventBudjet source-code contract for exact
  `site_plan_<page>` / `site_meeting_<page>` attribution.

## Verification

- `npm run build`, `npm run verify:contacts`,
  `npm run verify:responsive-layout` and `npm run check:direct-attribution`.
- Browser inspection at desktop confirmed all five CTA controls in the shared
  Materials module are visible; Telegram and MAX buttons in each pair are
  equally 422px wide at 1240px, and the legacy Tilda footer is absent.
- The production baseline was read only. Telegram/MAX deep links were not
  opened, so this release creates no production test lead.

## Result

The common renderer is the inheritance path for subsequent expert pages; each
new page must add its own source codes before it uses the component.

## Risks / Follow-up

Real Telegram/MAX delivery and CRM creation still need a separately authorised
test with an authenticated test account. It is intentionally not claimed here.

## Links

- `UX.md`
- `docs/ui-evidence/2026-09-08-expert-conversion-contour-contract.md`
- `docs/ui-evidence/2026-09-08-expert-conversion-contour-evidence.json`

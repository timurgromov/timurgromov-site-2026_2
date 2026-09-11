# Preparation-plan inline materials CTA — 2026-09-11

## Change

- Added the literal `ExpertMaterialsInlineCta` after stage 04 of
  `/articles/plan-podgotovki-k-svadbe/`, before the transition to stage 05.
- The compact card retains the shared Telegram/MAX split-button design and
  sends the distinct materials source
  `site_plan_timurgromov__preparation_plan__mid_article`.
- The stage-07 scenario link and the one final four-path conversion island are
  unchanged.

## Verification

- `npm run build` — passed.
- `npm run verify:responsive-layout` — passed.
- Fresh in-app browser review confirmed the visible CTA at `390x844`, the
  `1099/1100px` component boundary, and desktop anchors through `1440x900`;
  no horizontal overflow or console errors appeared in the checked candidate.
- No Telegram/MAX link was opened, so no production bot or CRM data was
  created during QA.

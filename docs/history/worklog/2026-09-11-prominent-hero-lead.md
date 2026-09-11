# Prominent Hero lead — 2026-09-11

## Change

- The owner correctly identified a missing linked adjustment: the short-copy
  `prominent` Hero title role had grown while its subtitle remained in the base
  editorial type role.
- Only `/scenario/` and `/articles/` now receive a matching display lead:
  `24–28px` at tall desktop and `22–25px` at desktop windows up to `780px`
  high, both at `1.18` line-height. The H1 role, Hero grid, photo, anchors,
  long-title covers and mobile role remain unchanged.

## Verification

- In the owner-reported `1232x582` window, both selected leads changed from
  `20.944px` to `24.64px`. The scenario lane remains balanced at
  `118.06px / 118.06px`; the articles lane at `96.13px / 96.13px`.
- At `1911x839`, the selected lead is `28px`; both Heroes retain equal content
  lane gaps and no horizontal overflow. At `390x844`, the existing `19px`
  mobile lead remains unchanged on both routes.
- The local in-app browser review at `1280x720` shows a one-line H1, visibly
  stronger four-line scenario lead, separated service anchor and bottom author
  row. No console errors occurred in the measured views.
- `npm run build` and the full `npm run verify:responsive-layout` matrix pass.

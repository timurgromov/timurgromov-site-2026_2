# 2026-06-17 - Remove first CTA divider on /materials/

## Context

The follow-up CTA on `/materials/` still had a grey divider directly above the first step `01 Напишите, кто вы и когда у вас свадьба.`. It looked too tight and was not needed by the design on desktop or mobile.

## What changed

- Added `border-top:none` to the base `.tg-plan-cta__item:first-child` rule.
- Kept the separators before steps `02` and `03`.
- Did not change CTA markup, buttons, links, spacing, or typography.

## Verification

- `npm run build`
- Local Playwright check on `http://127.0.0.1:4325/materials/#materials-followup-cta`:
  - desktop `1440x900`: first item `borderTop: none`, second/third items still have `1px solid`;
  - mobile `390x844`: first item `borderTop: none`, second/third items still have `1px solid`.

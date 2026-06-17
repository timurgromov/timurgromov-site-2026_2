# 2026-06-17 - Fix /materials/ CTA overlap and footer white tail

## Context

Live `/materials/` showed two regressions after the previous spacing tightening:

- the `Мои профессиональные секреты...` record overlapped the follow-up CTA and clipped the heading;
- the page had a white area below the orange footer on desktop.

## What changed

- Removed the negative `margin-top` overrides from `#rec862055949` across desktop, tablet, and mobile breakpoints.
- Removed the negative bottom margin from `.tg-plan-cta` on desktop and tablet.
- Added a final desktop override for `#rec862623921` so the footer record/artboard height ends at the orange footer block instead of continuing as white background.

## Why

The problem was caused by cross-record negative margins and an oversized reused Tilda footer record. The fix keeps the existing CTA, button pattern, Tilda records, fonts, and mechanics unchanged, and adjusts only the section boundaries.

## Verification

- `npm run build`
- Local Playwright check on `http://127.0.0.1:4325/materials/`:
  - desktop `1440x900`: CTA-to-secrets record gap no longer negative; visible heading starts `84px` after CTA bottom;
  - desktop footer: footer record bottom matches the orange block bottom within `1px`;
  - mobile `390x844`: no CTA/secrets overlap and no white tail below the orange footer in full-page screenshot.

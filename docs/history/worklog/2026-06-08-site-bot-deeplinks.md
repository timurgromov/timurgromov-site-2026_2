# 2026-06-08 Site Bot Deep Links

## Context

The site should not be deployed until the bot and CRM source tracking are ready. The public site currently remains live unchanged, while local code prepares the Telegram funnel.

## Changes

- Set `telegramPlanUrl` to `https://t.me/gromov_wedding_bot?start=site_plan`.
- Added `telegramMeetingUrl` as `https://t.me/gromov_wedding_bot?start=site_meeting`.
- Routed the consultation pop-up Telegram option through `site_meeting`.
- Kept direct phone/form behavior unchanged.
- Documented that `site_plan` and `site_meeting` are the only current site payloads.

## Verification

- `npm run build` passes.
- Built `dist/index.html` contains `https://t.me/gromov_wedding_bot?start=site_plan`.
- Built `dist/index.html` contains `https://t.me/gromov_wedding_bot?start=site_meeting`.

## Deploy

No deploy. Production site must not be updated until the full site -> bot -> CRM path is manually verified.

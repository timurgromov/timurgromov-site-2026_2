# 2026-06-24 - Scenario post-qualification materials

## Context

The previous funnel hardening treated every material link as gated, including the footer materials block on `/scenario/`. Owner clarified that this was too strict: users on `/scenario/` have already passed the `site_plan` qualification, so asking them to re-enter Telegram qualification for another material is redundant.

## Changes

- Restored the direct `/scenario/` footer link to the online-review material `https://clck.ru/3RX8Nw`.
- Kept direct Telegram contact links on `/scenario/` routed through `site_meeting`.
- Updated project memory to clarify that `/scenario/` is a post-qualification page where direct additional material links are allowed.

## Verification

- `npm run build` passed.
- Static built `/scenario/` check passed: direct `https://clck.ru/3RX8Nw` is present, `site_meeting` contact links remain present, and old gated footer text `После 3 коротких вопросов в Telegram` is absent.
- Production `/scenario/` marker check after push is pending.

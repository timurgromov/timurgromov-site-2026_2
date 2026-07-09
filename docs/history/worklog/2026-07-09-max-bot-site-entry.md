# 2026-07-09 - MAX bot site entry

## Context

EventBudjet now gets a MAX bot / Mini App integration alongside the existing Telegram bot. The public site should let users choose Telegram or MAX for the same scenario and contact flows.

## Changes

- Added MAX bot constants in `src/site/home-data.ts`:
  - `https://max.ru/id615491029963_bot?start=site_plan`
  - `https://max.ru/id615491029963_bot?start=site_meeting`
  - `https://max.ru/id615491029963_bot?startapp=direct_personal`
- Updated homepage scenario CTA and hero popup copy from Telegram-only to Telegram/MAX.
- Repointed MAX contact links from the old personal fallback to the new MAX bot `site_meeting` deep link.
- Repointed stale MAX fallback URL on `/scenario/` metadata.
- Updated `CURRENT_STATE.md` so future edits do not revert the dual-platform entry.

## Verification

- `npm run build` passed.
- `npm run verify:contacts` passed after MAX link changes.

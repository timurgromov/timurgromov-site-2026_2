# 2026-06-24 - Consultation popup phone plus normalization

## Context

Owner received a live consultation lead from the site popup where the phone arrived in Telegram as `7-...` without the leading `+`. Audit showed the popup phone field had only a `+7` placeholder, but the frontend submit handler sent the raw field value to `EventBudjet` without any normalization.

## Changes

- Added frontend `normalizePhoneForSubmit()` in [src/pages/index.astro](/Users/ruslanmamedov/Yandex.Disk.localized/1.%20Проекты%20WibeCoding/TimurBusinessSystem/ТГ%202026%20на%20своем%20Хостинге%20_2/src/pages/index.astro), so consultation popup requests now send phone numbers to CRM/Telegram with a guaranteed leading `+`.
- Added Russian fallback normalization for 11-digit numbers starting with `8`, converting them to `+7...` before submit.
- Updated the popup phone placeholder from bare `+7` to `+7 999 123-45-67`, so the field no longer looks like `+` is already part of the actual entered value.

## Verification

- `npm run build` — passed.
- `npm run verify:contacts` — passed with escalated permissions.
- Cleanup check after preview/headless run: `ps aux | egrep "headless|remote-debugging-port|astro preview|npm run preview" | grep -v egrep` — no leftover processes.
- Local browser check on `http://127.0.0.1:4321/`:
  - consultation popup opens normally;
  - popup phone field placeholder is `+7 999 123-45-67`;
  - built page contains `normalizePhoneForSubmit(...)` in the consultation submit flow.

## Result

The popup no longer relies on the user explicitly typing the `+` sign for CRM/Telegram notifications. The root cause was frontend raw-value submit behavior, not Telegram delivery or backend formatting.

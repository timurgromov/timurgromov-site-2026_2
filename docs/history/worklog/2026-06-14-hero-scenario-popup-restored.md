# 2026-06-14 — Hero scenario popup restored

## Context

Hero CTA for `получить сценарий свадьбы` should not send the user directly to Telegram without context.

The lower `Получить сценарий свадьбы` block can stay as a direct Telegram CTA, but Hero should open a short popup with the offer and then send to the bot.

## Changes

- Hero CTA now opens `plan-delivery-popup` via `data-plan-popup-open`.
- Popup is adapted for bot-first flow: no site qualification form, one clear Telegram CTA.
- Lower scenario block copy is tightened:
  - heading: `Получить сценарий свадьбы`
  - button: `Получить сценарий`

## Checks

- `npm run build` passed locally.

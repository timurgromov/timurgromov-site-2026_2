# 2026-07-10 - Hero scenario messenger popup

## Context

The site already had `#plan-delivery-popup` with Telegram and MAX scenario links, but the live hero click-layer still opened Telegram directly. Owner asked to reuse existing popup patterns, not design a new block.

## Changes

- Rewired hero click-layer `rec861352716` / `1738735136250` to open the existing plan delivery popup with `data-plan-popup-open`.
- Removed direct external `_blank` behavior from the hero overlay.
- Kept popup buttons as canonical split-buttons and changed their labels to `Получить в Telegram` and `Получить в MAX`.
- Updated `verify:contacts` so it checks the popup opener contract and both popup `site_plan` links.
- Added site-side Metrika handoff goals for the scenario funnel: `site_plan_popup_open`, `site_plan_messenger_click`, `site_plan_telegram_click`, and `site_plan_max_click`.
- Added analytics data attributes to the existing popup and lower CTA split-buttons: `data-plan-channel="telegram|max"` and `data-plan-source="plan_popup|plan_cta_block"`.
- Extended `verify:contacts` to fail if scenario Telegram/MAX buttons lose the Metrika goal strings, channel attribution, source placement, or regress from `site_plan` to `site_meeting`.
- Added a new active decision for the Telegram/MAX hero choice and marked the old direct-Telegram hero rule as superseded.

## Verification

- `npm run build` passed.
- `npm run verify:contacts` passed.
- In-app browser local preview checks passed:
  - `1440x900`: hero opens popup; close button, backdrop click, and Escape close it; Telegram/MAX links point to `site_plan`.
  - `1366x768`: popup stays inside viewport; buttons visible and unclipped.
  - `1984x1046`: popup stays centered; buttons visible and unclipped.
  - `390x844`: popup fits viewport, preview image is hidden, `scrollWidth` equals viewport width, buttons visible and unclipped.
- Browser console still shows the known Tilda resize/runtime errors from `tilda-zero-1.1.min.js`; they did not block the scenario popup flow.
- Production marker-check passed on `https://timurgromov.ru/`: live HTML contains `data-plan-popup-open`, `Получить в MAX`, and `Получить сценарий свадьбы`.
- Production in-app browser smoke passed:
  - `1440x900`: hero opens popup; Telegram/MAX buttons point to `site_plan`.
  - `390x844`: popup fits viewport, `scrollWidth` equals `390`, preview image is hidden, Telegram/MAX buttons point to `site_plan`.

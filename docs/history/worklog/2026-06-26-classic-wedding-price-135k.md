# 2026-06-26 - Classic wedding price changed to 135k

## Context

Owner requested a minimal live-site copy change in the price section: reduce the `Классическая свадьба` price from `145 000 ₽` to `135 000 ₽`.

## Changes

- In `src/site/home-data.ts`, updated the `Классическая свадьба` price inside `priceFormatsMarkup` from `145 000 ₽` to `135 000 ₽`.

## Verification

- `ASTRO_TELEMETRY_DISABLED=1 npm run build`

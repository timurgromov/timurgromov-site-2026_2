# 2026-06-24 - Scenario thesis visibility and copy fix

## Context

Owner reported two issues on `/scenario/`:

- the `Что работает лучше` callout around emotional moments still read clumsy because of the ending about `следить за таймингом`;
- in the orange `Главная мысль` block the phrase after `Есть` looked broken, as if part of the sentence was missing.

## Changes

- Rewrote the callout copy to: `Ставить трогательные моменты тогда, когда гости уже включились в вечер, закрыли базовые потребности и готовы воспринимать эмоции.`
- Fixed the thesis emphasis styling: `.scenario-thesis em` no longer inherits the accent orange used for hero/CTA emphasis and now renders in light text on the orange thesis background.

## Verification

- `ASTRO_TELEMETRY_DISABLED=1 npm run build`

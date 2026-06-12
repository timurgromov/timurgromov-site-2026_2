# 2026-06-13 - Unified CTA button pattern with hero-style arrow zone

## Scope

- `src/pages/index.astro`

## Context

CTA-кнопки в блоках `План-сценарий`, `Бесплатная консультация` и popup-окнах были выполнены как generic rounded buttons и не совпадали с паттерном главного hero-CTA. Это давало визуальный разнобой: единый цвет сохранялся, но единый стиль кнопок отсутствовал.

## Changes

- введен общий split-CTA паттерн с правой arrow-зоной по мотивам hero-кнопки
- под этот паттерн приведены:
  - кнопки блока `План-сценарий`
  - кнопки блока `Бесплатная консультация`
  - ссылки в contact popup
  - submit-кнопка contact popup
  - submit-кнопка tripwire popup
  - Telegram-link в success-state tripwire
  - ссылки в plan popup
  - success-link в contact popup
- вторичные CTA и popup-links переведены на оранжевую обводку вместо серой, чтобы визуально совпадать с основным сайтом

## Verification

- `npm run build`

## Result

На уровне кода кнопки больше не являются просто уменьшенными generic controls. Они сведены к одному CTA-паттерну, который ближе к старому hero-стилю сайта.

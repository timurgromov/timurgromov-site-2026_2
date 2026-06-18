# 2026-06-18 - Restore content-fit widths for home CTA buttons

## Context

На главной странице и в связанных popup CTA-кнопки были зажаты одинаковой шириной. Из-за этого длинный label `Записаться на бесплатную встречу` перестал помещаться в primary-кнопку консультационного блока.

## Root Cause

Проблема была не в высоте кнопок, а в фиксированной ширине source-layer:

- desktop/tablet: `width: clamp(200px, 16.6667vw, 320px)`
- mobile: `width: min(300px, 100%)`

Эти правила были заданы сразу нескольким home CTA variant-классам в `src/pages/index.astro`, поэтому кнопки подгонялись под общую болванку вместо реальной длины текста.

## Change

- Убрана жёсткая одинаковая ширина как `width` у:
  - `.tg-plan-cta__button`
  - `.tg-consultation-cta__button`
  - `.tg-contact-popup__link`
  - `.tg-contact-popup__form button`
  - `.tg-plan-popup__telegram`
- Возвращена прежняя базовая логика ширины:
  - старая Tilda-like база сохранена как `min-width`
  - сама ширина задана как `width: max-content`
  - `max-width: 100%` сохранен как страховка от выхода за контейнер
- Итог: короткие CTA не схлопываются меньше привычной базы, а длинные CTA могут расширяться сверх неё и не режут label.
- Страница `/scenario/` не менялась.

## Verification

- `npm run build`
- Local Playwright check against `http://127.0.0.1:4321/`
- Проверка CTA консультации на `1440x900`:
  - `Записаться на бесплатную встречу`: `buttonWidth:325`, `labelScrollWidth:290`, `clipped:false`
  - `Позвонить`: `buttonWidth:240`, `labelScrollWidth:205`, `clipped:false`
- Проверка подтверждает нужную механику: короткая кнопка не схлопывается до текста, длинная расширяется сверх базовой ширины.

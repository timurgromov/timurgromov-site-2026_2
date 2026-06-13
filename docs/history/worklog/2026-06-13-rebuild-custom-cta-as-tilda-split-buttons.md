# 2026-06-13 - Rebuild custom CTA controls as Tilda split buttons

## Scope

- `src/pages/index.astro`

## Context

Кастомные CTA в блоках плана, консультации и popup были сделаны через один элемент с CSS-псевдо-стрелкой. Визуально это не совпадало с исходной Tilda-кнопкой hero: в оригинале кнопка состоит из отдельной левой плашки, отдельного правого квадрата и SVG-стрелки `vector_8.svg`, которая на hover поворачивается.

## Changes

- Добавлен общий helper `tildaCtaLink` / `tildaCtaButton`, который генерирует Tilda-like split button structure.
- Старые CSS `::before/::after` стрелки заменены на реальный export SVG `images/tild3536-3939-4363-b163-323761323432__vector_8.svg` через mask, чтобы сохранить форму и управлять цветом.
- Hover стрелки переведен на `rotate(45deg)`, как SBS-анимация в Tilda export: из диагональной стрелки получается горизонтальная.
- Обновлены CTA в блоке `План-сценарий`, блоке `Бесплатная консультация`, contact popup, tripwire popup, success links и submit buttons.
- JS отправки форм теперь меняет текст внутри `[data-tilda-cta-label]`, не разрушая внутренние span-слои split button.
- Desktop inline CTA получили минимум `200px`, чтобы не схлопываться по тексту и совпадать с hero-button масштабом на 1200/1440 breakpoint.

## Verification

- `npm run build` - passed.
- Browser visual check `1440x900`: plan CTA, consultation CTA, contact popup links/form submit, tripwire popup submit.
- Browser mobile check `390x844`: plan CTA are `350x35`, arrow square `35x35`, no horizontal overflow.
- `npm run verify:contacts` - passed after escalated rerun because sandbox blocked local preview bind.

## Result

Кастомные CTA больше не рисуются заново CSS-бордерами. Они используют общий Tilda-like split pattern with real export arrow asset, separate left plate, separate right square and matching hover rotation.

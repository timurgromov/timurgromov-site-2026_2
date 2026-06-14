# 2026-06-14 - Scenario hero photo, kicker spacing, and footer typography

## Intent

Убрать визуальные дефекты hero `/scenario/`, подобрать более уместный фоновый кадр с Тимуром и сделать footer типографически спокойнее.

## Context

После прошлой итерации оставались три UX-претензии:

- строки `timurgromov.ru` и `Авторский материал — Тимур Громов` в hero читались слишком слитно;
- на фоне hero оставался чужой ведущий со спины;
- в footer ссылочные значения выглядели слишком декоративно и не воспринимались как спокойная классическая типографика.

## Changes

- Hero переведён с background-image на отдельный media-layer `scenario-hero__media`, чтобы можно было использовать реальное фото Тимура с CSS grayscale/brightness.
- В качестве hero-кандидата выбран `public/images/tild3133-3138-4363-b630-373733393665______421_vadim_bekk_1.jpg`:
  - профессиональный свадебный кадр;
  - Тимур в кадре;
  - достаточная ширина для desktop hero.
- Добавлен `scenario-hero__kicker` с явным gap между `timurgromov.ru` и eyebrow.
- Footer-подзаголовки и значения ссылок переведены на `Cormorant Garamond`, снят uppercase-эффект у `h3`, ослаблена декоративность.

## Verification

- `npm run build`
- Local browser check via `astro preview`:
  - `390x844`: kicker separated, hero uses new media layer, footer values `Cormorant Garamond`, overflow отсутствует
  - `1440x900`: kicker separated, hero uses new photo candidate, footer values `Cormorant Garamond`, overflow отсутствует

## Result

Страница `/scenario/` получила более уместный hero-кандидат с самим Тимуром, верхний kicker перестал слипаться, а footer стал ближе к классической, менее вычурной типографике.

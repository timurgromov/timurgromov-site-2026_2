# 2026-06-11 — mobile spacing в блоке цен

- Scope
  - [src/pages/index.astro](</Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/TimurBusinessSystem/ТГ 2026 на своем Хостинге _2/src/pages/index.astro>)

- Context
  - На мобильном viewport у вкладки `стоимость` в price-section оставалось слишком много пустого пространства внутри белой карточки и внизу record.

- Changes
  - В `priceSectionAssets` уменьшены mobile-height overrides только для record `rec862317152`:
    - высота artboard/filter/carrier снижена с `860px` до `740px`;
    - высота внутренней белой панели `1738853836587` снижена с `660px` до `560px`.
  - Те же mobile heights синхронизированы в `priceBodySource`, чтобы после build/generated HTML не было расхождения между CSS-override и трансформированным Tilda record.
  - Вкладки `что входит` и `консультация` не менялись, чтобы не рисковать клиппингом соседнего контента без запроса на редизайн.

- Verification
  - `npm run build` — passed.
  - Headless Chrome/CDP check на локальном preview:
    - mobile `390x844`: `whitespaceInsidePanel ≈ 20px`, `whitespaceInsideRecord ≈ 15px`, без клиппинга;
    - tablet `768x1024`: layout сохранён;
    - desktop `1440x900`: layout сохранён.

- Notes
  - Правка намеренно минимальная: только mobile spacing у первой price-вкладки, без перестройки Tilda records и без изменения контента.

# 2026-06-12 — mobile Safari card fix в блоке цен

- Scope
  - [src/pages/index.astro](</Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/TimurBusinessSystem/ТГ 2026 на своем Хостинге _2/src/pages/index.astro>)
  - [src/site/home-data.ts](</Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/TimurBusinessSystem/ТГ 2026 на своем Хостинге _2/src/site/home-data.ts>)

- Context
  - Предыдущий фикс уменьшал mobile-height Tilda shape, но рамка карточки оставалась отдельным absolute shape-элементом.
  - На Safari/WebKit это продолжало давать большой пустой участок внутри карточки после второй ссылки `что входит в работу`.
  - Chrome/headless measurement по HTML-контейнеру был недостаточным: он не проверял визуальный низ именно Tilda shape-рамки.

- Changes
  - На mobile для `rec862317152` скрыт старый Tilda shape `1738853836587`.
  - Старый отдельный Tilda-заголовок `1738854720285` скрыт только в первой вкладке на mobile.
  - Заголовок `Два формата под ключ` добавлен внутрь реального HTML тарифов как `.tg-price-mobile-title`.
  - Рамка, фон, радиус и padding теперь применяются к реальному content atom `1738854720290 .tn-atom`, а не к отдельному absolute shape.
  - Mobile artboard height первой вкладки скорректирован до `750px`, чтобы карточка не пересекалась со следующим блоком.

- Verification
  - `npm run build` — passed.
  - Local mobile check `393x852`:
    - old shape display: `none`;
    - old title display: `none`;
    - card border applied;
    - gap after last link inside card: about `19px`;
    - gap after card inside record: about `4px`.
  - Visual screenshot `/tmp/price-mobile-card-check.png`: карточка заканчивается сразу после второй ссылки, большой пустой участок отсутствует.

- Notes
  - Это более устойчивый фикс для WebKit/Safari, потому что рамка теперь принадлежит контенту, а не отдельному Tilda shape с ручной высотой.

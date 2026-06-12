# 2026-06-12 — plan popup без внутреннего скролла на mobile и short viewport

- Scope
  - [src/pages/index.astro](</Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/TimurBusinessSystem/ТГ 2026 на своем Хостинге _2/src/pages/index.astro>)

- Intent
  - Сделать popup `Получить сценарий` цельным и полностью адаптивным: без внутреннего скролла, без выпадающих частей и с аккуратной компоновкой на коротких и узких экранах.

- Changes
  - Для `tg-plan-popup` добавлен отдельный mobile-safe режим:
    - popup растягивается на всю доступную высоту экрана;
    - панель перестаёт быть scroll-контейнером на телефонах;
    - кнопка закрытия вынесена в абсолютное позиционирование, чтобы не съедать вертикальное место.
  - Ужаты mobile-отступы и типографика заголовка, поясняющего текста и формы.
  - Селекты в tripwire-форме на телефонах переведены в компактную двухколоночную раскладку, а последний селект растягивается на всю строку.
  - Уменьшены высоты select/textarea/button/legal-блока для коротких viewport.
  - Для очень коротких экранов добавлен отдельный `max-height` режим с ещё более плотной упаковкой popup.
  - Для desktop/short-height viewports увеличена доступная высота панели, чтобы убрать мелкий внутренний scroll на `1280x720`.

- Verification
  - `npm run build` — passed.
  - In-app Browser, local preview `http://127.0.0.1:4321/`:
    - `1280x720`: `panel.hasScroll=false`
    - `390x844`: `panel.hasScroll=false`
    - `320x568`: `panel.hasScroll=false`
  - `npm run verify:contacts` — passed.

# 2026-06-12 — fixed desktop plan popup и симметрия блока сценария

- Scope
  - [src/pages/index.astro](</Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/TimurBusinessSystem/ТГ 2026 на своем Хостинге _2/src/pages/index.astro>)

- Intent
  - Добить второй проход по блоку `План-сценарий свадебного вечера`: сделать popup цельным и фиксированным на desktop, а правую колонку списка выровнять уже от уровня заголовка, а не kicker `Бесплатно в Telegram`.

- Changes
  - Desktop popup `Получить сценарий свадьбы` перевёрстан в двухколоночную композицию:
    - слева короткий оффер;
    - справа форма;
    - панель больше не является scroll-контейнером на desktop.
  - Для popup уменьшены desktop-отступы, размер заголовка и высота формы, чтобы вся композиция стабильно помещалась в фиксированную панель.
  - Кнопка закрытия переведена в абсолютное позиционирование, чтобы не съедать вертикальное пространство внутри панели.
  - В desktop-блоке `#plan-evening` правой колонке списка `01 / 02 / 03` добавлен верхний отступ, чтобы первый пункт стартовал от уровня основного заголовка.

- Verification
  - `npm run build` — passed.
  - `npm run verify:contacts` — passed.
  - In-app Browser, local preview `http://127.0.0.1:4321/`:
    - popup `1440x900`: `hasScroll=false`, `overflowY=hidden`
    - popup `1280x720`: `hasScroll=false`, `overflowY=hidden`
    - popup `390x844`: `hasScroll=false`
    - блок `#plan-evening`: `deltaToTitle≈0.2px`, то есть первый пункт списка практически совпадает по старту с заголовком.

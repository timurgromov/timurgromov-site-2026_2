# 2026-06-12 — legal-ссылки в tripwire popup

- Scope
  - [src/pages/index.astro](</Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/TimurBusinessSystem/ТГ 2026 на своем Хостинге _2/src/pages/index.astro>)

- Intent
  - Добавить в popup `Получить сценарий свадьбы` юридические ссылки, потому что форма собирает данные пользователя и должна явно показывать policy/consent.

- Changes
  - Под кнопкой `Получить сценарий в Telegram` добавлен legal-блок.
  - В блоке используются те же ссылки, что уже стоят в форме консультации:
    - политика конфиденциальности
    - согласие на обработку персональных данных
    - условия оферты
  - Для ссылок добавлен отдельный компактный стиль внутри tripwire-формы.

- Verification
  - `npm run build` — passed.
  - `npm run verify:contacts` — passed.

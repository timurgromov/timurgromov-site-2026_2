# 2026-06-11 — consultation popup success-state

- Scope
  - [src/pages/index.astro](</Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/TimurBusinessSystem/ТГ 2026 на своем Хостинге _2/src/pages/index.astro>)

- Intent
  - Сделать понятную визуальную обратную связь после отправки формы бесплатной встречи, чтобы пользователь не оставался с незаметной строкой статуса под формой.

- Changes
  - Кнопка отправки получает loading-состояние: `Отправляем...`, disabled state и маленький spinner.
  - После успешного ответа API форма переключается в `is-sent`: поля скрываются, вместо них появляется success-карточка в стиле сайта.
  - Success-карточка использует оранжевый акцент, круглую галочку, крупный uppercase-заголовок `Заявка отправлена`, поясняющий текст и secondary-ссылку `Написать в Telegram`.
  - Popup не закрывается автоматически, чтобы пользователь успел увидеть результат.

- Verification
  - `npm run build` — passed.
  - `npm run verify:contacts` — passed after rerun with local preview permission.
  - Встроенный браузер Codex, local preview `http://127.0.0.1:4324/`, mock API на `127.0.0.1:8000`.
  - Проверены viewport: `1440x900`, `390x844`, `768x1024`.
  - Browser console errors после проверки: none.

- Result
  - После успешной отправки пользователь видит явное подтверждение внутри правой карточки popup, без системной зеленой плашки и без автозакрытия.

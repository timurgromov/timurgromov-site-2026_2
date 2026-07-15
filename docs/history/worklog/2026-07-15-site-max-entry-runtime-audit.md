# Site to MAX entry runtime audit

## Intent

Повторно проверить production-вход `сайт -> popup сценария -> MAX` перед чистым пользовательским прогоном и устранить обнаруженные ошибки страницы.

## Context

Popup и обе deep link-кнопки работали, но при загрузке production-страницы Chrome фиксировал два `ReferenceError: t396_allgroups__renderView is not defined`. Экспортированные NLM-слайдеры вызывали T396-перерасчёт через 100 мс, пока локальный `tilda-zero-1.1.min.js` ещё загружался с `async`.

## Changes

- `tilda-zero-1.1.min.js` сделан синхронным только на главной странице, чтобы T396 core гарантированно существовал до выполнения inline-скриптов body.
- `scripts/check-contact-layout.mjs` теперь собирает `Runtime.exceptionThrown` через Chrome DevTools Protocol и завершает проверку ошибкой при любом необработанном исключении.

## Verification

- `npm run verify:contacts` — passed.
- Проверены размеры `1911x1064`, `1440x900`, `390x844`.
- Проверены hero popup, Telegram/MAX `site_plan`, footer/contact Telegram/MAX `site_meeting`, аналитические атрибуты и отсутствие uncaught runtime exceptions.

## Result

Сайт готов к чистому live-прогону MAX-воронки без выявленной JavaScript-гонки T396.

## Risks / Follow-up

Фактический `bot_started` и ответы на inline-кнопки MAX проверяются только реальным действием пользователя в клиенте MAX; браузерный тест не подменяет webhook.

## Links

- Production: `https://timurgromov.ru/`
- MAX `site_plan`: `https://max.ru/id615491029963_bot?start=site_plan`

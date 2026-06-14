# 2026-06-14 - Scenario bot-first popup correction

## Intent

Исправить ошибочную итерацию CTA/popup, которая дала пользователю прямой путь к странице `/scenario/` без входа в Telegram-бот.

## Context

Страница `/scenario/` является финальным материалом после bot-flow `site_plan`, а не открытым CTA с главной. Прямая ссылка `Посмотреть страницу сценария` нарушала exchange-of-contact логику: человек мог получить tripwire без старта бота и без Telegram identity.

## Changes

- Удалена прямая ссылка на `/scenario/` из CTA-блока сценария на главной.
- Удалены нижние proof-карточки под кнопками CTA-блока.
- Hero popup `Получить сценарий` оставлен с единственным действием: переходом в Telegram-бота `site_plan`.
- Фон popup заменён с изображения страницы сценария сначала на hero-фото, а затем уточнён на отдельный чёрно-белый портрет Тимура из site assets `public/images/tild6461-3464-4935-b237-653233383933__image_1_1.jpg`.
- Popup уменьшен по ширине, типографике и внутренним отступам.
- На mobile фотосекция popup скрыта, чтобы popup не раздувался и не вылезал за viewport.
- `CURRENT_STATE.md` и `DECISIONS.md` обновлены: прямой CTA на `/scenario/` с главной запрещён.

## Verification

- `npm run build`
- `git diff --check`
- local browser check:
  - `1440x900`: CTA заголовок в одну строку, popup `840x373`, внутри viewport, единственный link ведёт в Telegram `site_plan`
  - `1366x768`: горизонтального overflow нет, popup внутри viewport
  - `1984x1046`: CTA заголовок в одну строку, popup внутри viewport
  - `768x1024`: горизонтального overflow нет, popup внутри viewport
  - `390x844`: горизонтального overflow нет, mobile popup внутри viewport, preview-photo hidden
  - `375x667`: горизонтального overflow нет, mobile popup внутри viewport, preview-photo hidden
- local built HTML grep: нет `Посмотреть страницу`, `tg-plan-cta__proof`, `scenarioPageUrl`, `scenario-hero` в `dist/index.html`

Residual note: во время смены viewport в тестовом браузере один раз появился legacy Tilda resize console error из `tilda-zero-1.1.min.js`; геометрия CTA/popup и основной flow не заблокированы.

## Result

Главная страница возвращена к bot-first логике: материал раскрывается после Telegram bot-flow, а не через открытый shortcut на сайте.

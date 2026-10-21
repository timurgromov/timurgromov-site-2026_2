# Agent Rules For This Site

Этот проект - Tilda export внутри Astro. Перед любыми визуальными правками работай по реальным файлам, не по памяти.

## Required project router

Перед любой UI, content-page, CTA, responsive, deploy или release задачей прочитай релевантные разделы `docs/AGENT_SITE_WORKFLOW.md` и указанные там source-of-truth docs. Production: `https://timurgromov.ru/`; GitHub Pages — fallback. Главная — Tilda export внутри Astro, новые статьи — native Astro. Для изменений сайта обязательны project checks, commit/push и fresh production verification из site workflow.

## Model Routing

Перед существенной задачей: `Model note: <model>/<effort> — <причина>`.
Это рекомендация, не stop-gate; `Роутинг сначала:` — только оценка без tools.
Luna/Низкий — docs/поиск; Spark/Средний — простой UI; Terra/Средний — обычный
код; Sol/Высокий — production, данные, security, сложный debug/deploy. Если
модели нет, выбирай эквивалент. `Очень высокий` — только неизвестный высокий
blast radius, необратимый data/finance cutover или live auth/security incident;
после безопасного разделения понижай до `Высокого`. Сами слова
production/deploy/database не основание; при экономии выбирай дешевле.

<!-- ruslan-project-workflows:start -->
## Reusable workflow router

Version: 0.1.4

Root `AGENTS.md` хранит policy/router; scoped `AGENTS.md` — только domain rules.
Используй релевантные `ruslan-project-workflows:<skill-name>`; без plugin —
`skills/<skill-name>/SKILL.md`. Optional skills не копируй в каждый root.

Task ledger v1.0: root `TASKS.md` — единственный canonical active backlog.
Запрос добавить/обновить задачи означает reconcile всего файла, не append:
сверь repo, current state и worklog; подтверждённо выполненное убери из active,
значимый результат запиши в один worklog; obsolete удали, дубли объедини,
unknown оставь как `needs verification`; новые пункты вставь по priority/
dependency с acceptance criteria. Не создавай `TASKS-*`, `TASKS_*`, `TODO`,
`BACKLOG`, `ROADMAP` или phase-plan без явного запроса owner; одобренный
отдельный план свяжи из `TASKS.md`.

UI route: `product-design-ux`; затем по задаче `design-atlas`/`frontend-design`/
`web-interface-guidelines`; новый admin/CRM/dashboard без direction —
`ui-ux-pro-max`. Existing Hero/slider/crop visible delta — `ui-change-proof`
with rendered exact-diff evidence; responsive —
`frontend-responsive-layout-audit` + `responsive-qa-gate`; acceptance —
`web-ui-verify`. Не мигрируй static/vanilla ради 21st/React/Tailwind.
Только в React+Tailwind/shadcn 21st MCP/`21st-ai` допустим после brief при
`get_usage.aiGenerationEnabled=true`; generated HTML не production code.

Browser lifecycle v1.1: research делай через filesystem/task tools/web-search.
Для UI QA сначала используй открытый встроенный browser Codex; отдельный browser — один
bounded-сеанс без user profile. Сразу закрой созданные agent browser/dev-server/
QA-container, включая путь ошибки; обычный Chrome пользователя не закрывай.

Telegram access v1.0: до blocker проверь открытые авторизованные Telegram Desktop
и Telegram Web;
сбой одной поверхности не доказывает отсутствие доступа. Не проси screenshots,
не открывай посторонние чаты и не сохраняй session/personal data.

Для нового/заменённого site photo/video используй `media-asset-optimization`.
Original не web-ready до delivery-derivative и audit. Warn: image >500 KiB
(hero >800 KiB), video >5 MiB desktop/>2.5 MiB mobile; >=10 MiB —
stop-and-review. До integration/commit/release дай verdict `ready`, `needs
compression or derivative` или `owner decision needed`; в handoff назови
warnings/stop-and-review либо чистый audit.

В release/status разделяй feature/local/origin и live commit каждой поверхности;
docs/tests могут быть `non_runtime_ahead`. Не трогай чужие untracked файлы;
secrets, конфликты и unknown runtime-files блокируют release. Runtime asset
обязан быть tracked в том же commit. До «готово/опубликовано» нужны local checks,
exact pushed commit, successful deploy и fresh live-check изменённого flow/assets.
<!-- ruslan-project-workflows:end -->

## Telegram/MAX Live Verification

Для любой задачи, которая создаёт, изменяет, тестирует или ревьюит Telegram/MAX bot, channel, group, deep link, Mini App, WebApp, messenger CTA или support/admin flow, обязательно используй global skill `ruslan-project-workflows:telegram-surface-verify`; если personal plugin недоступен, используй локальный fallback `skills/telegram-surface-verify/SKILL.md`.

Не считай messenger UX/flow проверенным без живой авторизованной сессии и реального прохождения пользовательских шагов. Если доступа к Telegram/MAX нет, назови это конкретным blocker и не заявляй, что flow проверен.

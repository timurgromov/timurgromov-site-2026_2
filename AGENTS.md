# Agent Rules For This Site

Этот проект - Tilda export внутри Astro. Перед любыми визуальными правками работай по реальным файлам, не по памяти.

## Startup

Каждый новый чат/агент сначала читает:

1. `docs/quick-edit-playbook.md`
2. `docs/tilda-zero-editing.md`
3. `docs/rebuild-workflow.md`
4. `docs/source-of-truth.md`
5. `docs/do-not-break-this-site.md`
6. `docs/video-link-registry.md` для любых задач с видео/Safari/VPS
7. `docs/github-pages-deploy.md` перед deploy/push-проверкой
8. `docs/history/README.md`
9. `docs/history/CURRENT_STATE.md`
10. последние 3-5 записей из `docs/history/worklog/`
11. `docs/history/DECISIONS.md`, если задача затрагивает UX, воронку, архитектуру, deploy или качество

Важно: основной публичный сайт должен открываться на:
`https://timurgromov.ru/`.
GitHub Pages URL `https://timurgromov.github.io/timurgromov-site-2026_2/` остаётся техническим fallback / deploy-preview. Если есть расхождение, production-проверку делать по `timurgromov.ru`, а `github.io` использовать как резервную точку сверки.

## Project Memory

Проект ведёт наследуемую память в `docs/history/`. Это не замена git и не стенограмма чатов. Git отвечает на вопрос "что изменилось в файлах", project memory отвечает на вопрос "зачем, что проверили, какой результат и что нельзя забыть".

Перед крупной задачей или в новом чате агент обязан прочитать:

1. `docs/history/README.md`
2. `docs/history/CURRENT_STATE.md`
3. последние 3-5 записей из `docs/history/worklog/`
4. `docs/history/DECISIONS.md`, если задача затрагивает архитектуру, UX, API, данные, production, платежи, AI/runtime, безопасность или качество

После каждого завершённого meaningful change агент обязан добавить или обновить запись в `docs/history/worklog/`.

Meaningful change - это:

- изменение кода, UX, API, данных или инфраструктуры
- deploy/release
- важное расследование
- исправление production-инцидента
- изменение правил проекта
- решение, которое может повлиять на будущие правки

Если принято, отменено или переоценено важное правило проекта, агент обязан обновить `docs/history/DECISIONS.md`.

Если изменился текущий handoff проекта, агент обязан обновить `docs/history/CURRENT_STATE.md`.

## Tilda Zero Rule

- Главная страница собирается из `files/page62008353body.html` через `src/pages/index.astro`.
- Zero Block элементы нельзя двигать runtime-скриптом после загрузки. Это вызывает "плавание".
- Новые элементы в Tilda-блоках должны получать Tilda-like атрибуты `data-field-*` и CSS по тем же брейкпоинтам, что соседние элементы.
- Перед сдвигом кнопки, текста или ссылки сначала найди родной `rec...` и соседний `data-elem-id`.
- Не правь "на глаз" только один viewport. Для контактов проверяй минимум desktop 1911x1064, 1440x900 и mobile 390x844.
- Для мелких правок сначала используй карту ID из `docs/quick-edit-playbook.md`, а не раскапывай export заново.

## Required Checks

Для любых правок контактов, popup/menu, телефона, Telegram/MAX, footer:

```bash
npm run verify:contacts
```

Важно для Codex sandbox: `npm run verify:contacts` поднимает локальный `astro preview` и headless Chrome. В managed sandbox обычный запуск часто падает с `listen EPERM ... 127.0.0.1:<port>` или запретом `ps`. Это не ошибка сайта. Если команда нужна для задачи, запускай её сразу с escalated permissions; не делай сначала заведомо падающий sandbox-прогон.

Для обычных визуальных правок:

```bash
npm run build
```

Visual Proof Rule:

- Для мелких визуальных правок не вводить железное обязательство каждый раз самому делать live visual-check. Базовый режим: `build`, deploy-check, ссылка владельцу на live.
- Самостоятельный visual-check обязателен в основном для UX-рискованных зон: контакты, popup/menu, footer, формы, hero, видео, якоря, сложная геометрия и адаптив, который легко ломается.
- Если владелец прямо просит `проверь на экранах`, `посмотри сам`, `сверь по скрину`, тогда visual-check обязателен.
- Если visual-check обязателен, default surface для него — именно Browser / in-app browser Codex на реальной странице. Не начинать с обходных headless-скриншотов, MCP-цепочек или внешних браузерных костылей, если ту же проверку можно быстрее сделать прямо в браузере Codex.
- Headless-скриншоты, `verify:*` и другие автоматические проверки — это fallback и доп. доказательство, а не замена живой UX-проверке в браузере Codex для субъективных визуальных задач.
- Если visual-check не делался, нельзя подавать субъективный эффект как подтвержденный факт. В ответе нужно честно разделять: `деплой подтвержден`, `визуальный эффект должен проверить владелец` или дать numeric before/after.
- `npm run build` для site-task - это только локальный preflight, а не точка остановки. Если пользователь не попросил явно остановиться до публикации, агент обязан доводить правку до `commit -> push -> production/live-check` в том же проходе.

Если запускались `npm run preview`, headless Chrome, Playwright или browser automation, после проверки обязательно остановить их и проверить, что хвостов нет:

```bash
ps aux | egrep "headless|remote-debugging-port|astro preview|npm run preview" | grep -v egrep
```

В Codex sandbox эту cleanup-команду тоже может потребоваться запускать с escalated permissions, потому что чтение списка процессов может быть запрещено.

Обычный Chrome пользователя не закрывать, если он прямо не попросил.

## Git / Deploy

- Коммитить только кодовые файлы и документацию.
- Не коммитить временные PNG-скриншоты.
- Не коммитить пароли, токены, приватные ключи и VPS-секреты. В документации можно хранить IP, пользователя, контейнеры, пути и команды, но не пароль.
- После успешной проверки: commit -> push именно в `main` -> дождаться автодеплоя в `gh-pages` -> проверить опубликованную production-страницу `https://timurgromov.ru/` и при необходимости fallback `github.io`.
- Важно для Codex sandbox: production/live-check команды, которые ходят во внешнюю сеть (`npm run verify:pages`, `git ls-remote`, `curl https://timurgromov.ru/...`, `curl https://timurgromov.github.io/...`, проверки GitHub/Pages), запускать сразу с `sandbox_permissions=require_escalated`. Не делай предварительный sandbox-прогон ради проверки DNS: в managed sandbox он часто падает `Could not resolve host` и только тратит время. Это правило не относится к локальным проверкам вроде `npm run build` и `git diff --check`.
- В ответах по site-task агент обязан явно маркировать статус отдельными шагами: `локально изменено`, `commit`, `push`, `production/live-check`. Формулировки `сделано`, `готово`, `исправил` допустимы только после live-подтверждения production.
- Запрещено завершать site-task на статусе `локально изменено`, если пользователь не просил оставить правку локально, не просил только план/идею и не остановил работу сам. Параллельная работа другого чата сама по себе не является основанием остановиться до push.
- Для визуальных задач про “меньше / аккуратнее / как раньше / ближе к старому дизайну” live-деплой не равен визуальному подтверждению. Если агент сам не делал visual-check, это нужно прямо проговорить в финале, а не выдавать за полностью подтвержденный результат.
- Пуш в рабочую ветку (`pushable-scaffold` и любые другие) не считается публикацией сайта. Если задача про живой сайт, финальный шаг обязан обновить `origin/main`.
- Автодеплой уже настроен: `.github/workflows/deploy-gh-pages.yml` собирает Astro и пушит `dist/` в `gh-pages` после каждого push в `main`.
- Отдельный `.github/workflows/code-health.yml` запускает `npm ci` и `npm run build` на pull request и runtime-relevant push в `main`; он read-only, не деплоит сайт и не использует production secrets.
- После push в `main` проверять публикацию командой `npm run verify:pages -- --contains "ожидаемый текст" --absent "старый текст"` или эквивалентной live-проверкой URL.

## Existing Design Reuse Rule

Для любого заметного UI-изменения сначала прочитай
`docs/EXISTING_DESIGN_REUSE_RULE.md`: правило copy-first, canonical CTA и
обязательный source паттерна сохраняются там целиком.

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
## Reusable skills, media and release state

Root `AGENTS.md` хранит global policy/router; scoped `AGENTS.md` наследуют его и
содержат только domain rules. Используй только релевантные
`ruslan-project-workflows:<skill-name>`; без plugin — `skills/<skill-name>/SKILL.md`.
Новые optional skills остаются в plugin-каталоге, не копируются в каждый root.
UI: `product-design-ux` до первого flow (P0 user/job, flow, CTA, states и
viewport constraints в `PROJECT_SPEC.md`/`UX.md`), затем по риску
`frontend-design`/`web-interface-guidelines`; visible delta — `ui-change-proof`
with rendered exact-diff evidence; responsive — `frontend-responsive-layout-audit`;
acceptance — `web-ui-verify`.
Это не блокирует docs-only, backend-only или узкий incident repair.

Перед добавлением site photo/video используй `media-asset-optimization`: original
не клади в public, публикуй AVIF/WebP derivative и responsive sizes. Warn: image
>500 KiB (hero >800 KiB), video >5 MiB desktop/>2.5 MiB mobile; >=10 MiB —
stop-and-review. Inline video: MP4/WebM, максимум 1080p/30 fps, poster и lazy
loading; длинное видео — streaming/embed.

В release/status разделяй feature/local/origin и live commit каждой поверхности:
backend passport не доказывает frontend; docs/tests могут быть
`non_runtime_ahead`, unknown path — fail-closed. Не трогай чужие untracked
файлы; secrets, конфликты и unknown runtime-files блокируют release.
<!-- ruslan-project-workflows:end -->

## Telegram/MAX Live Verification

Для любой задачи, которая создаёт, изменяет, тестирует или ревьюит Telegram/MAX bot, channel, group, deep link, Mini App, WebApp, messenger CTA или support/admin flow, обязательно используй global skill `ruslan-project-workflows:telegram-surface-verify`; если personal plugin недоступен, используй локальный fallback `skills/telegram-surface-verify/SKILL.md`.

Не считай messenger UX/flow проверенным без живой авторизованной сессии и реального прохождения пользовательских шагов. Если доступа к Telegram/MAX нет, назови это конкретным blocker и не заявляй, что flow проверен.

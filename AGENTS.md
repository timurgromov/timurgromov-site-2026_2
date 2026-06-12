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

Для обычных визуальных правок:

```bash
npm run build
```

Visual Proof Rule:

- Если задача сформулирована как `сделай как раньше`, `уменьши`, `аккуратнее`, `слишком громоздко`, `не похоже на старый дизайн`, `как на скрине`, одного `build` и marker-check недостаточно.
- В таких задачах нельзя писать, что все готово, пока не выполнено одно из двух:
  1. есть визуальная проверка опубликованной страницы в том же viewport, где пользователь оценивает блок;
  2. в ответе явно приведены точные before/after значения размеров, padding, gap, font-size и отдельно сказано, что эффект может быть subtle.
- Если правка спорная по восприятию, приоритет у live-визуальной проверки, а не у текстового подтверждения деплоя.

Если запускались `npm run preview`, headless Chrome, Playwright или browser automation, после проверки обязательно остановить их и проверить, что хвостов нет:

```bash
ps aux | egrep "headless|remote-debugging-port|astro preview|npm run preview" | grep -v egrep
```

Обычный Chrome пользователя не закрывать, если он прямо не попросил.

## Git / Deploy

- Коммитить только кодовые файлы и документацию.
- Не коммитить временные PNG-скриншоты.
- Не коммитить пароли, токены, приватные ключи и VPS-секреты. В документации можно хранить IP, пользователя, контейнеры, пути и команды, но не пароль.
- После успешной проверки: commit -> push именно в `main` -> дождаться автодеплоя в `gh-pages` -> проверить опубликованную production-страницу `https://timurgromov.ru/` и при необходимости fallback `github.io`.
- Для визуальных задач про “меньше / аккуратнее / как раньше / ближе к старому дизайну” live-деплой не считается подтверждением сам по себе: после push нужен либо визуальный proof, либо явное numeric before/after disclosure.
- Пуш в рабочую ветку (`pushable-scaffold` и любые другие) не считается публикацией сайта. Если задача про живой сайт, финальный шаг обязан обновить `origin/main`.
- Автодеплой уже настроен: `.github/workflows/deploy-gh-pages.yml` собирает Astro и пушит `dist/` в `gh-pages` после каждого push в `main`.
- После push в `main` проверять публикацию командой `npm run verify:pages -- --contains "ожидаемый текст" --absent "старый текст"` или эквивалентной live-проверкой URL.

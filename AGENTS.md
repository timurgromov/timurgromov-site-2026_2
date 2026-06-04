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

Важно: основной публичный сайт должен открываться на:
`https://timurgromov.ru/`.
GitHub Pages URL `https://timurgromov.github.io/timurgromov-site-2026_2/` остаётся техническим fallback / deploy-preview. Если есть расхождение, production-проверку делать по `timurgromov.ru`, а `github.io` использовать как резервную точку сверки.

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
- Пуш в рабочую ветку (`pushable-scaffold` и любые другие) не считается публикацией сайта. Если задача про живой сайт, финальный шаг обязан обновить `origin/main`.
- Автодеплой уже настроен: `.github/workflows/deploy-gh-pages.yml` собирает Astro и пушит `dist/` в `gh-pages` после каждого push в `main`.
- После push в `main` проверять публикацию командой `npm run verify:pages -- --contains "ожидаемый текст" --absent "старый текст"` или эквивалентной live-проверкой URL.

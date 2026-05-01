# Agent Rules For This Site

Этот проект - Tilda export внутри Astro. Перед любыми визуальными правками работай по реальным файлам, не по памяти.

## Startup

Каждый новый чат/агент сначала читает:

1. `docs/rebuild-workflow.md`
2. `docs/tilda-zero-editing.md`
3. `docs/source-of-truth.md`
4. `docs/github-pages-deploy.md` перед deploy/push-проверкой

## Tilda Zero Rule

- Главная страница собирается из `files/page62008353body.html` через `src/pages/index.astro`.
- Zero Block элементы нельзя двигать runtime-скриптом после загрузки. Это вызывает "плавание".
- Новые элементы в Tilda-блоках должны получать Tilda-like атрибуты `data-field-*` и CSS по тем же брейкпоинтам, что соседние элементы.
- Перед сдвигом кнопки, текста или ссылки сначала найди родной `rec...` и соседний `data-elem-id`.
- Не правь "на глаз" только один viewport. Проверяй минимум desktop 1911x1064 и 1440x900.

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
- После успешной проверки: commit -> push в `main` -> проверить опубликованную GitHub Pages страницу.

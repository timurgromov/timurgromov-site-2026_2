# GitHub + GitHub Pages: как обновлять сайт

Документ для людей и агентов: один каноничный сценарий.

## 0. Главное (автоматика)

После **каждого успешного push в ветку `main`** GitHub Actions запускает workflow **`.github/workflows/deploy-gh-pages.yml`**: `npm ci` → `npm run build` → содержимое **`dist/`** пушится в ветку **`gh-pages`**.

Тебе и агенту **не нужно вручную** вызывать `npx gh-pages` в нормальном режиме — достаточно **закоммитить и запушить `main`**.

Ручной деплой — только запасной вариант (CI упал, Actions отключены, форс-обновить без коммита): см. §6.

## 1. Что где лежит

| Что | Где в GitHub | Зачем |
|-----|----------------|------|
| Исходники Astro (`src/`, `public/`, конфиги) | ветка **`main`** | разработка, история |
| Собранный статический сайт | ветка **`gh-pages`** | отдаёт **GitHub Pages** (источник — ветка, не «GitHub Actions» в настройках Pages) |
| Папка `dist/` локально | **не в git** (`.gitignore`) | появляется после `npm run build` |

Превью-URL (с учётом `base` в `astro.config.mjs`):

`https://timurgromov.github.io/timurgromov-site-2026_2/`

**Settings → Pages:** источник публикации — **Deploy from a branch** → **Branch: `gh-pages`**, folder **`/` (root)**. Менять на «GitHub Actions» не нужно: workflow сам обновляет ветку `gh-pages`.

## 2. Обычный цикл работы

1. Правки в коде.
2. Локально по желанию: `ASTRO_TELEMETRY_DISABLED=1 npm run build` (проверка перед пушем).
3. `git add` / `git commit` / **`git push` в `main`** (через обычный git по HTTPS — см. §4).
4. На GitHub открыть вкладку **Actions** — дождаться зелёного прогона **Deploy to gh-pages**.
5. Через 1–3 минуты проверить live URL (при необходимости жёсткое обновление / инкогнито).

## 3. Первое появление workflow в репозитории

Файл **`.github/workflows/deploy-gh-pages.yml`** GitHub иногда принимает только при пуше с токеном, у которого есть scope **`workflow`** (или файл можно один раз **создать/вставить через веб-интерфейс** репозитория). После того как workflow уже в `main`, обычного **`repo`** для дальнейших пушей кода достаточно.

## 4. Аутентификация git (только `main`)

- Пуш исходников: **терминал** + `git push`, не «Connector» без прав записи.
- `git remote -v` → `https://github.com/timurgromov/timurgromov-site-2026_2.git` (или актуальный URL).
- Username + **PAT** (`repo`); на macOS часто сохранено в **Keychain**.

Пуш в **`gh-pages` с локальной машины не обязателен** — этим занимается Actions через `GITHUB_TOKEN`.

## 5. Если Actions не сработал

- **Actions** в репозитории отключены (Settings → Actions → разрешить).
- Ошибка в workflow (лог job в Actions).
- Лимиты / очередь GitHub (редко).

## 6. Ручной запасной деплой (без CI)

Из корня репозитория:

```bash
npm run deploy:pages
```

Это делает `astro build` и `npx gh-pages -d dist -b gh-pages` (нужны локальные git-креды, как для обычного push).

Эквивалент вручную:

```bash
ASTRO_TELEMETRY_DISABLED=1 npm run build
npx --yes gh-pages -d dist -b gh-pages
```

## 7. Частые ошибки

1. **Смотришь на сайт, а изменений нет** — не дождался Actions или кеш браузера; открой вкладку Actions.
2. **Сломанные пути к картинкам на Pages** — в Astro заданы `site` и **`base`**; пути из `public/` собирать с учётом base (в проекте — `asset()` в `index.astro`).
3. **`Could not resolve host: github.com`** — сеть на машине; push/CI не обновили репо.
4. **Workflow не попал в репозиторий** — см. §3 (scope `workflow` или создание файла на GitHub).

## 8. Опциональная ветка `gh-pages-source`

Если она есть в remote — отдельный договорённый процесс. Для **публичного сайта** по-прежнему канонична ветка **`gh-pages`** с билдом (её обновляет workflow).

## 9. Шпаргалка

**Нормально:** правки → commit → **`git push origin main`** → ждать Actions.

**Запас:** `npm run deploy:pages`.

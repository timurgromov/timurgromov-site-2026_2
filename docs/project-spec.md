# Project Spec

## 1. Project
- Domain: `https://timurgromov.ru/`
- Repository preview URL: `https://timurgromov.github.io/timurgromov-site-2026_2/`
- Goal: быстро и точно перенести одностраничный лендинг с Tilda на простой статический стек на базе Astro.

## 2. Primary Goal
Восстановить оригинальный лендинг максимально близко к export и живому сайту:
- без редизайна;
- без новых секций;
- без лишней архитектуры;
- с минимальным JavaScript;
- как статический сайт.

## 3. Stack
- Framework: `Astro`
- Rendering mode: static
- Deployment target: `GitHub Pages`
- Source assets: Tilda export в текущем репозитории

## 4. Source Of Truth
Главные источники:
1. `page62008353.html`
2. `files/page62008353body.html`
3. `https://timurgromov.ru/`
4. экспортированные `images/`, `css/`, `js/`
5. скриншоты оригинала

## 5. Hard Rules
- Не делать новый дизайн.
- Не менять порядок секций.
- Не придумывать тексты, CTA, цены, отзывы, кейсы и FAQ.
- Не перескакивать между секциями.
- Идти только сверху вниз.
- Видео и формы подключать только в последней фазе.

## 6. Section Order
1. global styles
2. header
3. hero
4. about
5. как я веду
6. полезности
7. price
8. cases
9. contacts
10. popup/menu overlay
11. video
12. forms

## 7. Current Phase
Сделано: Astro-каркас, GitHub Pages (ветка `gh-pages` при необходимости), global styles, header, hero, полный `about`.

В работе: секция `как я веду` (`rec861547217`) уже перенесена в `src/pages/index.astro`, дальше нужна обычная сверка с export/live и затем переход к следующему блоку.

Важно: `about` в export состоит не из одного блока, а как минимум из `rec861444942` и следующего видимого подблока `rec861496085` c popup `about-timur`.

Дальше по порядку после проверки `как я веду`: `полезности`, затем остальные по списку в §6.

## 8. Verification Rule
После каждого значимого шага:
1. сверять результат с export;
2. сверять с живым сайтом;
3. запускать `build`;
4. commit;
5. push исходников в `main`;
6. после push в `main` дождаться Actions (деплой в `gh-pages` автоматически), затем проверить GitHub Pages (`docs/github-pages-deploy.md`).

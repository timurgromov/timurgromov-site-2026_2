# Project Spec

## 1. Project
- Current public URL: `https://timurgromov.ru/`
- GitHub Pages fallback URL: `https://timurgromov.github.io/timurgromov-site-2026_2/`
- Original/Tilda reference: historical pre-migration state on the same domain
- Goal: поддерживать одностраничный лендинг из Tilda export внутри Astro, не ломая Zero Block геометрию, popups и Safari video fixes.
- Media migration runbook: `docs/video-link-registry.md` -> "Emergency VPS Migration Runbook".

`timurgromov.ru` — production-домен этого репозитория. `github.io` оставлен как резервный publish URL и удобная точка для отладки Pages, если DNS/HTTPS ещё расходятся.

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
- Active media host: VPS/Caddy at `https://media.89-22-227-133.sslip.io`
- Active media files path on VPS: `/srv/tg26-video/public`
- Active media container: `tg26-video-caddy`

## 4. Source Of Truth
Главные источники:
1. `src/pages/index.astro`
2. `files/page62008353body.html`
3. `page62008353.html`
4. опубликованный production-сайт `https://timurgromov.ru/`
5. GitHub Pages fallback `https://timurgromov.github.io/timurgromov-site-2026_2/`
6. экспортированные `images/`, `css/`, `js/`
7. скриншоты оригинала

## 5. Hard Rules
- Не делать новый дизайн.
- Не менять порядок секций.
- Не придумывать тексты, CTA, цены, отзывы, кейсы и FAQ.
- Не ломать production-домен `timurgromov.ru` DNS- или Pages-правками без проверки.
- Не откатывать видео на Boomstream, Cloud.ru или Tilda/Annex без прямого решения пользователя.
- Не коммитить VPS-пароли, токены и приватные ключи.

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
Сделано: Astro-каркас, GitHub Pages с каноническим deploy через ветку `gh-pages`, отдельный read-only code-health workflow для PR/main, полный Tilda export в репозитории.

Текущий режим работы: главная страница собирается из `files/page62008353body.html` через `src/pages/index.astro`, поверх export добавлены точечные правки для hero, cases, contacts, popup hooks и видео.

Важно:
- Zero Block элементы не двигать runtime-скриптами после загрузки;
- video/Safari слой уже стабилизирован через native video + VPS media;
- legacy Tilda/Annex video records оставлены скрытыми, чтобы не было двух конкурирующих плееров;
- подробности по видео: `docs/video-link-registry.md` и `docs/do-not-break-this-site.md`.

Ближайший шаг для любых новых правок: читать реальные файлы, менять минимально, собирать, пушить и проверять GitHub Pages.

## 8. Verification Rule
После каждого значимого шага:
1. сверять результат с export;
2. сверять с живым сайтом;
3. запускать `build`;
4. commit;
5. push исходников в `main`;
6. после push в `main` дождаться Actions (деплой в `gh-pages` автоматически), затем проверить GitHub Pages (`docs/github-pages-deploy.md`).

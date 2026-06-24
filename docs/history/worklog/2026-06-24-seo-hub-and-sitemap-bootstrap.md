# 2026-06-24 - SEO hub and sitemap bootstrap

## Context

Нужно было начать реальную SEO-имплементацию без вмешательства в главную Tilda-лендинговую воронку.

## Changes

- Добавлен чистый Astro-route `src/pages/articles/index.astro`.
- Новый `/articles/` работает как hub для экспертных материалов и не трогает `src/pages/index.astro`.
- В hub добавлены:
  - canonical/meta/OG;
  - `BreadcrumbList` schema;
  - `CollectionPage` schema;
  - ссылка на уже опубликованный материал `/scenario/`;
  - блок следующих тем как план следующего контентного кластера.
- Обновлен `public/sitemap.xml`: добавлены `/scenario/` и `/articles/`.
- Обновлен `docs/history/CURRENT_STATE.md` под новый SEO-слой.

## Verification

- Плановая локальная проверка: `npm run build`.

## Result

Сайт получил первый отдельный SEO-hub внутри того же домена, не затрагивая hero CTA, popup-входы и основную bot-first воронку главной страницы.

## Risks

- Hub сам по себе не даст трафик без публикации следующих страниц и отправки sitemap в Search Console / Яндекс.Вебмастер.
- Для измерения SEO-эффекта дальше нужно добавить source tracking и baseline-отчётность вне этого репозитория.

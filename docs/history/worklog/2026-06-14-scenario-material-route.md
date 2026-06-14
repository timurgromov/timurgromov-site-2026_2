# 2026-06-14 - Scenario material moved to dedicated site route

## Intent

Развернуть страницу `Сценарий свадебного вечера` из Lovable как production-материал для bot-first воронки, не создавая отдельный deploy-контур.

## Context

После квалификации `site_plan` бот выдаёт tracked redirect `/api/v1/site/plan-material`. Раньше конечный material URL указывал на главную страницу сайта, что не соответствовало новому отдельному материалу.

## Changes

- Добавлен новый route `src/pages/scenario.astro` с отдельной страницей материала.
- В `public/images/` добавлен `scenario-hero.jpg` для hero-блока страницы.
- `CURRENT_STATE.md` и `DECISIONS.md` обновлены: ownership страницы закреплён за сайтом, конечный production-route — `/scenario/`.

## Verification

- `npm run build`
- Browser check:
  - desktop preview `1280x720`: страница открывается, hero/CTA/footer рендерятся, console errors нет
  - mobile preview `390x844`: переполнения по ширине нет, hero и старт статьи читаемы, console errors нет

## Result

Сайт получил отдельную production-ready страницу материала, которую можно использовать как конечную цель для tracked redirect из Telegram-бота.

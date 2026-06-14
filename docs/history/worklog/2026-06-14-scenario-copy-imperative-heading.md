# 2026-06-14 - Switch scenario CTA block heading to imperative wording

## Scope

- `src/pages/index.astro`

## Context

После ужатия оффера заголовок CTA-блока был переписан в noun form `Сценарий свадьбы`, но пользователь явно подтвердил, что в этой плашке нужен именно call to action, а не название сущности.

## Changes

- Заголовок CTA-блока изменён с `Сценарий свадьбы` на `Получить сценарий свадьбы`.
- Кнопка `Получить сценарий свадьбы` и popup-заголовок уже соответствовали этому офферу и не менялись.

## Verification

- `npm run build`
- `npm run verify:contacts`
- live-check production after push

## Result

В hero-path и в нижнем CTA-блоке теперь одна и та же императивная формулировка: `Получить сценарий свадьбы`.

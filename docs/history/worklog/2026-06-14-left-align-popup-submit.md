# 2026-06-14 - Left-align submit button in consultation popup

## Scope

- `src/pages/index.astro`

## Context

В консультационном popup кнопка `Отправить` стояла у правого края формы и визуально спорила с общей левой осью блока: заголовком, лейблами, полями и текстом согласия. Пользователь подтвердил решение прижать кнопку влево под поля формы.

## Changes

- В CSS popup-формы изменено выравнивание `tg-contact-popup__form button` с `justify-self:end` на `justify-self:start`.
- Размер кнопки и split-button geometry не менялись; изменено только положение внутри сетки формы.

## Verification

- `npm run build`
- `npm run verify:contacts`

## Result

Кнопка `Отправить` теперь привязана к той же левой оси, что и остальная форма, и композиция правой колонки стала ровнее.

# 2026-06-14 - Footer menu hover and spacing

## Scope

- `src/pages/index.astro`

## Context

В footer после добавления юридических документов меню на desktop выглядело слишком близко к legal-блоку. Дополнительно hover затемнял пункт меню при наведении на пустую область строки справа от текста, потому что Tilda text-элементы имеют широкую невидимую область и собственные `data-animate-sbs-event="hover"` атрибуты.

## Changes

- Для шести пунктов footer menu добавлена трансформация, которая снимает Tilda hover-атрибуты с исходных Zero Block элементов.
- Hover-эффект footer menu переведен с широкой `.tn-atom:hover` зоны на саму ссылку `a:hover` / `a:focus-visible`.
- На desktop `1200-1919` меню поднято на 22px, legal-блок оставлен ниже, чтобы увеличить визуальный зазор.
- На wide desktop legal-блок возвращен ближе к нижней служебной зоне подвала, рядом с ИП/реквизитами, а не над меню.
- Mobile-позиции footer menu и legal-блоков сохранены.

## Verification

- `npm run build`
- `npm run verify:contacts` - passed on `1911x1064`, `1440x900`, `390x844`
- cleanup-check for headless/preview processes - no test processes found

## Result

Footer menu hover теперь должен срабатывать только при наведении на текст ссылки. Desktop footer получил больше воздуха между навигацией и юридическими ссылками без перестройки Tilda record.

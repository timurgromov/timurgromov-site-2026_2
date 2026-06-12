# 2026-06-13 - Restore clickable MAX link in price consultation tab

## Scope

- `src/site/home-data.ts`
- `src/pages/index.astro`

## Context

Во вкладке `консультация` блока `Честно о ценах` визуально оставался CTA `Написать в MAX`, но в собранном HTML ссылка была уже потеряна. Причина оказалась не в live-сайте и не в браузере пользователя, а в нашей собственной трансформации Tilda export:

- export в `rec862336377` изначально содержал `<a href="https://clck.ru/3RRXHX">Написать в Max</a>`
- `priceTextReplacements` заменял содержимое элемента `1738855821506` строкой `Написать в MAX`
- helper `replaceTildaTextInRecord` подменял весь HTML внутри `.tn-atom`, поэтому `<a>` срезался и в `dist/index.html` оставался просто текст без `href`

Дополнительно секция использовала старые raw-links из export, поэтому Telegram внутри этого record тоже был нормализован до текущего canonical meeting deep-link.

## Changes

- для `1738855821506` в `priceTextReplacements` plain-text замена заменена на полноценный anchor markup с `maxContactUrl`
- для `rec862336377` добавлена нормализация старого Telegram URL к `telegramMeetingUrl`
- для трёх CTA в консультационном tab-record поднят `z-index` и явно включены `pointer-events`, чтобы клик не перехватывался соседним слоем

## Verification

- `npm run build`
- проверка `dist/index.html`: в `rec862336377` снова присутствует `<a href="https://clck.ru/3RRXHX"...>Написать в MAX</a>`
- проверка `dist/index.html`: Telegram в этом же record ведёт на `https://t.me/gromov_wedding_bot?start=site_meeting`

## Result

Проблема была воспроизводима и подтверждена на уровне build output: ссылка реально исчезала при сборке. После правки `MAX` во вкладке консультации снова рендерится как anchor, а не как голый текст.

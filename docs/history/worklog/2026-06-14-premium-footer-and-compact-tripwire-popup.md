# 2026-06-14 - Premium footer and compact tripwire popup

## Scope

- `src/pages/index.astro`

## Context

После правки footer menu пользователь подтвердил, что нужно сразу довести desktop footer до более дорогого ощущения. Также tripwire popup `Получить сценарий свадьбы` выглядел перегруженным: лейблы и placeholder-дубли повторяли друг друга, длинные значения в select резались, а форма воспринималась как тяжелая анкета.

## Changes

- Desktop legal-блок footer переведен в тихую горизонтальную служебную строку с меньшим размером и приглушенной прозрачностью.
- Popup-форма очищена от длинных placeholder-дублей в select.
- Роль сокращена до вариантов: `Жених`, `Невеста`, `Родители`, `Подрядчики`.
- Срок свадьбы оставлен сезонным: `Летом`, `Осенью`, `Зимой`, `Весной`, `В следующем году`, `Пока не знаем`.
- Регион сокращен до: `Москва`, `Московская область`, `Другой город`.
- `Дополнительная информация` переименована в `Комментарий`, placeholder сокращен до `Дата, площадка, формат, пожелания`.
- CTA popup сокращен до `Получить сценарий`.
- Визуальная оболочка формы облегчена: убрана внутренняя рамка-карточка, уменьшены высота select/textarea и ширина CTA.

## Verification

- `npm run build`
- `npm run verify:contacts` - passed on `1911x1064`, `1440x900`, `390x844`
- Browser visual check:
  - desktop `1440x900`: popup opens, form is compact, selected values do not truncate
  - mobile `390x844`: popup panel fits viewport, no horizontal overflow, selects are full-width and readable
- cleanup-check for preview/headless processes - no test processes found

## Result

Footer legal information reads as lower-priority service text on desktop, while the tripwire popup feels lighter and uses shorter, more concrete choices without losing CRM fields.

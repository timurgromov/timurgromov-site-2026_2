# 2026-06-12 — plan CTA без inline-формы и компактный tripwire popup

- Scope
  - [src/pages/index.astro](</Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/TimurBusinessSystem/ТГ 2026 на своем Хостинге _2/src/pages/index.astro>)
  - [docs/history/CURRENT_STATE.md](</Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/TimurBusinessSystem/ТГ 2026 на своем Хостинге _2/docs/history/CURRENT_STATE.md>)
  - [docs/history/DECISIONS.md](</Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/TimurBusinessSystem/ТГ 2026 на своем Хостинге _2/docs/history/DECISIONS.md>)

- Intent
  - Вернуть блоку `План-сценарий свадебного вечера` композицию до открытой формы и не потерять саму квалификацию перед переходом в Telegram.

- Changes
  - Из CTA-блока удалена открытая inline-tripwire-форма; секция снова состоит из оффера с кнопками слева и списка `01 / 02 / 03` справа.
  - Для `#plan-evening` возвращена более компактная desktop-композиция без отдельной form-column.
  - В popup tripwire три обязательных вопроса собраны в `tg-tripwire-form__select-grid`.
  - На desktop popup селекты стоят в один ряд, а на ширине до `959px` схлопываются обратно в столбец.
  - Подписи и placeholder'ы селектов сокращены: `Выберите роль`, `Выберите срок`, `Выберите регион`.
  - Высота select и textarea уменьшена, чтобы popup выглядел легче и занимал меньше вертикали.

- Verification
  - `npm run build` — passed.
  - In-app Browser, local preview `http://127.0.0.1:4321/`:
    - desktop `1440x900`: в `#plan-evening` `hasInlineForm=false`, блок снова двухколоночный без открытой формы;
    - desktop popup `1440x900`: `selectGridColumns="272.664px 272.664px 272.664px"`, `panelHeight=655`, высота каждого select `44px`;
    - mobile popup `390x844`: `gridColumns="300px"`, panel rect `x=12 y=34 width=366 height=798 bottom=832`, то есть popup остался внутри viewport.

- Notes
  - Tripwire-логика, endpoint `/api/v1/site/tripwire-request`, success-state и переход в Telegram не менялись.

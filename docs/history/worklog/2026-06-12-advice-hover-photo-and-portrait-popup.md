# 2026-06-12 — restored first advice hover photo and fixed portrait video popup

- Scope
  - [src/pages/index.astro](</Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/TimurBusinessSystem/ТГ 2026 на своем Хостинге _2/src/pages/index.astro>)

- Intent
  - Проверить по исходному Tilda export, был ли у первого пункта `Вот как я веду свадьбы` отдельный hover/photo preview, и вернуть его.
  - Убрать принудительный `16:9` у clean popup, чтобы вертикальные советы-видео открывались в portrait-композиции без лишней широкой рамки, особенно на mobile.

- Findings
  - В оригинальном `rec861547217` действительно были три отдельные preview-фотографии:
    - `1738821076489` → `frame_25_3.jpg`
    - `1738821438399` → `frame_23_4.jpg`
    - `1738821493602` → `frame_24_3.jpg`
  - Оригинальные Tilda popup-контейнеры для `video-sovet-1/2/3` использовали portrait-окно `382x679`, а не wide `16:9`.

- Changes
  - Добавлен desktop-state controller для `#rec861547217`:
    - по умолчанию показывается первое preview-фото;
    - для desktop активное фото переключается по hover/focus на `video-sovet-1/2/3`;
    - mobile/tablet логика не форсируется.
  - `clean-showreel-popup` переведён на реальный aspect ratio видео вместо фиксированного `16:9`.
  - Для portrait-видео popup теперь вычисляет фактическую ширину видео и сужает под неё всю карточку вместе с заголовком, чтобы не оставалось широких боковых чёрных полей.
  - В мобильной версии popup сохранён как единая фиксированная панель без body-scroll.

- Verification
  - `npm run build` — passed.
  - In-app Browser, local preview `http://127.0.0.1:4321/`:
    - desktop default state: `#rec861547217` получает класс `tg-advice-preview-1`, первое preview-фото имеет `opacity > 0`, второе и третье скрыты;
    - desktop popup `video-sovet-1`: `orientation=portrait`, `panel width ≈ video width`, лишняя wide-рамка убрана;
    - mobile `390x844`: popup остаётся в пределах viewport (`panel bottom < viewport height`), `body overflow=hidden`, video width совпадает с media width.

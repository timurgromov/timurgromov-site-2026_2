# 2026-06-09 Offer PDF link in footer

## Intent

Добавить в публичный сайт ссылку на уличную оферту (PDF), переданную клиентом.

## Context

На лендинге на уровне Tilda-футера уже есть блок с юридическим/сервисным хвостом (`rec862623921`). Нужна прямая ссылка на офертный PDF, чтобы пользователь мог загрузить документ с сайта.

## Changes

- Добавлена константа `offerPdfUrl` в `src/pages/index.astro`:
  - `const offerPdfUrl = `${basePath}svadebnyy_gid_timur_gromov.pdf`;
- В цепочке обработки `popupPhraseBodyHtml` добавлена замена блока `1739077659698` (ссылка `komarovaeee`) на связку:
  - `komarovaeee | Оферта`
  - вторая ссылка ведет на `offerPdfUrl`, открывается в новой вкладке и имеет `rel="nofollow"`.
- Скопирован файл оферты в статический каталог:
  - `public/svadebnyy_gid_timur_gromov.pdf`

## Verification

- `npm run build` — сборка успешно завершена.
- Проверка в `dist/index.html`:
  - ссылка на оферту присутствует и указывает на `/svadebnyy_gid_timur_gromov.pdf`.

## Result

Оферта добавлена в footer-блок сайта без изменения логики форм/CTA. Документ доступен как статический asset по URL `/svadebnyy_gid_timur_gromov.pdf`.

## Risks / Follow-up

- Клик-ссылка находится в той же строке, что и `komarovaeee`, поэтому визуально может быть уплотнённо; при желании можно выделить отдельной строкой в следующей итерации.
- Production на `timurgromov.ru` не обновлялся; изменения готовы для следующей сборки и деплоя.

## Links

- `src/pages/index.astro`
- `public/svadebnyy_gid_timur_gromov.pdf`

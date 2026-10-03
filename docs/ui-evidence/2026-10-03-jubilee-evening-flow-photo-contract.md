# Jubilee evening-flow photo contract

- Change ID: `2026-10-03-jubilee-evening-flow-photo`
- Requested visible change: добавить современную фотографию Тимура в существующий блок `Как проходит юбилей`.
- Canonical source: текущий `src/yubiley/components/EveningFlow.astro`; визуальный паттерн синхронизирован с корпоративным `EveningFlow` без отдельного редизайна.
- Exact target: `/yubiley/`, `#evening-flow .evening-flow__media`, после пяти этапов и до существующего CTA.
- Baseline signature: блок заканчивается пятой карточкой и сразу переходит к CTA; иллюстрации внутри блока нет.
- Expected signature: после пяти карточек появляется одна широкая фотография общения с гостями; CTA, тексты и порядок секций не меняются.
- Responsive contract: desktop использует ограниченную по высоте широкую композицию; mobile показывает исходное соотношение `3:2` без обрезки людей.
- Required viewports: `390x844`, `767x900`, `768x900`, `769x900`, `1023x820`, `1024x820`, `1025x820`, `1180x820`, `1366x768`, `1440x900`, `1984x1046`.
- Preserved: hero, текущие видео, пакеты, живая музыка, порядок работы, галерея, письма, формы, аналитика и главная страница.

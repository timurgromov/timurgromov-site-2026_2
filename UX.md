# UX — SEO-гид «Пошаговый план подготовки к свадьбе»

Updated: 2026-09-08

## Job and flow

- Product type: expert-content landing inside the public wedding-host site.
- Primary user: пара в начале самостоятельной подготовки к свадьбе, которая
  пока не понимает порядок решений.
- Primary job: получить понятный порядок действий без обязательства заказать
  ведущего или войти в бот.
- Primary flow: organic/article-hub entry → direct useful answer → relevant
  preparation sections → internal materials path → voluntary discussion with
  Timur when the couple is already choosing a host.
- Primary CTA: internal `/materials/` link, labelled as a continuation of
  preparation rather than a disguised registration.
- Secondary CTA: Telegram or MAX meeting route. It preserves the existing
  safe source protocol, plus page path and CTA context; it is never presented
  as required to read the guide.

## Page states and responsive contract

- Public state only; there is no form, popup or hidden paywall on the page.
- Desktop and wide desktop: 1120px reading shell; article prose is capped at
  760px, while a compact contents panel may occupy the companion column.
- Tablet at 900px and below: content and contents panel become one column.
- Mobile at 640px and below: 16px side gutters, full-width CTA controls,
  readable body text and no horizontal overflow.
- Required manual checks after the final edit: `390x844`, `480x900`,
  `768x1024`, `1180x820`, `1366x768`, `1440x900`, `1984x1046`; also `899/900/901`
  and `639/640/641` breakpoint probes.
- Preserved invariants: the existing homepage, its Direct CTA/protection,
  scenario route and materials route remain structurally unchanged.

## Visible release target

The former missing route becomes a calm, readable article with a direct first
answer, twelve practical stages, a short final checklist, and two non-intrusive
return paths. The primary action stays visible after useful content and is not
required to access the guide.

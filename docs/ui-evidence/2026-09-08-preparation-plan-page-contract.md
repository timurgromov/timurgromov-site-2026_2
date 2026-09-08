# UI change contract

- Change ID: `2026-09-08-preparation-plan-page`
- Requested visible change: publish an open, readable «Пошаговый план
  подготовки к свадьбе» page so Timur can inspect it on desktop and mobile.
- Surface: `/articles/plan-podgotovki-k-svadbe/`
- User state / fixture: public anonymous visitor; no bot, form or account state.
- Exact target: `[data-testid="preparation-plan-article"]` and its primary
  `[data-testid="preparation-plan-primary-cta"]`.
- Action to reveal target: open the route directly; scroll to the first CTA.
- Reported CSS viewport: owner did not report a specific viewport; compact
  window `1180x820` is the desktop reproduction anchor.
- Affected breakpoints: `639/640/641`, `899/900/901`, plus the sitewide sweep
  around `480/640/1024/1200`.
- Baseline visible signature: the route did not exist; the article hub had one
  published card, «Сценарий свадебного вечера».
- Expected visible signature: the route displays an H1, direct answer, contents
  panel, twelve ordered sections and a visible internal materials CTA; the hub
  displays the second published card.
- Must remain unchanged: homepage and its Direct-sensitive CTA, `/scenario/`,
  `/materials/`, existing bot payloads and public site palette/type system.
- Required viewports: `390x844`, `480x900`, `768x1024`, `899x900`, `900x900`,
  `901x900`, `1180x820`, `1366x768`, `1440x900`, `1984x1046`.
- Attempt number for this exact target: `1`.

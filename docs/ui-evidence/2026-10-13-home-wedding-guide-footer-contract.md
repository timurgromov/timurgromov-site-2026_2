# Homepage wedding-guide footer link contract

- Surface: production homepage `/`, footer record `rec862623921`.
- Canonical visual source: the existing Tilda footer menu; no new component or
  layout is introduced.
- Baseline: production at the in-app-browser viewport showed `Обо мне`, `Как я
  веду`, `Цены`, `Кейсы`, `Популярные вопросы`, `Отзывы` and no visible link to
  `/articles/`.
- Expected visible delta: the reserved former `Полезности` menu slot becomes
  one visible item, `Свадебный гид`, with the ordinary crawlable href
  `/articles/`.
- Preserved invariants: Hero, prices, primary CTA, popup behavior, Direct and
  attribution contracts, footer geometry, contacts, legal links and social
  links remain unchanged.
- Required states and viewports: desktop `1440x900`, wide desktop
  `1911x1064`, mobile `390x844`; footer link visible, white, ordered between
  `Как я веду` and `Цены`, no overlap or horizontal overflow.
- Acceptance: build, contact/footer gate, full responsive gate, staged UI
  evidence validation, fresh production HTML and in-app-browser review all
  pass.

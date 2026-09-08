# Home CTA island — SEO route contract

## Target

`/scenario/`, `/materials/` and `/articles/plan-podgotovki-k-svadbe/` end in a
shared main-site CTA island, not a separately designed expert-page card.

## Invariants

- Literal homepage CTA classes and split-button markup: `tg-plan-cta`,
  `tg-plan-cta__button` and `tg-tilda-cta`.
- Four actions in this order: Telegram materials, MAX materials, «Обсудить
  свадьбу», «Сайт ведущего». The third action opens the existing contact popup;
  the phone remains a text link.
- The same home font, orange/white color switch and hover lift apply on every
  SEO route.
- The gap between useful content and CTA is 32px desktop/20px mobile. The CTA
  controls its own lower breathing room before the common footer.
- Route-specific photo crops are Scenario `4:3`, Materials `1:1`, preparation
  guide `3:2`; mobile uses compact `3:2`.

## Required viewport check

`390x844`, `640/641`, `900/901`, `1180x820`, `1366x768`, `1440x900` and
`1984x1046`; no horizontal overflow, clipped labels or duplicate CTA cards.

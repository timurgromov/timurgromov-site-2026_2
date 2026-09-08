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
- The same home font, orange/white color switch, hover lift and arrow
  pseudo-element apply on every SEO route. On hover, the arrow turns 45
  degrees; it is not a static background image.
- The sole large CTA headline is «Всё для подготовки к свадьбе». No
  route-specific headline appears inside the shared island.
- The gap between useful content and CTA is 32px desktop/20px mobile. The CTA
  controls its own lower breathing room before the common footer.
- The supplied Timur portrait is clipped through the existing transparent
  stencil from the homepage «Честно о ценах» media (`1760:960`), not through a
  new rounded rectangle or a fixed `16:9` rule. It is compact beside copy on
  desktop/tablet and moves above it on mobile. Routes may vary only the crop
  position inside that same stencil.

## Required viewport check

`390x844`, `640/641`, `900/901`, `1180x820`, `1366x768`, `1440x900` and
`1984x1046`; no horizontal overflow, clipped labels or duplicate CTA cards.

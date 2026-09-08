# Scenario calculator/contact prototype — UI contract

Date: 2026-09-08

## Target and baseline

- Route: `/scenario/` only.
- State: public, anonymous visitor; the contact choice is closed by default.
- Baseline: production shows two large stacked cards: one for material delivery
  and one for a free meeting, followed by a separate author card.
- Candidate: exactly one `[data-testid="expert-conversion-scenario"]` visual
  card with calculator copy/actions and the supplied Timur portrait. There is
  no separate meeting or author card.

## Interaction contract

- First action pair: `Открыть в Telegram` and `Открыть в MAX`; their links
  remain direct bot routes and have equal width in the active grid.
- Secondary row: `Обсудить свадьбу` and `Посмотреть ведущего`.
- `Обсудить свадьбу` expands in place and reveals Telegram, MAX and a phone
  link. It does not navigate by itself and does not create a lead.
- `Посмотреть ведущего` returns to the site's homepage in the same tab.

## Responsive and media invariants

- No horizontal overflow at `390x844`, `640/641`, `900/901`, `1180x820`,
  `1366x768`, `1440x900`, `1984x1046`.
- At 900px and wider, copy and the `3:4` portrait are one two-column card.
  At 640px and below, the portrait appears before the text and all action
  buttons occupy the full available width.
- The delivery image uses the committed 900x1200 AVIF with WebP fallback;
  each derivative is below the 500 KiB budget.
- Homepage, Materials, and preparation-plan article surfaces must not change.

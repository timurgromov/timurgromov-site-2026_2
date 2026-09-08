# Scenario calculator/contact prototype — UI contract

Date: 2026-09-08

## Target and baseline

- Route: `/scenario/` only.
- State: public, anonymous visitor; the contact pop-up is closed by default.
- Baseline: production shows two large stacked cards: one for material delivery
  and one for a free meeting, followed by a separate author card.
- Candidate: exactly one `[data-testid="expert-conversion-scenario"]` visual
  card with context-specific Scenario copy/actions and the supplied Timur
  portrait. There is no separate meeting or author card.

## Interaction contract

- First action pair: `Получить в Telegram` and `Получить в MAX`; their links
  deliver the Scenario bot flow and have equal width in the active grid.
- Secondary row: `Обсудить свадьбу` and `Сайт ведущего`.
- Below the four controls, the direct phone number is a visible text link:
  `+7 925 390 07 72`; it is not a fifth button.
- `Обсудить свадьбу` opens the existing-site contact pattern as an overlay:
  Telegram, MAX, a phone link and the consultation form. It does not open a
  messenger or create a lead until the visitor chooses a channel or submits
  the form.
- `Сайт ведущего` returns to the site's homepage in the same tab.

## Responsive and media invariants

- No horizontal overflow at `390x844`, `640/641`, `900/901`, `1180x820`,
  `1366x768`, `1440x900`, `1984x1046`.
- At 900px and wider, copy and a compact horizontal `16:9` portrait are one
  two-column card. At 640px and below, the portrait appears before the text.
  The four controls
  use two compact columns from `480px` through `640px` and occupy full width
  only below `480px`.
- The delivery image uses the committed 900x1200 AVIF with WebP fallback;
  each derivative is below the 500 KiB budget.
- Homepage, Materials, and preparation-plan article surfaces must not change.

# Homepage contact popup — SEO-route source-reuse contract

## Target

On `/scenario/`, `/materials/` and `/articles/plan-podgotovki-k-svadbe/`, the
«Обсудить свадьбу» control opens the same visual and interaction pattern as the
homepage consultation popup, rather than an independently designed variant.

## Invariants

- Source pattern: `src/pages/index.astro` → `consultationContactPopupMarkup`
  and `consultationContactPopupAssets`.
- Coolvetica headline, Manrope body, 12px desktop panel corners, pseudo-element
  close cross, split buttons and 45-degree hover arrow rotation match home.
- Three direct channels are present: Telegram, MAX and phone. Desktop presents
  the direct phone number; mobile keeps the phone action.
- The existing form, consent links, close/Escape behaviour and success state
  remain; no lead is submitted during visual QA.
- Telegram/MAX retain each route's own tracking/deep-link values.

## Required viewports

`390x844`, `1440x900`, and `1911x1064`; verify open/close, no horizontal
overflow, visible phone treatment and form.

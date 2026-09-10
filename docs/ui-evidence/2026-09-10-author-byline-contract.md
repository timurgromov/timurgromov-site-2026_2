# UI change contract

- Change ID: `2026-09-10-author-byline`
- Requested visible change: author metadata under the Hero lead names Timur as the author on both the scenario and preparation-plan pages.
- Surface: `/scenario/` and `/articles/plan-podgotovki-k-svadbe/`
- User state / fixture: public anonymous visitor; direct route load at scroll position `0`.
- Exact target: `.scenario-hero__meta strong` and `.plan-hero__meta strong`.
- Action to reveal target: open each route directly.
- Reported CSS viewport: owner supplied a mobile screenshot; verification anchor is `390x844`, with `1180x820` desktop guard.
- Affected breakpoints: no layout rules change; copy must remain a single visible byline in the existing metadata column.
- Baseline visible signature: `Тимур Громов`.
- Expected visible signature: `Автор: Тимур Громов`; the role/time or role/guide line remains unchanged.
- Must remain unchanged: Hero photo, title, lead, metadata icon, typography, CTA and all links.
- Required viewports: `390x844`, `1180x820` on each route.
- Attempt number for this exact target: `1`.

Acceptance: a freshly served candidate shows the concise author byline without clipping, wrapping or changing the second metadata line.

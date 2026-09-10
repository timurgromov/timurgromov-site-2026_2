# UI change contract

- Change ID: `2026-09-10-wedding-budget-article`
- Surface: `/articles/byudzhet-svadby-v-moskve/` and the complete `/articles/` hub.
- User state: public anonymous visitor; no messenger navigation during visual QA.
- Canonical visual source: production `/scenario/` and the approved wedding-editorial system already reused by `/articles/plan-podgotovki-k-svadbe/`.
- Production baseline: the route returns no published article and `/articles/` is a light generic SEO catalogue that does not match the wedding-editorial system.
- Expected Hero signature: black-and-white Timur portrait, dark layered overlay, `timurgromov.ru`, author/material eyebrow, the exact H1, concise answer, author metadata and two equal calculator actions.
- Expected body signature: warm-neutral editorial canvas, orange accent, existing display/italic type roles, structured expense chapters, one mid-article calculator CTA and no unrelated generic SEO-card visual language.
- Expected final signature: a branded «Как работает калькулятор» section with three sanitized real Mini App screenshots, confirmed capability copy and a final equal Telegram/MAX CTA pair.
- Expected hub signature: the same dark portrait Hero, display/italic typography, warm-neutral article grid and orange accent as `/scenario/`; the budget article is featured, while the hub remains navigation rather than a separate keyword landing.
- Required sources: `site_calculator_timurgromov__wedding_budget__hero`, `site_calculator_timurgromov__wedding_budget__mid_article`, `site_calculator_timurgromov__wedding_budget__final` for each provider.
- Must remain unchanged: homepage, Direct flow, scenario/material qualification, other articles, corporate/jubilee surfaces and existing plan/meeting source behavior.
- Required viewports: `390x844`, `479x844`, `480x844`, `639x844`, `640x844`, `641x844`, `768x1024`, `1024x768`, `1180x820`, `1366x768`, `1440x900`, `1984x1046`.
- Attempt: `1`.

## Responsive layout contract

- Mobile: Hero copy remains readable over the dark crop; Telegram/MAX controls stack only when equal-width side-by-side controls would clip; article gutters are at least `16px`; screenshots never create horizontal overflow.
- Tablet: text and media use the established editorial stack, expense chapters preserve clear heading/body hierarchy and CTA controls remain equal.
- Desktop: Hero reads as one branded author cover; body uses a restrained reading column with structured side labels; screenshot explanations and devices form a balanced three-column section.
- Breakpoint boundaries: test both sides of `480px` and `640px`; no hidden desktop-only content is required to understand or use the calculator.
- Preserved interaction: every article conversion action opens the calculator path for its own placement; no plan or meeting menu is used.

Acceptance: the new route is visibly part of the existing Timur Gromov wedding site at every required viewport, contains all required article sections and calculator states, has no horizontal overflow, and does not expose personal data or monetary values in screenshots.

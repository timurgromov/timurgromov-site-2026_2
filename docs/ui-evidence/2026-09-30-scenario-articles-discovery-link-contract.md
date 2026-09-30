# UI change contract — scenario articles discovery link

- Change ID: `2026-09-30-scenario-articles-discovery-link`
- Requested visible change: the scenario article gives readers one clear, native text path to the wedding-articles hub.
- Surface: `/scenario/`
- User state: anonymous public reader.
- Exact target: the last paragraph of the introductory `WeddingArticleIntro`.
- Action to reveal target: open `/scenario/` and read the intro; follow the text link only after confirming its destination.
- Baseline: production at `1280x720` had zero ordinary `<a href="/articles/">` links on `/scenario/`.
- Expected visible signature: one text link, «другие статьи о свадьбе», with href `/articles/` in the intro; existing messenger and consultation CTAs remain unchanged.
- Must remain unchanged: Hero, scenario content, CTA source codes, Telegram/MAX links, contact popup, homepage and Direct flow.
- Required viewports: `390x844`, `1280x720`.
- Attempt number: `1`.

Acceptance: the current served candidate contains exactly one visible contextual link from the scenario introduction to `/articles/`; it resolves to the existing article hub and produces no browser console errors.

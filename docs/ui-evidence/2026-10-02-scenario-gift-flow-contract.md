# UI change contract

- Change ID: `2026-10-02-scenario-gift-flow`
- Requested visible change: the wedding-scenario article explains how guests
  can hand over gifts at the beginning of the evening, not just that gifts are
  generally organised.
- Surface: `/scenario/`
- User state / fixture: public article; the “Церемония, поздравления и
  фотографии” time block.
- Exact target: `src/pages/scenario.astro` — the editorial content between the
  ceremony description and the mid-article materials CTA.
- Action to reveal target: scroll from the article hero to the `16:40 — 17:20`
  time block.
- Reported CSS viewport: `1231 x 639` (the exact desktop CSS viewport reported
  by the dedicated QA browser).
- Affected breakpoints: no breakpoint-specific CSS is changed. The repository
  responsive gate remains the regression check for the unchanged mobile layout.
- Baseline visible signature: the ceremony block ends after a general paragraph
  about congratulations and photos; the three gift options appear only later,
  under “Знакомство гостей с вечером”.
- Expected visible signature: the ceremony block contains the heading “Как
  гости могут вручить подарки”, three concrete options, and the fact that the
  host announces them before the photos; the later banquet block begins with
  toasts rather than duplicating the gift instructions.
- Must remain unchanged: Hero, CTA destinations and sources, existing callout
  style, all other time blocks, and the Jubilee worktree changes.
- Required viewport: `1231 x 639`.
- Attempt number for this exact target: `1`.
- Owner reference/selected variant after attempt 2: not applicable.

Acceptance: the served candidate visibly puts the concrete gift flow in the
congratulations-and-photos stage without adding a new visual component or
duplicating it in the banquet stage.

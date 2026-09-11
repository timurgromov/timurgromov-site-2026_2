# UI change contract

- Change ID: `2026-09-11-windowed-prominent-hero`
- Requested visible change: the short Hero titles must be unmistakably larger
  in the owner's `1232x582` desktop window, without pulling the service line
  into the heading.
- Surface: `/scenario/` and `/articles/`, public anonymous reader at `scrollY=0`.
- Exact target: `.tg-article-hero--prominent-title .tg-article-hero__title h1`.
- Action to reveal target: direct fresh load of either route.
- Reported CSS viewport: `1232x582`, read from the owner's open Chrome tab.
- Affected breakpoints: `800px`, `1200px`, and short-height `780px` / `650px`.
- Baseline visible signature: `/scenario/` at the reported viewport used the
  global very-short rule: `45.584px`, `660px` measure and a wrapped/narrow
  display lane despite the explicit `prominent` role.
- Expected visible signature: at `1232x582` both selected covers use a
  one-line `65.912px` H1 at the shared `1000px` display measure, with equal
  free gaps above and below the central content group.
- Must remain unchanged: photo crop, Hero height roles, service-line top
  anchor, author-row bottom anchor, long-title article roles and mobile scale.
- Required viewports: `390x844`, `1232x582`, `1280x720`, `1911x839`.
- Attempt number for this exact reported viewport: `2`.

Acceptance: the exact reported window has a visibly larger one-line title,
the service line remains in the Hero header zone, the central content stays
vertically balanced and neither mobile nor long-title covers inherit this role.

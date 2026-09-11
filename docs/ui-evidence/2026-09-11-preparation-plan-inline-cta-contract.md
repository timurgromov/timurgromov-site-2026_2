# UI change contract

- Change ID: `2026-09-11-preparation-plan-inline-cta`
- Requested visible change: add the standard compact Telegram/MAX materials CTA
  in the middle of the preparation-plan article.
- Surface: `/articles/plan-podgotovki-k-svadbe/`
- User state / fixture: public anonymous visitor; the CTA is visible after
  stage 04 and before stage 05.
- Exact target: `.expert-materials-inline-cta` inside `#stage-04`.
- Action to reveal target: open the route directly and scroll to stage 04.
- Reported CSS viewport: none; `1180x820` is the compact desktop anchor.
- Affected breakpoints: the component changes layout at `1099/1100`; the
  sitewide article sweep additionally covers `480/640/1024/1200` boundaries.
- Baseline visible signature: stage 04 ends with its contract note and is
  followed directly by stage 05; no compact Telegram/MAX materials block.
- Expected visible signature: one white compact materials island follows the
  stage-04 note, with orange Telegram and light MAX split controls; it precedes
  stage 05.
- Must remain unchanged: stage-07 scenario link, all article prose, and the
  one large four-path conversion island at the end of the article.
- Required viewports: `390x844`, `1099x900`, `1100x900`, `1180x820`,
  `1366x768`, `1440x900`.
- Attempt number for this exact target: `1`.

Acceptance: the current served candidate visibly contains the compact CTA at
stage 04, has no horizontal overflow, keeps two usable controls, and preserves
the existing stage-07 and final CTA contours.

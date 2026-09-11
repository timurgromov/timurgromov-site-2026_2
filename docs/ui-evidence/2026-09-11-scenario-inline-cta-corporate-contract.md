# UI change contract

- Change ID: `2026-09-11-scenario-inline-cta-corporate`
- Requested visible change: replace the one rounded orange meeting button in
  the wedding-scenario article with the approved corporate split-button.
- Surface: `/scenario/`
- User state / fixture: public anonymous reader; the CTA appears after the
  `18:20 — 19:40` section and before the `19:40 — 20:40` section.
- Exact target: `.scenario-inline-cta .scenario-inline-cta__button`.
- Action to reveal target: open the route directly and scroll to the
  `Короткая встреча` card.
- Reported CSS viewport: the supplied desktop screenshot; `1180x820` is the
  compact-desktop anchor.
- Affected breakpoints: `1099/1100` changes the card from two columns to one;
  the mobile sizing is at `639/640`.
- Baseline visible signature: a single continuous, pill-shaped orange button
  with a Cormorant label and no separate arrow cell.
- Expected visible signature: the same direct-meeting CTA is a corporate
  orange split-button: a rectangular text plate plus a distinct square arrow
  cell, using the corporate Manrope label treatment.
- Must remain unchanged: copy, card, duration note and the
  `site_meeting_timurgromov__scenario__inline_consultation` destination.
- Required viewports: `390x844`, `1099x900`, `1100x900`, `1180x820`,
  `1440x900`.
- Attempt number for this exact target: `1`.

Acceptance: the served candidate visibly replaces only the rounded inline
button with the corporate split-button, has no horizontal overflow, keeps the
existing direct meeting URL, and leaves the card copy and note intact.

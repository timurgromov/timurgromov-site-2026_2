# UI change contract

- Change ID: `2026-09-11-prominent-hero-lead`
- Requested visible change: enlarge the subtitle together with the already
  enlarged display title; it must read as one deliberate Hero composition,
  rather than a large heading above a timid base lead.
- Surface: `/scenario/` and `/articles/`, public anonymous reader at `scrollY=0`.
- Exact target: `.tg-article-hero--prominent-title .tg-article-hero__lead`.
- Reported CSS viewport: `1232x582`.
- Affected breakpoints: `800px`, `1200px`, and short-height `780px`.
- Baseline visible signature: at `1232x582`, the selected H1 was `65.912px`
  while the lead remained at the generic `20.944px` role.
- Expected visible signature: the selected lead is `24.64px` at `1232x582`,
  keeping the H1 one line and the content lane vertically balanced.
- Must remain unchanged: Hero photo/crop/height, service-line top anchor,
  author-row bottom anchor, title role, long-title covers and mobile.
- Required viewports: `390x844`, `1232x582`, `1280x720`, `1911x839`.

Acceptance: both short-copy covers present a visibly stronger lead without
attaching the service line to the centred group, causing horizontal overflow or
changing the mobile role.

# Paid landing health automation — 2026-09-07

## Change

Added two production-read-only checks and their package commands:

- `npm run check:paid-landing` checks the rendered landing contract, EventBudjet
  health and a 1 KiB range response for each video registered in
  `src/site/home-data.ts`.
- `npm run check:paid-landing:playback` uses a temporary headless Chrome profile
  to prove hero playback on desktop `1440x900` and mobile `390x844`, while
  retaining CTA/form presence checks.

The command contract is documented in `docs/paid-landing-health.md`. The
scheduled owner is the existing Direct daily heartbeat: every day for the
bounded smoke, with browser playback on Monday. Neither command submits a form
or creates a synthetic CRM request.

## Local verification before publish

- `npm run check:paid-landing`: passed against live production; landing HTTP
  `200`, CRM health `200/status: ok`, and 17 configured MP4 assets returned
  `206 video/mp4`.
- `npm run check:paid-landing:playback`: passed; the desktop and mobile hero
  both reached `readyState: 4` and advanced playback time.
- `npm run build`: passed.

## Publish status

Pending commit/push and GitHub Pages verification at the time this entry was
created. The later Direct-workspace scheduling record is authoritative for
heartbeat activation.

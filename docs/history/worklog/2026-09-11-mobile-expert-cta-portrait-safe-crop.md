# Mobile final CTA portrait safe crop — 2026-09-11

## Trigger and cause

The owner reported that the portrait in the final «Всё для подготовки к
свадьбе» CTA on the mobile preparation-plan article cut off the top of Timur's
head. The shared renderer gave that route a desktop `62% 27%` focal point, and
the mobile CTA had no later crop rule. Its wide horizontal stencil therefore
inherited the desktop vertical offset.

## Change

- Added one shared `<=640px` override in
  `src/site/expert-conversion.ts`: every final CTA portrait uses
  `object-position: 62% 0%`.
- Kept route-specific desktop/tablet crops unchanged. The stencil, asset,
  controls, CTA text, links, attribution and consultation popup are untouched.
- Added permanent responsive probes for `375x812`, `430x932` and `440x956` on
  all four routes which use the common final CTA. The gate now fails if a
  mobile CTA portrait is missing or its computed crop differs from `62% 0%`.
- Recorded this as a universal future-page requirement in `AGENTS.md`,
  `docs/CTA_TEMPLATES.md` and `UX.md`.

## Verification

- `npm run build` — passed.
- `npm run verify:responsive-layout` — passed after the last edit, including
  the new mobile probes; no horizontal overflow or browser runtime errors.
- Fresh candidate renders at `375x812`, `430x932` and `440x956` all measured
  `object-position: 62% 0%`, no document overflow and no page errors.
- A rendered `430x932` CTA capture visibly keeps the top of the hair inside
  the stencil. The local candidate was also freshly opened in the Codex
  in-app browser.

## Messenger boundary

The CTA destinations and structured source payloads are unchanged. No
Telegram/MAX link or form was opened because this visual-only QA must not
create production lead data without explicit test-lead approval.

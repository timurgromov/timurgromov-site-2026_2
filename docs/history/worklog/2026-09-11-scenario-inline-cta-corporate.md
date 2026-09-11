# Corporate inline CTA in wedding scenario — 2026-09-11

## Change

- Replaced only the rounded orange `Обсудить вашу свадьбу` button in the
  `Короткая встреча` card of `/scenario/` with the native corporate
  `tg-split-cta` anatomy: separate text plate and arrow cell.
- Preserved the card copy, the `30–50 минут` note and the direct Telegram
  destination `site_meeting_timurgromov__scenario__inline_consultation`.

## Verification

- `npm run build` — passed.
- `npm run verify:responsive-layout` — passed.
- Fresh isolated-browser checks at `390x844`, `1099x900`, `1100x900`,
  `1180x820` and `1440x900` found the split-button, a 48px square arrow cell,
  the retained direct URL and no horizontal overflow.
- No Telegram link was opened during QA, so no bot or CRM event was created.

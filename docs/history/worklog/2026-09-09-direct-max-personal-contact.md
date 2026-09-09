# Direct MAX personal contact — 2026-09-09

## Intent

Remove the unnecessary MAX-bot handoff from public `Написать в MAX` controls
without changing Telegram or the MAX bot's material-qualification flow.

## Changes

- Added one canonical owner-provided personal MAX URL in `src/site/home-data.ts`.
- Repointed the public MAX contact route (homepage, shared contact popups and
  expert-page contact modules) to that URL. MAX `site_plan_*` links still open
  the bot.
- Extended the contact regression check to fail if a direct MAX link returns
  to a bot URL.
- Documented the existing counter auto-goal `366154729` as the measurement for
  this click, and the prohibition on using it later as an auto-strategy goal.

## Measurement boundary

Metrika's `переход в мессенджер` auto-goal counts the handoff click. It does
not prove that the visitor sent or read a message, and this route intentionally
does not produce a bot-start or CRM event.

## Verification

- `npm run verify:contacts`
- production marker check after GitHub Pages deploy
- no MAX message and no production CRM lead created during verification

## Follow-up

If Direct moves to an automatic strategy, first configure and verify a
CRM-qualified conversion. The messenger-click auto-goal is reporting-only.

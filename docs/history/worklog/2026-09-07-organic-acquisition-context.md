# Organic acquisition context — 2026-09-07

## Change

The public site now derives a small acquisition context for every existing
form and Telegram/MAX handoff: channel, Google/Yandex when recognised from the
referrer, referrer hostname, and landing path. It sends no search phrase or
full referrer URL.

The existing page-specific start payloads and Metrika/Direct parameters remain
unchanged. For a messenger handoff, the context is appended only as bounded
`entry_*` fields to the existing attribution request, so EventBudjet can place
it on the CRM request after the bot start.

## Verification before release

- `npm run build` passed.
- `npm run verify:contacts` passed in the permitted local environment across
  its desktop and mobile contact-layout checks.

## Release order

Deploy the EventBudjet backend/migration first, then publish this static site.
This preserves existing form compatibility and avoids a page sending the new
field before the receiving CRM is ready.

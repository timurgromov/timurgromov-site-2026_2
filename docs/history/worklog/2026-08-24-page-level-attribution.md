# Public-site page-level attribution

Date: 2026-08-24

## Change

- Main page scenario CTA uses `site_plan_home`.
- All main page direct-contact Telegram/MAX CTA use `site_meeting_home`.
- `/scenario/` direct-contact CTA use `site_meeting_scenario`.
- `/materials/` direct-contact CTA use `site_meeting_materials`.
- The source code is intentionally stable through Telegram/MAX and is resolved to a readable CRM label by EventBudjet.

## Verification

- `npm run build` passed.
- `npm run verify:contacts` passed at 1911x1064, 1440x900 and 390x844; its rendered links show the homepage Telegram/MAX code `site_meeting_home`.
- Native messenger-to-CRM smoke remains a production test with an authorised test account, not a browser-link assertion.

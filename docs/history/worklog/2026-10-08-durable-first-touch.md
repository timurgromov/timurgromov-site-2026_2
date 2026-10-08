# Durable first-touch attribution — 2026-10-08

## Implemented

- Capture a versioned first touch on page load and retain it for 30 days.
- Store bounded UTM, referrer, landing and Metrika ClientID data without PII.
- Classify AI sources separately from SEO, paid, referral and direct traffic.
- Pass first-touch context and ClientID through Telegram start and site forms.
- Keep every wedding Telegram CTA on the tracked EventBudjet bot route; there
  is no public personal-Telegram shortcut in the wedding flow.

## Verification

- `npm run check:direct-attribution`: passed.
- `npm run build`: passed.
- `npm run verify:contacts`: passed at 1911x1064, 1440x900 and 390x844.
- The browser check first caught an escaped-regex syntax error in generated
  HTML; it was corrected before release and the rerun had no runtime exception.

No live form was submitted and no Telegram `/start` or message was sent during
this verification, so no synthetic CRM record was created.

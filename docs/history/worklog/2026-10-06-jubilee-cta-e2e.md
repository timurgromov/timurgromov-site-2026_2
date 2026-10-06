# Jubilee CTA production verification — 2026-10-06

## Intent

Verify that the revised Jubilee callback flow reaches CRM and private Telegram
and that the success goal is recorded only after the confirmed server response.

## Context

Runtime commit `847e3d3` was already deployed to GitHub Pages. The callback
form sends bounded `timurgromov / jubilee` CTA context to the shared
EventBudjet endpoint.

## Changes

No runtime code changed. Current-state documentation now records the
authorized live verification result.

## Verification

- Synthetic request `#152` returned HTTP `201`, showed the form success state,
  and appeared in EventBudjet with context
  `timurgromov / jubilee / consultation / hero`.
- The matching structured `CRM #152` message appeared in authenticated private
  Telegram channel `CRM заявки`.
- Metrika counter `100295805`, goal `670111872` (`Подтверждённая заявка`),
  reports one goal visit and one reach on 2026-10-06.
- The test CRM record was deleted after verification by owner instruction.

## Result

The Jubilee site has a confirmed callback-to-CRM path and a corresponding
Metrika success event. Personal Telegram remains a direct contact path and
does not create a CRM record by itself.

## Risks / Follow-up

- Paid attribution is not covered by this direct synthetic submission.
- Pricing remains a separate owner decision and was not changed.

## Links

- `../CURRENT_STATE.md`
- `../../../UX.md`
- `../../../../EventBudjet/docs/history/worklog/2026-10-06-three-site-cta-e2e.md`

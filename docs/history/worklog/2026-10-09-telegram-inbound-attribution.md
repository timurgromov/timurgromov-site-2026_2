# Telegram inbound attribution — 2026-10-09

## Change

- Added the canonical public inbound URL
  `https://timurgromov.ru/from/telegram/`. It immediately redirects to the
  homepage with bounded `utm_source=telegram`, `utm_medium=messenger` and the
  default campaign `owned_telegram`.
- A Telegram publication can supply a safe, per-placement campaign code through
  `?campaign=<code>` without letting arbitrary parameters into the CRM context.
- The first-touch classifier now also recognises referrers from `t.me`,
  `telegram.me` and Telegram Web as source `telegram` when a client does send
  them.

## CRM behaviour

The EventBudjet request header now renders acquisition source `Telegram` for
both tagged Telegram traffic and a received Telegram referrer. The separate
contact channel remains `Telegram-бот`; it does not claim that an ordinary
personal chat can be tied to a site visitor.

## Operational follow-up

Existing Telegram posts, profile links and channel buttons must be changed to
the canonical inbound URL to make future visits deterministic. Earlier visits
with no UTM/referrer cannot be reconstructed retroactively.

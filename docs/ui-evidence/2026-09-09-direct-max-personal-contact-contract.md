# Direct MAX personal contact — UI contract

Canonical source: `src/site/home-data.ts` → `maxPersonalProfileUrl`.

- Public controls labelled `MAX` inside `Написать мне` and `Написать в MAX`
  open the canonical personal MAX page in a new tab.
- Those links must not contain `_bot?` or `start=site_meeting`.
- Telegram contact and MAX scenario/material CTAs are out of scope and retain
  their bot routes.
- Layout, copy, colour and geometry are unchanged.

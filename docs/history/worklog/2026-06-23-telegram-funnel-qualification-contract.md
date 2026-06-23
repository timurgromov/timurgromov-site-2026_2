# 2026-06-23 - Telegram funnel qualification contract

## Context

Owner reported that production clicks on `Получить сценарий` and direct Telegram contact felt like the same bot chain. Site audit showed production HTML already has separate payloads: `site_plan` for scenario and `site_meeting` for direct Telegram contact.

## Decision

The site and bot contract is now qualification-first for materials: `site_plan` starts 3 short questions before scenario/material delivery, while `site_meeting` stays a direct-contact entry. Wedding calculator remains a direct exception because it qualifies inside the calculator flow.

## Changes

- Tightened homepage copy around scenario/material delivery so it consistently says materials follow short qualification.
- Replaced the direct `/scenario/` footer material link to the online-review URL with the gated `site_plan` bot link.
- Updated `docs/telegram-funnel-roadmap.md` to remove the old `без анкеты` MVP override.
- Added `DEC-2026-06-23-TELEGRAM-MATERIALS-QUALIFICATION-FIRST`.
- Updated current project handoff with the qualification-first materials rule.

## Verification

- `npm run build` passed.
- Static built HTML check passed: `site_plan` and `site_meeting` are both present, personal `t.me/timurgromovv` is absent, and `/scenario/` no longer contains direct `https://clck.ru/3RX8Nw`.
- `npm run verify:contacts` was attempted twice with escalated permissions. Both attempts completed build but failed before layout assertions because local Chrome/preview startup did not become available in the managed environment.
- Production `verify:pages` after push is still pending.

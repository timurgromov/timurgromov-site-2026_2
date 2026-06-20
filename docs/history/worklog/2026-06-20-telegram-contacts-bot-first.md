# 2026-06-20 - Telegram contacts bot-first

## Context

Audit of the live homepage CTA map showed that most main Telegram actions already used `gromov_wedding_bot`, but some visible Tilda-export contacts still pointed to personal `@timurgromovv`.

## Decision

All public Telegram contact CTA on the site should enter the bot through `site_meeting`. The tripwire scenario flow remains separate as `site_plan`.

## Changes

- Replaced direct personal Telegram links in the active homepage Tilda body with `https://t.me/gromov_wedding_bot?start=site_meeting`.
- Updated `/scenario/` Telegram contact metadata to show `@gromov_wedding_bot`.
- Added `DEC-2026-06-20-TELEGRAM-CONTACTS-BOT-FIRST`.
- Updated current state to mark bot-first Telegram contact as the default.

## Verification

- `npm run build` passed.
- `npm run verify:contacts` passed; footer and popup Telegram links resolve to `https://t.me/gromov_wedding_bot?start=site_meeting` on desktop and mobile viewports.
- Static absent-check passed: `dist/index.html` and `dist/scenario/index.html` do not contain `t.me/timurgromovv` or `@timurgromovv`.
- Local `dist/index.html` keeps `site_plan` for the scenario tripwire and uses `site_meeting` for contact CTA.
- Git push deployed to GitHub Pages from `0a03e62`.
- Production check passed on `https://timurgromov.ru/`: contains `gromov_wedding_bot?start=site_meeting` and `gromov_wedding_bot?start=site_plan`, absent `t.me/timurgromovv`.

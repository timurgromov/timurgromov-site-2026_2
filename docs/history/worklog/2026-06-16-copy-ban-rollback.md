# 2026-06-16 - Rollback overbroad copy ban

## Summary

- Removed the mistaken global ban on `спокойно` and restored valid wording where it originally belonged.

## Changes

- Deleted the active copy-ban rule from `docs/do-not-break-this-site.md`.
- Replaced the active decision with `DEC-2026-06-16-COPY-BAN-ROLLBACK` in `docs/history/DECISIONS.md`.
- Restored original wording in `src/pages/index.astro`, `src/pages/scenario.astro`, and `docs/telegram-funnel-roadmap.md`.
- Removed the incorrect worklog entry that described the blanket ban as an active project rule.

## Verification

- `rg -n "COPY-BAN-SPOKOYNO|познакомимся по делу|понятной подготовки|понятным, живым и управляемым|Гостям намного проще|Если хотите понять" src docs`
- `npm run build`
- `git diff --check`

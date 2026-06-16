# 2026-06-16 - Copy ban for `спокойно`

## Summary

- Added a project-level ban on `спокойно` and same-root variants in user-facing copy.

## Changes

- Documented the ban in `docs/do-not-break-this-site.md`.
- Added `DEC-2026-06-16-COPY-BAN-SPOKOYNO` to `docs/history/DECISIONS.md`.
- Removed same-root wording from active public copy in `src/pages/index.astro` and `src/pages/scenario.astro`.
- Updated the active funnel roadmap wording from `спокойная подготовка` to `понятная подготовка`.

## Verification

- `rg -n "спокойн" src docs/telegram-funnel-roadmap.md` returned no matches.
- `npm run build`
- `git diff --check`

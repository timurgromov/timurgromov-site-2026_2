# 2026-06-16 - Materials as-is Astro baseline guard

## Summary

- Locked `/materials/` phase 1 as a same-design Tilda-records-in-Astro baseline instead of a native Astro redesign.

## Changes

- Added `scripts/verify-materials-baseline.mjs`.
- Added `npm run verify:materials-baseline`.
- Documented the `/materials/` as-is baseline rule in `docs/do-not-break-this-site.md`.
- Added `DEC-2026-06-16-MATERIALS-TILDA-FIRST` to `docs/history/DECISIONS.md`.

## Rule

- `/materials/` must keep reading `page62008353.html` and `files/page62008353body.html`.
- Built `/materials/` must keep Tilda markers including `tilda-blocks-page62008353`, `rec862050095`, `rec862070380`, and `t396`.
- Rejected native-redesign markers such as `materials-hero`, `materials-webinar`, and `materials-video-grid` must stay absent.

## Verification

- `npm run verify:materials-baseline`
- `git diff --check`

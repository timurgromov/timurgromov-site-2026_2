# Jubilee hero numbered-photo correction — 2026-10-03

## Correction

- Restored the exact owner-selected order 1 through 5 shared with the two
  corporate routes.
- Removed the alternate-background duplicate and restored the missing photo 4.
- Frame IDs now match the sources: `01-smile`, `02-microphone`,
  `03-full-length`, `04-grey-suit`, `05-gesture`.
- The Jubilee copy, CTA, tags, timing and hero geometry are unchanged.
- Original PNG files remain outside `public/`; delivery files are responsive
  AVIF/WebP derivatives at 640 and 1024 pixels and are byte-identical to the
  corporate set.

## Local evidence

- `npm run build`: passed.
- `npm run verify:responsive-layout`: passed, 246 cases across 11 routes.
- All 20 delivery files have distinct per-frame hashes and stay below 116 KiB.
- Codex in-app browser at `1440x900` and `390x844`: all five deterministic
  frames visible in the expected order; non-zero square geometry, AVIF selected,
  Jubilee H1 preserved, horizontal overflow `0`, console warnings/errors `0`.
- No form was submitted.

## Release

- Runtime commit: `c99b931` on `origin/main`.
- GitHub `Code health` and `Deploy to gh-pages`: successful.
- Fresh production verification passed on `/yubiley/` at `1440x900` and
  `390x844`: five matching visible frames, AVIF delivery, preserved Jubilee H1,
  non-zero square geometry, horizontal overflow `0` and console
  warnings/errors `0`.
- Live autoplay advanced from `01-smile` to `02-microphone` after `5.4s`. The
  removed `hero-03-guests` asset returns HTTP `404`; the new
  `hero-04-grey-suit` asset returns HTTP `200 image/avif`.

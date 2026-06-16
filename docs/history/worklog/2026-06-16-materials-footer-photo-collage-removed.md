# 2026-06-16 - Remove footer photo collage on /materials/

## Context

On `/materials/`, the user wanted the photo collage between the lower advice reels and the orange footer removed. The leftover collage was not a standalone record after the reels; it was the top part of the shared footer record `rec862623921`.

## Change

- kept the shared footer record on `/materials/` intact as the canonical source;
- hid the five collage photo elements inside `rec862623921` only on `/materials/`;
- shifted the remaining footer content upward by breakpoint-specific offsets instead of rebuilding the footer markup;
- reduced the footer record heights per breakpoint so the removed collage does not leave empty vertical space.

## Why

This follows the project rule for Tilda-first reuse: preserve the existing footer record and patch only the minimal layer needed for this page, instead of redrawing or removing the whole footer structure.

## Verification

- `npm run build`
- `npm run verify:materials-baseline`

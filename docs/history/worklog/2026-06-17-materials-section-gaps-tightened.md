# 2026-06-17 - Tighten section gaps on /materials/

## Context

After the CTA and footer fixes on `/materials/`, the visible gaps between major sections were still too large and inconsistent: the space before `Мои профессиональные секреты...` and the space before the orange footer both looked oversized.

## Change

- reduced the custom follow-up CTA vertical padding on desktop, tablet, and mobile;
- reduced the internal CTA columns gap;
- pulled the `rec862055949` secrets heading record upward with breakpoint-specific negative margins;
- pulled the footer record `rec862623921` upward with breakpoint-specific negative margins;
- kept the existing block markup, fonts, buttons, and split CTA pattern unchanged.

## Why

The issue was in section-to-section spacing, not in the blocks themselves. The smallest safe fix was to tighten the boundaries between existing records instead of redesigning or rebuilding the sections.

## Verification

- `npm run build`
- `npm run verify:materials-baseline`

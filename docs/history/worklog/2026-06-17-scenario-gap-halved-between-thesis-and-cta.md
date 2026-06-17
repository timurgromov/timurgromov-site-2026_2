# 2026-06-17 - Halve gap between scenario thesis and meeting CTA

## Context

On `/scenario/`, the visible gap between the orange thesis block (`Главная мысль`) and the following `Встреча-знакомство` CTA was still too large in live review.

The issue was not inside either block. The spacing came from the sum of:

- `.scenario-thesis` bottom margin;
- `.scenario-cta__shell` top margin.

## Change

- reduced `.scenario-thesis` bottom margin from `24px` to `12px` on desktop;
- reduced `.scenario-cta__shell` top margin from `24px` to `12px` on desktop;
- reduced the same pair on mobile from `20px + 20px` to `10px + 10px`.

## Why

The safest fix was to keep the existing thesis and CTA blocks unchanged and only tighten the boundary between them.

## Verification

- `git diff --check`
- `npm run build`

## Result

The total visible gap between the two blocks is now halved:

- desktop: `48px -> 24px`
- mobile: `40px -> 20px`

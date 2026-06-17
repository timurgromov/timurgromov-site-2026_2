# 2026-06-17 - Tighten gap between scenario thesis and meeting CTA again

## Context

On `/scenario/`, the visible gap between the orange thesis block (`Главная мысль`) and the following `Встреча-знакомство` CTA was still too large even after the first tightening pass.

The issue was not just inside either block. The visible spacing came from the sum of:

- `.scenario-article` bottom padding;
- `.scenario-thesis` bottom margin;
- `.scenario-cta__shell` top margin.

## Change

- reduced `.scenario-article` bottom padding from `72px` to `16px` on desktop;
- reduced `.scenario-thesis` bottom margin from `12px` to `8px` on desktop;
- reduced `.scenario-cta__shell` top margin from `12px` to `8px` on desktop;
- reduced mobile `.scenario-article` bottom padding from `42px` to `12px`;
- reduced the same margin pair on mobile from `10px + 10px` to `6px + 6px`.

## Why

The safest fix was to keep the existing thesis and CTA blocks unchanged and tighten the real boundary between them instead of only shaving one margin again.

## Verification

- `git diff --check`
- `npm run build`

## Result

The total visible gap between the two blocks is now much closer to the intended reference:

- desktop: `96px -> 32px`
- mobile: `62px -> 24px`

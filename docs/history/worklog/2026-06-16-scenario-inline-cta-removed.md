# 2026-06-16 - Scenario inline CTA removed

## Summary

- Removed the duplicate pink mid-article CTA from `/scenario/`.

## Changes

- Deleted the intermediate `scenario-inline-cta` block between the engagement section and the emotional peak.
- Removed the associated CSS rules and mobile overrides so the page only keeps the final closing CTA.
- Kept the final meeting CTA block intact as the only conversion block at the end of the article.

## Verification

- `npm run build`
- `git diff --check`
- production marker check on `https://timurgromov.ru/scenario/`

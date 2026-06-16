# 2026-06-16 - Materials Astro migration rolled back

## Summary

- Rolled back the `/materials/` native Astro migration because it changed the visual design, typography, image placeholders, and page composition instead of preserving the existing Tilda design.

## What Was Reverted

- Reverted `7d33774 Rebuild materials page in Astro`.
- Reverted `456177b Restore materials page fonts`.
- Restored `src/pages/materials.astro` to the previous Tilda-record extraction flow based on `page62008353.html` and `files/page62008353body.html`.
- Removed the migration/fix worklogs that described the rejected implementation.

## Verification

- `npm run build`
- `git diff --check`
- Production verification pending after rollback commit and push.

## Follow-Up Rule

- Any future `/materials/` Astro rewrite must first preserve the original Tilda visual design, fonts, layout, posters, and media composition. Performance simplification can happen only after the same-design baseline is verified.

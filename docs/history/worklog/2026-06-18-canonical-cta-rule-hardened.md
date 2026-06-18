# 2026-06-18 - Canonical CTA Rule Hardened

## Context

The mobile hero CTA regression showed that the existing documentation was not operational enough: agents could still "fix" a button into a visually similar one-piece rounded rectangle instead of preserving the site's real split-button pattern.

## Change

- Marked `src/site/tilda-cta.ts` as the canonical saved CTA markup source.
- Updated `AGENTS.md` with the required CTA source and the hero-specific Tilda layer rule.
- Expanded `docs/quick-edit-playbook.md` and `docs/do-not-break-this-site.md` with explicit source, forbidden shape, hero layer IDs, and verification criteria.
- Added `DEC-2026-06-18-CANONICAL-CTA-SPLIT-BUTTON`.

## Verification

- Documentation-only rule change.
- `git diff --check`

# 2026-06-17 - Materials retrospective: why simple fixes became slow

## Context

During the `/materials/` CTA and footer passes, a set of visually simple requests turned into a long regression chain: buttons, spacing, mobile footer, desktop footer, and CTA dividers had to be revisited multiple times.

## Root pattern

The main delay was not "Tilda is hard" by itself. The repeated failure mode was:

1. a symptom was fixed before the source layer was pinned;
2. a compensating cascade was added;
3. the compensating layer created a new side effect in a neighboring record or viewport;
4. the next pass compensated that new side effect instead of removing the previous false layer.

Concrete examples from `/materials/`:

- desktop CTA buttons first got fallback rendering, even though the canonical split-button pattern already existed on the homepage;
- section spacing was tightened with negative margins between records, which later caused CTA overlap and footer white tails;
- mobile and desktop were confirmed in different states, so a technically correct DOM state was reported while the visible browser frame still showed the wrong UX.

## What was recorded

- Added decision `DEC-2026-06-17-NO-CASCADE-COMPENSATION-WORKFLOW` to `docs/history/DECISIONS.md`.
- Added `Anti-Cascade Protocol` to `docs/quick-edit-playbook.md`.

## Operational conclusion

For future UX work on this repo:

- source-first is not enough by itself; the agent must also identify the exact failure layer before changing geometry;
- one pass should fix one verified symptom, not several loosely related complaints at once;
- compensating CSS (`negative margin`, fallback geometry, force-visibility, forced height) must be treated as risky hardening, not as a neutral quick fix.

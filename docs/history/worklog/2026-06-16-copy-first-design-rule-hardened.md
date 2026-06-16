# 2026-06-16 - Copy-first design rule hardened

## Summary

- Hardened the site documentation rule for new CTA/cards/popups/custom blocks: copy an existing working pattern first, then adapt it.
- Updated `AGENTS.md`, `docs/quick-edit-playbook.md`, `docs/do-not-break-this-site.md`, and `docs/history/DECISIONS.md`.

## Why

- The `/materials/` CTA issue showed that "reuse classes" was not strict enough. The correct behavior is literal copy-first: copy the full markup/CSS/helper/assets/breakpoint/hover pattern, then change only content, links, IDs, and minimal geometry.
- If the copied pattern fails because of Tilda cascade, CSS parser issues, `withBasePath`, or style order, agents must fix that technical cause instead of redrawing a similar component.

## Result

- Future agents have the rule in the startup docs and decisions history:
  - `как на сайте`, `в том же стиле`, `такие же кнопки`, `скопируй паттерн`, `не заново` = copy existing pattern literally.
  - Generic rebuilt CTA/buttons/cards are forbidden when an existing source pattern is available.

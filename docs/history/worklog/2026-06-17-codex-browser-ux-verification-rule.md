# 2026-06-17 - Codex browser visual verification rule tightened

## Context

During `/materials/` CTA debugging, the agent confirmed desktop buttons from a technical browser state while the user still saw a Codex in-app browser frame without visible buttons.

## What changed

- Added a hard workflow rule to `docs/quick-edit-playbook.md`:
  - UX claims like `вижу`, `кнопки на месте`, `выглядит нормально` must match the same visible Codex browser frame shown to the user;
  - DOM/CSS/headless checks cannot override a contradictory visible browser frame;
  - viewport overrides must be reset or explicitly disclosed before UX confirmation.
- Added decision `DEC-2026-06-17-UX-VERIFY-IN-CODEX-BROWSER` to `docs/history/DECISIONS.md`.

## Why

This project relies heavily on visual parity and Tilda geometry. A technically correct hidden viewport is not enough if the user-facing Codex browser frame shows a different result.

## Verification

- Rules updated in project memory and quick-edit workflow docs.

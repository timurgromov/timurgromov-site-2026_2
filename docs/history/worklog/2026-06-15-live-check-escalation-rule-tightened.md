# 2026-06-15 - Live-check escalation rule tightened

## Summary

- Updated project rules so production live-checks are run with escalated permissions immediately in Codex managed sandbox.

## Changes

- `AGENTS.md` now explicitly requires escalated permissions for `npm run verify:pages`, live `curl`, and GitHub/network deploy checks.
- `docs/quick-edit-playbook.md` no longer tells agents to try a sandbox live-check first.
- `docs/github-pages-deploy.md` repeats the same rule near deployment verification.

## Verification

- `git diff --check`

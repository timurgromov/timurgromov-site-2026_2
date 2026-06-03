---
name: docs-sync
description: Use after code, product, UX, API, deploy, env, database, or workflow changes to keep README.md, PROJECT_SPEC.md, TASKS.md, UX.md, AGENTS.md, docs/history, and deploy docs synchronized with the real repository.
---

# Docs Sync

Use this skill whenever code and docs may have drifted.

## Workflow

1. Inspect changed files and current repo state.
2. Identify affected docs:
   - product behavior -> `PROJECT_SPEC.md`
   - next work / acceptance -> `TASKS.md`
   - user flows / UI states / copy -> `UX.md`
   - positioning / audience / offer / channels -> `MARKETING.md`
   - commands / setup / deploy -> `README.md`
   - agent rules -> `AGENTS.md`
   - durable decisions -> `docs/history/DECISIONS.md`
   - completed meaningful work -> `docs/history/worklog/`
   - current handoff -> `docs/history/CURRENT_STATE.md`
3. Update only docs touched by the change.
4. Remove stale claims: old commands, old ports, old providers, old DB/runtime, old URLs.
5. Prefer concrete verification lines over vague "tested".

## Acceptance

- Docs name commands that actually exist.
- Current status does not contradict git/runtime state.
- Public claims match shipped behavior.
- Follow-up tasks are actionable.
- No secrets are introduced.

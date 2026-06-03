---
name: project-memory
description: Use when a project needs persistent memory across Codex/Claude/Gemini chats, handoffs, long-running development, production fixes, deploy history, important decisions, or protection against documentation drift.
---

# Project Memory

Use this skill to add and maintain inherited project memory in `docs/history/`.

## Setup

Use `project-memory-template.md` as the source template. Create:

```text
docs/history/
  README.md
  CURRENT_STATE.md
  DECISIONS.md
  RETROSPECTIVE_BOOTSTRAP.md
  worklog/
    README.md
```

Add the Project Memory rules from `project-memory-agent-rules-template.md` into `AGENTS.md`.

## When To Update

Update project memory after each meaningful change:

- code, UX, API, data, infra, deploy, security, payment, AI/runtime changes;
- production incident or important investigation;
- important decision that future agents might accidentally undo;
- change to project rules or handoff state.

## Minimal Update

If time is tight:

1. Add one `docs/history/worklog/YYYY-MM-DD-topic.md`.
2. Update `CURRENT_STATE.md` if runtime, blocker, deploy, or next task changed.
3. Add a `DECISIONS.md` entry only for durable decisions.

## Quality Bar

- Worklog says intent, context, changes, verification, result, risks.
- Decisions say what to do and what not to revert without a new test.
- Memory is concise enough that a new chat will actually read it.

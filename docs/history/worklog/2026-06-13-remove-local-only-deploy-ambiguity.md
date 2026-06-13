# 2026-06-13 - Remove local-only deploy ambiguity from project docs

## Scope

- `docs/history/CURRENT_STATE.md`
- `docs/history/RETROSPECTIVE_BOOTSTRAP.md`
- `docs/history/DECISIONS.md`
- historical worklogs from 2026-06-08 .. 2026-06-10

## Context

В документации и project memory оставались старые формулировки из раннего этапа проекта, когда пользователь временно просил сначала делать локальные итерации без deploy. Позже это начало конфликтовать с реальным правилом проекта: site-task считается завершенной только после commit/push/deploy/live-check.

## Changes

- В `CURRENT_STATE.md` удалено активное правило `не деплоить локальную воронку до ручного одобрения пользователя`.
- В `CURRENT_STATE.md` зафиксировано обратное активное правило: site-task завершен только после `commit -> push -> deploy -> live-check`.
- В `RETROSPECTIVE_BOOTSTRAP.md` и ранних worklog-записях локальный/no-deploy режим помечен как исторический контекст, а не текущая инструкция.
- В `DECISIONS.md` добавлено явное активное решение `DEPLOY-REQUIRED-FOR-SITE-TASKS`.

## Verification

- Documentation-only change.

## Result

Старые временные просьбы больше не должны читаться как действующее правило проекта. Для живого сайта canonical rule теперь зафиксирован явно: задача не завершена, пока изменение не прошло в production и не проверено live.

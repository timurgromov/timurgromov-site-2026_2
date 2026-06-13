# 2026-06-13 - Document Codex sandbox rule for preview/contact checks

## Scope

- `AGENTS.md`
- `docs/quick-edit-playbook.md`
- `docs/tilda-zero-editing.md`

## Context

В Codex managed sandbox команды, которые поднимают локальный сервер или читают список процессов, часто падают до выполнения полезной проверки:

- `npm run verify:contacts` запускает `astro preview --host 127.0.0.1 --port <random>` и может получить `listen EPERM`.
- cleanup-команда через `ps aux` может получить `operation not permitted`.
- live/deploy проверки могут упереться в sandbox DNS/network.

После запуска с escalated permissions те же проверки проходят. Это ограничение среды, а не сигнал, что сайт или тест сломан.

## Changes

- В `AGENTS.md` добавлено правило запускать `npm run verify:contacts` сразу с escalated permissions в Codex sandbox.
- В `docs/quick-edit-playbook.md` добавлен раздел `Codex Sandbox Rule` с типовыми симптомами и действиями.
- В `docs/tilda-zero-editing.md` добавлена та же оговорка рядом с обязательной проверкой и cleanup rule.

## Verification

- Documentation-only change; build not required.

## Result

Будущие агенты должны перестать сначала запускать заведомо падающий sandbox-прогон `verify:contacts` и сразу просить разрешение на локальный preview/headless проверку.

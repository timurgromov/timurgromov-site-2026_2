# 2026-06-16 - Source-first and mechanic-first doc hardening

## Context

Повторялись ситуации, где при просьбе `сделай как на сайте` агент находил общий визуальный референс, но всё равно пересобирал механику заново вместо literal reuse уже существующего решения.

## Changed

- Усилен `Existing Design Reuse Rule` в `AGENTS.md`.
- Добавлен `Source-First Protocol` в `docs/quick-edit-playbook.md`.
- Уточнён decision `DEC-2026-06-16-COPY-FIRST-CUSTOM-BLOCKS` в `docs/history/DECISIONS.md`.

## New hard requirements

- Reuse теперь обязателен не только для внешнего вида, но и для поведения.
- Если на сайте уже есть готовая механика scroll/slider/swipe/popup/sticky/hover, сначала копируется именно она.
- В первом рабочем апдейте агент обязан явно написать `Источник: ...`.
- Если source найден, запрещено переключаться на fallback `сделаю быстрее с нуля`.
- Для mobile spacing/scroll/overflow задач сначала проверяется существующий mobile pattern на главной.

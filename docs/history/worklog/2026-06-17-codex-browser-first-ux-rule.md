# 2026-06-17 — codex browser first for UX checks

## Что изменено

- В `AGENTS.md` добавлено правило: если visual-check обязателен, default surface для него — Browser / in-app browser Codex.
- В `docs/quick-edit-playbook.md` уточнен рабочий порядок:
  - для UX и дизайна сначала проверять в браузере Codex;
  - `verify:*`, headless Chrome и Playwright использовать как fallback или дополнительное доказательство.
- В `docs/history/DECISIONS.md` зафиксировано решение `DEC-2026-06-17-CODEX-BROWSER-FIRST-FOR-UX`.

## Почему

Для субъективных задач про композицию, оси, ритм, отступы и адаптив браузер Codex ближе к реальному просмотру и быстрее, чем цепочка из косвенных headless-скриншотов.

## Проверка

- `git diff --check`

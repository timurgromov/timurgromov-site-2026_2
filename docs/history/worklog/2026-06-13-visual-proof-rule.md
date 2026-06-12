# 2026-06-13 - Visual proof rule for subjective UI tweaks

## Scope

- `AGENTS.md`
- `docs/quick-edit-playbook.md`
- `docs/tilda-zero-editing.md`
- `docs/history/DECISIONS.md`

## Context

Визуальные правки по кнопкам и popup могли быть реально закоммичены, запушены и опубликованы, но это не гарантировало заметный для владельца эффект. Текущий workflow доказывал deploy, но слишком слабо различал `код опубликован` и `дизайн действительно изменился так, как ожидалось`.

## Changes

- добавлено обязательное правило `Visual Proof Rule` для субъективных задач вида `как раньше`, `аккуратнее`, `меньше`, `слишком громоздко`
- зафиксировано, что для таких задач недостаточно `build + push + verify:pages`
- в definition of done добавлено требование live visual proof или numeric before/after disclosure
- в decisions добавлено отдельное активное решение про разделение deploy proof и visual proof

## Result

Следующие агенты не должны закрывать подобные UI-задачи только на основании успешного deploy. Если эффект маленький, это нужно прямо проговаривать числами; если задача спорная по восприятию, нужен live visual proof в нужном viewport.

# 2026-10-07 — свадебная ценовая матрица 2027

## Decision

Owner approved the public first-price matrix for 2027 weddings:

- камерная свадьба, 5 часов — `от 135 000 ₽`;
- дополнительный час камерной свадьбы — `20 000 ₽`;
- классическая свадьба, 6 часов — `от 155 000 ₽`;
- дополнительный час после 6 часов — `25 000 ₽`.

`Ведущий + DJ`, guest thresholds, durations, package descriptions and the
existing equipment communication remain unchanged. The `от` prefix preserves
the option to quote higher-demand dates above the standard public price.

## Scope

Only `src/site/home-data.ts` price copy changed. No layout, styles, media,
contact flow, messenger route, CRM behavior or equipment copy changed.

## Local verification

- `npm run build` — passed.
- Fresh local candidate at `390x844` and `1440x900` visibly showed the four
  approved values in the default `стоимость` tab.
- Both viewports reported zero horizontal overflow and the browser console had
  no errors.
- UI contract:
  `docs/ui-evidence/2026-10-07-wedding-price-matrix-contract.md`.
- Matching staged evidence is recorded in
  `docs/ui-evidence/2026-10-07-wedding-price-matrix-evidence.json`.

## Release

- Runtime/source commit `9ffee11` is pushed to `main`.
- `Code health` and the rerun of `Deploy to gh-pages` completed successfully;
  the deploy included the full responsive matrix and published production
  commit `9268dab`.
- `npm run verify:pages` confirmed all four approved values on
  `https://timurgromov.ru/` and confirmed the old `115 000 ₽` and
  `15 000 ₽` values are absent.
- Fresh live checks at `390x844` and `1440x900` showed the default
  `стоимость` tab with both approved cards, zero horizontal overflow and no
  browser-console errors. No lead or form was submitted.

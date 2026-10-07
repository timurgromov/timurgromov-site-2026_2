# UI change contract

- Change ID: `2026-10-07-wedding-price-matrix`
- Requested visible change: Update the public 2027 wedding price matrix without changing layout or package copy.
- Surface: `https://timurgromov.ru/`, homepage price section.
- User state / fixture: Public visitor, `стоимость` tab selected.
- Exact target: `.tg-price-formats` and the two `.tg-price-format` cards.
- Action to reveal target: Open the homepage and scroll to `Честно о ценах`; the price tab is selected by default.
- Reported CSS viewport: baseline observed at `436x504` in the Codex in-app browser.
- Affected breakpoints: mobile and desktop rendered homepage.
- Baseline visible signature: camera `115 000 ₽`, camera extra hour `15 000 ₽`; classic `135 000 ₽`, classic extra hour `20 000 ₽`.
- Expected visible signature: camera `от 135 000 ₽`, camera extra hour `20 000 ₽`; classic `от 155 000 ₽`, classic extra hour `25 000 ₽`.
- Must remain unchanged: `Ведущий + DJ`, durations, guest thresholds, descriptions, buttons, price-section layout, equipment copy and all adjacent sections.
- Required viewports: `390x844` and `1440x900` on the final served candidate.
- Attempt number for this exact target: `1`.
- Owner reference/selected variant after attempt 2: not applicable.

Acceptance: the current served candidate is freshly loaded, the `стоимость` tab
visibly shows the four approved values at both required viewports, the preserved
copy remains unchanged, and the browser reports no console errors or horizontal
overflow.

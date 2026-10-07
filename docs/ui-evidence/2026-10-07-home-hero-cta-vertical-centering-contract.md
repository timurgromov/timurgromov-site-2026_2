# UI change contract

- Change ID: `2026-10-07-home-hero-cta-vertical-centering`
- Requested visible change: vertically center the `получить сценарий свадьбы`
  label inside the existing homepage Hero split-button at windowed desktop
  widths.
- Surface: `/` on `https://timurgromov.ru/`.
- User state / fixture: public homepage, initial Hero, no popup open.
- Exact target: Hero Zero Block `rec861352716`, label selector
  `[data-elem-id="1738733079599"] .tn-atom` and the four existing split-button
  layers that compose its plate, square, arrow and click target.
- Action to reveal target: fresh-load the homepage at `scrollY=0`.
- Reported CSS viewport: the screenshot did not expose `window.innerWidth` or
  `window.innerHeight`; the defect is reproduced exactly at `1020x528`.
- Affected breakpoints: `480-1199px`, including `479/480/481`,
  `1023/1024/1025` and `1199/1200/1201`.
- Baseline visible signature: at `1020x528` the 44px label layer contains a
  15.4px-high inner atom pinned to the top; rendered text center is `14.5px`
  above the orange plate center. At `480-639px`, a later 320px Tilda rule also
  leaves the click target shorter than the visible plate and pulls the arrow
  square inside it.
- Expected visible signature: rendered text center stays within `2.5px` of the
  orange plate center, effective font remains `14px`, and the label stays on
  one line. The plate and arrow square meet at one edge and the click target
  covers their combined visible width.
- Must remain unchanged: CTA copy, colors, height and popup behavior;
  `#plan-delivery-popup`, Hero media and other routes.
- Required viewports: `390x844`, `479/480/481x900`, `959x900`, `1020x528`,
  `1023/1024/1025x768`, `1199/1200/1201x650`, `1366x768`, `1440x900`,
  `1504x900`, `1728x900`, `1984x1046`, plus the full project matrix.
- Attempt number for this exact target: `1`.
- Owner reference/selected variant after attempt 2: not applicable.

Acceptance: the exact short-window reproduction and breakpoint probes visibly
center the label after the last edit; the full responsive gate passes with no
horizontal overflow or browser runtime errors; the live CTA still opens the
existing scenario-delivery popup.

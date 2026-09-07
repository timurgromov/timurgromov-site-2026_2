# Hero scenario CTA typography contract

- Change ID: `2026-09-07-home-hero-cta-typography`
- Requested visible change: the label `получить сценарий свадьбы` must keep one
  readable rendered size as the public homepage window changes width; only the
  existing split-button geometry may vary by the established Hero modes.
- Surface: `https://timurgromov.ru/`
- User state / fixture: public homepage at `scrollY=0`; hero video or
  deterministic poster is acceptable because the target is the CTA label.
- Exact target: `#rec861352716 [data-elem-id="1738733079599"] .tn-atom`.
- Action to reveal target: fresh load `/`, wait for Tilda Hero initialization.
- Reported CSS viewport: the owner supplied windowed desktop screenshots around
  the Tilda 1200-px scaled mode; the open Chrome tab independently measured
  `1240x638`, `devicePixelRatio=2`.
- Affected breakpoints: `480`, `1024`, `1200`, `1920`; include `B-1/B/B+1` and
  representative reported widths `959`, `1504`, and `1728`.
- Baseline visible signature: at `1023px` the label renders at 14px; at the
  `1024px` boundary it drops to 11px; above `1200px` Tilda scales the 12px
  label with the artboard (14.4px at 1440 and 17.28px at 1728).
- Expected visible signature: a single-line 14px effective rendered label;
  width remains about 184px and the existing CTA layers, arrow and click action
  retain their native geometry.
- Must remain unchanged: Hero media lifecycle, heading layout, button shape,
  arrow, CTA text, `#plan-delivery-popup` interaction and all post-Hero content.
- Required viewports: `390x844`, `479x900`, `480x900`, `959x900`,
  `1023x768`, `1024x768`, `1199x650`, `1200x650`, `1440x900`, `1504x900`,
  `1728x900`, `1984x1046`.
- Attempt number for this exact target: `1`.

Acceptance: the effective type metric equals `14px ±0.5`, the label is exactly
one line with 170–200px rendered width at every required viewport, the full
sitewide responsive matrix passes, and live browser review confirms the label
is centered in its existing split CTA.

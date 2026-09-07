# UI change contract

- Change ID: `2026-09-07-home-hero-windowed-tablet`
- Requested visible change: homepage Hero must remain one coherent first-screen composition in a narrowed desktop or tablet-width browser instead of scaling the 640 px Tilda canvas until navigation, copy and CTA overlap or leave the viewport.
- Surface: `https://timurgromov.ru/`
- User state / fixture: public homepage, top of page, native Hero video or its deterministic preload poster.
- Exact target: `#rec861352716`; background media, visual headline, explanatory copy and split scenario CTA.
- Action to reveal target: load or hard-refresh `/`, return to `scrollY=0`, wait for the Hero record to render.
- Reported CSS viewport: the still-open Chrome tab measured `1200x582` after the report; the supplied screenshot is reproduced by the immediately adjacent sub-1200 Tilda state at `1199x650`, where the 640 px canvas is scaled by `1.873`.
- Affected breakpoints: existing `320`, `640` and `1200`, plus bounded composition boundaries `480` and `1024`; check `479/480/481`, `639/640/641`, `1023/1024/1025`, `1199/1200/1201`.
- Baseline visible signature: at `1199x650`, Hero height is `1461px`; headline starts at `y=933`; split CTA is `481x66` at `x=622,y=560`; contact navigation is outside the right edge; the first screen shows unrelated oversized fragments instead of the complete Hero hierarchy.
- Expected visible signature: one full-width Hero with no horizontal overflow; portrait-tablet mode uses one readable lower content stack and burger navigation; windowed-landscape mode keeps the existing desktop two-column hierarchy at physical CSS-pixel scale; primary scenario CTA remains split and fully inside the viewport.
- Must remain unchanged: narrow mobile mode below `480px`; desktop mode from `1200px`; native Hero video/poster lifecycle; title/logo and burger header; CTA copy and `#plan-delivery-popup` behavior; all sections after Hero.
- Required viewports: `390x844`, `479x900`, `480x900`, `481x900`, `639x900`, `640x900`, `641x900`, `768x1024`, `959x900`, `1023x768`, `1024x768`, `1025x768`, `1199x582`, `1199x650`, `1200x650`, `1201x650`, `1366x768`, `1440x900`, `1984x1046`.
- Attempt number for this exact target: `1`.
- Owner reference/selected variant after attempt 2: not required for attempt 1; preserve the current desktop visual language rather than introduce a redesign.

Acceptance: after the final edit, the current local candidate and production URL must both be freshly loaded; the complete affected viewport matrix must have no horizontal overflow or blocking console errors; the exact `1199px` reproduction must visibly show a coherent Hero; CTA interaction must still open the scenario delivery popup.

# UI change contract

- Change ID: `2026-10-02-jubilee-commercial-core`
- Requested visible change: the jubilee route gains three service packages, a live-music detail block with playable showreel, a guest-facing evening flow, and a separately named customer workflow.
- Surface: `/yubiley/`
- User state / fixture: public landing, no modal open and then music-showreel playback state.
- Exact target: `[data-testid="jubilee-service-formats"]`, `[data-testid="jubilee-music-program"]`, `[data-testid="jubilee-evening-flow"]`, `.music-program__play`.
- Action to reveal target: scroll to the new sections; activate `Подробнее о живой музыке`; press the showreel play control.
- Reported CSS viewport: `1180x820` baseline execution viewport.
- Affected breakpoints: `768px`, `1024px`; check `767/768/769` and `1023/1024/1025` plus core mobile and desktop.
- Baseline visible signature: no `#formats`, `#music-program` or `#evening-flow` sections; the route moves directly from benefits to customer workflow.
- Expected visible signature: packages and musical detail are visible between benefits and workflow; the third package anchors to the music block; showreel poster changes to a native video and hides the custom overlay after play.
- Must remain unchanged: hero, existing video cases, gallery, letters, contact forms, analytics hooks and the root route.
- Required viewports: `390x844`, `767x900`, `768x900`, `769x900`, `1023x820`, `1024x820`, `1025x820`, `1180x820`, `1366x768`, `1440x900`, `1984x1046`.
- Attempt number for this exact target: `1`.
- Owner reference/selected variant after attempt 2: not applicable.

# Homepage Hero CTA vertical centering

Date: 2026-10-07

## Scope

- In scope: the existing split CTA `получить сценарий свадьбы` in homepage
  Hero `rec861352716` and its responsive regression guard.
- Out of scope: Hero copy/media, other homepage sections, wedding pricing,
  Jubilee, corporate pages, CRM and messenger flows.

## Root cause

- At `480-1199px`, the label wrapper was 44px high at the reported short
  window size, but its inner flex atom stayed 15.4px high at the wrapper top.
  `align-items:center` therefore centered text inside the short atom instead
  of inside the orange plate.
- At `480-639px`, a later legacy 320px Tilda rule also overrode part of the
  physical-width CTA repair: the hit target stopped before the arrow square
  and the square overlapped the plate.

## Implementation

- The label atom now inherits the full CTA height only in the repaired
  `480-1199px` interval.
- A narrow `480-639px` override keeps the click layer, plate, arrow square and
  label aligned to the same physical button edges.
- The responsive gate now measures the rendered text center, requires a
  maximum `2.5px` center delta, verifies that the hit target covers the whole
  visible split button and includes the exact `1020x528` reproduction.

## Local verification

- Before at `1020x528`: text center delta `-14.5px` from the orange plate
  center.
- After at `1020x528`: text center delta `-0.2px`; 44px plate, label and atom;
  one line at an effective 14px; zero horizontal overflow.
- At `480x900`: plate `24-412px`, square `412-456px`, click target `24-456px`,
  center delta `-0.2px`, zero horizontal overflow.
- Fresh visual checks passed at `390x844`, `480x900`, `1020x528` and
  `1440x900`; the CTA opened the existing `#plan-delivery-popup`; console
  errors were empty.
- `npm run build`: passed, 11 pages.
- `npm run verify:responsive-layout`: passed, 254 cases across 11 routes,
  including all shared breakpoints and route-specific `1020x528`.

Release status is recorded in `docs/history/CURRENT_STATE.md` after production
publication and fresh live verification.

# Hero CTA effective typography contract

Date: 2026-09-07
Scope: homepage Hero scenario CTA and the public site responsive release gate.

## Incident

The scenario CTA label looked inconsistent in windowed desktop screenshots even
though its button remained on-screen. Tilda scaled the `1200px` Zero Block via
an ancestor `zoom`: the source label stayed at `12px`, but rendered at roughly
14.4px on a 1440px window and 17.28px on a 1728px window. At 1024px it switched
to an 11px rule. The existing QA only checked overflow, controls and geometry,
so it reported a false pass.

## Repair

- Kept the native split-button, arrow, CTA copy and popup intent unchanged.
- Counter-scaled only the CTA label against inherited Tilda zoom, making it a
  14px effective single line in all Hero modes.
- Extended the sitewide gate with effective text metrics, rendered label bounds
  and line-count assertions, plus 1504px and 1728px desktop probes.

## Verification

- Local rendered measurements: 14px effective font, one line and 184px text
  width at 390, 479, 480, 959, 1023, 1024, 1199, 1200, 1440, 1504, 1728 and
  1984px widths.
- Full `npm run verify:responsive-layout` passed after the final edit.
- In-app local browser review at 959px and 1728px verified the preserved CTA
  placement; the CTA opened the existing scenario-delivery popup.

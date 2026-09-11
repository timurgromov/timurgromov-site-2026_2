# Windowed prominent Hero display — 2026-09-11

## Diagnosis

- The owner reported that the first prominent-title release was not visible.
  Reading the active Chrome tab established the actual CSS viewport as
  `1232x582`, not the earlier tall-desktop probe. At this height the global
  very-short rule overrode the selected Hero's `68px` role, producing the same
  `45.584px` H1 and `660px` measure as the base layout.
- Raising only the font size while retaining that narrow measure wrapped
  «Свадебный сценарий», making the service line visually adhere to the heading.

## Decision and implementation

- `/scenario/` and `/articles/` retain the explicit `prominent` role only.
  Long-title covers and mobile remain outside the change.
- The role is now `72–88px` with `min(1000px, 58vw)` on tall desktop and
  `60–76px` with `min(1000px, calc(100vw - 48px))` for windowed desktop at
  `>=800px` / `<=780px` high. This preserves a single display line and the
  shared centred content lane.

## Verification

- Full responsive matrix passed: 246 cases, including all public routes.
- At the owner's `1232x582`, both selected H1s are `65.912px`, one line, with
  equal upper/lower free gaps: scenario `143.98px/144px`, articles
  `103.89px/103.89px`.
- In-app-browser review at `1280x720` shows the service line at the top and
  the large one-line title centred with `207px` of breathing room above and
  below on `/scenario/`.
- At `1911x839`, both selected titles are `87.906px`, one line and balanced;
  mobile `390x844` retains `40.95px` with no horizontal overflow.

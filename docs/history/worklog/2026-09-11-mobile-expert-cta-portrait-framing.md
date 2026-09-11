# Mobile final CTA portrait framing correction — 2026-09-11

## Trigger and correction

The previous `0%` mobile crop removed the hair clipping but failed the actual
visual composition: it placed Timur too low and left excessive empty space
above the head. This was a failed visual acceptance, not a new device issue.

## Change

- Selected `object-position: 62% 18%` for all final CTA portraits at `<=640px`.
- Compared rendered `18%`, `20%` and `21%` candidates at `430x932`; `18%`
  alone retains a small safe gap above the hair without pressing it against the
  edge or leaving the former blank ceiling.
- Updated the shared responsive assertion and all future-page CTA instructions.
- Added an explicit quality gate: CSS and DOM facts cannot alone accept a
  portrait crop; the actual `430x932` rendered frame must be visually reviewed.
- Extended the permanent visual rule beyond this CTA: all photo/mask/crop
  changes must explicitly assess subject completeness, composition balance and
  intentional/symmetric visual breathing space in their rendered frame.

## Preserved scope

Only the common mobile portrait position changes. Desktop/tablet crops, the
portrait asset/stencil, CTA paths, structured sources, consultation popup and
all page content remain unchanged.

# Gift handover flow restored in wedding scenario — 2026-10-02

## Intent

Make the practical gift-handover flow explicit at the moment it actually
happens: congratulations and photos after the ceremony.

## Context

The public scenario retained a short generic list of three options in the first
banquet block. It did not explain that the host announces the options before
the banquet and that most guests hand over a gift during the photo session.

## Changes

- Moved and expanded the three options into the `16:40 — 17:20` ceremony,
  congratulations and photos block.
- Made the primary photo-session route, the table-toast route and the private
  pause route explicit.
- Removed the duplicate gift subsection from the following banquet block; it
  now continues directly with the still-relevant toast rules.
- Added no new component, CSS, storage recommendation, lock or messenger CTA.

## Verification

- `npm run build` — passed.
- `npm run verify:responsive-layout` — passed.
- Local fresh browser candidate at `1231x639`: the complete three-item list is
  readable in the existing two-column timeblock, before the original quote and
  next CTA. No browser console errors observed.

## Follow-up

Publish with the normal `main` deploy flow and confirm that production serves
the exact new heading and all three options.

# Wedding Hero balanced content lane — 2026-09-11

## Trigger

Owner review of the real `1232x638` Chrome viewport found a clear composition
failure: the service line, title, lead and CTA were clustered in the upper
third of the Hero while a large empty void remained above the author row.
Earlier QA had only proven fit and minimum gaps, not vertical balance.

## Change

- Replaced the shared desktop Hero flex stack with one three-row grid:
  service block at the top, author row at the bottom and the content group
  centred in the remaining lane.
- Kept mobile in its intentional natural document flow.
- Removed short-height metadata padding that placed free space below the CTA.
- Added the permanent `1232x638` four-route probe and a balance assertion:
  the upper/lower lane gaps must each be sufficient and match within `2px`.
- Updated the Article UI Kit and UX contract so future wedding-editorial pages
  cannot opt into a page-local Hero composition.

## Local evidence

Fresh in-app-browser measurements at `1232x638`:

| Route | Above content group | Below content group |
| --- | ---: | ---: |
| `/articles/` | `191.2px` | `191.2px` |
| `/scenario/` | `180.3px` | `180.3px` |
| preparation guide | `159.4px` | `159.4px` |
| budget article | `91.5px` | `91.5px` |

The budget mobile Hero was also inspected at `390x844`: no horizontal
overflow, both controls remain usable and the author row remains visible in
the first Hero.

## Release status

- Runtime commit `b937376` pushed to `main`.
- GitHub Actions `Code health` and `Deploy to gh-pages` both passed.
- The fresh production matrix passed. A production in-app-browser render of
  the budget route at `1232x638` measured `93px` above and `93px` below the
  content group, with no horizontal overflow.

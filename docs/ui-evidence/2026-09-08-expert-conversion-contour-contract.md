# Expert conversion contour — UI contract

Date: 2026-09-08

## Target and baseline

- Routes: `/scenario/`, `/materials/`, `/articles/plan-podgotovki-k-svadbe/`.
- State: public, no popup opened and no messenger deep link followed.
- Baseline observed on production `/scenario/` at `1240x638`: it had only the
  meeting CTA (`site_meeting_scenario`) and a route-specific footer; no useful
  `site_plan_scenario` CTA or shared expert contour.
- Expected candidate signature on every route: exactly one
  `[data-testid^="expert-conversion-"]`, two useful CTA links with the
  matching `site_plan_<page>` source, two meeting CTA links with matching
  `site_meeting_<page>` source, author photo/card, and footer headings
  `Материалы`, `Услуги`, `Доверие`, `Контакты`.

## Responsive invariants

- Buttons within each Telegram/MAX pair have equal rendered width in their
  active grid.
- No horizontal overflow at `390x844`, `640/641`, `900/901`, `1180x820`,
  `1366x768`, `1440x900`, `1984x1046`.
- Homepage is not included and must not change.

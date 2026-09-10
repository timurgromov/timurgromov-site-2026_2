# Wedding-budget Hero first-viewport contract

- Change ID: `2026-09-10-budget-hero-first-viewport-fit`
- Requested visible change: make the full wedding-budget H1, lead and both
  calculator controls visible together in the initial viewport while aligning
  the controls with the established homepage split-button system.
- Surface: `/articles/byudzhet-svadby-v-moskve/`
- User state / fixture: public anonymous article at `scrollY=0`.
- Exact target: `.budget-hero h1`, `.budget-lead` and
  `[data-first-screen-primary-actions]`.
- Reported CSS viewport: `1232x582`, `devicePixelRatio=2`.
- Baseline visible signature: Hero height `806.35px`; actions bottom
  `672.35px`; the controls finish `90.35px` below the initial viewport.
- Expected visible signature: the complete title, lead and both controls are
  visible without scrolling; actions bottom is no lower than
  `viewportHeight - 12px`.
- Typography decision: keep the editorial Cormorant/Instrument roles. Do not
  replace them with the commercial Coolvetica headline role. Reuse the native
  Astro/Manrope corporate split-button anatomy and apply its compact desktop scale when height
  is constrained.
- Must remain unchanged: H1/lead/CTA copy; portrait and dark overlay; Telegram
  and MAX destinations/source codes; Article metadata/schema; article body and
  calculator screenshots.
- Required viewports: the complete `npm run verify:responsive-layout` matrix,
  plus exact `1232x582`; live controls include `/` and the article.
- Attempt number for this exact target: `1`.

Acceptance: at every required viewport there is no horizontal overflow,
clipped control label or runtime error. At `390x844`, `1199/1200/1201x650`,
`1232x582`, `1366x768`, `1440x900` and `1984x1046`, the marked Hero actions are
fully inside the first viewport with a 12px safety gap and the preserved title
and lead are visible above them.

# Scenario mid-article materials CTA — contract

## Target

`/scenario/`, anonymous reader, after the «Церемония, поздравления и
фотографии» section. The reader sees a light materials entry before the
existing personal meeting CTA.

## Invariants

- Copy: «Хотите собрать свой вечер по этой логике? В Telegram или MAX можно
  получить калькулятор, пример сценария и план подготовки.»
- The entry is one compact white island with a subtle border and rounded
  corners, not a sequence of article-divider lines.
- Exactly two compact controls: orange primary Telegram and light secondary MAX, retaining the
  `site_plan_scenario` deep-link source.
- This is the literal reusable `ExpertMaterialsInlineCta` template. Control
  markup and hover arrow come literally from `tildaCtaLink` / homepage
  `tg-tilda-cta`; no page-local rounded-button treatment.
- Existing «Если уже хотите применить…» personal CTA stays later in the article.
- The full four-path author block with portrait and phone remains once at the
  bottom; no duplicate heavy CTA is added to the reading flow.

## Viewports

`390x844`, `1280x720`, `1440x900`; no horizontal overflow or clipped labels.

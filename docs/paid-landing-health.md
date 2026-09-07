# Paid landing health contract

## Purpose

This is the production-readiness check for the paid-traffic landing
`https://timurgromov.ru/`. It is intentionally separate from conversion
analysis: a healthy page does not prove a lead should already exist, and zero
leads do not make a healthy page unhealthy.

The Yandex Direct daily learning heartbeat owns the schedule and writes the
result into its daily report. There is no second site cron.

## Daily bounded smoke

Run from this repository:

```bash
npm run check:paid-landing
```

The command uses only live read requests. It checks:

- the production landing returns HTTP success and contains the consultation
  CTA, phone link, consultation form, form-success tracking marker and
  attribution helper;
- EventBudjet CRM health returns `status: ok`;
- every video currently listed in `src/site/home-data.ts` answers one
  `Range: bytes=0-1023` request as a video response.

It never opens the form, sends a request, creates a CRM lead, changes Metrika
or changes Direct. A failed request is a technical incident; an unavailable
checkout or command result is `unknown`, not `ok`.

## Monday browser playback

On Mondays, after the daily smoke, run:

```bash
npm run check:paid-landing:playback
```

This launches an isolated headless Chrome session against the live page at
desktop `1440x900` and mobile `390x844`. It verifies that the current hero
video has a source, enough decoded data and advancing playback time, while the
consultation CTA and form are still in the DOM. It mutes and plays media only
inside its temporary checker browser profile; it does not affect visitors.

## Direct-report contract

Every Direct daily report contains:

```text
Landing health: ok | failed | unknown
Checked at: ISO timestamp or unknown
Daily smoke: pass | fail | not_run
Monday playback: pass | fail | N/A | not_run
Failed component: exact URL/marker/CRM/video/viewport, if any
```

`failed` or `unknown` prevents interpreting a no-lead period as a traffic or
economics verdict and blocks new Direct-change proposals until the condition is
explained. It does not pause, resume, fund or otherwise mutate Direct.

## Transfer rule

For another paid landing, retain the same status contract and no-fake-lead
boundary. Replace only the landing URL, CRM health URL, required visible
markers, media registry and tested viewports; keep daily smoke cheap and use
browser playback weekly or after a landing/media release.

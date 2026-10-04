# Jubilee CTA stage 1 — 2026-10-05

Owner approved the same contact-choice principle for Jubilee while keeping its callback form for a later confirmed-delivery stage.

Implementation: shared contact panel for Jubilee in-page CTAs and the labelled sticky control, with personal Telegram and `tel:` phone. Removed the three popup forms that could display success without backend confirmation and removed their checklist timer/scroll trigger. Programs and letters dialogs, gallery, header WhatsApp and wedding code remain.

Verification: local build, contact and responsive gates, mobile/desktop panel interaction, Escape, focus return, scroll lock and absence of former form DOM. No real message or lead was sent. Public Telegram profile resolves to `Timur Gromov @timurgromovv`; native deep-link navigation was blocked by browser policy.

Next: connect a confirmed Jubilee lead route, then add the callback choice and separately configure CRM and Metrika sources.

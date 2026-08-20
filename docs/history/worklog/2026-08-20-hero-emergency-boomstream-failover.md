# 2026-08-20 — Emergency hero video failover to Boomstream

## UI change contract

- Exact target: `https://timurgromov.ru/`, public unauthenticated homepage, native Hero video.
- Trigger/action: open the homepage and wait for the Hero poster-to-video transition.
- Required viewports: desktop `1440x900`; mobile `390x844`.
- Baseline signature: Hero sources point to `media.89-22-227-133.sslip.io`; the media VPS resets connections and the video remains unavailable.
- Expected visible delta: the Hero loads and plays from the previously approved Boomstream desktop/mobile fallback URLs.
- Must remain unchanged: Hero layout, posters, copy, CTA, timing, case cards, popups, and all non-Hero media mappings.
- Verification: build; deployed HTML/runtime source; live desktop and mobile video `currentSrc`, dimensions, `readyState`, playback state, and console errors.

## Incident context

Aeza announced maintenance affecting VPS `#1777264 outstanding-blue`. After the maintenance window the VPS booted, but its network and Rescue VNC remained unavailable. The approved Boomstream Hero fallbacks were live-tested before this change.

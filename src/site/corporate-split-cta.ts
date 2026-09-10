// Framework-independent corporate CTA markup for native Astro surfaces.
// It preserves the approved split-button anatomy without importing legacy
// homepage runtime, exported block markup or responsive scaling.
const corporateSplitCtaInner = (label: string) => `<span class="tg-split-cta__plate" aria-hidden="true"></span>
  <span class="tg-split-cta__arrow-box" aria-hidden="true"></span>
  <span class="tg-split-cta__label">${label}</span>
  <span class="tg-split-cta__icon" aria-hidden="true"></span>`;

export const corporateSplitCtaLink = (
  className: string,
  href: string,
  label: string,
  attrs = "",
) => `<a class="tg-split-cta ${className}" href="${href}"${
  attrs ? ` ${attrs}` : ""
}>${corporateSplitCtaInner(label)}</a>`;

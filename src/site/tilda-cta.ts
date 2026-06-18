export const tildaCtaArrowIconPath =
  "images/tild3536-3939-4363-b163-323761323432__vector_8.svg";

export const getTildaCtaArrowIconUrl = (basePath: string) =>
  `${basePath}${tildaCtaArrowIconPath}`;

// Canonical site CTA markup. Reuse this split-button structure instead of
// drawing new rounded buttons with an inline arrow.
export const tildaCtaInner = (label: string) => `<span class="tg-tilda-cta__plate" aria-hidden="true"></span>
  <span class="tg-tilda-cta__arrow-box" aria-hidden="true"></span>
  <span class="tg-tilda-cta__label" data-tilda-cta-label>${label}</span>
  <span class="tg-tilda-cta__icon" aria-hidden="true"></span>`;

export const tildaCtaLink = (
  className: string,
  href: string,
  label: string,
  attrs = "",
) => `<a class="tg-tilda-cta ${className}" href="${href}"${
  attrs ? ` ${attrs}` : ""
}>${tildaCtaInner(label)}</a>`;

export const tildaCtaButton = (
  className: string,
  label: string,
  attrs = "",
) => `<button class="tg-tilda-cta ${className}" type="submit"${
  attrs ? ` ${attrs}` : ""
}>${tildaCtaInner(label)}</button>`;

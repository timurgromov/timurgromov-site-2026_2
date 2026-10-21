export function renderLocalFontFaceStyle(basePath: string): string {
  const normalizedBasePath = basePath.replace(/\/?$/, "/");
  return `<style data-site-local-fonts>
  @font-face{font-family:"Coolvetica";src:url("${normalizedBasePath}fonts/denistina.woff") format("woff");font-weight:300;font-style:normal;font-display:swap}
  @font-face{font-family:"Coolvetica";src:url("${normalizedBasePath}fonts/coolvetica-condensed.woff") format("woff");font-weight:500;font-style:normal;font-display:swap}
  @font-face{font-family:"Manrope";src:url("${normalizedBasePath}fonts/manrope-variable.ttf") format("truetype");font-weight:200 800;font-style:normal;font-display:swap}
</style>`;
}

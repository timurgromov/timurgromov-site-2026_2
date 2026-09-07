import { existsSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { chromium } from "playwright";

const pagesRoot = join(process.cwd(), "src", "pages");
const targetOrigin = (process.env.RESPONSIVE_LAYOUT_URL || process.argv[2] || "http://127.0.0.1:4321").replace(/\/$/, "");
const targetOriginUrl = new URL(targetOrigin).origin;
const defaultViewports = [
  "390x844",
  "479x900",
  "480x900",
  "481x900",
  "639x900",
  "640x900",
  "641x900",
  "768x1024",
  "959x900",
  "1023x768",
  "1024x768",
  "1025x768",
  "1199x650",
  "1200x650",
  "1201x650",
  "1366x768",
  "1440x900",
  "1504x900",
  "1728x900",
  "1984x1046",
];

function fail(message, details = {}) {
  throw new Error(`${message}\n${JSON.stringify(details, null, 2)}`);
}

function parseViewports(raw) {
  return raw.split(",").map((value) => {
    const [width, height] = value.split("x").map(Number);
    if (!width || !height) fail("Invalid responsive viewport", { value });
    return { width, height, name: `${width}x${height}` };
  });
}

function walkAstroPages(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return walkAstroPages(path);
    return entry.isFile() && entry.name.endsWith(".astro") ? [path] : [];
  });
}

function pagePathToRoute(path) {
  const sourcePath = relative(pagesRoot, path).split(sep).join("/");
  if (sourcePath.includes("[")) {
    fail("Dynamic Astro page needs an explicit responsive fixture before it can ship", { sourcePath });
  }
  if (sourcePath === "404.astro") return "/404.html";

  const withoutExtension = sourcePath.replace(/\.astro$/, "");
  if (withoutExtension === "index") return "/";
  if (withoutExtension.endsWith("/index")) return `/${withoutExtension.slice(0, -6)}/`;
  return `/${withoutExtension}/`;
}

const routes = walkAstroPages(pagesRoot).map(pagePathToRoute).sort();
const viewports = parseViewports(
  process.env.RESPONSIVE_LAYOUT_VIEWPORTS || defaultViewports.join(","),
);

function assertGenericLayout(result) {
  if (result.runtimeErrors.length) {
    fail("Unexpected browser runtime errors", result);
  }

  if (result.documentWidth > result.viewport.width + 1) {
    fail("Horizontal document overflow", result);
  }
  if (result.bodyWidth > result.viewport.width + 1) {
    fail("Body is wider than the viewport", result);
  }
  if (result.fullyOffscreenControls.length) {
    fail("Visible interactive controls are fully outside the viewport", result);
  }
}

function assertHomeHero(result) {
  if (result.route !== "/") return;
  if (!result.hero) fail("Homepage hero is missing", result);

  const ctaText = result.homeAnchors.ctaText;
  if (!ctaText) fail("Homepage CTA label is missing", result);
  if (Math.abs(ctaText.effectiveFontPx - 14) > 0.5) {
    fail("Homepage CTA label has inconsistent rendered typography", result);
  }
  if (ctaText.lineCount !== 1 || ctaText.renderedWidth < 170 || ctaText.renderedWidth > 200) {
    fail("Homepage CTA label wraps or is visually scaled", result);
  }

  const expectedHeight = Math.max(result.viewport.height, 560);
  if (Math.abs(result.hero.height - expectedHeight) > 2) {
    fail("Homepage hero does not match the physical viewport height", {
      expectedHeight,
      ...result,
    });
  }

  if (result.viewport.width < 480 || result.viewport.width >= 1200) return;
  if (result.heroZoom !== "1") fail("Homepage tablet hero is still Tilda-scaled", result);

  for (const [name, box] of Object.entries(result.homeAnchors)) {
    if (!box) fail(`Homepage responsive anchor is missing: ${name}`, result);
    const isHeadline = name.startsWith("headline");
    const escapesHorizontally = isHeadline
      ? box.left < -2 || box.left > result.viewport.width - 2
      : box.left < -2 || box.right > result.viewport.width + 2;
    if (escapesHorizontally) {
      fail(`Homepage responsive anchor escapes horizontally: ${name}`, result);
    }
    if (box.top < -2 || box.bottom > result.hero.bottom + 2) {
      fail(`Homepage responsive anchor escapes the hero: ${name}`, result);
    }
  }

  if (result.homeAnchors.cta.top < result.homeAnchors.description.bottom + 6) {
    fail("Homepage CTA overlaps the description", result);
  }
}

async function measure(page, route, viewport) {
  return page.evaluate(({ route, viewport }) => {
    const box = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return {
        top: Number(rect.top.toFixed(2)),
        right: Number(rect.right.toFixed(2)),
        bottom: Number(rect.bottom.toFixed(2)),
        left: Number(rect.left.toFixed(2)),
        width: Number(rect.width.toFixed(2)),
        height: Number(rect.height.toFixed(2)),
        cssWidth: style.width,
        zoom: style.zoom,
        transform: style.transform,
        inlineStyle: element.getAttribute("style"),
      };
    };

    const fullyOffscreenControls = Array.from(
      document.querySelectorAll('a[href], button, input, select, textarea, [role="button"]'),
    )
      .filter((element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" &&
          Number(style.opacity) > 0.01 && rect.width > 2 && rect.height > 2 &&
          rect.bottom > 0 && rect.top < window.innerHeight &&
          (rect.right < -2 || rect.left > window.innerWidth + 2);
      })
      .slice(0, 10)
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        text: (element.textContent || element.getAttribute("aria-label") || "")
          .replace(/\s+/g, " ").trim().slice(0, 80),
        href: element.getAttribute("href"),
        box: (() => {
          const rect = element.getBoundingClientRect();
          return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
        })(),
      }));

    const heroElement = document.querySelector("#rec861352716 .t396__artboard");
    const hero = heroElement ? box("#rec861352716 .t396__artboard") : null;
    const textBox = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const range = document.createRange();
      range.selectNodeContents(element);
      const rect = range.getBoundingClientRect();
      return {
        top: Number(rect.top.toFixed(2)),
        right: Number(rect.right.toFixed(2)),
        bottom: Number(rect.bottom.toFixed(2)),
        left: Number(rect.left.toFixed(2)),
        width: Number(rect.width.toFixed(2)),
        height: Number(rect.height.toFixed(2)),
        parentInlineStyle: element.closest(".tn-elem")?.getAttribute("style") || null,
      };
    };
    const transformScale = (transform) => {
      if (!transform || transform === "none") return 1;
      const matrix = new DOMMatrixReadOnly(transform);
      return Math.hypot(matrix.a, matrix.b);
    };
    const textMetrics = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const style = getComputedStyle(element);
      const range = document.createRange();
      range.selectNodeContents(element);
      const rect = range.getBoundingClientRect();
      let effectiveScale = 1;
      for (let current = element; current instanceof Element; current = current.parentElement) {
        const currentStyle = getComputedStyle(current);
        const zoom = Number.parseFloat(currentStyle.zoom);
        if (Number.isFinite(zoom)) effectiveScale *= zoom;
        effectiveScale *= transformScale(currentStyle.transform);
      }
      const computedFontPx = Number.parseFloat(style.fontSize);
      return {
        computedFontPx: Number(computedFontPx.toFixed(2)),
        effectiveFontPx: Number((computedFontPx * effectiveScale).toFixed(2)),
        renderedWidth: Number(rect.width.toFixed(2)),
        renderedHeight: Number(rect.height.toFixed(2)),
        lineCount: range.getClientRects().length,
        whiteSpace: style.whiteSpace,
      };
    };

    return {
      route,
      viewport,
      url: location.href,
      title: document.title,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: Number(document.body.getBoundingClientRect().width.toFixed(2)),
      fullyOffscreenControls,
      hero,
      heroZoom: heroElement
        ? getComputedStyle(document.querySelector("#rec861352716")).getPropertyValue("--zoom").trim()
        : null,
      homeAnchors: route === "/" ? {
        headline1: textBox('#rec861352716 [data-elem-id="1738731786845"] .tn-atom'),
        headline2: textBox('#rec861352716 [data-elem-id="1738731869931"] .tn-atom'),
        headline3: textBox('#rec861352716 [data-elem-id="1738731897790"] .tn-atom'),
        description: box('#rec861352716 [data-elem-id="1738732845597"]'),
        cta: box('#rec861352716 [data-elem-id="1738735136250"]'),
        ctaText: textMetrics('#rec861352716 [data-elem-id="1738733079599"] .tn-atom'),
      } : {},
    };
  }, { route, viewport });
}

const localChromePath = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await chromium.launch({
  headless: true,
  ...(existsSync(localChromePath) ? { executablePath: localChromePath } : {}),
});
const results = [];

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: false,
    });
    const runtimeErrors = [];
    page.on("pageerror", (error) => runtimeErrors.push({
      message: error.message,
      stack: error.stack,
    }));
    await page.route("**/*", async (requestRoute) => {
      const request = requestRoute.request();
      const isLocalAsset = new URL(request.url()).origin === targetOriginUrl;

      if (request.resourceType() === "media" || !isLocalAsset) await requestRoute.abort();
      else await requestRoute.continue();
    });

    try {
      for (const route of routes) {
        runtimeErrors.length = 0;
        await page.goto(`${targetOrigin}${route}`, {
          waitUntil: "domcontentloaded",
          timeout: 30000,
        });
        await page.waitForTimeout(route === "/" ? 900 : 250);
        const result = {
          ...(await measure(page, route, viewport)),
          runtimeErrors: [...runtimeErrors],
        };
        assertGenericLayout(result);
        assertHomeHero(result);
        results.push({
          route,
          viewport: viewport.name,
          runtimeErrors: result.runtimeErrors,
        });
      }
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}

console.log(`Responsive layout check passed: ${routes.length} routes x ${viewports.length} viewports = ${results.length} cases`);
console.log(`Routes: ${routes.join(", ")}`);
console.log(`Viewports: ${viewports.map(({ name }) => name).join(", ")}`);

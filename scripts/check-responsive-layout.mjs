import { existsSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { chromium } from "playwright";

const pagesRoot = join(process.cwd(), "src", "pages");
function parseRunnerArgs(argv) {
  const options = { targetOrigin: null, watchTextSelectors: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--watch-text-selector") {
      const selector = argv[index + 1];
      if (!selector || selector.startsWith("--")) {
        fail("--watch-text-selector requires a CSS selector");
      }
      options.watchTextSelectors.push(selector);
      index += 1;
      continue;
    }
    if (argument === "--url") {
      const url = argv[index + 1];
      if (!url || url.startsWith("--")) fail("--url requires a URL");
      options.targetOrigin = url;
      index += 1;
      continue;
    }
    if (argument.startsWith("--")) fail("Unknown responsive layout option", { argument });
    if (options.targetOrigin) fail("Only one responsive layout URL is allowed", { argument });
    options.targetOrigin = argument;
  }
  return options;
}

const runnerOptions = parseRunnerArgs(process.argv.slice(2));
const watchTextSelectors = [...new Set([
  ...(process.env.RESPONSIVE_LAYOUT_WATCH_TEXT_SELECTORS || "").split(",").filter(Boolean),
  ...runnerOptions.watchTextSelectors,
])];
const targetOrigin = (process.env.RESPONSIVE_LAYOUT_URL || runnerOptions.targetOrigin || "http://127.0.0.1:4321").replace(/\/$/, "");
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
const routeSpecificGroups = [
  ...(viewports.some(({ name }) => name === "1232x582") ? [] : [{
      viewport: { width: 1232, height: 582, name: "1232x582" },
      routes: ["/articles/byudzhet-svadby-v-moskve/"],
    }]),
  ...(viewports.some(({ name }) => name === "1232x638") ? [] : [{
      viewport: { width: 1232, height: 638, name: "1232x638" },
      routes: [
        "/articles/",
        "/scenario/",
        "/articles/plan-podgotovki-k-svadbe/",
        "/articles/byudzhet-svadby-v-moskve/",
      ],
    }]),
  ...(viewports.some(({ name }) => name === "1280x720") ? [] : [{
      viewport: { width: 1280, height: 720, name: "1280x720" },
      routes: ["/articles/"],
    }]),
  ...(viewports.some(({ name }) => name === "1911x764") ? [] : [{
      viewport: { width: 1911, height: 764, name: "1911x764" },
      routes: [
        "/articles/",
        "/scenario/",
        "/articles/plan-podgotovki-k-svadbe/",
        "/articles/byudzhet-svadby-v-moskve/",
      ],
    }]),
  ...(viewports.some(({ name }) => name === "1911x839") ? [] : [{
      viewport: { width: 1911, height: 839, name: "1911x839" },
      routes: [
        "/articles/",
        "/scenario/",
        "/articles/plan-podgotovki-k-svadbe/",
        "/articles/byudzhet-svadby-v-moskve/",
      ],
    }]),
];
const routeSpecificCaseCount = routeSpecificGroups.reduce(
  (count, group) => count + group.routes.length,
  0,
);
const caseGroups = [
  ...viewports.map((viewport) => ({ viewport, routes })),
  ...routeSpecificGroups,
];

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

function assertFirstScreenPrimaryActions(result) {
  if (!result.firstScreenPrimaryActions) return;

  if (!result.firstScreenHeroHeading || !result.firstScreenHeroLead) {
    fail("First-screen Hero contract is missing its H1 or marked lead", result);
  }

  const bottomLimit = result.viewport.height - 12;
  if (result.firstScreenHeroHeading.top < -2 || result.firstScreenHeroLead.top < -2) {
    fail("First-screen Hero copy begins above the viewport", result);
  }
  if (result.firstScreenHeroHeading.bottom > result.firstScreenHeroLead.top + 2) {
    fail("First-screen Hero heading overlaps its lead", result);
  }
  if (result.firstScreenHeroLead.bottom > result.firstScreenPrimaryActions.top + 2) {
    fail("First-screen Hero lead overlaps its primary actions", result);
  }
  if (result.firstScreenPrimaryActions.bottom > bottomLimit) {
    fail("First-screen Hero primary actions fall below the initial viewport", {
      bottomLimit,
      ...result,
    });
  }
}

function assertWeddingArticleUi(result) {
  const weddingArticleRoutes = new Set([
    "/articles/",
    "/scenario/",
    "/articles/plan-podgotovki-k-svadbe/",
    "/articles/byudzhet-svadby-v-moskve/",
  ]);
  if (!weddingArticleRoutes.has(result.route)) return;
  if (!result.weddingArticleUi) fail("Wedding article UI kit is missing", result);

  const isMobile = result.viewport.width <= 640;
  const isShortDesktop = !isMobile && result.viewport.height <= 780;
  const isVeryShortDesktop = !isMobile && result.viewport.height <= 650;
  if (result.weddingArticleUi.mediaTransform !== "none") {
    fail("Wedding article portrait must not be decoratively scaled", result);
  }
  const expectedMediaPosition = isMobile ? "72% 0%" : "74% 0%";
  if (result.weddingArticleUi.mediaBackgroundPosition !== expectedMediaPosition) {
    fail("Wedding article portrait focal point drifted", result);
  }

  const expectedBodyFont = result.viewport.width <= 640 ? 17 : 19;
  if (result.weddingArticleUi.introBodyFontPx && Math.abs(result.weddingArticleUi.introBodyFontPx - expectedBodyFont) > 0.5) {
    fail("Wedding article introduction body scale drifted", {
      expectedBodyFont,
      ...result,
    });
  }
  if (result.weddingArticleUi.introBodyFontFamily && !result.weddingArticleUi.introBodyFontFamily.includes("Arial")) {
    fail("Wedding article introduction body left the shared sans role", result);
  }
  if (result.weddingArticleUi.introHeadingFontPx && result.weddingArticleUi.introHeadingFontPx > 38.5) {
    fail("Wedding article introduction heading is oversized", result);
  }
  if (result.weddingArticleUi.introBodyWidth && result.weddingArticleUi.introBodyWidth > 661) {
    fail("Wedding article introduction line measure is too wide", result);
  }

  const minimumHeadingToLeadGap = isMobile ? 18 : isVeryShortDesktop ? 24 : isShortDesktop ? 20 : 24;
  if (result.weddingArticleUi.headingToLeadGap < minimumHeadingToLeadGap - 1) {
    fail("Wedding article Hero heading and lead are visually compressed", {
      minimumHeadingToLeadGap,
      ...result,
    });
  }

  if (!isMobile) {
    if (result.weddingArticleUi.heroBottom > result.viewport.height + 1) {
      fail("Wedding article Hero exceeds the initial desktop viewport", result);
    }
    const expectedKickerTop = isShortDesktop ? 40 : 72;
    const expectedMetaBottomGap = isShortDesktop ? 40 : 76;
    if (Math.abs(result.weddingArticleUi.kickerTop - expectedKickerTop) > 1) {
      fail("Wedding article service line must keep the shared top anchor", result);
    }
    if (Math.abs(result.weddingArticleUi.metaBottomGap - expectedMetaBottomGap) > 1) {
      fail("Wedding article author row must keep the shared bottom anchor", result);
    }
    const minimumLaneGap = isVeryShortDesktop ? 32 : isShortDesktop ? 40 : 48;
    if (result.weddingArticleUi.kickerToHeadingGap < minimumLaneGap - 1
      || result.weddingArticleUi.contentToMetaGap < minimumLaneGap - 1) {
      fail("Wedding article Hero content is pinned against a lane edge", {
        minimumLaneGap,
        ...result,
      });
    }
    if (Math.abs(result.weddingArticleUi.kickerToHeadingGap - result.weddingArticleUi.contentToMetaGap) > 2) {
      fail("Wedding article Hero leaves its free space on only one side of the content group", result);
    }
  }
  const compactRoutes = new Set([
    "/articles/",
    "/articles/plan-podgotovki-k-svadbe/",
  ]);
  const shouldUseCompactHero = compactRoutes.has(result.route);
  if (result.weddingArticleUi.isCompact !== shouldUseCompactHero) {
    fail("Wedding article Hero selected an unapproved height role", result);
  }
  if (!isMobile && shouldUseCompactHero) {
    const expectedCompactHeroHeight = Math.min(640, Math.max(480, result.viewport.height * 0.64));
    if (Math.abs(result.weddingArticleUi.heroHeight - expectedCompactHeroHeight) > 2) {
      fail("Short editorial Hero lost its shared compact height", {
        expectedCompactHeroHeight,
        ...result,
      });
    }
  }
  if (result.route === "/articles/") {
    if (!result.articleHubUi || result.articleHubUi.cardCount < 1) {
      fail("Article hub published-material list is missing", result);
    }
    if (result.articleHubUi.hasIndependentPromo) {
      fail("Article hub must remain a catalogue without its own promotional CTA", result);
    }
    if (result.articleHubUi.cardHeadingFontPx > 42.5) {
      fail("Article hub card heading is oversized", result);
    }
    if (result.articleHubUi.cardBodyFontPx > 17.5) {
      fail("Article hub card body is oversized", result);
    }
  }

  if (result.weddingArticleUi.hasActions) {
    const minimumLeadToActionsGap = isMobile ? 20 : isVeryShortDesktop ? 28 : isShortDesktop ? 24 : 32;
    const minimumActionsToMetaGap = isMobile || isVeryShortDesktop ? 20 : isShortDesktop ? 24 : 32;
    if (result.weddingArticleUi.leadToActionsGap < minimumLeadToActionsGap - 1) {
      fail("Wedding article Hero lead and actions are visually compressed", {
        minimumLeadToActionsGap,
        ...result,
      });
    }
    if (result.weddingArticleUi.actionsToMetaGap < minimumActionsToMetaGap - 1) {
      fail("Wedding article Hero actions and author metadata are visually compressed", {
        minimumActionsToMetaGap,
        ...result,
      });
    }
    if (result.weddingArticleUi.actionControlHeight < 41) {
      fail("Wedding article primary action controls are visually undersized", result);
    }
  }
}

function assertWeddingArticleCrossRouteConsistency(results) {
  const canonicalRoutes = [
    "/articles/",
    "/scenario/",
    "/articles/plan-podgotovki-k-svadbe/",
    "/articles/byudzhet-svadby-v-moskve/",
  ];
  const byViewport = new Map();
  for (const result of results) {
    if (!canonicalRoutes.includes(result.route)) continue;
    const group = byViewport.get(result.viewport.name) || [];
    group.push(result);
    byViewport.set(result.viewport.name, group);
  }

  for (const [viewport, group] of byViewport) {
    if (group.length !== canonicalRoutes.length) continue;
    const ui = group.map(({ weddingArticleUi }) => weddingArticleUi);
    const reference = ui[0];
    for (const candidate of ui.slice(1)) {
      for (const [metric, tolerance] of [
        ["kickerTop", 1],
        ["headingFontPx", 0.5],
        ["leadFontPx", 0.5],
        ["metaBottomGap", 1],
      ]) {
        if (Math.abs(candidate[metric] - reference[metric]) > tolerance) {
          fail("Wedding article routes drifted from the shared Hero system", {
            viewport,
            metric,
            reference,
            candidate,
          });
        }
      }
      if (candidate.mediaBackgroundPosition !== reference.mediaBackgroundPosition) {
        fail("Wedding article routes drifted from the shared portrait focal point", {
          viewport,
          reference,
          candidate,
        });
      }
    }
  }
}

async function measure(page, route, viewport, watchedTextSelectors) {
  return page.evaluate(({ route, viewport, watchedTextSelectors }) => {
    const elementBox = (element) => {
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
    const box = (selector) => elementBox(document.querySelector(selector));

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
    const firstScreenPrimaryActionsElement = document.querySelector("[data-first-screen-primary-actions]");
    const firstScreenHero = firstScreenPrimaryActionsElement?.closest("header") || null;
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
    const weddingArticleHero = document.querySelector(".tg-article-hero");
    const weddingArticleKicker = weddingArticleHero?.querySelector(".tg-article-hero__kicker");
    const weddingArticleHeading = weddingArticleHero?.querySelector("h1");
    const weddingArticleLead = weddingArticleHero?.querySelector(".tg-article-hero__lead");
    const weddingArticleContent = weddingArticleHero?.querySelector(".tg-article-hero__content");
    const weddingArticleActions = weddingArticleHero?.querySelector("[data-first-screen-primary-actions]");
    const weddingArticleMeta = weddingArticleHero?.querySelector(".tg-article-hero__meta");
    const weddingArticleMedia = weddingArticleHero?.querySelector(".tg-article-hero__media");
    const weddingArticleIntroBody = document.querySelector(".tg-article-intro__prose p");
    const weddingArticleIntroHeading = document.querySelector(".tg-article-intro h2");
    const articleHubCardHeading = document.querySelector(".library-card h3");
    const articleHubCardBody = document.querySelector(".library-card p");
    const weddingArticleUi = weddingArticleHero && weddingArticleKicker && weddingArticleHeading && weddingArticleMedia && weddingArticleLead
      ? {
          kickerToHeadingGap: Number((weddingArticleHeading.getBoundingClientRect().top - weddingArticleKicker.getBoundingClientRect().bottom).toFixed(2)),
          kickerTop: Number(weddingArticleKicker.getBoundingClientRect().top.toFixed(2)),
          headingFontPx: Number.parseFloat(getComputedStyle(weddingArticleHeading).fontSize),
          leadFontPx: Number.parseFloat(getComputedStyle(weddingArticleLead).fontSize),
          headingToLeadGap: weddingArticleLead
            ? Number((weddingArticleLead.getBoundingClientRect().top - weddingArticleHeading.getBoundingClientRect().bottom).toFixed(2))
            : null,
          hasActions: Boolean(weddingArticleActions),
          isCompact: weddingArticleHero.dataset.heroHeight === "compact",
          leadToActionsGap: weddingArticleLead && weddingArticleActions
            ? Number((weddingArticleActions.getBoundingClientRect().top - weddingArticleLead.getBoundingClientRect().bottom).toFixed(2))
            : null,
          contentToMetaGap: weddingArticleContent && weddingArticleMeta
            ? Number((weddingArticleMeta.getBoundingClientRect().top - weddingArticleContent.getBoundingClientRect().bottom).toFixed(2))
            : null,
          actionsToMetaGap: weddingArticleActions && weddingArticleMeta
            ? Number((weddingArticleMeta.getBoundingClientRect().top - weddingArticleActions.getBoundingClientRect().bottom).toFixed(2))
            : null,
          actionControlHeight: weddingArticleActions
            ? Number(weddingArticleActions.querySelector("a, button")?.getBoundingClientRect().height.toFixed(2) || 0)
            : null,
          heroBottom: Number(weddingArticleHero.getBoundingClientRect().bottom.toFixed(2)),
          heroHeight: Number(weddingArticleHero.getBoundingClientRect().height.toFixed(2)),
          metaBottomGap: weddingArticleMeta
            ? Number((weddingArticleHero.getBoundingClientRect().bottom - weddingArticleMeta.getBoundingClientRect().bottom).toFixed(2))
            : null,
          mediaTransform: getComputedStyle(weddingArticleMedia).transform,
          mediaBackgroundPosition: getComputedStyle(weddingArticleMedia).backgroundPosition,
          introBodyFontFamily: weddingArticleIntroBody ? getComputedStyle(weddingArticleIntroBody).fontFamily : null,
          introBodyFontPx: weddingArticleIntroBody ? Number.parseFloat(getComputedStyle(weddingArticleIntroBody).fontSize) : null,
          introBodyWidth: weddingArticleIntroBody
            ? Number(weddingArticleIntroBody.closest(".tg-article-intro__prose").getBoundingClientRect().width.toFixed(2))
            : null,
          introHeadingFontPx: weddingArticleIntroHeading
            ? Number.parseFloat(getComputedStyle(weddingArticleIntroHeading).fontSize)
            : null,
        }
      : null;

    return {
      route,
      viewport,
      url: location.href,
      title: document.title,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: Number(document.body.getBoundingClientRect().width.toFixed(2)),
      fullyOffscreenControls,
      hero,
      firstScreenPrimaryActions: elementBox(firstScreenPrimaryActionsElement),
      firstScreenHeroHeading: elementBox(firstScreenHero?.querySelector("h1")),
      firstScreenHeroLead: elementBox(firstScreenHero?.querySelector("[data-first-screen-lead]")),
      weddingArticleUi,
      articleHubUi: route === "/articles/" ? {
        cardCount: document.querySelectorAll(".library-card").length,
        hasIndependentPromo: Boolean(document.querySelector(".library-start, .library-next, .library-button")),
        cardHeadingFontPx: articleHubCardHeading
          ? Number.parseFloat(getComputedStyle(articleHubCardHeading).fontSize)
          : null,
        cardBodyFontPx: articleHubCardBody
          ? Number.parseFloat(getComputedStyle(articleHubCardBody).fontSize)
          : null,
      } : null,
      heroZoom: heroElement
        ? getComputedStyle(document.querySelector("#rec861352716")).getPropertyValue("--zoom").trim()
        : null,
      watchedText: watchedTextSelectors.map((selector) => {
        const metrics = textMetrics(selector);
        return metrics ? { selector, found: true, ...metrics } : { selector, found: false };
      }),
      homeAnchors: route === "/" ? {
        headline1: textBox('#rec861352716 [data-elem-id="1738731786845"] .tn-atom'),
        headline2: textBox('#rec861352716 [data-elem-id="1738731869931"] .tn-atom'),
        headline3: textBox('#rec861352716 [data-elem-id="1738731897790"] .tn-atom'),
        description: box('#rec861352716 [data-elem-id="1738732845597"]'),
        cta: box('#rec861352716 [data-elem-id="1738735136250"]'),
        ctaText: textMetrics('#rec861352716 [data-elem-id="1738733079599"] .tn-atom'),
      } : {},
    };
  }, { route, viewport, watchedTextSelectors });
}

const localChromePath = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await chromium.launch({
  headless: true,
  ...(existsSync(localChromePath) ? { executablePath: localChromePath } : {}),
});
const results = [];
const weddingArticleResults = [];

try {
  for (const { viewport, routes: caseRoutes } of caseGroups) {
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
      for (const route of caseRoutes) {
        runtimeErrors.length = 0;
        await page.goto(`${targetOrigin}${route}`, {
          waitUntil: "domcontentloaded",
          timeout: 30000,
        });
        await page.waitForFunction(
          () => [...document.querySelectorAll('link[rel="stylesheet"]')].every((link) => Boolean(link.sheet)),
          null,
          { timeout: 5000 },
        );
        await page.waitForTimeout(route === "/" ? 900 : 80);
        const result = {
          ...(await measure(page, route, viewport, watchTextSelectors)),
          runtimeErrors: [...runtimeErrors],
        };
        assertGenericLayout(result);
        assertHomeHero(result);
        assertFirstScreenPrimaryActions(result);
        assertWeddingArticleUi(result);
        if (result.weddingArticleUi) weddingArticleResults.push(result);
        results.push({
          route,
          viewport: viewport.name,
          runtimeErrors: result.runtimeErrors,
          watchedText: result.watchedText,
        });
      }
    } finally {
      await page.close();
    }
  }
  assertWeddingArticleCrossRouteConsistency(weddingArticleResults);
} finally {
  await browser.close();
}

console.log(`Responsive layout check passed: ${results.length} cases (${routes.length} routes x ${viewports.length} shared viewports + ${routeSpecificCaseCount} route-specific)`);
console.log(`Routes: ${routes.join(", ")}`);
console.log(`Viewports: ${viewports.map(({ name }) => name).join(", ")}`);
if (routeSpecificGroups.length) {
  console.log(`Route-specific viewports: ${routeSpecificGroups.map(({ viewport, routes: specificRoutes }) => `${viewport.name} -> ${specificRoutes.join(", ")}`).join("; ")}`);
}
if (watchTextSelectors.length) {
  console.log(`Watched text metrics:\n${JSON.stringify(results.map(({ route, viewport, watchedText }) => ({ route, viewport, watchedText })), null, 2)}`);
}

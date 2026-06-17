import { chromium } from "playwright";

const targetUrl =
  process.env.MATERIALS_LAYOUT_URL ||
  process.argv[2] ||
  "http://127.0.0.1:4321/materials/";
const viewports = (process.env.MATERIALS_LAYOUT_VIEWPORTS || "1200x900,1440x900,1911x1064,390x844")
  .split(",")
  .map((viewport) => {
    const [width, height] = viewport.split("x").map(Number);
    if (!width || !height) fail("Invalid MATERIALS_LAYOUT_VIEWPORTS value", { viewport });
    return { width, height, name: viewport };
  });

const orangeColor = "rgb(250, 70, 4)";

function fail(message, details = {}) {
  const error = new Error(`${message}\n${JSON.stringify(details, null, 2)}`);
  error.details = details;
  throw error;
}

function assertMaterialsLayout(result) {
  const { viewport, footer, artboard, orange, cta, bottomPixel, bottomSamples } = result;
  const isMobile = viewport.width < 640;

  if (!footer || !artboard || !orange) {
    fail("Materials footer elements are missing", result);
  }

  if (!cta?.section || !cta?.primary || !cta?.secondary) {
    fail("Materials CTA elements are missing", result);
  }

  if (result.scrollY !== result.expectedMaxScrollY) {
    fail("Materials page did not reach max scroll before footer check", result);
  }

  if (bottomPixel.bg !== orangeColor) {
    fail("Materials footer bottom pixel is not orange", result);
  }

  const nonOrangeBottomSample = bottomSamples.find((sample) => sample.bg !== orangeColor);

  if (nonOrangeBottomSample) {
    fail("Materials footer bottom samples include non-orange pixels", {
      nonOrangeBottomSample,
      ...result,
    });
  }

  if (!isMobile && Math.abs(result.footerMinusOrange) > 2) {
    fail("Materials desktop footer record no longer ends with the orange shape", result);
  }

  if (isMobile && artboard.bg !== orangeColor) {
    fail("Materials mobile footer artboard is not orange", result);
  }

  if (cta.primaryElementAtCenter !== "cta" || cta.secondaryElementAtCenter !== "cta") {
    fail("Materials CTA buttons are covered by a neighboring Tilda layer", result);
  }

  if (cta.nextRecordOverlap < -2) {
    fail("Materials next Tilda record overlaps the CTA", result);
  }

  if (cta.primary.height < 24 || cta.secondary.height < 24) {
    fail("Materials CTA buttons collapsed vertically", result);
  }
}

async function measurePage(page) {
  const ctaMetrics = await page.evaluate(() => {
    document.querySelector("#materials-followup-cta")?.scrollIntoView({
      block: "center",
      inline: "nearest",
    });
  });
  void ctaMetrics;
  await page.waitForTimeout(500);

  const cta = await page.evaluate(() => {
    const ctaSection = document.querySelector("#materials-followup-cta");
    const primaryButton = document.querySelector("#materials-followup-cta .tg-plan-cta__button--primary");
    const secondaryButton = document.querySelector("#materials-followup-cta .tg-plan-cta__button--secondary");
    const nextRecord = document.querySelector("#rec862055949");

    const box = (element) => {
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);

      return {
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        width: rect.width,
        height: rect.height,
        pageTop: rect.top + window.scrollY,
        pageBottom: rect.bottom + window.scrollY,
        bg: style.backgroundColor,
        display: style.display,
        visibility: style.visibility,
        opacity: Number(style.opacity),
      };
    };
    const centeredElementOwner = (element) => {
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      const owner = document.elementFromPoint(
        Math.round(rect.left + rect.width / 2),
        Math.round(rect.top + rect.height / 2),
      );

      if (!owner) return null;
      if (owner.closest("#materials-followup-cta")) return "cta";
      if (owner.closest("#rec862055949")) return "next-record";
      if (owner.closest(".t-rec")) return owner.closest(".t-rec")?.id || "t-rec";
      return owner.tagName.toLowerCase();
    };
    const ctaBox = box(ctaSection);
    const nextRecordBox = box(nextRecord);

    return {
      scrollY: window.scrollY,
      section: ctaBox,
      primary: box(primaryButton),
      secondary: box(secondaryButton),
      primaryElementAtCenter: centeredElementOwner(primaryButton),
      secondaryElementAtCenter: centeredElementOwner(secondaryButton),
      nextRecord: nextRecordBox,
      nextRecordOverlap: ctaBox && nextRecordBox
        ? Number((nextRecordBox.pageTop - ctaBox.pageBottom).toFixed(2))
        : null,
    };
  });

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(500);

  const footer = await page.evaluate(() => {
    const footer = document.querySelector("#rec862623921");
    const artboard = document.querySelector("#rec862623921 .t396__artboard");
    const orange = document.querySelector('#rec862623921 .tn-elem[data-elem-id="1738906924130"]');

    const box = (element) => {
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);

      return {
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        width: rect.width,
        height: rect.height,
        pageTop: rect.top + window.scrollY,
        pageBottom: rect.bottom + window.scrollY,
        bg: style.backgroundColor,
        display: style.display,
        visibility: style.visibility,
        opacity: Number(style.opacity),
      };
    };
    const pixelAt = (x, y) => {
      const element = document.elementFromPoint(x, y);
      const style = element ? getComputedStyle(element) : null;

      return {
        x,
        y,
        tag: element?.tagName || null,
        id: element?.id || null,
        className: String(element?.className || ""),
        bg: style?.backgroundColor || null,
      };
    };
    const footerBox = box(footer);
    const orangeBox = box(orange);
    const sampleX = Math.floor(window.innerWidth / 2);
    const bottomSampleY = Math.max(0, window.innerHeight - 1);
    const bottomSamples = [1, 4, 8, 12]
      .map((offset) => Math.max(0, window.innerHeight - offset))
      .map((y) => pixelAt(sampleX, y));

    return {
      url: window.location.href,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      scrollY: window.scrollY,
      expectedMaxScrollY: document.documentElement.scrollHeight - window.innerHeight,
      documentHeight: document.documentElement.scrollHeight,
      footer: footerBox,
      artboard: box(artboard),
      orange: orangeBox,
      footerMinusOrange: footerBox && orangeBox
        ? Number((footerBox.pageBottom - orangeBox.pageBottom).toFixed(2))
        : null,
      bottomPixel: pixelAt(sampleX, bottomSampleY),
      bottomSamples,
    };
  });

  return {
    ...footer,
    cta,
  };
}

const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({
      viewport: {
        width: viewport.width,
        height: viewport.height,
      },
      isMobile: viewport.width < 640,
    });

    await page.goto(targetUrl, {
      waitUntil: "load",
      timeout: 60000,
    });

    const result = await measurePage(page);
    results.push(result);
    assertMaterialsLayout(result);
    await page.close();
  }
} finally {
  await browser.close();
}

console.log("Materials layout check passed");
console.log(JSON.stringify(results, null, 2));

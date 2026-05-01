import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";

const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const targetUrl =
  process.env.CONTACT_LAYOUT_URL ||
  process.argv[2] ||
  "http://127.0.0.1:4321/timurgromov-site-2026_2/";
const viewports = (process.env.CONTACT_LAYOUT_VIEWPORTS || "1911x1064,1440x900")
  .split(",")
  .map((viewport) => {
    const [width, height] = viewport.split("x").map(Number);
    if (!width || !height) fail("Invalid CONTACT_LAYOUT_VIEWPORTS value", { viewport });
    return { width, height };
  });
const port = Number(process.env.CONTACT_LAYOUT_DEBUG_PORT || 9300 + (process.pid % 500));
const userDataDir = mkdtempSync(join(tmpdir(), "contact-layout-chrome-"));

let chrome;

function fail(message, details = {}) {
  const error = new Error(`${message}\n${JSON.stringify(details, null, 2)}`);
  error.details = details;
  throw error;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForJson(url, timeoutMs = 8000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch {
      // Chrome can take a moment to expose the DevTools endpoint.
    }

    await wait(150);
  }

  fail("Chrome DevTools endpoint did not start", { url });
}

async function waitForPageTarget(timeoutMs = 8000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    const targets = await waitForJson(`http://127.0.0.1:${port}/json/list`, 1000);
    const page = targets.find((target) => target.type === "page" && target.webSocketDebuggerUrl);
    if (page) return page;
    await wait(150);
  }

  fail("Chrome page target did not start");
}

function createCdpClient(webSocketUrl) {
  const socket = new WebSocket(webSocketUrl);
  const callbacks = new Map();
  const events = new Map();
  let nextId = 1;

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);

    if (message.id && callbacks.has(message.id)) {
      const { resolve, reject } = callbacks.get(message.id);
      callbacks.delete(message.id);
      if (message.error) reject(new Error(JSON.stringify(message.error)));
      else resolve(message.result || {});
      return;
    }

    if (message.method && events.has(message.method)) {
      for (const listener of events.get(message.method)) listener(message.params || {});
    }
  });

  return {
    async ready() {
      if (socket.readyState === WebSocket.OPEN) return;
      await new Promise((resolve, reject) => {
        socket.addEventListener("open", resolve, { once: true });
        socket.addEventListener("error", reject, { once: true });
      });
    },
    send(method, params = {}) {
      const id = nextId++;
      socket.send(JSON.stringify({ id, method, params }));
      return new Promise((resolve, reject) => {
        callbacks.set(id, { resolve, reject });
      });
    },
    once(method) {
      return new Promise((resolve) => {
        const listener = (params) => {
          events.get(method).delete(listener);
          resolve(params);
        };
        if (!events.has(method)) events.set(method, new Set());
        events.get(method).add(listener);
      });
    },
    close() {
      socket.close();
    },
  };
}

async function evaluate(cdp, expression, awaitPromise = true) {
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise,
    returnByValue: true,
  });

  if (result.exceptionDetails) {
    fail("Runtime evaluation failed", result.exceptionDetails);
  }

  return result.result?.value;
}

async function loadPage(cdp, width, height) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: false,
  });
  const loaded = cdp.once("Page.loadEventFired");
  await cdp.send("Page.navigate", { url: targetUrl });
  await loaded;
  await evaluate(
    cdp,
    `new Promise((resolve) => {
      const done = () => setTimeout(resolve, 1800);
      if (document.readyState === 'complete') done();
      else window.addEventListener('load', done, { once: true });
    })`,
  );
}

async function getLayout(cdp, mode) {
  return evaluate(
    cdp,
    `(async () => {
      const popupMode = ${JSON.stringify(mode === "popup")};
      const byId = (record, id) => document.querySelector(record + ' .tn-elem[data-elem-id="' + id + '"]');
      const rectOf = (element) => {
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return {
          top: rect.top,
          left: rect.left,
          right: rect.right,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height,
          display: style.display,
          visibility: style.visibility,
          opacity: Number(style.opacity),
          text: element.textContent.replace(/\\s+/g, ' ').trim(),
        };
      };
      const linkInfo = (record) => Array.from(
        document.querySelectorAll(record + ' .contact-shortcut-inline__link')
      ).map((link) => {
        const rect = link.getBoundingClientRect();
        const style = getComputedStyle(link);
        return {
          text: link.textContent.trim(),
          href: link.href,
          color: style.color,
          textFillColor: style.webkitTextFillColor,
          top: rect.top,
          left: rect.left,
          right: rect.right,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height,
        };
      });

      if (popupMode) {
        document.querySelector('a[href="#zeropopup-menu"]')?.click();
        await new Promise((resolve) => setTimeout(resolve, 1600));
      } else {
        document.querySelector('#rec862623921')?.scrollIntoView({ block: 'center' });
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      const record = popupMode ? '#rec862707608' : '#rec862623921';
      const phoneId = popupMode ? '1738924888767' : '1738908167577';
      const shortcutId = popupMode ? '1746200000001' : '1746200000002';
      const socialId = popupMode ? '1738924888797' : '1738908201655';
      const orangeShapeId = popupMode ? '1738923690320' : '1738906924130';

      return {
        mode: popupMode ? 'popup' : 'footer',
        viewport: { width: window.innerWidth, height: window.innerHeight },
        phone: rectOf(byId(record, phoneId)),
        shortcut: rectOf(byId(record, shortcutId)),
        social: rectOf(byId(record, socialId)),
        orangeShape: rectOf(byId(record, orangeShapeId)),
        links: linkInfo(record),
      };
    })()`,
  );
}

function assertLayout(layout) {
  const { mode, phone, shortcut, social, orangeShape, links } = layout;
  const telegram = links.find((link) => link.text === "Telegram");
  const max = links.find((link) => link.text === "MAX");

  if (!phone || !shortcut || !orangeShape) fail(`${mode}: required elements missing`, layout);
  if (!telegram || !max) fail(`${mode}: Telegram/MAX links missing`, layout);
  if (shortcut.display === "none" || shortcut.visibility === "hidden" || shortcut.opacity === 0) {
    fail(`${mode}: shortcut is not visible`, layout);
  }
  if (!shortcut.text.includes("Написать мне") || !shortcut.text.includes("Telegram") || !shortcut.text.includes("MAX")) {
    fail(`${mode}: shortcut text is incomplete`, layout);
  }
  if (shortcut.top < phone.bottom + 4) fail(`${mode}: shortcut overlaps phone`, layout);
  if (shortcut.top > phone.bottom + 80) fail(`${mode}: shortcut is too far from phone`, layout);
  if (social && social.top < shortcut.bottom + 14) fail(`${mode}: social row overlaps shortcut`, layout);
  if (max.right > orangeShape.right + 2) fail(`${mode}: MAX link is clipped on the right`, layout);
  if (shortcut.bottom > orangeShape.bottom - 12) fail(`${mode}: shortcut is too close to orange block bottom`, layout);

  for (const link of [telegram, max]) {
    const whiteEnough =
      link.color === "rgb(255, 254, 250)" ||
      link.textFillColor === "rgb(255, 254, 250)" ||
      link.color === "rgb(255, 255, 255)" ||
      link.textFillColor === "rgb(255, 255, 255)";
    if (!whiteEnough) fail(`${mode}: ${link.text} link is not white`, layout);
  }
}

async function main() {
  chrome = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    "about:blank",
  ], {
    stdio: "ignore",
  });

  await waitForJson(`http://127.0.0.1:${port}/json/version`);
  const pageTarget = await waitForPageTarget();
  const cdp = createCdpClient(pageTarget.webSocketDebuggerUrl);
  await cdp.ready();
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  const results = [];

  for (const viewport of viewports) {
    await loadPage(cdp, viewport.width, viewport.height);

    const footer = await getLayout(cdp, "footer");
    assertLayout(footer);
    const popup = await getLayout(cdp, "popup");
    assertLayout(popup);
    results.push({ viewport, footer, popup });
  }

  cdp.close();

  console.log("Contact layout check passed");
  console.log(JSON.stringify(results, null, 2));
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (chrome && chrome.exitCode === null) {
      const exited = new Promise((resolve) => chrome.once("exit", resolve));
      chrome.kill("SIGTERM");
      await Promise.race([exited, wait(1200)]);
      if (chrome.exitCode === null) {
        chrome.kill("SIGKILL");
        await Promise.race([exited, wait(1200)]);
      }
    }
    rmSync(userDataDir, {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 200,
    });
  });

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";

const chromePath = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const siteUrl = process.env.PAID_LANDING_URL || "https://timurgromov.ru/";
const debugPort = Number(process.env.PAID_LANDING_DEBUG_PORT || 9400 + (process.pid % 400));
const userDataDir = mkdtempSync(join(tmpdir(), "paid-landing-playback-"));
let chrome;

function fail(message, details = {}) {
  const error = new Error(`${message}\n${JSON.stringify(details, null, 2)}`);
  error.details = details;
  throw error;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForJson(url, timeoutMs = 10000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch {
      // Chrome is still starting.
    }
    await wait(150);
  }
  fail("Chrome DevTools endpoint did not start", { url });
}

function createCdpClient(webSocketUrl) {
  const socket = new WebSocket(webSocketUrl);
  const callbacks = new Map();
  let nextId = 1;
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !callbacks.has(message.id)) return;
    const { resolve, reject } = callbacks.get(message.id);
    callbacks.delete(message.id);
    if (message.error) reject(new Error(JSON.stringify(message.error)));
    else resolve(message.result || {});
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
      return new Promise((resolve, reject) => callbacks.set(id, { resolve, reject }));
    },
    close() { socket.close(); },
  };
}

async function evaluate(cdp, expression) {
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) fail("Page evaluation failed", result.exceptionDetails);
  return result.result?.value;
}

async function checkViewport(cdp, width, height) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 640,
  });
  await cdp.send("Page.navigate", { url: siteUrl });
  await wait(3500);
  const state = await evaluate(cdp, `(() => {
    const hero = document.querySelector('.hero-native-video');
    const consultation = document.querySelector('[data-consultation-popup-open]');
    const form = document.querySelector('[data-consultation-lead-form]');
    if (!hero || !consultation || !form) return { missing: { hero: !hero, consultation: !consultation, form: !form } };
    return new Promise(async (resolve) => {
      hero.muted = true;
      try { await hero.play(); } catch (error) { resolve({ playError: String(error) }); return; }
      setTimeout(() => resolve({
        currentSrc: hero.currentSrc,
        readyState: hero.readyState,
        currentTime: hero.currentTime,
        paused: hero.paused,
        error: hero.error ? { code: hero.error.code, message: hero.error.message || '' } : null,
      }), 500);
    });
  })()`);
  if (state?.missing || state?.playError || state?.error || state?.readyState < 2 || state?.paused || state?.currentTime <= 0) {
    fail("Hero video playback check failed", { viewport: { width, height }, state });
  }
  return { viewport: { width, height }, ...state };
}

async function main() {
  chrome = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--autoplay-policy=no-user-gesture-required",
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${userDataDir}`,
    "about:blank",
  ], { stdio: "ignore" });
  const targets = await waitForJson(`http://127.0.0.1:${debugPort}/json/list`);
  const page = targets.find((target) => target.type === "page" && target.webSocketDebuggerUrl);
  if (!page) fail("Chrome page target is missing");
  const cdp = createCdpClient(page.webSocketDebuggerUrl);
  await cdp.ready();
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  const results = [];
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    results.push(await checkViewport(cdp, viewport.width, viewport.height));
  }
  cdp.close();
  console.log(JSON.stringify({ status: "ok", checkedAt: new Date().toISOString(), results }, null, 2));
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
      await Promise.race([exited, wait(1500)]);
      if (chrome.exitCode === null) chrome.kill("SIGKILL");
    }
    rmSync(userDataDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 150 });
  });

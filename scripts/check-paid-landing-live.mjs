import { readFileSync } from "node:fs";

const siteUrl = process.env.PAID_LANDING_URL || "https://timurgromov.ru/";
const crmHealthUrl = process.env.PAID_LANDING_CRM_HEALTH_URL || "https://calcul.timurgromov.ru/api/v1/health";
const timeoutMs = Number(process.env.PAID_LANDING_TIMEOUT_MS || 12000);
const videoSourcePath = "src/site/home-data.ts";

function fail(message, details = {}) {
  const error = new Error(`${message}\n${JSON.stringify(details, null, 2)}`);
  error.details = details;
  throw error;
}

async function request(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { cache: "no-store", signal: controller.signal, ...options });
  } finally {
    clearTimeout(timer);
  }
}

function criticalVideoUrls() {
  const source = readFileSync(videoSourcePath, "utf8");
  const baseUrlMatch = source.match(/videoMediaBaseUrl\s*=\s*"([^"]+)"/);
  if (!baseUrlMatch) fail("Cannot resolve the configured video media base URL");
  const baseUrl = baseUrlMatch[1];
  const fileNames = [...source.matchAll(/\$\{videoMediaBaseUrl\}\/([^`"']+\.mp4)/g)]
    .map((match) => match[1]);
  const urls = [...new Set(fileNames.map((fileName) => `${baseUrl}/${fileName}`))];
  if (urls.length < 2) fail("Critical video registry is unexpectedly incomplete", { urls });
  return urls;
}

async function checkVideo(url) {
  const response = await request(url, {
    headers: { Range: "bytes=0-1023" },
  });
  const contentType = response.headers.get("content-type") || "";
  const okStatus = response.status === 200 || response.status === 206;
  const okContentType = contentType.startsWith("video/") || contentType === "application/octet-stream";
  if (!okStatus || !okContentType) {
    fail("Critical video is unavailable", { url, status: response.status, contentType });
  }
  await response.arrayBuffer();
  return { url, status: response.status, contentType };
}

async function main() {
  const siteResponse = await request(siteUrl);
  if (!siteResponse.ok) fail("Paid landing is unavailable", { url: siteUrl, status: siteResponse.status });
  const html = await siteResponse.text();
  const requiredMarkers = [
    "data-consultation-popup-open",
    "data-consultation-lead-form",
    "tel:+79253900772",
    "site_consultation_submit_success",
    "window.tgGetTrackingBundle",
  ];
  const missingMarkers = requiredMarkers.filter((marker) => !html.includes(marker));
  if (missingMarkers.length) fail("Paid landing contract is incomplete", { url: siteUrl, missingMarkers });

  const healthResponse = await request(crmHealthUrl);
  const health = await healthResponse.json().catch(() => null);
  if (!healthResponse.ok || health?.status !== "ok") {
    fail("CRM health check failed", { url: crmHealthUrl, status: healthResponse.status, health });
  }

  const videos = [];
  for (const url of criticalVideoUrls()) videos.push(await checkVideo(url));

  console.log(JSON.stringify({
    status: "ok",
    checkedAt: new Date().toISOString(),
    site: { url: siteUrl, status: siteResponse.status, requiredMarkers },
    crm: { url: crmHealthUrl, status: healthResponse.status },
    videos,
  }, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

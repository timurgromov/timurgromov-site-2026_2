import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const heroSlideIds = ["01-smile", "02-microphone", "03-full-length", "04-grey-suit", "05-gesture"];

async function verifyDistinctJubileeHeroAssets() {
  const hashes = await Promise.all(heroSlideIds.map(async (slideId) => {
    const asset = await readFile(resolve(root, `public/yubiley-assets/assets/hero/slider/hero-${slideId}-1024.avif`));
    return createHash("sha256").update(asset).digest("hex");
  }));
  if (new Set(hashes).size !== heroSlideIds.length) {
    throw new Error("Jubilee hero slider: duplicate 1024px AVIF assets detected");
  }
}

await verifyDistinctJubileeHeroAssets();

const port = Number(process.env.RESPONSIVE_LAYOUT_PREVIEW_PORT || 4600 + (process.pid % 300));
const url = `http://127.0.0.1:${port}`;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForPreview(child, output, timeoutMs = 15000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (child.exitCode !== null) {
      throw new Error(`Astro preview exited before becoming ready:\n${output.join("")}`);
    }
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Preview is still starting.
    }
    await wait(200);
  }
  throw new Error(`Astro preview did not start at ${url}\n${output.join("")}`);
}

async function stopProcessGroup(child) {
  if (!child || child.exitCode !== null) return;
  const exited = new Promise((resolve) => child.once("exit", resolve));
  try {
    process.kill(-child.pid, "SIGTERM");
  } catch {
    child.kill("SIGTERM");
  }
  await Promise.race([exited, wait(1500)]);
  if (child.exitCode === null) {
    try {
      process.kill(-child.pid, "SIGKILL");
    } catch {
      child.kill("SIGKILL");
    }
    await Promise.race([exited, wait(1500)]);
  }
}

function run(command, args, options = {}) {
  const child = spawn(command, args, { stdio: "inherit", ...options });
  return new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited with ${code ?? signal}`));
    });
  });
}

let preview;
const output = [];

try {
  preview = spawn(
    "npm",
    ["run", "preview", "--", "--host", "127.0.0.1", "--port", String(port)],
    { detached: true, stdio: ["ignore", "pipe", "pipe"] },
  );
  preview.stdout.on("data", (chunk) => output.push(chunk.toString()));
  preview.stderr.on("data", (chunk) => output.push(chunk.toString()));
  await waitForPreview(preview, output);
  await run(process.execPath, ["scripts/check-responsive-layout.mjs", ...process.argv.slice(2)], {
    env: { ...process.env, RESPONSIVE_LAYOUT_URL: url },
  });
} finally {
  await stopProcessGroup(preview);
}

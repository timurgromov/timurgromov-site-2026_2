import { spawn } from "node:child_process";

const port = Number(process.env.CONTACT_LAYOUT_PREVIEW_PORT || 4400 + (process.pid % 500));
const url = `http://127.0.0.1:${port}/timurgromov-site-2026_2/`;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function run(command, args, options = {}) {
  const child = spawn(command, args, {
    stdio: "inherit",
    ...options,
  });

  return new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited with ${code ?? signal}`));
    });
  });
}

async function waitForPreviewProcess(child, output, timeoutMs = 12000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    if (child.exitCode !== null) {
      throw new Error(`Astro preview exited before becoming ready:\n${output.join("")}`);
    }

    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Astro preview is still starting.
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

let preview;
const previewOutput = [];

try {
  preview = spawn(
    "npm",
    ["run", "preview", "--", "--host", "127.0.0.1", "--port", String(port)],
    {
      detached: true,
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  preview.stdout.on("data", (chunk) => previewOutput.push(chunk.toString()));
  preview.stderr.on("data", (chunk) => previewOutput.push(chunk.toString()));

  await waitForPreviewProcess(preview, previewOutput);

  await run(process.execPath, ["scripts/check-contact-layout.mjs"], {
    env: {
      ...process.env,
      CONTACT_LAYOUT_URL: url,
    },
  });
} finally {
  await stopProcessGroup(preview);
}

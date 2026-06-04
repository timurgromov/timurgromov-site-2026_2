import { execFileSync } from "node:child_process";

const defaultUrl = "https://timurgromov.ru/";
const pollIntervalMs = 10000;

const options = {
  url: process.env.PAGES_VERIFY_URL || defaultUrl,
  waitSeconds: Number(process.env.PAGES_VERIFY_WAIT_SECONDS || 180),
  contains: [],
  absent: [],
};

for (let index = 2; index < process.argv.length; index += 1) {
  const arg = process.argv[index];
  const next = process.argv[index + 1];

  if (arg === "--url" && next) {
    options.url = next;
    index += 1;
  } else if (arg === "--wait-seconds" && next) {
    options.waitSeconds = Number(next);
    index += 1;
  } else if (arg === "--contains" && next) {
    options.contains.push(next);
    index += 1;
  } else if (arg === "--absent" && next) {
    options.absent.push(next);
    index += 1;
  } else {
    throw new Error(`Unknown argument: ${arg}`);
  }
}

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function readLiveHtml() {
  const response = await fetch(options.url, {
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
  });

  if (!response.ok) {
    throw new Error(`Live URL returned ${response.status}: ${options.url}`);
  }

  return response.text();
}

function refreshGhPages() {
  git(["fetch", "origin", "gh-pages:refs/remotes/origin/gh-pages"]);
  return git(["log", "-1", "--format=%s", "origin/gh-pages"]);
}

function checkMarkers(html) {
  const missing = options.contains.filter((marker) => !html.includes(marker));
  const stillPresent = options.absent.filter((marker) => html.includes(marker));

  return { missing, stillPresent };
}

const localHead = git(["rev-parse", "HEAD"]);
const remoteMain = git(["ls-remote", "origin", "refs/heads/main"]).split(/\s+/)[0];

if (localHead !== remoteMain) {
  throw new Error(
    [
      "origin/main is not on the current commit.",
      `HEAD:        ${localHead}`,
      `origin/main: ${remoteMain}`,
      "Push the finished commit to main before checking GitHub Pages.",
    ].join("\n"),
  );
}

const deadline = Date.now() + options.waitSeconds * 1000;
let lastStatus = "";

while (Date.now() <= deadline) {
  const ghPagesSubject = refreshGhPages();
  const html = await readLiveHtml();
  const { missing, stillPresent } = checkMarkers(html);
  const ghPagesMatchesMain = ghPagesSubject.includes(remoteMain);
  const markersPass = missing.length === 0 && stillPresent.length === 0;
  const hasMarkers = options.contains.length > 0 || options.absent.length > 0;

  if (markersPass && (ghPagesMatchesMain || hasMarkers)) {
    if (ghPagesMatchesMain) {
      console.log(`GitHub Pages is deployed from ${remoteMain}.`);
    } else {
      console.log(`Live markers are verified. Last gh-pages deploy: ${ghPagesSubject}`);
      console.log("Note: gh-pages can stay on the previous deploy when the built dist output is unchanged.");
    }
    console.log(`Live URL verified: ${options.url}`);
    if (options.contains.length) console.log(`Contains: ${options.contains.join(" | ")}`);
    if (options.absent.length) console.log(`Absent: ${options.absent.join(" | ")}`);
    process.exit(0);
  }

  lastStatus = [
    `gh-pages subject: ${ghPagesSubject}`,
    `expected main:    ${remoteMain}`,
    missing.length ? `missing: ${missing.join(" | ")}` : "",
    stillPresent.length ? `still present: ${stillPresent.join(" | ")}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  await wait(pollIntervalMs);
}

throw new Error(`GitHub Pages did not reach the expected state in ${options.waitSeconds}s.\n${lastStatus}`);

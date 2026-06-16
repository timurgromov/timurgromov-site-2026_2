import { readFileSync } from "node:fs";

const sourcePath = "src/pages/materials.astro";
const distPath = "dist/materials/index.html";

function read(path) {
  try {
    return readFileSync(path, "utf8");
  } catch (error) {
    throw new Error(`Cannot read ${path}. Run npm run build first.\n${error.message}`);
  }
}

function assertContains(label, text, markers) {
  const missing = markers.filter((marker) => !text.includes(marker));

  if (missing.length) {
    throw new Error(`${label} is missing required markers:\n${missing.join("\n")}`);
  }
}

function assertAbsent(label, text, markers) {
  const present = markers.filter((marker) => text.includes(marker));

  if (present.length) {
    throw new Error(`${label} contains forbidden markers:\n${present.join("\n")}`);
  }
}

const source = read(sourcePath);
const dist = read(distPath);

assertContains(sourcePath, source, [
  "../../page62008353.html",
  "../../files/page62008353body.html",
  "const materialRecordIds = [",
  "rec862699342",
  "rec862623921",
  "rec862050095",
  "rec862070380",
  "materials-header-shell",
]);

assertAbsent(sourcePath, source, [
  "materials-hero",
  "materials-webinar",
  "materials-video-grid",
]);

assertContains(distPath, dist, [
  "tilda-blocks-page62008353",
  "rec862699342",
  "rec862623921",
  "rec862050095",
  "rec862070380",
  "t396",
  "8 секретов успешной",
  "Получить расширенный конспект подготовки к свадьбе",
]);

assertAbsent(distPath, dist, [
  "materials-hero",
  "materials-webinar",
  "materials-video-grid",
  "Тут вы узнаете много полезностей",
]);

console.log("Materials baseline verified: /materials/ is still Tilda-records inside Astro.");

/**
 * Build script (ESM) to inject generated icon names into example/script.js
 * Usage: node build.js
 */

import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

/**
 * Resolve icons directory. Prefer src/icons, fallback to icons.
 */
async function resolveIconsDir() {
  const candidates = [
    path.join(ROOT_DIR, "src", "icons"),
    path.join(ROOT_DIR, "icons"),
  ];

  for (const p of candidates) {
    try {
      const stat = await fs.stat(p);
      if (stat.isDirectory()) return p;
    } catch {
      // ignore
    }
  }

  throw new Error(
    `Could not locate icons directory. Tried: ${candidates.join(", ")}`,
  );
}

/**
 * Read *.svg icon names (without extension) in the given directory.
 */
async function getIconNames(iconsDir) {
  const entries = await fs.readdir(iconsDir, { withFileTypes: true });
  const names = entries
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".svg"))
    .map((e) => path.parse(e.name).name)
    .sort((a, b) => a.localeCompare(b));
  return names;
}

/**
 * Update example/script.js by replacing the `const iconNames = [...]` array with the generated list.
 */
async function injectIconNamesIntoScript(scriptPath, iconNames) {
  const content = await fs.readFile(scriptPath, "utf8");

  const ICON_ARRAY_REGEX = /const\s+iconNames\s*=\s*\[[\s\S]*?\];/m;
  if (!ICON_ARRAY_REGEX.test(content)) {
    throw new Error(
      `Could not find 'const iconNames = [...]' array in ${scriptPath}`,
    );
  }

  const generatedArray = `const iconNames = [
${iconNames.map((n) => `  "${n}",`).join("\n")}
];`;

  const updated = content.replace(ICON_ARRAY_REGEX, generatedArray);

  if (updated === content) {
    return { changed: false };
  }

  await fs.writeFile(scriptPath, updated, "utf8");
  return { changed: true };
}

async function main() {
  const iconsDir = await resolveIconsDir();
  const names = await getIconNames(iconsDir);

  const scriptPath = path.join(__dirname, "script.js");
  const { changed } = await injectIconNamesIntoScript(scriptPath, names);

  const relIcons = path.relative(ROOT_DIR, iconsDir) || iconsDir;
  const relScript = path.relative(ROOT_DIR, scriptPath) || scriptPath;

  if (changed) {
    console.log(
      `✅ Injected ${names.length} icon names from '${relIcons}' into '${relScript}'`,
    );
  } else {
    console.log(
      `ℹ️ No changes needed. '${relScript}' already has ${names.length} icon names from '${relIcons}'.`,
    );
  }
}

main().catch((err) => {
  console.error("❌ Build failed:", err.message || err);
  process.exit(1);
});

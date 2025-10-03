#!/usr/bin/env node
import fs from "fs";
import path from "path";

const iconsDir = path.resolve("src/icons");
const outFile = path.resolve("src/icons.js");

/**
 * Recursively walk through a directory and return all .svg file paths
 */
function getSvgFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getSvgFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".svg")) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Generate a key name from the file path:
 * e.g. src/icons/outline/star.svg → outline/star
 */
function makeIconKey(filePath) {
  const rel = path.relative(iconsDir, filePath);
  const noExt = rel.replace(/\.svg$/, "");
  return noExt.replace(/\\/g, "/"); // normalize for Windows
}

const svgFiles = getSvgFiles(iconsDir);
const icons = {};

for (const file of svgFiles) {
  const key = makeIconKey(file);
  let svg = fs.readFileSync(file, "utf-8");
  svg = svg.replace(/`/g, "\\`"); // escape backticks
  icons[key] = svg;
}

let output = "// ⚠️ AUTO-GENERATED FILE. DO NOT EDIT.\n";
output += "export const icons = {\n";
for (const [key, svg] of Object.entries(icons)) {
  output += `  "${key}": \`${svg}\`,\n`;
}
output += "};\n";

fs.writeFileSync(outFile, output);
console.log(`✅ Generated ${outFile} with ${Object.keys(icons).length} icons.`);

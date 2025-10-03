/eit-icons/example/build.js
/**
 * Build script for generating icon showcase HTML from template and CSS.
 * Usage: node build.js
 */

const fs = require("fs");
const path = require("path");

// Paths
const ICONS_DIR = path.join(__dirname, "..", "icons");
const TEMPLATE_FILE = path.join(__dirname, "template.html");
const CSS_FILE = path.join(__dirname, "style.css");
const OUTPUT_FILE = path.join(__dirname, "index.html");

// Get all SVG icon names
const iconNames = fs
  .readdirSync(ICONS_DIR)
  .filter((file) => file.endsWith(".svg"))
  .map((file) => path.parse(file).name);

// Generate icon cards HTML
const examplesHTML = iconNames
  .map(
    (iconName) => `
    <div class="example-card">
      <h3>${iconName}</h3>
      <eit-icons name="${iconName}"></eit-icons>
    </div>
  `
  )
  .join("\n");

// Read template and CSS
const template = fs.readFileSync(TEMPLATE_FILE, "utf8");
const css = fs.readFileSync(CSS_FILE, "utf8");

// Replace placeholders in template
const html = template
  .replace("{{EXAMPLES}}", examplesHTML)
  .replace("{{STYLE}}", `<style>\n${css}\n</style>`);

fs.writeFileSync(OUTPUT_FILE, html);
console.log(`✅ Generated ${OUTPUT_FILE} with ${iconNames.length} icons`);

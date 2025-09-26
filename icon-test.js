#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Sprite = require('svg-sprite');

const SVG_FOLDER = 'icons';           // folder with your SVG files
const OUTPUT_FILE = 'svg-test.html';  // output HTML
const TEMPLATE_FILE = 'template.html';// HTML template with placeholders

// Utility: sanitize icon IDs
function sanitizeId(name) {
  return name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-_:.]/g, '-');
}

// Configure svg-sprite
const config = {
  mode: {
    symbol: {
      inline: true,
      sprite: 'sprite.svg'
    }
  },
  svg: {
    namespaceClassnames: false
  }
};

async function generateTestPage() {
  const svgFiles = fs.readdirSync(SVG_FOLDER)
    .filter(file => file.endsWith('.svg'))
    .sort();

  if (svgFiles.length === 0) {
    console.log('❌ No SVG files found in', SVG_FOLDER);
    return;
  }

  const spriter = new Sprite(config);

  // Add all SVGs to the sprite
  svgFiles.forEach(file => {
    const filePath = path.join(SVG_FOLDER, file);
    const content = fs.readFileSync(filePath, 'utf8').trim();

    if (!content) {
      console.warn('⚠️ Empty or invalid SVG skipped:', file);
      return;
    }

    const iconId = sanitizeId(path.parse(file).name);
    spriter.add(filePath, null, content);
  });

  // Compile the sprite
  spriter.compile((error, result) => {
    if (error) {
      console.error('❌ Error while compiling sprite:', error);
      return;
    }

    const spriteContent = result.symbol.sprite.contents.toString();

    // Read HTML template
    const template = fs.readFileSync(TEMPLATE_FILE, 'utf8');

    // Generate icon grid HTML
    const iconGrid = svgFiles.map(file => {
      const iconId = sanitizeId(path.parse(file).name);
      return `    <div class="icon-card">
      <svg class="icon"><use href="#${iconId}"></use></svg>
      <div class="icon-name">${iconId}</div>
    </div>`;
    }).join('\n');

    // Replace placeholders in template
    const html = template
      .replace('{{SPRITE_CONTENT}}', spriteContent)
      .replace('{{ICON_COUNT}}', svgFiles.length)
      .replace('{{ICON_GRID}}', iconGrid);

    fs.writeFileSync(OUTPUT_FILE, html);
    console.log(`✅ Generated ${OUTPUT_FILE} with ${svgFiles.length} icons`);
  });
}

// Run
generateTestPage();

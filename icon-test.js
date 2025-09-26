#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Sprite = require('svg-sprite');

const SVG_FOLDER = 'icons';
const OUTPUT_FILE = 'svg-test.html';
const TEMPLATE_FILE = 'template.html';

// Configure svg-sprite
const config = {
  mode: {
    symbol: {
      inline: true,      // generate <symbol> sprite
      sprite: 'sprite.svg'
    }
  },
  shape: {
    transform: [] // disable default SVGO optimizations (you already optimized)
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

  // Add all files to spriter
  svgFiles.forEach(file => {
    const filePath = path.join(SVG_FOLDER, file);
    const content = fs.readFileSync(filePath, 'utf8');
    spriter.add(filePath, null, content);
  });

  // Compile the sprite
  spriter.compile((error, result) => {
    if (error) {
      console.error('❌ Error while compiling sprite:', error);
      return;
    }

    // Grab the inline sprite string
    const spriteContent = result.symbol.sprite.contents.toString();

    // Read the template file
    const template = fs.readFileSync(TEMPLATE_FILE, 'utf8');

    // Generate the icon grid
    const iconGrid = svgFiles.map(file => {
      const id = path.parse(file).name;
      return `    <div class="icon-card">
      <svg class="icon"><use href="#${id}"></use></svg>
      <div class="icon-name">${id}</div>
    </div>`;
    }).join('\n');

    // Replace placeholders in the template
    const html = template
      .replace('{{SPRITE_CONTENT}}', spriteContent)
      .replace('{{ICON_COUNT}}', svgFiles.length)
      .replace('{{ICON_GRID}}', iconGrid);

    fs.writeFileSync(OUTPUT_FILE, html);
    console.log(`✅ Generated ${OUTPUT_FILE} with ${svgFiles.length} icons`);
  });
}

generateTestPage();

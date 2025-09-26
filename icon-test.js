#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const SVG_FOLDER = 'icons'; // Your optimized icons folder
const OUTPUT_FILE = 'svg-test.html';

function generateTestPage() {
  // Read all SVG files from the folder
  const svgFiles = fs.readdirSync(SVG_FOLDER)
    .filter(file => file.endsWith('.svg'))
    .sort();

  if (svgFiles.length === 0) {
    console.log('No SVG files found in', SVG_FOLDER);
    return;
  }

  // Read SVG contents and create symbols
  const symbols = svgFiles.map(file => {
    const filePath = path.join(SVG_FOLDER, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const iconName = path.parse(file).name;

    const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

    const innerContent = content.replace(/<svg[^>]*>/, '').replace(/<\/svg>$/, '');

    return {
      id: iconName,
      viewBox: viewBox,
      content: innerContent.trim()
    };
  });

  // Generate HTML
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SVG Icon Test Page</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; padding: 2rem; line-height: 1.6; }

  .header { text-align: center; margin-bottom: 3rem; }
  .header h1 { color: #1e293b; font-size: 2.5rem; margin-bottom: 0.5rem; }
  .header p { color: #64748b; font-size: 1.1rem; }

  .color-controls, .stats { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 2rem; }

  .icon-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem; }

  .icon-card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); text-align: center; transition: transform 0.2s, box-shadow 0.2s; }
  .icon-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }

  .icon { width: 48px; height: 48px; margin-bottom: 1rem; transition: color 0.3s; }
  .icon-name { font-size: 0.9rem; color: #6b7280; font-family: 'Monaco', 'Consolas', monospace; word-break: break-all; }

  /* Background circle styling using CSS variable */
  .icon-bg { fill: var(--icon-bg-fill, #f0f0f0); }

  /* Foreground paths remain currentColor */
  .icon-content { fill: currentColor; }

  /* Size classes */
  .size-small .icon { width: 24px; height: 24px; }
  .size-medium .icon { width: 48px; height: 48px; }
  .size-large .icon { width: 72px; height: 72px; }
  .size-xl .icon { width: 96px; height: 96px; }

  .color-buttons { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
  .color-btn { padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9rem; transition: transform 0.2s; }
  .color-btn:hover { transform: scale(1.05); }

  /* Preset color buttons */
  .color-btn.red { background: #ef4444; color: white; }
  .color-btn.blue { background: #3b82f6; color: white; }
  .color-btn.green { background: #10b981; color: white; }
  .color-btn.purple { background: #8b5cf6; color: white; }
  .color-btn.gray { background: #6b7280; color: white; }
  .color-btn.orange { background: #f59e0b; color: white; }
  .color-btn.black { background: #000; color: white; }

</style>
</head>
<body>

<svg style="display: none;" aria-hidden="true">
${symbols.map(s => `<symbol id="${s.id}" viewBox="${s.viewBox}">${s.content}</symbol>`).join('\n')}
</svg>

<div class="header">
  <h1>SVG Icon Test Page</h1>
  <p>Testing ${svgFiles.length} optimized icons</p>
</div>

<div class="stats">
  <strong>${svgFiles.length} icons loaded</strong> • Foreground paths use <code>currentColor</code>
</div>

<div class="color-controls">
  <h3>🎨 Pick a background color</h3>
  <input type="color" id="bgColorPicker" value="#f0f0f0">
  <label for="bgColorPicker">Background circle color</label>
  <div class="color-buttons">
    <button class="color-btn gray" onclick="changeColor('gray')">Gray</button>
    <button class="color-btn blue" onclick="changeColor('blue')">Blue</button>
    <button class="color-btn red" onclick="changeColor('red')">Red</button>
    <button class="color-btn green" onclick="changeColor('green')">Green</button>
    <button class="color-btn purple" onclick="changeColor('purple')">Purple</button>
    <button class="color-btn orange" onclick="changeColor('orange')">Orange</button>
    <button class="color-btn black" onclick="changeColor('black')">Black</button>
  </div>
</div>

<div class="icon-grid size-medium" id="iconContainer">
${symbols.map(s => `<div class="icon-card"><svg class="icon"><use href="#${s.id}"></use></svg><div class="icon-name">${s.id}</div></div>`).join('\n')}
</div>

<script>
  const iconContainer = document.getElementById('iconContainer');
  const bgColorPicker = document.getElementById('bgColorPicker');

  function changeColor(color) {
    const colorMap = {
      gray: '#6b7280',
      blue: '#3b82f6',
      red: '#ef4444',
      green: '#10b981',
      purple: '#8b5cf6',
      orange: '#f59e0b',
      black: '#000000'
    };
    document.querySelectorAll('.icon').forEach(svg => svg.style.color = colorMap[color]);
  }

  bgColorPicker.addEventListener('input', () => {
    document.documentElement.style.setProperty('--icon-bg-fill', bgColorPicker.value);
  });

  function changeSize(size) {
    const sizes = ['size-small','size-medium','size-large','size-xl'];
    iconContainer.classList.remove(...sizes);
    iconContainer.classList.add('size-' + size);
  }

  // Initialize
  changeColor('gray');
  document.documentElement.style.setProperty('--icon-bg-fill', bgColorPicker.value);
</script>

</body>
</html>`;

  // Write the HTML file
  fs.writeFileSync(OUTPUT_FILE, html);
  console.log(`✅ Generated ${OUTPUT_FILE} with ${svgFiles.length} icons`);
  console.log(`📁 Icons from: ${SVG_FOLDER}/`);
}

try {
  generateTestPage();
} catch (error) {
  console.error('❌ Error:', error.message);
}

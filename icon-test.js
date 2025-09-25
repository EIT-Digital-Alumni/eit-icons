#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const SVG_FOLDER = 'oicons'; // Your optimized icons folder
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
    
    // Extract viewBox and inner content
    const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
    
    // Extract content between <svg> tags
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
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f8fafc;
      padding: 2rem;
      line-height: 1.6;
    }

    .header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .header h1 {
      color: #1e293b;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .header p {
      color: #64748b;
      font-size: 1.1rem;
    }

    .stats {
      background: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
      text-align: center;
    }

    .color-controls {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }

    .color-controls h3 {
      margin-bottom: 1rem;
      color: #1e293b;
    }

    .color-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .color-btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: transform 0.2s;
    }

    .color-btn:hover {
      transform: scale(1.05);
    }

    .color-btn.red { background: #ef4444; color: white; }
    .color-btn.blue { background: #3b82f6; color: white; }
    .color-btn.green { background: #10b981; color: white; }
    .color-btn.purple { background: #8b5cf6; color: white; }
    .color-btn.gray { background: #6b7280; color: white; }
    .color-btn.orange { background: #f59e0b; color: white; }
    .color-btn.black { background: #000; color: white; }

    .size-controls {
      margin-top: 1rem;
    }

    .size-btn {
      padding: 0.4rem 0.8rem;
      margin: 0 0.2rem;
      border: 1px solid #d1d5db;
      background: white;
      border-radius: 4px;
      cursor: pointer;
    }

    .size-btn.active {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }

    .icon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1.5rem;
    }

    .icon-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      text-align: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .icon-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .icon {
      width: 48px;
      height: 48px;
      color: #374151;
      margin-bottom: 1rem;
      transition: color 0.3s;
    }

    .icon-name {
      font-size: 0.9rem;
      color: #6b7280;
      font-family: 'Monaco', 'Consolas', monospace;
      word-break: break-all;
    }

    /* Color classes that will be applied dynamically */
    .icons-red .icon { 
      color: #ef4444;
      --icon-bg-fill: rgba(239, 68, 68, 0.1);
      --icon-bg-stroke: #ef4444;
    }
    .icons-blue .icon { 
      color: #3b82f6;
      --icon-bg-fill: rgba(59, 130, 246, 0.1);
      --icon-bg-stroke: #3b82f6;
    }
    .icons-green .icon { 
      color: #10b981;
      --icon-bg-fill: rgba(16, 185, 129, 0.1);
      --icon-bg-stroke: #10b981;
    }
    .icons-purple .icon { 
      color: #8b5cf6;
      --icon-bg-fill: rgba(139, 92, 246, 0.1);
      --icon-bg-stroke: #8b5cf6;
    }
    .icons-gray .icon { 
      color: #6b7280;
      --icon-bg-fill: rgba(107, 114, 128, 0.1);
      --icon-bg-stroke: #6b7280;
    }
    .icons-orange .icon { 
      color: #f59e0b;
      --icon-bg-fill: rgba(245, 158, 11, 0.1);
      --icon-bg-stroke: #f59e0b;
    }
    .icons-black .icon { 
      color: #000;
      --icon-bg-fill: rgba(0, 0, 0, 0.05);
      --icon-bg-stroke: #000;
    }

    /* Background circle styling */
    .icon-bg {
      /* These will use the CSS variables set above */
    }
    
    .icon-content {
      /* Content uses currentColor */
    }

    /* Size classes */
    .size-small .icon { width: 24px; height: 24px; }
    .size-medium .icon { width: 48px; height: 48px; }
    .size-large .icon { width: 72px; height: 72px; }
    .size-xl .icon { width: 96px; height: 96px; }

    @media (max-width: 768px) {
      .icon-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 1rem;
      }
      
      .color-buttons {
        justify-content: center;
      }
    }
  </style>
</head>
<body>
  <!-- Hidden SVG sprite -->
  <svg style="display: none;" aria-hidden="true">
${symbols.map(symbol => 
    `    <symbol id="${symbol.id}" viewBox="${symbol.viewBox}">
${symbol.content}
    </symbol>`
  ).join('\n')}
  </svg>

  <div class="header">
    <h1>SVG Icon Test Page</h1>
    <p>Testing ${svgFiles.length} optimized icons with currentColor support</p>
  </div>

  <div class="stats">
    <strong>${svgFiles.length} icons loaded</strong> • All icons use <code>currentColor</code> for dynamic styling
  </div>

  <div class="color-controls">
    <h3>🎨 Test Colors & Sizes</h3>
    <p style="margin-bottom: 1rem; color: #64748b; font-size: 0.9rem;">
      Icons with <code>.icon-bg</code> class will show colored backgrounds, 
      <code>.icon-content</code> will use currentColor
    </p>
    <div class="color-buttons">
      <button class="color-btn gray" onclick="changeColor('gray')">Gray</button>
      <button class="color-btn blue" onclick="changeColor('blue')">Blue</button>
      <button class="color-btn red" onclick="changeColor('red')">Red</button>
      <button class="color-btn green" onclick="changeColor('green')">Green</button>
      <button class="color-btn purple" onclick="changeColor('purple')">Purple</button>
      <button class="color-btn orange" onclick="changeColor('orange')">Orange</button>
      <button class="color-btn black" onclick="changeColor('black')">Black</button>
    </div>
    
    <div class="size-controls">
      <strong>Size:</strong>
      <button class="size-btn" onclick="changeSize('small')">24px</button>
      <button class="size-btn active" onclick="changeSize('medium')">48px</button>
      <button class="size-btn" onclick="changeSize('large')">72px</button>
      <button class="size-btn" onclick="changeSize('xl')">96px</button>
    </div>
  </div>

  <div class="icon-grid" id="iconContainer">
${symbols.map(symbol => 
    `    <div class="icon-card">
      <svg class="icon">
        <use href="#${symbol.id}"></use>
      </svg>
      <div class="icon-name">${symbol.id}</div>
    </div>`
  ).join('\n')}
  </div>

  <script>
    function changeColor(color) {
      const container = document.getElementById('iconContainer');
      container.className = 'icon-grid icons-' + color;
      
      // Update active button
      document.querySelectorAll('.color-btn').forEach(btn => {
        btn.style.opacity = btn.classList.contains(color) ? '1' : '0.7';
      });
    }

    function changeSize(size) {
      const container = document.getElementById('iconContainer');
      const currentClasses = container.className.split(' ').filter(c => !c.startsWith('size-'));
      container.className = currentClasses.join(' ') + ' size-' + size;
      
      // Update active button
      document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
    }

    // Initialize with gray color
    changeColor('gray');
    
    console.log('🎉 Loaded ${svgFiles.length} SVG icons successfully!');
    console.log('Icons:', ${JSON.stringify(svgFiles.map(f => path.parse(f).name))});
    
    // Debug: Check what classes were added
    setTimeout(() => {
      const backgrounds = document.querySelectorAll('.icon-bg');
      const content = document.querySelectorAll('.icon-content');
      console.log(\`🔍 Found \${backgrounds.length} background elements and \${content.length} content elements\`);
      
      if (backgrounds.length > 0) {
        console.log('Background elements:', backgrounds);
        console.log('First background element:', backgrounds[0]);
      }
    }, 100);
  </script>
</body>
</html>`;

  // Write the HTML file
  fs.writeFileSync(OUTPUT_FILE, html);
  
  console.log(`✅ Generated ${OUTPUT_FILE} with ${svgFiles.length} icons`);
  console.log(`📁 Icons from: ${SVG_FOLDER}/`);
  console.log(`🌐 Open ${OUTPUT_FILE} in your browser to test!`);
}

// Run the generator
try {
  generateTestPage();
} catch (error) {
  console.error('❌ Error:', error.message);
  console.log('\n💡 Make sure:');
  console.log(`  • The "${SVG_FOLDER}" folder exists`);
  console.log('  • The folder contains SVG files');
  console.log('  • You have write permissions in this directory');
}
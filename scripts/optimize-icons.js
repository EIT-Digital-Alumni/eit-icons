import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { optimize } from 'svgo';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, '../src/icons');

const svgoConfig = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          cleanupIds: false,
          convertColors: false,
          removeUnknownsAndDefaults: {
            keepDataAttrs: true,
            keepAriaAttrs: true,
            keepRoleAttr: true,
          },
          mergePaths: false,
          convertShapeToPath: false,
          convertPathData: {
            floatPrecision: 2,
          },
        },
      },
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: ['data-name'],
      },
    },
  ],
};

async function optimizeSvgFile(filePath) {
  const content = await fs.readFile(filePath, 'utf8');
  const result = optimize(content, { path: filePath, ...svgoConfig });
  await fs.writeFile(filePath, result.data);
  return { path: filePath, originalSize: content.length, optimizedSize: result.data.length };
}

async function findSvgFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return findSvgFiles(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.svg')) {
        return fullPath;
      }
      return [];
    })
  );
  return files.flat();
}

async function main() {
  console.log('🔍 Finding SVG files...');
  const svgFiles = await findSvgFiles(ICONS_DIR);
  console.log(`📁 Found ${svgFiles.length} SVG files\n`);

  const results = [];
  for (const file of svgFiles) {
    try {
      const result = await optimizeSvgFile(file);
      results.push(result);
      const reduction = ((1 - result.optimizedSize / result.originalSize) * 100).toFixed(2);
      console.log(`✓ ${path.relative(ICONS_DIR, file)} (${reduction}% smaller)`);
    } catch (error) {
      console.error(`✗ ${path.relative(ICONS_DIR, file)}: ${error.message}`);
    }
  }

  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalOptimized = results.reduce((sum, r) => sum + r.optimizedSize, 0);
  const totalReduction = ((1 - totalOptimized / totalOriginal) * 100).toFixed(2);

  console.log(`\n📊 Summary:`);
  console.log(`   Total original size: ${(totalOriginal / 1024).toFixed(2)} KB`);
  console.log(`   Total optimized size: ${(totalOptimized / 1024).toFixed(2)} KB`);
  console.log(`   Total reduction: ${totalReduction}%`);
}

main().catch(console.error);
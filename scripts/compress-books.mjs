import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';


const IN_DIR = './public/images/books';
const OUT_DIR = './public/images/books/compressed';


const color = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',

  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const kb = bytes => `${(bytes / 1024).toFixed(1)} KB`;


await fs.ensureDir(OUT_DIR);

// Read directory
const files = await fs.readdir(IN_DIR);

// Filter JPG/JPEG files
const images = files.filter(file => {
  const ext = path.extname(file).toLowerCase();
  return ext === '.jpg' || ext === '.jpeg';
});

for (const filename of images) {
  try {
    const inputPath = path.join(IN_DIR, filename);
    const outputPath = path.join(OUT_DIR, filename);

    console.log(
        `${color.cyan}${color.bold}Compressing book with image${color.reset} ` +
        `${color.yellow}${filename}${color.reset} ${color.dim}...${color.reset}`
    );

    let fsStat = await fs.stat(inputPath);

    const beforeSize = fsStat.size;

    await sharp(inputPath)
      .resize({width: 768, height: 512, fit: 'inside', withoutEnlargement: true})
      .toColorspace('srgb')
      .removeAlpha()
      .jpeg({ quality: 40, mozjpeg: true, chromaSubsampling: '4:2:0', progressive: true, optimizeCoding: true })
      .toFile(outputPath);

    fsStat = await fs.stat(outputPath);

    const afterSize = fsStat.size;

    const savedPercent = ((beforeSize - afterSize) / beforeSize) * 100;

    const savingsColor =
        savedPercent > 70 ? color.green :
        savedPercent > 50 ? color.yellow :
        color.red;

    console.log(
        `${color.yellow}${filename}${color.reset}: ` +
        `${color.red}${kb(beforeSize)}${color.reset} ${color.dim}→${color.reset} ` +
        `${color.green}${kb(afterSize)}${color.reset} ` +
        `(${savingsColor}${savedPercent.toFixed(1)}% saved${color.reset})`
    );
  } catch (err) {
    console.warn(`Failed for image file ${filename}:`, err.message);
  }
}

console.log(
  `\n${color.bold}${color.green}✔ Processed ${images.length} book images${color.reset}`
);
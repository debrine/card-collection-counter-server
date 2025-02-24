import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';

const OUTPUT_DIR = path.join(process.cwd(), 'public');
const RESIZE_OPTIONS = {
  xs: { width: 80 },
  small: { width: 120 },
  medium: { width: 160 },
  large: { width: 240 },
};

export async function resizeAndSaveImages() {
  const fileNames = (await fs.readdir(OUTPUT_DIR)).filter((fileName) => {
    return fileName.endsWith('.png');
  });

  await createOutputDirectories();

  for (const fileName of fileNames) {
    const filePath = path.join(OUTPUT_DIR, fileName);

    // Check if it’s a file or a folder (optional)
    // For example, read file contents
    const fileContents = await fs.readFile(filePath);
    Object.entries(RESIZE_OPTIONS).forEach(async ([size, { width }]) => {
      const resizedFilePath = path.join(OUTPUT_DIR, `${size}/${fileName}`);
      await sharp(fileContents).resize(width).toFile(resizedFilePath);
    });
  }
}

export async function createOutputDirectories() {
  Object.keys(RESIZE_OPTIONS).forEach(async (size) => {
    await fs.mkdir(path.join(OUTPUT_DIR, size), { recursive: true });
  });
}

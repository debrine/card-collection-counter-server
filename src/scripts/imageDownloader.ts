import sharp from 'sharp'; // npm install sharp
import fs from 'fs/promises';
import path from 'path';

const OUTPUT_DIR = path.join(process.cwd(), 'public');
// const RESIZE_OPTIONS = {
//   xs: { width: 80 },
//   small: { width: 120 },
//   medium: { width: 160 },
//   large: { width: 240 },
// };
const RESIZE_OPTIONS = {};

export async function downloadAndSaveImages(
  imageUrls: { url: string; label: string }[]
) {
  try {
    console.log('OUTPUT DIR:', OUTPUT_DIR);
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    for (let i = 0; i < imageUrls.length; i++) {
      const image = imageUrls[i];
      console.log(
        `Fetching image ${i + 1}/${imageUrls.length} from: ${image.url}`
      );

      const imageResponse = await fetchImage(image.url);
      const imageBuffer = await imageResponse.arrayBuffer();

      const extension = getFileTypeFromImageResponse(imageResponse);

      const baseFileName = `card_${image.label}`;
      const filePaths = buildFilePaths(baseFileName, extension);
      console.log('File paths:', filePaths);

      // 1) Save original (metadata stripped by default)

      await resizeAndSaveImages(imageBuffer, filePaths);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // delay 1s
    }

    console.log('All images processed successfully!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function fetchImage(imageUrl: string) {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch image at ${imageUrl}. HTTP status: ${response.status}`
    );
  }
  return response;
}

function getFileTypeFromImageResponse(imageResponse: Response) {
  const contentType = imageResponse.headers.get('content-type') ?? '';

  switch (true) {
    case contentType.includes('png'):
      return 'png';
    case contentType.includes('jpeg'):
      return 'jpg';
    case contentType.includes('webp'):
      return 'webp';
    default:
      return 'jpg';
  }
}

function buildFilePaths(
  baseFileName: string,
  extension: string
): ImageFilePaths {
  const filePaths = {
    original: path.join(OUTPUT_DIR, `${baseFileName}.${extension}`),
  };
  Object.keys(RESIZE_OPTIONS).forEach(([size]) => {
    filePaths[size] = path.join(
      OUTPUT_DIR,
      `${baseFileName}_${size}.${extension}`
    );
  });
  return filePaths as ImageFilePaths;
}

async function resizeAndSaveImages(
  imageBuffer: ArrayBuffer,
  filePaths: ImageFilePaths
) {
  await Promise.all(
    Object.entries(filePaths).map(async ([size, filePath]) => {
      const image = sharp(imageBuffer, { failOnError: false });
      if (size === 'original') {
        return image.toFile(filePath);
      } else {
        return image.resize(RESIZE_OPTIONS[size]).toFile(filePath);
      }
    })
  );
}

type ImageFilePaths = { original: string } & Record<
  keyof typeof RESIZE_OPTIONS,
  string
>;

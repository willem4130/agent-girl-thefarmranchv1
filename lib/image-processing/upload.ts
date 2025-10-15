import { put } from '@vercel/blob';
import { addWatermark } from './watermark';
import { generateThumbnails } from './thumbnails';

export interface UploadResult {
  originalUrl: string;
  watermarkedUrl: string;
  thumbnailSmall: string;
  thumbnailMedium: string;
  thumbnailLarge: string;
  width: number;
  height: number;
  fileSize: number;
  mimeType: string;
}

export async function processAndUploadImage(
  file: File,
  filename: string
): Promise<UploadResult> {
  // Read file as buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Get image metadata
  const sharp = require('sharp');
  const image = sharp(buffer);
  const metadata = await image.metadata();

  // Generate watermarked version
  const watermarkedBuffer = await addWatermark(buffer);

  // Generate thumbnails from watermarked version
  const thumbnails = await generateThumbnails(watermarkedBuffer);

  // Upload all versions to Vercel Blob
  const [originalBlob, watermarkedBlob, smallBlob, mediumBlob, largeBlob] = await Promise.all([
    put(`originals/${filename}`, buffer, {
      access: 'public',
      contentType: file.type,
    }),
    put(`watermarked/${filename}`, watermarkedBuffer, {
      access: 'public',
      contentType: file.type,
    }),
    put(`thumbnails/small/${filename}.webp`, thumbnails.small, {
      access: 'public',
      contentType: 'image/webp',
    }),
    put(`thumbnails/medium/${filename}.webp`, thumbnails.medium, {
      access: 'public',
      contentType: 'image/webp',
    }),
    put(`thumbnails/large/${filename}.webp`, thumbnails.large, {
      access: 'public',
      contentType: 'image/webp',
    }),
  ]);

  return {
    originalUrl: originalBlob.url,
    watermarkedUrl: watermarkedBlob.url,
    thumbnailSmall: smallBlob.url,
    thumbnailMedium: mediumBlob.url,
    thumbnailLarge: largeBlob.url,
    width: metadata.width || 0,
    height: metadata.height || 0,
    fileSize: buffer.length,
    mimeType: file.type,
  };
}

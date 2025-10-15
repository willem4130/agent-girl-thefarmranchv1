import { put } from '@vercel/blob';

export interface VideoUploadResult {
  originalUrl: string;
  fileSize: number;
  mimeType: string;
}

export async function processAndUploadVideo(
  file: File,
  filename: string
): Promise<VideoUploadResult> {
  // Read file as buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload video to Vercel Blob
  const videoBlob = await put(`videos/${filename}`, buffer, {
    access: 'public',
    contentType: file.type,
  });

  return {
    originalUrl: videoBlob.url,
    fileSize: buffer.length,
    mimeType: file.type,
  };
}

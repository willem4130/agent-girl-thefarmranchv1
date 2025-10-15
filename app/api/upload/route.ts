import { auth } from '@/auth';
import { prisma } from '@/lib/db/prisma';
import { processAndUploadImage } from '@/lib/image-processing/upload';
import { processAndUploadVideo } from '@/lib/image-processing/video-upload';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    // Auth disabled for development
    // if (!session || session.user.role !== 'ADMIN') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const folderIds = formData.getAll('folderIds') as string[];
    const tagIds = formData.getAll('tagIds') as string[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const uploadedImages = [];

    for (const file of files) {
      // Generate unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

      const isVideo = file.type.startsWith('video/');

      let mediaData: any;

      if (isVideo) {
        // Process and upload video
        const videoResult = await processAndUploadVideo(file, filename);
        mediaData = {
          filename: file.name,
          mediaType: 'VIDEO',
          originalUrl: videoResult.originalUrl,
          watermarkedUrl: videoResult.originalUrl, // Videos aren't watermarked
          fileSize: videoResult.fileSize,
          mimeType: videoResult.mimeType,
        };
      } else {
        // Process and upload image
        const uploadResult = await processAndUploadImage(file, filename);
        mediaData = {
          filename: file.name,
          mediaType: 'IMAGE',
          originalUrl: uploadResult.originalUrl,
          watermarkedUrl: uploadResult.watermarkedUrl,
          thumbnailSmall: uploadResult.thumbnailSmall,
          thumbnailMedium: uploadResult.thumbnailMedium,
          thumbnailLarge: uploadResult.thumbnailLarge,
          width: uploadResult.width,
          height: uploadResult.height,
          fileSize: uploadResult.fileSize,
          mimeType: uploadResult.mimeType,
        };
      }

      // Save to database
      const media = await prisma.image.create({
        data: {
          ...mediaData,
          uploadedById: session?.user?.id || null,
          folders: folderIds.length > 0 ? {
            connect: folderIds.map(id => ({ id })),
          } : undefined,
          tags: tagIds.length > 0 ? {
            connect: tagIds.map(id => ({ id })),
          } : undefined,
        },
        include: {
          folders: true,
          tags: true,
        },
      });

      uploadedImages.push(media);
    }

    return NextResponse.json({
      success: true,
      images: uploadedImages,
      count: uploadedImages.length,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload images' },
      { status: 500 }
    );
  }
}

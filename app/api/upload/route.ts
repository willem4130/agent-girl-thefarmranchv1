import { auth } from '@/auth';
import { prisma } from '@/lib/db/prisma';
import { processAndUploadImage } from '@/lib/image-processing/upload';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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

      // Process and upload image
      const uploadResult = await processAndUploadImage(file, filename);

      // Save to database
      const image = await prisma.image.create({
        data: {
          filename: file.name,
          originalUrl: uploadResult.originalUrl,
          watermarkedUrl: uploadResult.watermarkedUrl,
          thumbnailSmall: uploadResult.thumbnailSmall,
          thumbnailMedium: uploadResult.thumbnailMedium,
          thumbnailLarge: uploadResult.thumbnailLarge,
          width: uploadResult.width,
          height: uploadResult.height,
          fileSize: uploadResult.fileSize,
          mimeType: uploadResult.mimeType,
          uploadedById: session.user.id,
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

      uploadedImages.push(image);
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

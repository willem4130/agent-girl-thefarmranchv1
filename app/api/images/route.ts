import { prisma } from '@/lib/db/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '1000');
    const offset = parseInt(searchParams.get('offset') || '0');

    const images = await prisma.image.findMany({
      take: limit,
      skip: offset,
      orderBy: { uploadedAt: 'desc' },
      include: {
        folders: true,
        tags: true,
        ratings: {
          select: {
            overallScore: true,
          },
        },
      },
    });

    const total = await prisma.image.count();

    return NextResponse.json({
      images,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Failed to fetch images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}

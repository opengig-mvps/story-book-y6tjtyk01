import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { storyId: string } },
) {
  try {
    const storyId = parseInt(params.storyId, 10);
    if (isNaN(storyId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid story ID' },
        { status: 400 },
      );
    }

    const storyPages = await prisma.storyPage.findMany({
      where: { storyId },
      select: {
        id: true,
        textContent: true,
        imageUrl: true,
        pageNumber: true,
      },
      orderBy: {
        pageNumber: 'asc',
      },
    });

    const formattedPages = storyPages.map(page => ({
      pageId: page.id,
      textContent: page.textContent,
      imageUrl: page.imageUrl,
      pageNumber: page.pageNumber,
    }));

    return NextResponse.json(
      {
        success: true,
        message: 'Story pages fetched successfully',
        data: formattedPages,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error fetching story pages:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}
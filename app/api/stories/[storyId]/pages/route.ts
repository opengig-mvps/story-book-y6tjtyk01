import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type PageRequestBody = {
  textContent: string;
  imageUrl: string;
  pageNumber: number;
  storyId: number;
};

export async function POST(
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

    const body: PageRequestBody = await request.json();
    const { textContent, imageUrl, pageNumber } = body;

    if (!textContent || !imageUrl || isNaN(pageNumber)) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 },
      );
    }

    const page = await prisma.storyPage.create({
      data: {
        textContent,
        imageUrl,
        pageNumber,
        storyId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Page content added successfully',
        data: {
          pageId: page.id,
          textContent: page.textContent,
          imageUrl: page.imageUrl,
          pageNumber: page.pageNumber,
          createdAt: page.createdAt.toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error('Error adding page content:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', data: error },
      { status: 500 },
    );
  }
}
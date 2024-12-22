import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid user ID' },
        { status: 400 },
      );
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10);

    const stories = await prisma.story.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        category: true,
        ageRange: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const storyCards = stories.map((story) => ({
      storyId: story.id,
      title: story.title,
      category: story.category,
      ageRange: story.ageRange,
    }));

    return NextResponse.json(
      {
        success: true,
        message: 'Stories fetched successfully',
        data: storyCards,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error fetching stories:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}
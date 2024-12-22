import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type StoryRequestBody = {
  title: string;
  numberOfPages: number;
  category: string;
  ageRange: string;
  mainCharacter: string;
  secondaryCharacter?: string;
  moral?: string;
  plotSetting?: string;
  userId: number;
};

export async function POST(request: Request) {
  try {
    const body: StoryRequestBody = await request.json();

    const {
      title,
      numberOfPages,
      category,
      ageRange,
      mainCharacter,
      secondaryCharacter,
      moral,
      plotSetting,
      userId,
    } = body;

    if (
      !title ||
      !numberOfPages ||
      !category ||
      !ageRange ||
      !mainCharacter ||
      !userId
    ) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 },
      );
    }

    const story = await prisma.story.create({
      data: {
        title,
        numberOfPages,
        category,
        ageRange,
        mainCharacter,
        secondaryCharacter,
        moral,
        plotSetting,
        userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Story created successfully',
        data: {
          storyId: story.id,
          title: story.title,
          numberOfPages: story.numberOfPages,
          category: story.category,
          ageRange: story.ageRange,
          mainCharacter: story.mainCharacter,
          secondaryCharacter: story.secondaryCharacter,
          moral: story.moral,
          plotSetting: story.plotSetting,
          createdAt: story.createdAt.toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error('Error creating story:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}
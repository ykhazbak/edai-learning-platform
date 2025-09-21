import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getCourseData } from "@/lib/courses"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { courseId, progress, completed, currentSectionSlug } = await request.json()

    if (!courseId || typeof progress !== "number") {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const existingProgress = await prisma.courseProgress.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: courseId,
        },
      },
    });

    const newProgress = Math.max(0, Math.min(100, progress));
    const finalProgress = existingProgress?.progress ? Math.max(existingProgress.progress, newProgress) : newProgress;

    const courseProgress = await prisma.courseProgress.upsert({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: courseId
        }
      },
      update: {
        progress: finalProgress,
        completed: completed || finalProgress === 100,
        lastAccessed: new Date(),
        completedAt: (completed || finalProgress === 100) ? new Date() : null,
        currentSectionSlug: currentSectionSlug
      },
      create: {
        userId: session.user.id,
        courseId: courseId,
        progress: finalProgress,
        completed: completed || false,
        lastAccessed: new Date(),
        completedAt: completed ? new Date() : null,
        currentSectionSlug: currentSectionSlug
      }
    })

    return NextResponse.json(courseProgress)
  } catch (error) {
    console.error("Course progress error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get("courseId")

    if (courseId) {
      // Get specific course progress
      const courseProgress = await prisma.courseProgress.findUnique({
        where: {
          userId_courseId: {
            userId: session.user.id,
            courseId: courseId
          }
        }
      })

      if (courseProgress && courseProgress.currentSectionSlug) {
        try {
          // Get course data to find section name
          const courseData = await getCourseData(courseId)
          const currentSection = courseData.sections.find((section: any) => section.slug === courseProgress.currentSectionSlug)
          
          return NextResponse.json({
            ...courseProgress,
            currentSectionName: currentSection?.text || 'Continue Learning'
          })
        } catch (error) {
          console.error("Error getting course data:", error)
          // Return progress without section name if course data fails
          return NextResponse.json(courseProgress)
        }
      }

      return NextResponse.json(courseProgress)
    } else {
      // Get all course progress for user
      const allProgress = await prisma.courseProgress.findMany({
        where: {
          userId: session.user.id
        },
        orderBy: {
          lastAccessed: "desc"
        },
        select: {
          id: true,
          userId: true,
          courseId: true,
          completed: true,
          progress: true,
          currentSectionSlug: true,
          lastAccessed: true,
          completedAt: true,
          createdAt: true,
          updatedAt: true,
        }
      })

      // Fetch course data for each progress entry to get currentSectionName
      const progressWithSectionNames = await Promise.all(allProgress.map(async (progressEntry) => {
        if (progressEntry.currentSectionSlug) {
          try {
            const courseData = await getCourseData(progressEntry.courseId);
            const currentSection = courseData.sections.find((section: any) => section.slug === progressEntry.currentSectionSlug);
            return {
              ...progressEntry,
              currentSectionName: currentSection?.text || 'Continue Learning'
            };
          } catch (error) {
            console.error(`Error getting course data for course ${progressEntry.courseId}:`, error);
            return progressEntry; // Return original progress if course data fails
          }
        }
        return progressEntry;
      }));

      return NextResponse.json(progressWithSectionNames)
    }
  } catch (error) {
    console.error("Get course progress error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
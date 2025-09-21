import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { exerciseId, courseId, completed, score } = await request.json()

    if (!exerciseId) {
      return NextResponse.json(
        { error: "Missing exerciseId" },
        { status: 400 }
      )
    }

    const exerciseProgress = await prisma.exerciseProgress.upsert({
      where: {
        userId_exerciseId: {
          userId: session.user.id,
          exerciseId: exerciseId
        }
      },
      update: {
        completed: completed || false,
        score: score ? Math.max(0, Math.min(100, score)) : null,
        attempts: {
          increment: 1
        },
        lastAttempt: new Date(),
        completedAt: completed ? new Date() : null
      },
      create: {
        userId: session.user.id,
        exerciseId: exerciseId,
        courseId: courseId,
        completed: completed || false,
        score: score ? Math.max(0, Math.min(100, score)) : null,
        attempts: 1,
        lastAttempt: new Date(),
        completedAt: completed ? new Date() : null
      }
    })

    return NextResponse.json(exerciseProgress)
  } catch (error) {
    console.error("Exercise progress error:", error)
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
    const exerciseId = searchParams.get("exerciseId")
    const courseId = searchParams.get("courseId")

    if (exerciseId) {
      // Get specific exercise progress
      const exerciseProgress = await prisma.exerciseProgress.findUnique({
        where: {
          userId_exerciseId: {
            userId: session.user.id,
            exerciseId: exerciseId
          }
        }
      })

      return NextResponse.json(exerciseProgress)
    } else if (courseId) {
      // Get all exercise progress for a course
      const courseExercises = await prisma.exerciseProgress.findMany({
        where: {
          userId: session.user.id,
          courseId: courseId
        },
        orderBy: {
          lastAttempt: "desc"
        }
      })

      return NextResponse.json(courseExercises)
    } else {
      // Get all exercise progress for user
      const allProgress = await prisma.exerciseProgress.findMany({
        where: {
          userId: session.user.id
        },
        orderBy: {
          lastAttempt: "desc"
        }
      })

      return NextResponse.json(allProgress)
    }
  } catch (error) {
    console.error("Get exercise progress error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
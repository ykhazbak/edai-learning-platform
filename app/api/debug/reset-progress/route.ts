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

    const { courseId } = await request.json()

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      )
    }

    // Delete progress record for this user and course
    const result = await prisma.courseProgress.deleteMany({
      where: {
        userId: session.user.id,
        courseId: courseId
      }
    })

    return NextResponse.json({ 
      message: `Progress reset successfully for course ${courseId}`,
      deletedRecords: result.count
    })
  } catch (error) {
    console.error("Reset progress error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

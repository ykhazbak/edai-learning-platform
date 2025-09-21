import { NextResponse } from "next/server"
import { getSortedCoursesData } from "@/lib/courses"

export async function GET() {
  try {
    const courses = await getSortedCoursesData()
    return NextResponse.json(courses)
  } catch (error) {
    console.error("Courses API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    )
  }
}

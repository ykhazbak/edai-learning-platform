import Link from "next/link"
import Image from "next/image"
import { getSortedCoursesData } from "@/lib/courses"
import CoursesContent from "@/components/courses-content"
import UserNav from "@/components/user-nav"
import { useCourseProgress } from "@/lib/hooks/use-progress"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function CoursesPage() {
  const allCourses = await getSortedCoursesData()
  // Filter to show only AI Discovery course
  const courses = allCourses.filter(course => course.id === 'foundations-of-ai')

  const session = await getServerSession(authOptions)
  let courseProgress = []
  if (session?.user?.id) {
    try {
      // For server-side components, use absolute URL or direct API call
      const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/progress/course`);
      if (response.ok) {
        courseProgress = await response.json()
      }
    } catch (error) {
      console.error('Failed to fetch course progress:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Image 
                src="/edai-logo.svg" 
                alt="EdAI Logo" 
                width={48} 
                height={34}
                className="mr-1"
              />
              <span className="text-xl font-bold text-gray-900">EdAI</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600 font-medium">
                Dashboard
              </Link>
              <Link href="/courses" className="text-indigo-600 font-medium">
                Courses
              </Link>
              <span className="text-gray-400 font-medium cursor-not-allowed">
                Practice
              </span>
              <span className="text-gray-400 font-medium cursor-not-allowed">
                Projects
              </span>
              <span className="text-gray-400 font-medium cursor-not-allowed">
                AI Tutor
              </span>
            </nav>
            <div className="flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
      </header>

      <div className="pt-16">
        <CoursesContent courses={courses} userCourseProgress={courseProgress} />
      </div>
    </div>
  )
}

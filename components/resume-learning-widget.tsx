"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, RotateCcw, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface CourseProgress {
  id: string
  courseId: string
  progress: number
  completed: boolean
  currentSectionSlug?: string
  currentSectionName?: string
  lastAccessed: string
}

interface Course {
  id: string
  title: string
  description: string
  image: string
  level: string
}

export default function ResumeLearningWidget() {
  const { data: session } = useSession()
  const [mostRecentCourse, setMostRecentCourse] = useState<(CourseProgress & Course) | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMostRecentCourse = async () => {
      if (!session?.user) {
        setLoading(false)
        return
      }
      
      try {
        // Fetch course progress
        const progressResponse = await fetch('/api/progress/course')
        const progressData = await progressResponse.json()
        
        if (Array.isArray(progressData) && progressData.length > 0) {
          // Get the most recent course (first in the sorted array)
          const mostRecent = progressData[0]
          
          // Fetch course data
          const coursesResponse = await fetch('/api/courses')
          if (coursesResponse.ok) {
            const coursesData = await coursesResponse.json()
            const course = coursesData.find((c: Course) => c.id === mostRecent.courseId)
            
            if (course) {
              setMostRecentCourse({ ...mostRecent, ...course })
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch most recent course:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMostRecentCourse()
  }, [session])

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </CardHeader>
        <CardContent>
          <div className="h-20 bg-gray-200 rounded"></div>
        </CardContent>
      </Card>
    )
  }

  if (!session?.user || !mostRecentCourse) {
    return null
  }

  const timeSinceLastAccess = new Date().getTime() - new Date(mostRecentCourse.lastAccessed).getTime()
  const daysSince = Math.floor(timeSinceLastAccess / (1000 * 60 * 60 * 24))
  const hoursSince = Math.floor(timeSinceLastAccess / (1000 * 60 * 60))

  const getTimeText = () => {
    if (daysSince > 0) {
      return `${daysSince} day${daysSince > 1 ? 's' : ''} ago`
    } else if (hoursSince > 0) {
      return `${hoursSince} hour${hoursSince > 1 ? 's' : ''} ago`
    } else {
      return 'Less than an hour ago'
    }
  }

  return (
    <Card className="border-l-4 border-l-emerald-500 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center">
              <RotateCcw className="h-5 w-5 mr-2 text-emerald-600" />
              Continue Learning
            </CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </div>
          {!mostRecentCourse.completed && (
            <Badge variant="outline" className="text-emerald-600 border-emerald-600">
              In Progress
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start space-x-4">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={mostRecentCourse.image || "/placeholder.svg"}
              alt={mostRecentCourse.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{mostRecentCourse.title}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
              <Clock className="h-4 w-4" />
              <span>Last accessed {getTimeText()}</span>
            </div>
            
            {mostRecentCourse.currentSectionName && (
              <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
                <BookOpen className="h-4 w-4" />
                <span className="truncate">Current: {mostRecentCourse.currentSectionName}</span>
              </div>
            )}
            
            <div className="mt-3">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{Math.round(mostRecentCourse.progress)}%</span>
              </div>
              <Progress value={mostRecentCourse.progress} className="h-2" />
            </div>
            
            <Link 
              href={mostRecentCourse.currentSectionSlug 
                ? `/courses/${mostRecentCourse.courseId}?section=${mostRecentCourse.currentSectionSlug}` 
                : `/courses/${mostRecentCourse.courseId}`}
              className="block mt-4"
            >
              <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
                <RotateCcw className="h-4 w-4 mr-2" />
                {mostRecentCourse.completed ? 'Review Course' : 'Continue Learning'}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

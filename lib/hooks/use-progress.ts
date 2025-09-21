"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

export interface CourseProgress {
  id: string
  userId: string
  courseId: string
  completed: boolean
  progress: number
  lastAccessed: Date
  completedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface ExerciseProgress {
  id: string
  userId: string
  exerciseId: string
  courseId: string | null
  completed: boolean
  score: number | null
  attempts: number
  lastAttempt: Date
  completedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export function useCourseProgress(courseId?: string) {
  const { data: session } = useSession()
  const [progress, setProgress] = useState<CourseProgress | CourseProgress[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProgress = async () => {
    if (!session?.user) return
    if (!courseId) return // Don't fetch if courseId is undefined

    setLoading(true)
    setError(null)

    try {
      const url = `/api/progress/course?courseId=${courseId}`
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error("Failed to fetch progress")
      }

      const data = await response.json()
      setProgress(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const updateProgress = async (
    courseId: string, 
    progress: number, 
    completed?: boolean, 
    currentSectionSlug?: string
  ) => {
    if (!session?.user) return
    if (!courseId) return // Don't update if courseId is undefined

    try {
      const response = await fetch("/api/progress/course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          courseId,
          progress,
          completed,
          currentSectionSlug
        })
      })

      if (!response.ok) {
        throw new Error("Failed to update progress")
      }

      const data = await response.json()
      
      // Update local state if we're tracking a specific course
      if (courseId && typeof progress === "object" && progress !== null) {
        setProgress(data)
      }

      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      throw err
    }
  }

  useEffect(() => {
    fetchProgress()
  }, [session, courseId])

  return {
    progress,
    loading,
    error,
    updateProgress,
    refetch: fetchProgress
  }
}

export function useExerciseProgress(exerciseId?: string, courseId?: string) {
  const { data: session } = useSession()
  const [progress, setProgress] = useState<ExerciseProgress | ExerciseProgress[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProgress = async () => {
    if (!session?.user) return

    setLoading(true)
    setError(null)

    try {
      let url = "/api/progress/exercise"
      const params = new URLSearchParams()
      
      if (exerciseId) params.append("exerciseId", exerciseId)
      if (courseId) params.append("courseId", courseId)
      
      if (params.toString()) {
        url += `?${params.toString()}`
      }
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error("Failed to fetch progress")
      }

      const data = await response.json()
      setProgress(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const updateProgress = async (
    exerciseId: string, 
    options: { 
      courseId?: string
      completed?: boolean
      score?: number 
    } = {}
  ) => {
    if (!session?.user) return

    try {
      const response = await fetch("/api/progress/exercise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          exerciseId,
          ...options
        })
      })

      if (!response.ok) {
        throw new Error("Failed to update progress")
      }

      const data = await response.json()
      
      // Update local state if we're tracking a specific exercise
      if (exerciseId && typeof progress === "object" && progress !== null) {
        setProgress(data)
      }

      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      throw err
    }
  }

  useEffect(() => {
    fetchProgress()
  }, [session, exerciseId, courseId])

  return {
    progress,
    loading,
    error,
    updateProgress,
    refetch: fetchProgress
  }
}
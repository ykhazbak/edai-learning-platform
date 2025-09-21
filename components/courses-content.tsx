"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Clock, Users, Star, Play, Code, Eye, RotateCcw } from "lucide-react"
import Link from "next/link"
import ResumeLearningWidget from "@/components/resume-learning-widget"

type Course = {
  id: string;
  title: string;
  description: string;
  image: string;
  level: string;
  rating: number;
  tags: string[];
  duration: string;
  projects: number;
  students: number;
  category: string;
  date: string;
};

type CourseProgress = {
  courseId: string;
  progress: number;
  currentSectionSlug?: string;
  currentSectionName?: string;
};

export default function CoursesContent({
  courses: initialCourses,
  userCourseProgress,
}: {
  courses: Course[];
  userCourseProgress: CourseProgress[];
}) {
  const courseProgressMap: Record<string, CourseProgress> = userCourseProgress.reduce(
    (acc, progress) => {
      acc[progress.courseId] = progress;
      return acc;
    },
    {} as Record<string, CourseProgress>
  );

  const courses = initialCourses;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            AI Discovery Course
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Your adventure into the amazing world of Artificial Intelligence starts here!
          </p>
        </div>

        {/* Resume Learning Widget */}
        <div className="mb-8 max-w-2xl mx-auto">
          <ResumeLearningWidget />
        </div>

        {/* Course Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Get Started with AI</h2>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md">
              {courses
                  .map((course) => (
                    <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                      <div className="relative">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge
                            variant={
                              course.level === "Beginner"
                                ? "secondary"
                                : course.level === "Intermediate"
                                  ? "default"
                                  : "destructive"
                            }
                          >
                            {course.level}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                            <div className="flex items-center text-sm">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                              <span className="font-medium">{course.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-base leading-tight mb-1">{course.title}</CardTitle>
                            <CardDescription className="text-xs line-clamp-2">{course.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                          <div className="space-y-3">
                          <div className="flex flex-wrap gap-2">
                            {course.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {course.duration}
                              </div>
                              <div className="flex items-center">
                                <Code className="h-3 w-3 mr-1" />
                                {course.projects}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {course.students > 1000 ? `${(course.students/1000).toFixed(1)}k` : course.students}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  Preview
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>{course.title}</DialogTitle>
                                  <DialogDescription>
                                    {course.description}
                                  </DialogDescription>
                                </DialogHeader>
                                <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover rounded-md mt-4" />
                                
                                {/* Progress indicator in dialog */}
                                {courseProgressMap[course.id] && (
                                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-sm font-medium text-blue-900">Your Progress</span>
                                      <span className="text-sm text-blue-700">{Math.round(courseProgressMap[course.id].progress)}%</span>
                                    </div>
                                    <div className="w-full bg-blue-200 rounded-full h-2">
                                      <div 
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                        style={{ width: `${courseProgressMap[course.id].progress}%` }}
                                      ></div>
                                    </div>
                                    <p className="text-xs text-blue-700 mt-2">
                                      Last section: {courseProgressMap[course.id].currentSectionName}
                                    </p>
                                  </div>
                                )}
                                
                                <div className="flex justify-between items-center mt-4">
                                  <Link 
                                    href={courseProgressMap[course.id] && courseProgressMap[course.id].currentSectionSlug 
                                      ? `/courses/${course.id}?section=${courseProgressMap[course.id].currentSectionSlug}` 
                                      : `/courses/${course.id}`} 
                                    className="w-full"
                                  >
                                    <Button className="w-full bg-gray-900 text-white hover:bg-indigo-600 hover:text-white hover:shadow-lg transition-all">
                                      {courseProgressMap[course.id] ? (
                                        <>
                                          <RotateCcw className="h-4 w-4 mr-2" />
                                          Continue Course
                                        </>
                                      ) : (
                                        <>
                                          <Play className="h-4 w-4 mr-2" />
                                          Start Course
                                        </>
                                      )}
                                    </Button>
                                  </Link>
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            {/* Main course button */}
                            <Link 
                              href={courseProgressMap[course.id] && courseProgressMap[course.id].currentSectionSlug 
                                ? `/courses/${course.id}?section=${courseProgressMap[course.id].currentSectionSlug}` 
                                : `/courses/${course.id}`}
                            >
                              <Button size="sm" className="bg-gray-900 text-white hover:bg-indigo-600 hover:text-white hover:shadow-lg transition-all">
                                {courseProgressMap[course.id] ? (
                                  <>
                                    <RotateCcw className="h-4 w-4 mr-2" />
                                    Continue ({Math.round(courseProgressMap[course.id].progress)}%)
                                  </>
                                ) : (
                                  <>
                                    <Play className="h-4 w-4 mr-2" />
                                    Start Course
                                  </>
                                )}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
            </div>
          </div>
        </div>

      </main>
    )
} 
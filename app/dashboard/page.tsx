"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Trophy,
  TrendingUp,
  Play,
  Clock,
  Users,
  Lightbulb,
  MessageCircle,
  Target,
  CheckCircle,
  Star,
  Flame,
  BookOpen,
  RotateCcw,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import UserNav from "@/components/user-nav"

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
  category: string
}

export default function Dashboard() {
  const { data: session } = useSession()
  const [recentCourses, setRecentCourses] = useState<(CourseProgress & Course)[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentCourses = async () => {
      if (!session?.user) return
      
      try {
        setLoading(true)
        
        // Fetch course progress
        const progressResponse = await fetch('/api/progress/course')
        const progressData = await progressResponse.json()
        
        if (Array.isArray(progressData) && progressData.length > 0) {
          // Fetch course data for each progress entry
          const coursesResponse = await fetch('/api/courses')
          let coursesData = []
          if (coursesResponse.ok) {
            coursesData = await coursesResponse.json()
          }
          
          // Combine progress with course data
          const combinedData = progressData
            .map(progress => {
              const course = coursesData.find((c: Course) => c.id === progress.courseId)
              return course ? { ...progress, ...course } : null
            })
            .filter(Boolean)
            .slice(0, 3) // Show only 3 most recent
          
          setRecentCourses(combinedData)
        }
      } catch (error) {
        console.error('Failed to fetch recent courses:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentCourses()
  }, [session])

  const currentProjects = [
    {
      id: 1,
      title: "Build Your First Chatbot",
      description: "Create an AI chatbot using natural language processing",
      progress: 65,
      timeLeft: "2 hours",
      difficulty: "Beginner",
      category: "NLP",
      masteryLevel: 3,
      totalLevels: 5,
    },
    {
      id: 2,
      title: "Image Recognition Challenge",
      description: "Train a model to classify different dog breeds",
      progress: 30,
      timeLeft: "4 hours",
      difficulty: "Intermediate",
      category: "Computer Vision",
      masteryLevel: 1,
      totalLevels: 4,
    },
  ]

  const microCourses = [
    {
      title: "Intro to Machine Learning",
      duration: "3 hours",
      exercises: 12,
      completed: 8,
      certificate: true,
      difficulty: "Beginner",
    },
    {
      title: "Data Cleaning",
      duration: "2 hours",
      exercises: 8,
      completed: 8,
      certificate: true,
      difficulty: "Beginner",
    },
    {
      title: "Feature Engineering",
      duration: "4 hours",
      exercises: 15,
      completed: 3,
      certificate: false,
      difficulty: "Intermediate",
    },
  ]

  const achievements = [
    { name: "First Model Trained", icon: "🎯", earned: true, points: 100 },
    { name: "Code Collaborator", icon: "👥", earned: true, points: 150 },
    { name: "Data Detective", icon: "🔍", earned: false, points: 200 },
    { name: "7-Day Streak", icon: "🔥", earned: true, points: 300 },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your learning progress...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header - Khan Academy inspired clean design */}
      <header className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Image 
                src="/edai-logo.svg" 
                alt="EdAI Logo" 
                width={48} 
                height={34}
                className="mr-1"
              />
              <span className="text-xl font-bold text-gray-900">EdAI</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/dashboard" className="text-indigo-600 font-medium">
                Dashboard
              </Link>
              <Link href="/courses" className="text-gray-700 hover:text-indigo-600 font-medium">
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Welcome Section with Khan Academy style motivation */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {session?.user?.name || 'Learner'}! 👋
          </h1>
          <p className="text-gray-600 mb-4">You're on a 7-day learning streak! Keep it up to earn bonus points.</p>

          {/* Daily Goal Progress - Khan Academy inspired */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-green-900">Today's Goal</h3>
                  <p className="text-sm text-green-700">Complete 2 exercises to maintain your streak</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">1/2</div>
                    <div className="text-xs text-green-600">exercises</div>
                  </div>
                  <div className="w-16 h-16 relative">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeDasharray="50, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-green-600">50%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Courses - Continue where you left off */}
            {recentCourses.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Continue Learning</h2>
                    <p className="text-sm text-gray-600 mt-1">Pick up where you left off</p>
                  </div>
                  <Link href="/courses">
                    <Button variant="outline" size="sm">
                      Browse All Courses
                    </Button>
                  </Link>
                </div>
                <div className="grid gap-4">
                  {recentCourses.map((course) => (
                    <Card key={course.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-emerald-500">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={course.image || "/placeholder.svg"}
                                alt={course.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <CardTitle className="text-lg">{course.title}</CardTitle>
                                <Badge variant="secondary" className="text-xs">
                                  {course.level}
                                </Badge>
                                {course.completed && (
                                  <Badge variant="default" className="text-xs bg-green-600">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Completed
                                  </Badge>
                                )}
                              </div>
                              <CardDescription className="mb-3">{course.description}</CardDescription>
                              
                              {course.currentSectionName && (
                                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                                  <BookOpen className="h-4 w-4" />
                                  <span>Last section: {course.currentSectionName}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Progress bar */}
                          <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                              <span>Progress</span>
                              <span>{Math.round(course.progress)}% complete</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {course.category}
                              </Badge>
                            </div>
                            <Link 
                              href={course.currentSectionSlug 
                                ? `/courses/${course.courseId}?section=${course.currentSectionSlug}` 
                                : `/courses/${course.courseId}`}
                            >
                              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Continue Learning
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Practice Projects - Kaggle Learn style with mastery levels */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Practice Projects</h2>
                  <p className="text-sm text-gray-600 mt-1">Master concepts through hands-on practice</p>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="grid gap-6">
                {currentProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-indigo-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                            <Badge variant="outline" className="text-xs">
                              Real Dataset
                            </Badge>
                            <Badge variant={project.difficulty === "Beginner" ? "secondary" : "default"}>
                              {project.difficulty}
                            </Badge>
                          </div>
                          <CardDescription className="mb-3">{project.description}</CardDescription>

                          {/* Mastery Progress - Khan Academy style */}
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="text-sm font-medium text-gray-700">Mastery:</span>
                            <div className="flex space-x-1">
                              {Array.from({ length: project.totalLevels }, (_, i) => (
                                <div
                                  key={i}
                                  className={`w-4 h-4 rounded-full ${
                                    i < project.masteryLevel
                                      ? "bg-green-500"
                                      : i === project.masteryLevel
                                        ? "bg-yellow-400"
                                        : "bg-gray-200"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              Level {project.masteryLevel}/{project.totalLevels}
                            </span>
                          </div>

                          {/* Critical Thinking Prompt */}
                          <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r">
                            <div className="flex items-start">
                              <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium text-yellow-800">Think About This:</p>
                                <p className="text-sm text-yellow-700 mt-1">
                                  {project.id === 1
                                    ? "Why might a chatbot give different responses to the same question? What factors influence its 'personality'?"
                                    : "How does a computer 'see' the difference between a Golden Retriever and a Labrador? What features matter most?"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Progress with Khan Academy style indicators */}
                        <div>
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Overall Progress</span>
                            <span>{project.progress}% complete</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Explore</span>
                            <span>Practice</span>
                            <span>Master</span>
                            <span>Apply</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {project.timeLeft} left
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {project.category}
                            </Badge>
                          </div>
                          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                            <Play className="h-4 w-4 mr-2" />
                            Continue
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Kaggle Learn Style Micro-Courses */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Micro-Courses</h2>
                <Button variant="outline" size="sm">
                  Browse All
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {microCourses.map((course, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={course.difficulty === "Beginner" ? "secondary" : "default"} className="text-xs">
                          {course.difficulty}
                        </Badge>
                        {course.certificate && course.completed === course.exercises && (
                          <div className="flex items-center space-x-1 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-xs font-medium">Certified</span>
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-base">{course.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {course.duration} • {course.exercises} exercises
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>
                              {course.completed}/{course.exercises}
                            </span>
                          </div>
                          <Progress value={(course.completed / course.exercises) * 100} className="h-2" />
                        </div>
                        <Button
                          size="sm"
                          className="w-full"
                          variant={course.completed === course.exercises ? "outline" : "default"}
                        >
                          {course.completed === course.exercises ? "Review" : "Continue"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - Khan Academy inspired */}
          <div className="space-y-6">
            {/* Mastery Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-indigo-600" />
                  Mastery Goals
                </CardTitle>
                <CardDescription>Focus on these to level up</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-medium text-blue-900 text-sm">Next Mastery Level</h4>
                  <p className="text-sm text-blue-800 mt-1">
                    Complete 3 more neural network exercises to reach Level 4
                  </p>
                  <div className="mt-2">
                    <Progress value={60} className="h-2" />
                    <span className="text-xs text-blue-700">3/5 exercises</span>
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <h4 className="font-medium text-yellow-900 text-sm">Skill Practice</h4>
                  <p className="text-sm text-yellow-800 mt-1">Practice data preprocessing to maintain mastery</p>
                  <Button size="sm" variant="outline" className="mt-2 text-xs h-7 bg-transparent">
                    Practice Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Khan Academy style Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-indigo-50 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600">23</div>
                    <div className="text-xs text-indigo-700">Projects Mastered</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">7</div>
                    <div className="text-xs text-green-700">Day Streak</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Weekly Goal</span>
                    <span>12/15 exercises</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Achievements - Khan Academy style badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.slice(0, 3).map((achievement, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-2 rounded-lg ${
                        achievement.earned ? "bg-yellow-50 border border-yellow-200" : "bg-gray-50"
                      }`}
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div
                          className={`text-sm font-medium ${achievement.earned ? "text-yellow-800" : "text-gray-500"}`}
                        >
                          {achievement.name}
                        </div>
                        <div className="text-xs text-gray-600">+{achievement.points} points</div>
                      </div>
                      {achievement.earned && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Activity - Kaggle style */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-500" />
                  Community Highlights
                </CardTitle>
                <CardDescription>See what others are discovering</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-blue-100 text-blue-700">AM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">Alex earned "Data Wizard" badge</p>
                    <p className="text-xs text-gray-500">Completed 50 data cleaning exercises</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-purple-100 text-purple-700">SM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">Sarah shared: "Why dropout works"</p>
                    <p className="text-xs text-gray-500">23 likes • 8 comments</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Join Community
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  CheckCircle,
  Clock,
  Star,
  Lightbulb,
  Code,
  BarChart3,
  Target,
  Zap,
  HelpCircle,
  Brain,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import UserNav from "@/components/user-nav"

export default function PracticePage() {
  const practiceExercises = [
    {
      id: 1,
      title: "Data Cleaning Challenge",
      description: "Clean a messy real-world dataset from Airbnb listings",
      difficulty: "Beginner",
      timeEstimate: "15 min",
      points: 50,
      completed: false,
      dataset: "Airbnb NYC 2019",
      skills: ["Pandas", "Data Cleaning"],
      masteryLevel: "Practice",
    },
    {
      id: 2,
      title: "Feature Engineering Lab",
      description: "Create meaningful features from raw customer data",
      difficulty: "Intermediate",
      timeEstimate: "25 min",
      points: 75,
      completed: true,
      dataset: "E-commerce Customer Data",
      skills: ["Feature Engineering", "Domain Knowledge"],
      masteryLevel: "Mastered",
    },
    {
      id: 3,
      title: "Model Validation Exercise",
      description: "Implement cross-validation and detect overfitting",
      difficulty: "Intermediate",
      timeEstimate: "20 min",
      points: 100,
      completed: false,
      dataset: "Housing Prices",
      skills: ["Cross-validation", "Model Selection"],
      masteryLevel: "Ready",
    },
  ]

  const skillAreas = [
    {
      name: "Data Preprocessing",
      progress: 85,
      exercises: 12,
      completed: 10,
      mastery: "Advanced",
      color: "bg-blue-500",
    },
    {
      name: "Machine Learning",
      progress: 60,
      exercises: 15,
      completed: 9,
      mastery: "Intermediate",
      color: "bg-green-500",
    },
    {
      name: "Deep Learning",
      progress: 30,
      exercises: 20,
      completed: 6,
      mastery: "Beginner",
      color: "bg-purple-500",
    },
    {
      name: "Data Visualization",
      progress: 75,
      exercises: 8,
      completed: 6,
      mastery: "Intermediate",
      color: "bg-orange-500",
    },
  ]

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
              <Link href="/courses" className="text-gray-700 hover:text-indigo-600 font-medium">
                Courses
              </Link>
              <Link href="/practice" className="text-indigo-600 font-medium">
                Practice
              </Link>
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
        {/* Hero Section - Khan Academy style */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Practice Makes <span className="text-indigo-600">Perfect</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master AI concepts through hands-on exercises with real datasets. Get immediate feedback and build your
            skills step by step.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <Tabs defaultValue="recommended" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="by-skill">By Skill</TabsTrigger>
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
                <TabsTrigger value="review">Review</TabsTrigger>
              </TabsList>

              <TabsContent value="recommended" className="space-y-6">
                {/* Khan Academy style recommended practice */}
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Target className="h-6 w-6 text-green-600" />
                      <h3 className="text-lg font-semibold text-green-900">Recommended for You</h3>
                    </div>
                    <p className="text-green-800 mb-4">
                      Based on your progress, these exercises will help you master key concepts and maintain your
                      learning streak.
                    </p>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  {practiceExercises.map((exercise) => (
                    <Card key={exercise.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <CardTitle className="text-lg">{exercise.title}</CardTitle>
                              <Badge variant={exercise.difficulty === "Beginner" ? "secondary" : "default"}>
                                {exercise.difficulty}
                              </Badge>
                              {exercise.completed && (
                                <Badge className="bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Completed
                                </Badge>
                              )}
                            </div>
                            <CardDescription className="mb-3">{exercise.description}</CardDescription>

                            {/* Dataset info - Kaggle Learn style */}
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center">
                                <BarChart3 className="h-4 w-4 mr-1" />
                                {exercise.dataset}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {exercise.timeEstimate}
                              </div>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 mr-1" />
                                {exercise.points} points
                              </div>
                            </div>

                            {/* Skills tags */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {exercise.skills.map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Mastery indicator */}
                          <div className="text-right">
                            <Badge
                              variant="outline"
                              className={`${
                                exercise.masteryLevel === "Mastered"
                                  ? "bg-green-50 text-green-700 border-green-300"
                                  : exercise.masteryLevel === "Ready"
                                    ? "bg-blue-50 text-blue-700 border-blue-300"
                                    : "bg-yellow-50 text-yellow-700 border-yellow-300"
                              }`}
                            >
                              {exercise.masteryLevel}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Lightbulb className="h-4 w-4 mr-2" />
                              Hint
                            </Button>
                            <Button variant="outline" size="sm">
                              <Code className="h-4 w-4 mr-2" />
                              Solution
                            </Button>
                          </div>
                          <Button size="sm" disabled={exercise.completed}>
                            <Play className="h-4 w-4 mr-2" />
                            {exercise.completed ? "Completed" : "Start Exercise"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="by-skill" className="space-y-6">
                <div className="grid gap-6">
                  {skillAreas.map((skill, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{skill.name}</CardTitle>
                            <CardDescription>
                              {skill.completed}/{skill.exercises} exercises completed
                            </CardDescription>
                          </div>
                          <Badge
                            variant="outline"
                            className={`${
                              skill.mastery === "Advanced"
                                ? "bg-purple-50 text-purple-700 border-purple-300"
                                : skill.mastery === "Intermediate"
                                  ? "bg-blue-50 text-blue-700 border-blue-300"
                                  : "bg-green-50 text-green-700 border-green-300"
                            }`}
                          >
                            {skill.mastery}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                              <span>Mastery Progress</span>
                              <span>{skill.progress}%</span>
                            </div>
                            <Progress value={skill.progress} className="h-3" />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                              {skill.exercises - skill.completed} exercises remaining
                            </div>
                            <Button size="sm">
                              <Play className="h-4 w-4 mr-2" />
                              Practice
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="challenges" className="space-y-6">
                <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Zap className="h-6 w-6 text-orange-600" />
                      <h3 className="text-lg font-semibold text-orange-900">Weekly Challenge</h3>
                    </div>
                    <h4 className="font-semibold text-orange-900 mb-2">Climate Data Analysis Challenge</h4>
                    <p className="text-orange-800 mb-4">
                      Use real climate data to predict temperature changes. Compete with other students for the most
                      accurate model!
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-orange-700">
                        <span className="font-medium">Deadline:</span> 3 days remaining
                      </div>
                      <Button className="bg-orange-600 hover:bg-orange-700">
                        <Play className="h-4 w-4 mr-2" />
                        Join Challenge
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="review" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills to Review</CardTitle>
                    <CardDescription>Keep your mastery sharp by reviewing these concepts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div>
                          <h4 className="font-medium text-yellow-900">Linear Regression</h4>
                          <p className="text-sm text-yellow-800">Last practiced 2 weeks ago</p>
                        </div>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          Review
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div>
                          <h4 className="font-medium text-blue-900">Decision Trees</h4>
                          <p className="text-sm text-blue-800">Mastery level decreasing</p>
                        </div>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          Review
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Khan Academy style */}
          <div className="space-y-6">
            {/* Daily Practice Goal */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Today's Practice</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 relative">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        strokeDasharray="33, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-blue-600">1/3</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">exercises completed</p>
                </div>
              </CardContent>
            </Card>

            {/* Mastery Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Mastery Tracker</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {skillAreas.slice(0, 3).map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-gray-600">{skill.progress}%</span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Help & Hints */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs bg-transparent">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Get Hint
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs bg-transparent">
                  <Brain className="h-4 w-4 mr-2" />
                  Ask AI Tutor
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs bg-transparent">
                  <Code className="h-4 w-4 mr-2" />
                  View Solution
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

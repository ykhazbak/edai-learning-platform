import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Clock, Users, Star, Code, Zap, Trophy, GitBranch, Share } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import UserNav from "@/components/user-nav"

export default function ProjectsPage() {
  const activeProjects = [
    {
      id: 1,
      title: "Build Your First Chatbot",
      description:
        "Create an AI chatbot that can answer questions about your favorite topics using natural language processing.",
      progress: 65,
      timeLeft: "2 hours",
      difficulty: "Beginner",
      category: "NLP",
      nextStep: "Training the conversation model",
      dueDate: "Tomorrow",
    },
    {
      id: 2,
      title: "Image Recognition Challenge",
      description: "Train a model to classify different dog breeds from photos using computer vision techniques.",
      progress: 30,
      timeLeft: "4 hours",
      difficulty: "Intermediate",
      category: "Computer Vision",
      nextStep: "Data preprocessing",
      dueDate: "In 3 days",
    },
  ]

  const availableProjects = [
    {
      id: 3,
      title: "Music Recommendation Engine",
      description: "Build a system that recommends songs based on user preferences and listening history.",
      difficulty: "Intermediate",
      duration: "6 hours",
      category: "Recommendation Systems",
      skills: ["Python", "Pandas", "Machine Learning"],
      rating: 4.8,
      completions: 1200,
      featured: true,
    },
    {
      id: 4,
      title: "Sentiment Analysis Dashboard",
      description: "Create a real-time dashboard that analyzes social media sentiment about trending topics.",
      difficulty: "Advanced",
      duration: "8 hours",
      category: "NLP",
      skills: ["Python", "NLP", "Data Visualization"],
      rating: 4.9,
      completions: 850,
    },
    {
      id: 5,
      title: "Smart Home Energy Predictor",
      description: "Predict household energy consumption using weather data and historical usage patterns.",
      difficulty: "Intermediate",
      duration: "5 hours",
      category: "Time Series",
      skills: ["Python", "Time Series", "Forecasting"],
      rating: 4.7,
      completions: 650,
    },
    {
      id: 6,
      title: "AI Art Generator",
      description:
        "Create unique artwork using generative AI models and explore the intersection of art and technology.",
      difficulty: "Advanced",
      duration: "10 hours",
      category: "Generative AI",
      skills: ["Python", "GANs", "Deep Learning"],
      rating: 4.9,
      completions: 400,
    },
    {
      id: 7,
      title: "Stock Price Predictor",
      description: "Build a model to predict stock prices using historical data and market indicators.",
      difficulty: "Intermediate",
      duration: "7 hours",
      category: "Finance",
      skills: ["Python", "Time Series", "Financial Data"],
      rating: 4.6,
      completions: 900,
    },
    {
      id: 8,
      title: "Voice Assistant Clone",
      description: "Create your own voice assistant that can understand speech and respond with synthesized voice.",
      difficulty: "Advanced",
      duration: "12 hours",
      category: "Speech Processing",
      skills: ["Python", "Speech Recognition", "TTS"],
      rating: 4.8,
      completions: 300,
    },
  ]

  const communityProjects = [
    {
      id: 9,
      title: "Climate Change Visualizer",
      description: "Collaborative project to visualize climate data and predict future trends.",
      author: "Sarah Chen",
      contributors: 15,
      stars: 89,
      category: "Data Science",
      status: "Active",
    },
    {
      id: 10,
      title: "Educational Game AI",
      description: "AI that adapts educational games to student learning pace and style.",
      author: "Alex Rodriguez",
      contributors: 8,
      stars: 67,
      category: "Education",
      status: "Seeking Contributors",
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
              <span className="text-gray-400 font-medium cursor-not-allowed">
                Practice
              </span>
              <Link href="/projects" className="text-indigo-600 font-medium">
                Projects
              </Link>
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
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Learn by <span className="text-indigo-600">Building</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hands-on AI projects that teach you by doing. No boring lectures - just real code, real results, and real
            learning.
          </p>
        </div>

        <Tabs defaultValue="active" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">My Projects</TabsTrigger>
            <TabsTrigger value="explore">Explore Projects</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          {/* Active Projects */}
          <TabsContent value="active" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Continue Working</h2>
              <div className="grid gap-6">
                {activeProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                            <Badge variant={project.difficulty === "Beginner" ? "secondary" : "default"}>
                              {project.difficulty}
                            </Badge>
                            <Badge variant="outline">{project.category}</Badge>
                          </div>
                          <CardDescription>{project.description}</CardDescription>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <div>Due {project.dueDate}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="text-sm font-medium">Next Step:</div>
                            <div className="text-sm text-gray-600">{project.nextStep}</div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="text-sm text-gray-500 flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {project.timeLeft} left
                            </div>
                            <Button>
                              <Play className="h-4 w-4 mr-2" />
                              Continue
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Start Recommendations */}
            <Card className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Ready for your next challenge?</h3>
                    <p className="opacity-90">Our AI tutor has picked the perfect project based on your progress.</p>
                  </div>
                  <Button className="bg-white text-green-600 hover:bg-gray-100">
                    <Zap className="h-4 w-4 mr-2" />
                    Get Recommendation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Explore Projects */}
          <TabsContent value="explore" className="space-y-8">
            {/* Featured Project */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Project</h2>
              <Card className="overflow-hidden bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src="/placeholder.svg?height=300&width=400"
                      alt="Featured project"
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center mb-4">
                      <Badge className="bg-white text-purple-600 mr-3">Featured</Badge>
                      <Badge variant="outline" className="border-white text-white">
                        Intermediate
                      </Badge>
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Music Recommendation Engine</h3>
                    <p className="text-lg mb-6 opacity-90">
                      Build a system that recommends songs based on user preferences and listening history. Learn
                      collaborative filtering and content-based recommendations.
                    </p>
                    <div className="flex items-center space-x-6 mb-6 text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />6 hours
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        1,200 completed
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        4.8
                      </div>
                    </div>
                    <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                      <Play className="h-5 w-5 mr-2" />
                      Start Project
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* All Projects */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">All Projects</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableProjects
                  .filter((p) => !p.featured)
                  .map((project) => (
                    <Card key={project.id} className="hover:shadow-lg transition-shadow group">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Badge
                            variant={
                              project.difficulty === "Beginner"
                                ? "secondary"
                                : project.difficulty === "Intermediate"
                                  ? "default"
                                  : "destructive"
                            }
                          >
                            {project.difficulty}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-600">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            {project.rating}
                          </div>
                        </div>
                        <CardTitle className="text-lg leading-tight">{project.title}</CardTitle>
                        <CardDescription className="text-sm">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {project.skills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {project.duration}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {project.completions} completed
                            </div>
                          </div>

                          <Button className="w-full group-hover:bg-indigo-600 transition-colors">
                            <Play className="h-4 w-4 mr-2" />
                            Start Project
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </TabsContent>

          {/* Community Projects */}
          <TabsContent value="community" className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Community Projects</h2>
                <Button>
                  <Code className="h-4 w-4 mr-2" />
                  Create Project
                </Button>
              </div>

              <div className="grid gap-6">
                {communityProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                            <Badge variant={project.status === "Active" ? "default" : "secondary"}>
                              {project.status}
                            </Badge>
                          </div>
                          <CardDescription>{project.description}</CardDescription>
                          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                            <span>by {project.author}</span>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {project.contributors} contributors
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 mr-1" />
                              {project.stars} stars
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{project.category}</Badge>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <GitBranch className="h-4 w-4 mr-2" />
                            Fork
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                          <Button size="sm">
                            <Users className="h-4 w-4 mr-2" />
                            Join
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Create Project CTA */}
            <Card className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
              <CardContent className="p-8 text-center">
                <Trophy className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Share Your Innovation</h3>
                <p className="text-lg mb-6 opacity-90">
                  Create a project that other students can learn from. Build your portfolio while helping the community
                  grow.
                </p>
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                  <Code className="h-5 w-5 mr-2" />
                  Start Creating
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

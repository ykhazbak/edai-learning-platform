import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserNav from "@/components/user-nav"
import {
  Users,
  MessageCircle,
  Plus,
  Search,
  Lightbulb,
  Share,
  Eye,
  Star,
  GitBranch,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CollaboratePage() {
  const activeTeams = [
    {
      id: 1,
      name: "Neural Explorers",
      project: "Deep Learning Fundamentals",
      members: 4,
      maxMembers: 6,
      progress: 67,
      lastActivity: "2 hours ago",
      currentDiscovery: "Investigating why dropout prevents overfitting",
      needsHelp: false,
      avatar: "NE",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: 2,
      name: "Data Detectives",
      project: "Bias in AI Systems",
      members: 3,
      maxMembers: 5,
      progress: 45,
      lastActivity: "30 minutes ago",
      currentDiscovery: "Found gender bias in resume screening dataset",
      needsHelp: true,
      avatar: "DD",
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: 3,
      name: "Vision Squad",
      project: "Computer Vision Challenge",
      members: 5,
      maxMembers: 5,
      progress: 89,
      lastActivity: "1 hour ago",
      currentDiscovery: "Discovered data augmentation improves accuracy by 15%",
      needsHelp: false,
      avatar: "VS",
      color: "bg-green-100 text-green-700",
    },
  ]

  const availableProjects = [
    {
      id: 4,
      title: "Climate Change Predictor",
      description: "Use real climate data to predict temperature changes",
      difficulty: "Intermediate",
      lookingFor: "Data analysis expert, Python developer",
      creator: "Emma Chen",
      members: 2,
      maxMembers: 4,
      tags: ["Climate", "Time Series", "Real Data"],
      insights: 12,
    },
    {
      id: 5,
      title: "Music Recommendation Engine",
      description: "Build collaborative filtering system for music discovery",
      difficulty: "Advanced",
      lookingFor: "ML engineer, UX designer",
      creator: "Jordan Kim",
      members: 1,
      maxMembers: 3,
      tags: ["Recommendation", "Audio", "Algorithms"],
      insights: 8,
    },
    {
      id: 6,
      title: "Healthcare Diagnosis Assistant",
      description: "Ethical AI for medical image analysis",
      difficulty: "Advanced",
      lookingFor: "Ethics researcher, Computer vision expert",
      creator: "Alex Rodriguez",
      members: 3,
      maxMembers: 5,
      tags: ["Healthcare", "Ethics", "Computer Vision"],
      insights: 15,
    },
  ]

  const recentInsights = [
    {
      author: "Sarah M.",
      team: "Neural Explorers",
      insight:
        "I discovered that batch normalization acts like a regularizer! When I removed dropout and added batch norm, the model still didn't overfit. This suggests they work through similar mechanisms.",
      likes: 23,
      replies: 7,
      timestamp: "2 hours ago",
      project: "Deep Learning Fundamentals",
      tags: ["Batch Normalization", "Regularization"],
    },
    {
      author: "Marcus T.",
      team: "Data Detectives",
      insight:
        "Our hiring bias experiment revealed something shocking: even when we removed names, the model still showed bias based on university names and extracurricular activities. Bias is deeper than we thought!",
      likes: 31,
      replies: 12,
      timestamp: "4 hours ago",
      project: "Bias in AI Systems",
      tags: ["Bias", "Fairness", "Ethics"],
    },
    {
      author: "Lisa K.",
      team: "Vision Squad",
      insight:
        "We found that our dog breed classifier fails completely on mixed breeds. This made us realize: maybe the problem isn't the algorithm, but how we define 'breed' itself. Real-world categories are messier than datasets suggest.",
      likes: 18,
      replies: 9,
      timestamp: "6 hours ago",
      project: "Computer Vision Challenge",
      tags: ["Classification", "Real-world Data"],
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
              <span className="text-gray-400 font-medium cursor-not-allowed">
                Projects
              </span>
              <span className="text-gray-400 font-medium cursor-not-allowed">
                AI Tutor
              </span>
            </nav>
            <div className="flex items-center space-x-4">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Team
              </Button>
              <UserNav />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover <span className="text-indigo-600">Together</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join collaborative discovery projects where diverse perspectives lead to breakthrough insights. Learn from
            peers, share discoveries, and solve real-world problems together.
          </p>
        </div>

        <Tabs defaultValue="my-teams" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="my-teams">My Teams</TabsTrigger>
            <TabsTrigger value="join-project">Join Project</TabsTrigger>
            <TabsTrigger value="insights">Community Insights</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
          </TabsList>

          {/* My Teams */}
          <TabsContent value="my-teams" className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Active Collaborations</h2>
                <Button variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Find Teammates
                </Button>
              </div>

              <div className="grid gap-6">
                {activeTeams.map((team) => (
                  <Card key={team.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className={`${team.color} font-semibold`}>{team.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg flex items-center">
                              {team.name}
                              {team.needsHelp && (
                                <Badge variant="outline" className="ml-2 text-orange-600 border-orange-300">
                                  Needs Help
                                </Badge>
                              )}
                            </CardTitle>
                            <CardDescription>{team.project}</CardDescription>
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <div>
                            {team.members}/{team.maxMembers} members
                          </div>
                          <div>Active {team.lastActivity}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Current Discovery */}
                        <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                          <div className="flex items-start">
                            <Lightbulb className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-yellow-800">Current Discovery:</p>
                              <p className="text-sm text-yellow-700 mt-1">{team.currentDiscovery}</p>
                            </div>
                          </div>
                        </div>

                        {/* Progress */}
                        <div>
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Team Progress</span>
                            <span>{team.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${team.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Team Chat
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share className="h-4 w-4 mr-2" />
                              Share Insight
                            </Button>
                          </div>
                          <Button size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Workspace
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Team Formation Suggestions */}
            <Card className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Ready to start a new discovery?</h3>
                    <p className="opacity-90">
                      AI suggests optimal team compositions based on complementary skills and learning styles.
                    </p>
                  </div>
                  <Button className="bg-white text-green-600 hover:bg-gray-100">
                    <Users className="h-4 w-4 mr-2" />
                    Form New Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Join Project */}
          <TabsContent value="join-project" className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Open Collaboration Projects</h2>
                <div className="flex space-x-2">
                  <Input placeholder="Search projects..." className="w-64" />
                  <Button variant="outline">Filter</Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {availableProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <CardDescription className="mt-1">{project.description}</CardDescription>
                        </div>
                        <Badge variant={project.difficulty === "Intermediate" ? "default" : "destructive"}>
                          {project.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Looking For */}
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <h4 className="text-sm font-medium text-blue-900 mb-1">Looking for:</h4>
                          <p className="text-sm text-blue-800">{project.lookingFor}</p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {project.members}/{project.maxMembers}
                            </div>
                            <div className="flex items-center">
                              <Lightbulb className="h-4 w-4 mr-1" />
                              {project.insights} insights
                            </div>
                          </div>
                          <span>by {project.creator}</span>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                          <Button size="sm" className="flex-1">
                            <Plus className="h-4 w-4 mr-2" />
                            Join Team
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Community Insights */}
          <TabsContent value="insights" className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Recent Discoveries</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Trending
                  </Button>
                  <Button variant="outline" size="sm">
                    <Target className="h-4 w-4 mr-2" />
                    My Interests
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {recentInsights.map((insight, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-indigo-100 text-indigo-700">
                            {insight.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium">{insight.author}</span>
                            <span className="text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{insight.team}</span>
                            <span className="text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{insight.timestamp}</span>
                          </div>
                          <Badge variant="outline" className="text-xs mb-2">
                            {insight.project}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                          <div className="flex items-start">
                            <Zap className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-yellow-800 leading-relaxed">{insight.insight}</p>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {insight.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Engagement */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                              <Star className="h-4 w-4 mr-1" />
                              {insight.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {insight.replies}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                              <Share className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                          </div>
                          <Button variant="outline" size="sm">
                            <GitBranch className="h-4 w-4 mr-2" />
                            Build On This
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Discussions */}
          <TabsContent value="discussions" className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Active Discussions</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Start Discussion
                </Button>
              </div>

              <div className="grid gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Why do neural networks need non-linear activation functions?
                    </CardTitle>
                    <CardDescription>Started by Alex M. in Deep Learning Fundamentals • 23 replies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        Our team discovered something interesting while experimenting with different activation
                        functions. When we used only linear activations, our deep network performed no better than a
                        single layer. But why?
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Last reply 2 hours ago</span>
                          <Badge variant="outline" className="text-xs">
                            Hot Discussion
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Join Discussion
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Ethical implications of biased training data</CardTitle>
                    <CardDescription>Started by Sarah K. in AI Ethics • 31 replies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        After discovering bias in our hiring dataset, our team is wondering: Is it ever acceptable to
                        use biased data if we acknowledge the bias? What are the real-world consequences?
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Last reply 1 hour ago</span>
                          <Badge variant="outline" className="text-xs">
                            Ethics
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Join Discussion
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

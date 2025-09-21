import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Lightbulb, BookOpen, Code, Zap, MessageCircle, TrendingUp, Target, Brain } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import UserNav from "@/components/user-nav"

export default function AITutorPage() {
  const chatHistory = [
    {
      type: "ai",
      message:
        "Hi Jordan! I've been analyzing your learning journey. You're showing excellent critical thinking skills! 🎉 I noticed you asked great questions about data bias in your last project. Ready to explore how this connects to neural network design?",
      timestamp: "2 minutes ago",
    },
    {
      type: "user",
      message: "Yes! I'm curious about why my model performed differently with balanced vs unbalanced data.",
      timestamp: "1 minute ago",
    },
    {
      type: "ai",
      message:
        "Perfect question! This touches on fundamental ML concepts. Instead of explaining the theory first, let's experiment: I'll set up a mini-lab where you can manipulate data balance and see real-time effects on model behavior. Want to discover the patterns yourself?",
      timestamp: "30 seconds ago",
    },
  ]

  const suggestions = [
    {
      title: "Experiment with Data Balance",
      reason: "Based on your excellent bias questions",
      type: "Interactive Lab",
      duration: "20 min",
    },
    {
      title: "Neural Network Playground",
      reason: "Perfect next step in your discovery journey",
      type: "Hands-on Experiment",
      duration: "30 min",
    },
    {
      title: "Critical Thinking Challenge",
      reason: "You're ready for advanced reasoning problems",
      type: "Problem Solving",
      duration: "15 min",
    },
  ]

  const learningInsights = [
    {
      title: "Your Learning Style",
      description: "You learn best through visual examples and hands-on coding",
      icon: Target,
      color: "text-blue-600",
    },
    {
      title: "Strength Areas",
      description: "Computer vision, data preprocessing, Python fundamentals",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Growth Opportunities",
      description: "Mathematical foundations, algorithm optimization",
      icon: Lightbulb,
      color: "text-yellow-600",
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
              <Link href="/ai-tutor" className="text-indigo-600 font-medium">
                AI Tutor
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback className="bg-indigo-600 text-white">AI</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <CardTitle className="text-lg">Your AI Tutor</CardTitle>
                    <CardDescription>Personalized learning companion</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {chatHistory.map((message, index) => (
                    <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                        <div
                          className={`p-4 rounded-2xl ${
                            message.type === "user" ? "bg-indigo-600 text-white ml-4" : "bg-gray-100 text-gray-900 mr-4"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.message}</p>
                        </div>
                        <p
                          className={`text-xs text-gray-500 mt-2 ${
                            message.type === "user" ? "text-right mr-4" : "text-left ml-4"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                      {message.type === "ai" && (
                        <Avatar className="h-8 w-8 order-1">
                          <AvatarFallback className="bg-indigo-600 text-white text-xs">AI</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>

              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask me anything about AI, your projects, or learning path..."
                    className="flex-1"
                  />
                  <Button>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    Explain this concept
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    Help with my project
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    What should I learn next?
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-indigo-600" />
                  Learning Insights
                </CardTitle>
                <CardDescription>AI-powered analysis of your progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {learningInsights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <insight.icon className={`h-5 w-5 mt-0.5 ${insight.color}`} />
                    <div>
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Personalized Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  Suggested Actions
                </CardTitle>
                <CardDescription>Tailored to your learning journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{suggestion.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {suggestion.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">{suggestion.reason}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{suggestion.duration}</span>
                      <Button size="sm" variant="outline" className="text-xs h-7 bg-transparent">
                        Start
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-green-500" />
                  Quick Help
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-sm h-10 bg-transparent">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Explain a concept
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm h-10 bg-transparent">
                  <Code className="h-4 w-4 mr-2" />
                  Debug my code
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm h-10 bg-transparent">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Project ideas
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm h-10 bg-transparent">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Learning path
                </Button>
              </CardContent>
            </Card>

            {/* Tutor Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Tutor Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-indigo-600">98%</div>
                    <div className="text-xs text-gray-600">Accuracy Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">2.3s</div>
                    <div className="text-xs text-gray-600">Avg Response</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">247</div>
                    <div className="text-xs text-gray-600">Questions Answered</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <Brain className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Adaptive Learning</h3>
            <p className="text-sm text-gray-600">AI adjusts to your pace and learning style in real-time</p>
          </Card>
          <Card className="text-center p-6">
            <Code className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Code Review</h3>
            <p className="text-sm text-gray-600">Get instant feedback on your code and suggestions for improvement</p>
          </Card>
          <Card className="text-center p-6">
            <Lightbulb className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Project Guidance</h3>
            <p className="text-sm text-gray-600">Step-by-step help with your AI projects and assignments</p>
          </Card>
        </div>
      </main>
    </div>
  )
}

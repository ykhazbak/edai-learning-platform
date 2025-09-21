import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  MessageCircle,
  Send,
  Lightbulb,
  Share,
  Clock,
  Star,
  GitBranch,
  Zap,
  Code,
  BarChart3,
  Play,
  Settings,
  Bell,
  Brain,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function TeamWorkspace() {
  const teamMembers = [
    {
      name: "Jordan Kim",
      role: "Team Lead",
      avatar: "JK",
      status: "online",
      contribution: "Neural network architecture",
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "Sarah Chen",
      role: "Data Analyst",
      avatar: "SC",
      status: "online",
      contribution: "Data preprocessing & bias analysis",
      color: "bg-purple-100 text-purple-700",
    },
    {
      name: "Alex Rodriguez",
      role: "ML Engineer",
      avatar: "AR",
      status: "away",
      contribution: "Model optimization",
      color: "bg-green-100 text-green-700",
    },
    {
      name: "Emma Wilson",
      role: "Ethics Researcher",
      avatar: "EW",
      status: "offline",
      contribution: "Fairness evaluation",
      color: "bg-orange-100 text-orange-700",
    },
  ]

  const recentActivity = [
    {
      user: "Sarah Chen",
      action: "shared a discovery",
      content: "Found that balanced sampling reduces bias by 23%!",
      timestamp: "2 minutes ago",
      type: "discovery",
    },
    {
      user: "Alex Rodriguez",
      action: "updated experiment",
      content: "Increased model accuracy to 89% with new architecture",
      timestamp: "15 minutes ago",
      type: "experiment",
    },
    {
      user: "Jordan Kim",
      action: "asked a question",
      content: "Why does our model perform worse on mixed breeds?",
      timestamp: "1 hour ago",
      type: "question",
    },
  ]

  const sharedInsights = [
    {
      author: "Sarah Chen",
      title: "Data Balance Discovery",
      insight:
        "When we balanced our training data, the model's bias decreased significantly, but overall accuracy dropped by 5%. This suggests the model was relying on biased patterns for some of its predictions.",
      timestamp: "2 hours ago",
      likes: 12,
      comments: 5,
      tags: ["Bias", "Data Balance", "Ethics"],
    },
    {
      author: "Alex Rodriguez",
      title: "Architecture Breakthrough",
      insight:
        "Adding residual connections didn't just prevent vanishing gradients - it actually helped the model learn more nuanced features. The attention maps show it's now focusing on subtle breed characteristics we missed before.",
      timestamp: "1 day ago",
      likes: 18,
      comments: 8,
      tags: ["Architecture", "Residual Networks", "Feature Learning"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Image 
                  src="/edai-logo.svg" 
                  alt="EdAI Logo" 
                  width={48} 
                  height={34}
                  className="mr-1"
                />
                <span className="text-xl font-bold text-gray-900">EdAI</span>
              </Link>
              <div className="text-gray-400">•</div>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">NE</AvatarFallback>
                </Avatar>
                <span className="font-medium text-gray-900">Neural Explorers</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Team Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Project Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Deep Learning Fundamentals</CardTitle>
                    <CardDescription>Collaborative discovery project • 4 members</CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Current Discovery */}
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                    <div className="flex items-start">
                      <Lightbulb className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-yellow-800">Team's Current Discovery</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          Investigating why dropout prevents overfitting - we've discovered it's not just about reducing
                          co-adaptation, but also about implicit ensemble learning!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Team Progress</span>
                      <span>67% complete</span>
                    </div>
                    <Progress value={67} className="h-3" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Explore</span>
                      <span>Experiment</span>
                      <span>Analyze</span>
                      <span>Understand</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button>
                      <Play className="h-4 w-4 mr-2" />
                      Continue Experiment
                    </Button>
                    <Button variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Results
                    </Button>
                    <Button variant="outline">
                      <Share className="h-4 w-4 mr-2" />
                      Share Discovery
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Collaborative Workspace */}
            <Tabs defaultValue="experiment" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="experiment">Live Experiment</TabsTrigger>
                <TabsTrigger value="insights">Team Insights</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
                <TabsTrigger value="results">Shared Results</TabsTrigger>
              </TabsList>

              <TabsContent value="experiment" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="h-5 w-5 mr-2" />
                      Collaborative Experiment Space
                    </CardTitle>
                    <CardDescription>Real-time collaboration on dropout investigation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Live Collaboration Indicator */}
                      <div className="flex items-center space-x-2 text-sm text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Sarah and Alex are currently experimenting</span>
                      </div>

                      {/* Code Editor Simulation */}
                      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span>dropout_experiment.py</span>
                          <div className="flex space-x-2">
                            <span className="text-blue-400 text-xs">Sarah editing line 23</span>
                            <span className="text-purple-400 text-xs">Alex viewing</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div>{"# Experiment: Different dropout rates"}</div>
                          <div>{"dropout_rates = [0.1, 0.3, 0.5, 0.7]"}</div>
                          <div className="bg-blue-900/30">{"for rate in dropout_rates:  # Sarah's edit"}</div>
                          <div>{"    model = create_model(dropout=rate)"}</div>
                          <div>{"    results = train_and_evaluate(model)"}</div>
                          <div className="text-yellow-400">
                            {"    print(f'Dropout {rate}: Accuracy {results.accuracy:.2f}')"}
                          </div>
                        </div>
                      </div>

                      {/* Real-time Results */}
                      <div className="grid grid-cols-2 gap-4">
                        <Card className="p-4">
                          <h4 className="font-medium mb-2">Live Results</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Dropout 0.1:</span>
                              <span className="font-medium">0.89 (overfitting)</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Dropout 0.3:</span>
                              <span className="font-medium">0.92 (good!)</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Dropout 0.5:</span>
                              <span className="font-medium text-blue-600">Running...</span>
                            </div>
                          </div>
                        </Card>
                        <Card className="p-4">
                          <h4 className="font-medium mb-2">Team Observations</h4>
                          <div className="space-y-2 text-sm">
                            <div className="bg-blue-50 p-2 rounded">
                              <span className="font-medium text-blue-900">Sarah:</span>
                              <span className="text-blue-800"> 0.3 seems optimal!</span>
                            </div>
                            <div className="bg-purple-50 p-2 rounded">
                              <span className="font-medium text-purple-900">Alex:</span>
                              <span className="text-purple-800"> Let's try 0.4 next</span>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <div className="space-y-6">
                  {sharedInsights.map((insight, index) => (
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
                              <span className="text-sm text-gray-500">{insight.timestamp}</span>
                            </div>
                            <h3 className="font-semibold text-lg">{insight.title}</h3>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
                            <div className="flex items-start">
                              <Zap className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-indigo-800 leading-relaxed">{insight.insight}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {insight.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                                <Star className="h-4 w-4 mr-1" />
                                {insight.likes}
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                {insight.comments}
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

                  {/* Add New Insight */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Share Your Discovery</CardTitle>
                      <CardDescription>What patterns have you noticed? What surprised you?</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Input placeholder="Give your insight a title..." />
                        <Textarea
                          placeholder="Describe your discovery, what you learned, and why it matters..."
                          rows={4}
                        />
                        <div className="flex justify-between">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Code className="h-4 w-4 mr-2" />
                              Add Code
                            </Button>
                            <Button variant="outline" size="sm">
                              <BarChart3 className="h-4 w-4 mr-2" />
                              Add Chart
                            </Button>
                          </div>
                          <Button>
                            <Share className="h-4 w-4 mr-2" />
                            Share Insight
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="discussion" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Discussion</CardTitle>
                    <CardDescription>Real-time chat and Q&A</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 h-96 overflow-y-auto">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-purple-100 text-purple-700 text-xs">SC</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-gray-100 p-3 rounded-lg">
                            <p className="text-sm">
                              Just discovered something interesting about dropout! When I visualized the neuron
                              activations, dropout seems to force the network to use more diverse pathways.
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 mt-1">Sarah Chen • 5 minutes ago</span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-green-100 text-green-700 text-xs">AR</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-gray-100 p-3 rounded-lg">
                            <p className="text-sm">
                              That's exactly what I was thinking! It's like the network can't rely on any single neuron,
                              so it has to learn more robust representations.
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 mt-1">Alex Rodriguez • 3 minutes ago</span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">JK</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-blue-100 p-3 rounded-lg">
                            <p className="text-sm">
                              Question: Do you think this is why dropout works better in deeper networks? More pathways
                              to diversify?
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 mt-1">Jordan Kim • 1 minute ago</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <Input placeholder="Share your thoughts..." className="flex-1" />
                      <Button>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="results" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Shared Experiment Results</CardTitle>
                    <CardDescription>Collaborative findings and data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Dropout Rate Analysis</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm">0.1 (Sarah's test)</span>
                            <span className="text-sm font-medium text-red-600">89% (overfitting)</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                            <span className="text-sm">0.3 (Alex's test)</span>
                            <span className="text-sm font-medium text-green-600">92% (optimal)</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm">0.5 (Jordan's test)</span>
                            <span className="text-sm font-medium text-orange-600">88% (underfitting)</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Team Conclusions</h4>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-blue-800">
                            Optimal dropout rate appears to be around 0.3 for our architecture. Higher rates cause
                            underfitting, lower rates allow overfitting.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Team Members
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={`${member.color} text-xs`}>{member.avatar}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                          member.status === "online"
                            ? "bg-green-500"
                            : member.status === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                        }`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{member.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {member.role}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600">{member.contribution}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-gray-500">{activity.action}</span>
                    </div>
                    <p className="text-gray-700 mt-1">{activity.content}</p>
                    <span className="text-xs text-gray-500">{activity.timestamp}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Team Assistant */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-indigo-600" />
                  AI Team Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium flex-shrink-0 mr-2 mt-0.5">
                      AI
                    </div>
                    <div>
                      <p className="text-sm text-indigo-900">
                        Great teamwork! Your diverse approaches to the dropout experiment are revealing different
                        aspects of the same phenomenon. Consider exploring batch normalization next.
                      </p>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-3" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Ask Team Question
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Play,
  RotateCcw,
  Lightbulb,
  MessageCircle,
  Database,
  BarChart3,
  Code,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Zap,
  Brain,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ProjectWorkspace() {
  const discoverySteps = [
    {
      id: 1,
      title: "Explore the Data",
      description: "Before any theory - let's see what we're working with",
      status: "completed",
      type: "exploration",
    },
    {
      id: 2,
      title: "Ask Critical Questions",
      description: "What patterns do you notice? What surprises you?",
      status: "current",
      type: "analysis",
    },
    {
      id: 3,
      title: "Experiment & Build",
      description: "Try different approaches - fail fast, learn faster",
      status: "upcoming",
      type: "experimentation",
    },
    {
      id: 4,
      title: "Understand the Why",
      description: "Now let's dive into the theory behind what worked",
      status: "upcoming",
      type: "theory",
    },
  ]

  const criticalQuestions = [
    {
      question: "Looking at this dataset, what immediately stands out to you?",
      hint: "Consider data distribution, missing values, or unexpected patterns",
      userAnswer: "",
      aiResponse: "Great observation! You're thinking like a data scientist.",
    },
    {
      question: "If you were to predict dog breeds, which features seem most important?",
      hint: "Think about what makes breeds visually distinct",
      userAnswer: "",
      aiResponse: "",
    },
    {
      question: "What could go wrong with this approach in the real world?",
      hint: "Consider edge cases, bias, or practical limitations",
      userAnswer: "",
      aiResponse: "",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Auto-saved
              </Badge>
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Ask AI Tutor
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dog Breed Classifier</h1>
              <p className="text-gray-600 mt-1">
                Real dataset from Petfinder.com • 10,000+ images • Industry challenge
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Database className="h-4 w-4 mr-2" />
                View Dataset
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Results
              </Button>
            </div>
          </div>

          {/* Discovery Progress */}
          <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-indigo-900">Discovery Journey</h3>
                <span className="text-sm text-indigo-700">Step 2 of 4</span>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {discoverySteps.map((step) => (
                  <div key={step.id} className="text-center">
                    <div
                      className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-medium ${
                        step.status === "completed"
                          ? "bg-green-500 text-white"
                          : step.status === "current"
                            ? "bg-indigo-500 text-white"
                            : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.id}
                    </div>
                    <h4
                      className={`text-xs font-medium ${
                        step.status === "current" ? "text-indigo-900" : "text-gray-600"
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Workspace */}
          <div className="lg:col-span-2 space-y-6">
            {/* Critical Thinking Section */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-800">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Critical Thinking Challenge
                </CardTitle>
                <CardDescription className="text-yellow-700">
                  Answer these questions before diving into code. There are no wrong answers - only discoveries!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {criticalQuestions.map((q, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="bg-yellow-200 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-1">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-yellow-900 mb-2">{q.question}</h4>
                        <Textarea
                          placeholder="Share your thoughts... (AI tutor will respond)"
                          className="bg-white border-yellow-300 focus:border-yellow-500"
                          rows={3}
                        />
                        <div className="flex items-center justify-between mt-2">
                          <Button variant="ghost" size="sm" className="text-yellow-700 hover:text-yellow-800">
                            <HelpCircle className="h-4 w-4 mr-1" />
                            Hint
                          </Button>
                          <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white">
                            Submit Thinking
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Interactive Workspace */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2" />
                  Interactive Experiment Space
                </CardTitle>
                <CardDescription>
                  Try different approaches. The AI tutor will guide you through discoveries.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="explore" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="explore">Explore Data</TabsTrigger>
                    <TabsTrigger value="experiment">Experiment</TabsTrigger>
                    <TabsTrigger value="analyze">Analyze Results</TabsTrigger>
                    <TabsTrigger value="understand">Understand Why</TabsTrigger>
                  </TabsList>

                  <TabsContent value="explore" className="space-y-4">
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span>Interactive Data Explorer</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="h-6 text-xs bg-transparent">
                            <Play className="h-3 w-3 mr-1" />
                            Run
                          </Button>
                          <Button size="sm" variant="outline" className="h-6 text-xs bg-transparent">
                            <RotateCcw className="h-3 w-3 mr-1" />
                            Reset
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div>{">>> import pandas as pd"}</div>
                        <div>{">>> df = load_dog_dataset()"}</div>
                        <div>{">>> df.head()  # What do you see?"}</div>
                        <div className="text-blue-400">{`# Dataset loaded: 10,247 images across 120 breeds`}</div>
                        <div className="text-blue-400">
                          {`# Try: df.describe(), df.info(), df['breed'].value_counts()`}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-4">
                        <h4 className="font-medium mb-2">Sample Images</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="aspect-square bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500"
                            >
                              Dog {i}
                            </div>
                          ))}
                        </div>
                      </Card>
                      <Card className="p-4">
                        <h4 className="font-medium mb-2">Breed Distribution</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Labrador</span>
                            <span>847</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Golden Retriever</span>
                            <span>623</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>German Shepherd</span>
                            <span>591</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-2">+ 117 more breeds...</div>
                        </div>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="experiment" className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                      <div className="flex items-start">
                        <Zap className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900">Experiment Suggestion</h4>
                          <p className="text-sm text-blue-800 mt-1">
                            Try training with just 5 breeds first. What happens to accuracy? Why might this be easier?
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                      <div>{">>> # Experiment 1: Simple approach"}</div>
                      <div>{">>> model = create_simple_classifier()"}</div>
                      <div>{'>>> results = model.train(breeds=["labrador", "poodle", "bulldog"])'}</div>
                      <div className="text-yellow-400 mt-2">{"Training... Accuracy: 67% - Not bad for a start!"}</div>
                    </div>
                  </TabsContent>

                  <TabsContent value="analyze" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-4">
                        <h4 className="font-medium mb-3">Results Analysis</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Overall Accuracy</span>
                              <span className="font-medium">67%</span>
                            </div>
                            <Progress value={67} className="h-2" />
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>✅ Good: Labradors (89% accuracy)</p>
                            <p>⚠️ Struggling: Poodles vs Doodles (45%)</p>
                            <p>❌ Poor: Mixed breeds (23%)</p>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <h4 className="font-medium mb-3">What This Tells Us</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start">
                            <AlertCircle className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>The model struggles with similar-looking breeds</span>
                          </div>
                          <div className="flex items-start">
                            <Lightbulb className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>More training data might help with mixed breeds</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Distinct breeds are easier to classify</span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="understand" className="space-y-4">
                    <Card className="bg-indigo-50 border-indigo-200">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-indigo-900 mb-3">Now Let's Understand the Theory</h4>
                        <div className="space-y-3 text-sm text-indigo-800">
                          <p>
                            <strong>Why did your experiments work (or not work)?</strong> Now that you've seen the
                            results, let's dive into the concepts that explain what happened.
                          </p>
                          <div className="bg-white p-3 rounded border border-indigo-200">
                            <p className="font-medium">Key Concepts You've Discovered:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                              <li>Feature extraction from images</li>
                              <li>Classification vs. similarity</li>
                              <li>Training data quality and quantity</li>
                              <li>Model bias and edge cases</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* AI Tutor Sidebar */}
          <div className="space-y-6">
            {/* AI Tutor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-indigo-600" />
                  AI Learning Companion
                </CardTitle>
                <CardDescription>Adaptive guidance based on your discoveries</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium flex-shrink-0 mr-2 mt-0.5">
                      AI
                    </div>
                    <div>
                      <p className="text-sm text-blue-900">
                        I notice you're spending time on the data distribution. Great instinct! This tells us a lot
                        about potential model bias. What patterns do you see?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start text-xs bg-transparent">
                    💡 Explain this result
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-xs bg-transparent">
                    🤔 Why did this happen?
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-xs bg-transparent">
                    🚀 What should I try next?
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Real-World Context */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-green-600" />
                  Real-World Context
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-medium text-green-900">Industry Application</h4>
                  <p className="text-green-800 mt-1">
                    Pet adoption apps use similar models to help match pets with families. Your accuracy improvements
                    could help more dogs find homes!
                  </p>
                </div>

                <div className="bg-orange-50 p-3 rounded-lg">
                  <h4 className="font-medium text-orange-900">Ethical Considerations</h4>
                  <p className="text-orange-800 mt-1">
                    What happens when the model is wrong? How might breed classification affect adoption rates for
                    certain dogs?
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Progress Tracking */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Critical Thinking</span>
                      <span>2/3</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Experimentation</span>
                      <span>1/4</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Understanding</span>
                      <span>0/2</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Lightbulb, Zap, Eye, BarChart3, Shuffle, Play, RotateCcw, HelpCircle, Brain } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function DiscoveryLab() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
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
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                <Zap className="h-3 w-3 mr-1" />
                Discovery Mode
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interactive <span className="text-purple-600">Discovery Lab</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experiment with AI concepts through interactive simulations. Discover patterns, test hypotheses, and build
            intuition before diving into theory.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Experiment Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Neural Network Playground */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <CardTitle className="flex items-center">
                  <Brain className="h-6 w-6 mr-2" />
                  Neural Network Playground
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Build and train a neural network by adjusting parameters. See how changes affect learning!
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Controls */}
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Learning Rate</label>
                      <Slider defaultValue={[0.01]} max={0.1} step={0.001} className="mb-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Slow (0.001)</span>
                        <span>Fast (0.1)</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Hidden Layers</label>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4].map((num) => (
                          <Button key={num} variant="outline" size="sm" className="w-12 h-12 bg-transparent">
                            {num}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Neurons per Layer</label>
                      <Slider defaultValue={[10]} max={50} step={1} />
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1">
                        <Play className="h-4 w-4 mr-2" />
                        Train
                      </Button>
                      <Button variant="outline">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </div>

                  {/* Visualization */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Network Architecture</h4>
                    <div className="flex justify-between items-center h-32">
                      {/* Input Layer */}
                      <div className="flex flex-col space-y-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        ))}
                      </div>

                      {/* Hidden Layers */}
                      <div className="flex space-x-4">
                        <div className="flex flex-col space-y-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-4 h-4 bg-purple-500 rounded-full"></div>
                          ))}
                        </div>
                        <div className="flex flex-col space-y-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-4 h-4 bg-purple-500 rounded-full"></div>
                          ))}
                        </div>
                      </div>

                      {/* Output Layer */}
                      <div className="flex flex-col space-y-2">
                        {[1, 2].map((i) => (
                          <div key={i} className="w-4 h-4 bg-green-500 rounded-full"></div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Accuracy: 87%</span>
                        <span>Epoch: 45/100</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Critical Thinking Prompt */}
                <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r">
                  <div className="flex items-start">
                    <Lightbulb className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Think About This:</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        What happens when you increase the learning rate? Why might a network with more layers sometimes
                        perform worse? Try different combinations and observe the patterns.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Bias Explorer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-orange-600" />
                  Data Bias Explorer
                </CardTitle>
                <CardDescription>
                  Discover how biased training data affects AI decisions. Real-world datasets included.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Training Data Composition</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Male Resumes</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                          </div>
                          <span className="text-sm font-medium">75%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Female Resumes</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-pink-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                          </div>
                          <span className="text-sm font-medium">25%</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="mr-2 bg-transparent">
                        <Shuffle className="h-4 w-4 mr-1" />
                        Rebalance Data
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Test Bias
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Model Predictions</h4>
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <div className="text-sm text-red-800">
                        <p className="font-medium">⚠️ Bias Detected</p>
                        <p className="mt-1">
                          Model recommends male candidates 3x more often for technical roles, even with identical
                          qualifications.
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-gray-600">
                      <p>This mirrors real hiring bias found in major tech companies' AI systems.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Discovery Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-indigo-600" />
                  Discovery Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <h4 className="font-medium text-indigo-900 text-sm">Current Experiment</h4>
                  <p className="text-sm text-indigo-800 mt-1">
                    What happens to learning speed when you double the learning rate? Make a prediction, then test it!
                  </p>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start text-xs bg-transparent">
                    🤔 Why did accuracy drop?
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-xs bg-transparent">
                    📊 Compare with real data
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-xs bg-transparent">
                    🎯 Test edge cases
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Real-World Connections */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Real-World Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <h4 className="font-medium text-gray-900">Current Discovery:</h4>
                  <p className="text-gray-600 mt-1">
                    Neural network architecture choices affect everything from medical diagnosis accuracy to social
                    media recommendations.
                  </p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-medium text-green-900 text-sm">Industry Example</h4>
                  <p className="text-green-800 text-sm mt-1">
                    Google's image recognition uses similar principles you're exploring to identify objects in billions
                    of photos daily.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* AI Tutor Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-purple-600" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium flex-shrink-0 mr-2 mt-0.5">
                      AI
                    </div>
                    <div>
                      <p className="text-sm text-purple-900">
                        Great observation! You're discovering the bias-variance tradeoff. This is a fundamental concept
                        in machine learning that you'll see everywhere.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex space-x-2">
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    Explain More
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    Related Concepts
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

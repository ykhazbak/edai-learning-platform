import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  CheckCircle,
  Clock,
  Star,
  Lightbulb,
  Code,
  BarChart3,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Send,
  Brain,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ExercisePage() {
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
              <span className="text-gray-600">Data Cleaning Challenge</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>12:34 elapsed</span>
              </div>
              <Button variant="outline" size="sm">
                <HelpCircle className="h-4 w-4 mr-2" />
                Get Hint
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Exercise Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Exercise Header */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Data Cleaning Challenge</CardTitle>
                    <CardDescription>Clean a messy real-world dataset from Airbnb listings</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge>Beginner</Badge>
                    <Badge variant="outline">50 points</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Airbnb NYC 2019 Dataset
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    ~15 minutes
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    4.8/5 rating
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Exercise - Kaggle Learn style */}
            <Tabs defaultValue="problem" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="problem">Problem</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
                <TabsTrigger value="submit">Submit</TabsTrigger>
              </TabsList>

              <TabsContent value="problem" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
                      Your Mission
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                      <h4 className="font-medium text-blue-900 mb-2">Real-World Context</h4>
                      <p className="text-sm text-blue-800">
                        You're a data scientist at Airbnb. The marketing team needs clean data to analyze pricing
                        trends, but the raw dataset has missing values, inconsistent formats, and outliers. Your job is
                        to make it analysis-ready.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Tasks to Complete:</h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                            1
                          </div>
                          <div>
                            <p className="font-medium">Handle Missing Values</p>
                            <p className="text-sm text-gray-600">
                              The 'price' column has 1,247 missing values. Decide how to handle them.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                            2
                          </div>
                          <div>
                            <p className="font-medium">Fix Data Types</p>
                            <p className="text-sm text-gray-600">
                              Convert price from string format (&quot;$123.00&quot;) to numeric.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                            3
                          </div>
                          <div>
                            <p className="font-medium">Remove Outliers</p>
                            <p className="text-sm text-gray-600">
                              Identify and handle listings with unrealistic prices (&gt;$10,000/night).
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Critical Thinking Questions */}
                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                      <h4 className="font-medium text-yellow-800 mb-2">Think Before You Code:</h4>
                      <div className="space-y-2 text-sm text-yellow-700">
                        <p>• Should you remove or impute missing prices? What are the trade-offs?</p>
                        <p>• How do you define an "outlier" in this context? $1000? $5000?</p>
                        <p>• What might cause missing values in this dataset?</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="code" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="h-5 w-5 mr-2" />
                      Interactive Code Editor
                    </CardTitle>
                    <CardDescription>Write your solution step by step</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Code Editor Simulation */}
                      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span>data_cleaning.py</span>
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
                          <div>{"import pandas as pd"}</div>
                          <div>{"import numpy as np"}</div>
                          <div className="text-gray-500">{"# Load the dataset"}</div>
                          <div>{"df = pd.read_csv('airbnb_nyc_2019.csv')"}</div>
                          <div className="text-gray-500">{"# Your code here:"}</div>
                          <div className="bg-gray-800 p-2 rounded">
                            <div className="text-white">{"# Step 1: Examine the data"}</div>
                            <div className="text-white">{"print(df.info())"}</div>
                            <div className="text-white">{"print(df['price'].describe())"}</div>
                          </div>
                        </div>
                      </div>

                      {/* Output */}
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Output:</h4>
                        <div className="font-mono text-sm text-gray-800">
                          <div>Dataset shape: (48895, 16)</div>
                          <div>Missing values in 'price': 1247</div>
                          <div>Price range: $0 - $40000 per night</div>
                          <div className="text-orange-600 mt-2">
                            ⚠️ Warning: Found 23 listings with price &gt; $10000
                          </div>
                        </div>
                      </div>

                      {/* Hints - Khan Academy style progressive hints */}
                      <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-4">
                          <div className="flex items-start">
                            <Lightbulb className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-blue-900">Hint 1 of 3</h4>
                              <p className="text-sm text-blue-800 mt-1">
                                Start by exploring the data structure. Use{" "}
                                <code className="bg-blue-200 px-1 rounded">df.info()</code> and
                                <code className="bg-blue-200 px-1 rounded">df.describe()</code> to understand what
                                you're working with.
                              </p>
                              <Button size="sm" variant="outline" className="mt-2 text-xs bg-transparent">
                                Next Hint
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="data" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dataset Explorer</CardTitle>
                    <CardDescription>Airbnb NYC 2019 - 48,895 listings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Data Preview */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">id</th>
                              <th className="text-left p-2">name</th>
                              <th className="text-left p-2">price</th>
                              <th className="text-left p-2">room_type</th>
                              <th className="text-left p-2">neighbourhood</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="p-2">2539</td>
                              <td className="p-2">Clean & quiet apt home by the park</td>
                              <td className="p-2 text-red-600">NaN</td>
                              <td className="p-2">Private room</td>
                              <td className="p-2">Kensington</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2">2595</td>
                              <td className="p-2">Skylit Midtown Castle</td>
                              <td className="p-2">$225</td>
                              <td className="p-2">Entire home/apt</td>
                              <td className="p-2">Midtown</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2">3647</td>
                              <td className="p-2">THE VILLAGE OF HARLEM....</td>
                              <td className="p-2 text-orange-600">$10000</td>
                              <td className="p-2">Private room</td>
                              <td className="p-2">Harlem</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Data Quality Issues */}
                      <div className="grid grid-cols-2 gap-4">
                        <Card className="p-4">
                          <h4 className="font-medium mb-2 text-red-700">Data Issues Found</h4>
                          <div className="space-y-1 text-sm">
                            <div>• 1,247 missing prices</div>
                            <div>• Price format inconsistent</div>
                            <div>• 23 extreme outliers (&gt;$10k)</div>
                            <div>• Some $0 listings</div>
                          </div>
                        </Card>
                        <Card className="p-4">
                          <h4 className="font-medium mb-2 text-blue-700">Dataset Stats</h4>
                          <div className="space-y-1 text-sm">
                            <div>• Total listings: 48,895</div>
                            <div>• Avg price: $152/night</div>
                            <div>• 5 boroughs covered</div>
                            <div>• 3 room types</div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="submit" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Submit Your Solution</CardTitle>
                    <CardDescription>Explain your approach and get feedback</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Describe your approach:</label>
                      <Textarea
                        placeholder="Explain how you handled missing values, outliers, and data type conversions..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">What challenges did you face?</label>
                      <Textarea placeholder="What was difficult? What would you do differently?" rows={3} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Your solution will be automatically checked and you'll receive instant feedback.
                      </div>
                      <Button>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Solution
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Exercise Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Completion</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Problem understood</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Data explored</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-4 h-4 border-2 border-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <span>Code in progress</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                      <span>Solution submitted</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Tutor Help */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <Brain className="h-4 w-4 mr-2 text-indigo-600" />
                  AI Tutor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-indigo-50 p-3 rounded-lg mb-3">
                  <div className="flex items-start">
                    <div className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium flex-shrink-0 mr-2 mt-0.5">
                      AI
                    </div>
                    <div>
                      <p className="text-sm text-indigo-900">
                        I notice you're spending time on the outlier detection. Good instinct! Consider: what makes a
                        price "unrealistic" in NYC?
                      </p>
                    </div>
                  </div>
                </div>
                <Button size="sm" className="w-full">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Ask Question
                </Button>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 text-sm">After this exercise:</h4>
                  <p className="text-sm text-green-800 mt-1">
                    Try "Feature Engineering Lab" to learn how to create meaningful features from clean data.
                  </p>
                  <Button size="sm" variant="outline" className="mt-2 text-xs bg-transparent">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    Preview Next
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

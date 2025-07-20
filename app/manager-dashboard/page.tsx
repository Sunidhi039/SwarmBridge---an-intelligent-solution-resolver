"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Trophy,
  Target,
  User,
  LogOut,
  Zap,
  Shield,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function ManagerDashboard() {
  const router = useRouter()

  const performanceData = [
    { name: "Sarah Engineer", resolved: 45, karma: 1250, level: 15, badges: 8 },
    { name: "Mike Developer", resolved: 38, karma: 980, level: 12, badges: 6 },
    { name: "Lisa Expert", resolved: 52, karma: 1450, level: 18, badges: 10 },
    { name: "John Specialist", resolved: 29, karma: 720, level: 9, badges: 4 },
    { name: "Emma Engineer", resolved: 41, karma: 1100, level: 14, badges: 7 },
  ]

  const ticketTrends = [
    { month: "Jan", resolved: 120, created: 135 },
    { month: "Feb", resolved: 145, created: 140 },
    { month: "Mar", resolved: 160, created: 155 },
    { month: "Apr", resolved: 180, created: 165 },
    { month: "May", resolved: 195, created: 170 },
  ]

  const domainDistribution = [
    { name: "SAP HANA", value: 35, color: "#0070f3" },
    { name: "SAP S/4HANA", value: 28, color: "#00d4aa" },
    { name: "SAP BW", value: 20, color: "#ff6b6b" },
    { name: "SAP Fiori", value: 12, color: "#ffd93d" },
    { name: "SAP Cloud", value: 5, color: "#6c5ce7" },
  ]

  const teamStats = {
    totalEngineers: 25,
    activeSwarms: 8,
    avgResolutionTime: "2.4 hours",
    kbaArticles: 156,
    customerSatisfaction: 94,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SwarmBridge</h1>
                <p className="text-sm text-gray-500">Manager Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>Alex Manager</span>
                <Badge className="bg-purple-100 text-purple-800">Team Lead</Badge>
              </div>
              <Button variant="outline" size="sm" onClick={() => router.push("/")} className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Engineers</p>
                  <p className="text-3xl font-bold">{teamStats.totalEngineers}</p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-green-600 to-green-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Active Swarms</p>
                  <p className="text-3xl font-bold">{teamStats.activeSwarms}</p>
                </div>
                <Zap className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-600 to-purple-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Avg Resolution</p>
                  <p className="text-3xl font-bold">{teamStats.avgResolutionTime}</p>
                </div>
                <Clock className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-600 to-orange-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">KBA Articles</p>
                  <p className="text-3xl font-bold">{teamStats.kbaArticles}</p>
                </div>
                <Target className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-pink-600 to-pink-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm">Satisfaction</p>
                  <p className="text-3xl font-bold">{teamStats.customerSatisfaction}%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-pink-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Team Performance
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="gamification" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Gamification
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Engineer Performance</CardTitle>
                  <CardDescription>Tickets resolved this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="resolved" fill="#0070f3" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Resolution Trends</CardTitle>
                  <CardDescription>Monthly ticket resolution vs creation</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={ticketTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="resolved" stroke="#00d4aa" strokeWidth={3} />
                      <Line type="monotone" dataKey="created" stroke="#ff6b6b" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Domain Distribution</CardTitle>
                  <CardDescription>Tickets by SAP product area</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={domainDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {domainDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Team Workload</CardTitle>
                  <CardDescription>Current engineer assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceData.map((engineer, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {engineer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span className="font-medium">{engineer.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline">{engineer.resolved} resolved</Badge>
                          <div className="w-20">
                            <Progress value={(engineer.resolved / 60) * 100} className="h-2" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="gamification">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="shadow-lg border-0 bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-6 h-6" />
                    Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {performanceData
                      .sort((a, b) => b.karma - a.karma)
                      .slice(0, 5)
                      .map((engineer, index) => (
                        <div key={index} className="flex items-center justify-between bg-white/20 p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                index === 0
                                  ? "bg-yellow-300 text-yellow-800"
                                  : index === 1
                                    ? "bg-gray-300 text-gray-800"
                                    : index === 2
                                      ? "bg-orange-300 text-orange-800"
                                      : "bg-white/30"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <span className="text-sm">{engineer.name}</span>
                          </div>
                          <span className="text-sm font-bold">{engineer.karma} XP</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                <CardHeader>
                  <CardTitle>Badge Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {performanceData.map((engineer, index) => (
                      <div key={index} className="flex items-center justify-between bg-white/20 p-3 rounded-lg">
                        <span className="text-sm">{engineer.name}</span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: engineer.badges }).map((_, i) => (
                            <div key={i} className="w-4 h-4 bg-yellow-300 rounded-full"></div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-gradient-to-br from-green-500 to-teal-500 text-white">
                <CardHeader>
                  <CardTitle>Monthly Champions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-white/20 p-4 rounded-lg text-center">
                      <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                      <h3 className="font-bold">Swarm Hero</h3>
                      <p className="text-sm">Lisa Expert</p>
                      <p className="text-xs opacity-90">52 tickets resolved</p>
                    </div>
                    <div className="bg-white/20 p-4 rounded-lg text-center">
                      <Target className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                      <h3 className="font-bold">KBA Master</h3>
                      <p className="text-sm">Sarah Engineer</p>
                      <p className="text-xs opacity-90">15 articles created</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    Performance Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 text-red-800 mb-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="font-medium">Low Performance Alert</span>
                      </div>
                      <p className="text-red-700 text-sm">
                        John Specialist has resolved only 29 tickets this month (below target of 35)
                      </p>
                      <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700 text-white">
                        Assign Training Module
                      </Button>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 text-yellow-800 mb-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">Workload Warning</span>
                      </div>
                      <p className="text-yellow-700 text-sm">
                        Lisa Expert is handling 8 active tickets (consider load balancing)
                      </p>
                      <Button size="sm" className="mt-2 bg-yellow-600 hover:bg-yellow-700 text-white">
                        Redistribute Load
                      </Button>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-800 mb-2">
                        <CheckCircle className="w-4 h-4" />
                        <span className="font-medium">Excellence Recognition</span>
                      </div>
                      <p className="text-green-700 text-sm">
                        Sarah Engineer achieved 95% customer satisfaction this month
                      </p>
                      <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700 text-white">
                        Send Recognition
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Skill Development Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceData.map((engineer, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{engineer.name}</span>
                          <Badge className="bg-blue-100 text-blue-800">Level {engineer.level}</Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          Recommended:{" "}
                          {engineer.resolved < 35
                            ? "Performance Improvement Training"
                            : engineer.badges < 6
                              ? "Advanced Certification Program"
                              : "Leadership Development Track"}
                        </div>
                        <Progress value={(engineer.karma / 1500) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

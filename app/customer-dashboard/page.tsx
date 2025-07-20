"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Plus,
  Triangle,
  Zap,
  User,
  LogOut,
  Sparkles,
  Star,
  Send,
  Bot,
} from "lucide-react"
import { useRouter } from "next/navigation"

const kbaContent = {
  loginAuthenticationIssues: {
    title: "Login Authentication Issues",
    solution:
      "1. Clear browser cache and cookies\n2. Reset password via admin panel\n3. Check user permissions\n4. Verify SSO configuration\n5. Try incognito/private browsing mode",
    steps: [
      "Clear browser cache",
      "Reset user password",
      "Check permissions",
      "Verify SSO settings",
      "Test in incognito mode",
    ],
    estimatedTime: "15 minutes",
    successRate: "98%",
  },
  dataExportTimeoutIssues: {
    title: "Data Export Timeout Issues",
    solution:
      "1. Reduce data range for export\n2. Use scheduled export for large datasets\n3. Check system resources\n4. Optimize query parameters\n5. Use incremental export",
    steps: [
      "Reduce data range",
      "Schedule large exports",
      "Check system resources",
      "Optimize queries",
      "Use incremental export",
    ],
    estimatedTime: "30 minutes",
    successRate: "92%",
  },
}

export default function CustomerDashboard() {
  const [tickets, setTickets] = useState([
    {
      id: "TKT-001",
      title: "Login Authentication Error",
      status: "resolved",
      priority: "high",
      created: "2024-01-15",
      progress: 100,
    },
    {
      id: "TKT-002",
      title: "Data Export Issue",
      status: "in-progress",
      priority: "medium",
      created: "2024-01-16",
      progress: 65,
    },
  ])

  // Add this to localStorage to sync with engineer portal
  useEffect(() => {
    localStorage.setItem("swarmbridge-tickets", JSON.stringify(tickets))
  }, [tickets])

  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    product: "",
    urgency: "",
    file: null,
  })
  const [showSubmissionMessage, setShowSubmissionMessage] = useState(false)
  const [showKBAMessage, setShowKBAMessage] = useState(false)
  const [showAIAnalysis, setShowAIAnalysis] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [aiAnalysisResult, setAiAnalysisResult] = useState(null)
  const router = useRouter()

  const handleSubmitTicket = async () => {
    if (newTicket.title && newTicket.description) {
      setIsSubmitting(true)

      // Simulate AI analysis
      setShowAIAnalysis(true)
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const ticketId = `TKT-${String(tickets.length + 1).padStart(3, "0")}`
      const newTicketData = {
        id: ticketId,
        title: newTicket.title,
        status: "submitted",
        priority: newTicket.urgency || "medium",
        created: new Date().toISOString().split("T")[0],
        progress: 0,
        description: newTicket.description,
        product: newTicket.product,
        customer: "John Customer",
        isKBA: false,
        engineerType: "regular",
      }

      // Check if it's a KBA match with AI analysis
      const isInKBA =
        newTicket.title.toLowerCase().includes("login") ||
        newTicket.title.toLowerCase().includes("authentication") ||
        newTicket.title.toLowerCase().includes("password") ||
        newTicket.title.toLowerCase().includes("export") ||
        newTicket.title.toLowerCase().includes("timeout")

      let kbaContentData = null
      if (isInKBA) {
        kbaContentData =
          kbaContent[
            newTicket.title.toLowerCase().includes("login") || newTicket.title.toLowerCase().includes("authentication")
              ? "loginAuthenticationIssues"
              : "dataExportTimeoutIssues"
          ]
        newTicketData.isKBA = true
        newTicketData.kbaContent = kbaContentData
        newTicketData.engineerType = "low-priority"
        newTicketData.status = "kba-matched"
      }

      const updatedTickets = [...tickets, newTicketData]
      setTickets(updatedTickets)

      // Sync to engineer portal
      localStorage.setItem("swarmbridge-tickets", JSON.stringify(updatedTickets))

      setIsSubmitting(false)
      setShowAIAnalysis(false)

      if (isInKBA) {
        setAiAnalysisResult({
          matched: true,
          confidence: 95,
          kbaContent: kbaContentData,
          solution: "Existing solution found in Knowledge Base",
        })
        setShowKBAMessage(true)
      } else {
        setShowSubmissionMessage(true)
      }

      setNewTicket({ title: "", description: "", product: "", urgency: "", file: null })
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "resolved":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
      case "in-progress":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
      case "connecting":
        return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
      case "kba-matched":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      case "submitted":
        return "bg-gradient-to-r from-gray-500 to-slate-500 text-white"
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500 text-white"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="w-4 h-4" />
      case "in-progress":
        return <Zap className="w-4 h-4" />
      case "connecting":
        return <Clock className="w-4 h-4 animate-spin" />
      case "kba-matched":
        return <FileText className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "resolved":
        return "RESOLVED"
      case "in-progress":
        return "IN PROGRESS"
      case "connecting":
        return "CONNECTING TO EXPERT"
      case "kba-matched":
        return "KBA SOLUTION APPLIED"
      case "submitted":
        return "SUBMITTED"
      default:
        return status.toUpperCase()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 text-blue-200/30 animate-pulse">
          <Triangle size={60} className="rotate-12" />
        </div>
        <div className="absolute bottom-20 left-20 text-purple-200/20 animate-bounce">
          <Star size={80} className="rotate-45" />
        </div>
        <div className="absolute top-1/3 left-10 text-cyan-200/25">
          <Sparkles size={50} className="animate-spin-slow" />
        </div>
      </div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <div className="text-white font-bold text-sm">SAP</div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SwarmBridge
                </h1>
                <p className="text-sm text-gray-600 font-medium">Customer Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
                <User className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-800">John Customer</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/")}
                className="flex items-center gap-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* AI Analysis Message */}
        {showAIAnalysis && (
          <div className="mb-6 p-6 bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-300 rounded-2xl shadow-lg animate-bounce-in">
            <div className="flex items-center gap-3 text-blue-800 mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-spin">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">🤖 AI Assistant Analyzing Your Issue...</span>
            </div>
            <p className="text-blue-700 font-medium">
              SwarmBot is checking our knowledge base and analyzing similar resolved cases...
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
              <span className="text-sm text-blue-600">Scanning 10,000+ resolved tickets...</span>
            </div>
          </div>
        )}

        {/* Enhanced KBA Message */}
        {showKBAMessage && aiAnalysisResult?.matched && (
          <div className="mb-6 p-6 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-2xl shadow-lg animate-bounce-in">
            <div className="flex items-center gap-3 text-purple-800 mb-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">
                🎯 Perfect Match Found! ({aiAnalysisResult.confidence}% confidence)
              </span>
            </div>
            <div className="bg-white/50 rounded-lg p-4 mb-3">
              <h4 className="font-bold text-purple-800 mb-2">📚 Knowledge Base Article:</h4>
              <h5 className="font-semibold text-purple-700 mb-2">{aiAnalysisResult.kbaContent?.title}</h5>
              <div className="text-sm text-purple-600 space-y-1">
                <div className="flex gap-4">
                  <span>⏱️ Est. Time: {aiAnalysisResult.kbaContent?.estimatedTime}</span>
                  <span>✅ Success Rate: {aiAnalysisResult.kbaContent?.successRate}</span>
                </div>
              </div>
            </div>
            <p className="text-purple-700 font-medium">
              Great news! We found an exact solution in our Knowledge Base. Connecting you to a specialist with the
              ready solution...
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping"></div>
              <span className="text-sm text-purple-600">Assigning KBA specialist engineer...</span>
            </div>
          </div>
        )}

        {/* Regular Submission Message */}
        {showSubmissionMessage && !aiAnalysisResult?.matched && (
          <div className="mb-6 p-6 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-2xl shadow-lg animate-bounce-in">
            <div className="flex items-center gap-3 text-green-800 mb-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">✅ New Issue Submitted Successfully!</span>
            </div>
            <p className="text-green-700 font-medium">
              This appears to be a new issue. Our AI is routing you to the best available domain expert...
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              <span className="text-sm text-green-600">Smart routing to expert in progress...</span>
            </div>
          </div>
        )}

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-lg shadow-lg border border-gray-200/50">
            <TabsTrigger
              value="create"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              <Plus className="w-4 h-4" />
              Create Ticket
            </TabsTrigger>
            <TabsTrigger
              value="tickets"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
            >
              <FileText className="w-4 h-4" />
              My Tickets ({tickets.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Plus className="w-5 h-5" />
                  </div>
                  Submit New Issue
                </CardTitle>
                <CardDescription className="text-blue-100 font-medium">
                  Describe your issue and our AI will analyze it against our knowledge base
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
                      Issue Title *
                    </Label>
                    <Input
                      id="title"
                      placeholder="Brief description of your issue"
                      value={newTicket.title}
                      onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 bg-gradient-to-r from-gray-50 to-blue-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product" className="text-sm font-semibold text-gray-700">
                      Product/Module
                    </Label>
                    <Select
                      value={newTicket.product}
                      onValueChange={(value) => setNewTicket({ ...newTicket, product: value })}
                    >
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 bg-gradient-to-r from-gray-50 to-blue-50">
                        <SelectValue placeholder="Select SAP product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sap-hana">🗄️ SAP HANA</SelectItem>
                        <SelectItem value="sap-s4">⚡ SAP S/4HANA</SelectItem>
                        <SelectItem value="sap-bw">📊 SAP BW</SelectItem>
                        <SelectItem value="sap-fiori">🎨 SAP Fiori</SelectItem>
                        <SelectItem value="sap-cloud">☁️ SAP Cloud Platform</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                    Detailed Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide detailed information about your issue (100-250 words)"
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    className="min-h-32 border-2 border-gray-200 focus:border-blue-500 bg-gradient-to-r from-gray-50 to-blue-50"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="urgency" className="text-sm font-semibold text-gray-700">
                      Urgency Level
                    </Label>
                    <Select
                      value={newTicket.urgency}
                      onValueChange={(value) => setNewTicket({ ...newTicket, urgency: value })}
                    >
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 bg-gradient-to-r from-gray-50 to-blue-50">
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">🟢 Low - General inquiry</SelectItem>
                        <SelectItem value="medium">🟡 Medium - Business impact</SelectItem>
                        <SelectItem value="high">🔴 High - Critical system down</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="file" className="text-sm font-semibold text-gray-700">
                      Attach Screenshot/Logs
                    </Label>
                    <Input
                      id="file"
                      type="file"
                      accept=".png,.jpg,.jpeg,.txt,.log"
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 bg-gradient-to-r from-gray-50 to-blue-50"
                      onChange={(e) => setNewTicket({ ...newTicket, file: e.target.files?.[0] || null })}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSubmitTicket}
                  disabled={!newTicket.title || !newTicket.description || isSubmitting}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white font-bold rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      AI Analyzing Issue...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Ticket
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets">
            <div className="space-y-6">
              {tickets.map((ticket) => (
                <Card
                  key={ticket.id}
                  className="shadow-2xl border-0 bg-white/90 backdrop-blur-lg hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <h3 className="font-bold text-xl text-gray-900">{ticket.title}</h3>
                          <Badge
                            className={`${getStatusColor(ticket.status)} flex items-center gap-2 px-3 py-1 text-sm font-semibold`}
                          >
                            {getStatusIcon(ticket.status)}
                            {getStatusText(ticket.status)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                          <span className="font-semibold">ID: {ticket.id}</span>
                          <span>Created: {ticket.created}</span>
                          <Badge
                            variant="outline"
                            className={
                              ticket.priority === "high"
                                ? "border-red-300 text-red-700 bg-red-50"
                                : ticket.priority === "medium"
                                  ? "border-yellow-300 text-yellow-700 bg-yellow-50"
                                  : "border-green-300 text-green-700 bg-green-50"
                            }
                          >
                            {ticket.priority.toUpperCase()} PRIORITY
                          </Badge>
                        </div>

                        {/* Show KBA Content for matched tickets */}
                        {ticket.kbaContent && (
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 mb-4">
                            <div className="flex items-center gap-2 mb-3">
                              <FileText className="w-5 h-5 text-purple-600" />
                              <span className="font-bold text-purple-800">📚 Applied Solution:</span>
                            </div>
                            <h4 className="font-semibold text-purple-700 mb-2">{ticket.kbaContent.title}</h4>
                            <div className="text-sm text-purple-600 whitespace-pre-line mb-3">
                              {ticket.kbaContent.solution}
                            </div>
                            <div className="flex gap-4 text-xs text-purple-500">
                              <span>⏱️ Est. Time: {ticket.kbaContent.estimatedTime}</span>
                              <span>✅ Success Rate: {ticket.kbaContent.successRate}</span>
                            </div>
                          </div>
                        )}

                        {(ticket.status === "in-progress" ||
                          ticket.status === "connecting" ||
                          ticket.status === "kba-matched") && (
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm font-medium">
                              <span>Resolution Progress</span>
                              <span>{ticket.progress}%</span>
                            </div>
                            <Progress value={ticket.progress} className="h-3 bg-gray-200" />
                            {ticket.status === "kba-matched" && (
                              <div className="text-sm text-purple-600 font-medium">
                                ✨ Specialist applying KBA solution - faster resolution expected
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

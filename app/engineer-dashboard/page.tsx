"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertCircle,
  CheckCircle,
  FileText,
  Zap,
  User,
  LogOut,
  Trophy,
  Star,
  Download,
  Users,
  MessageSquare,
  Phone,
  Shield,
  Sparkles,
  Crown,
  Award,
  Send,
  Clock,
  Bell,
  X,
  Package,
  BookOpen,
  Search,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"

export default function EngineerDashboard() {
  const [activeTab, setActiveTab] = useState("tickets")
  const [engineerType, setEngineerType] = useState("regular") // regular, low-priority, backup
  const [engineerStatus, setEngineerStatus] = useState("available") // available, busy, offline
  const [currentTime, setCurrentTime] = useState(new Date())
  const [backupNotification, setBackupNotification] = useState(null)
  const [backupRequests, setBackupRequests] = useState([])
  const [messages, setMessages] = useState([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      user: "Sarah Engineer",
      message: "I've identified the root cause - it's a timeout configuration issue",
      type: "engineer",
    },
    {
      id: 2,
      user: "Mike Developer",
      message: "Great! I'll implement the timeout increase fix right now",
      type: "engineer",
    },
    {
      id: 3,
      user: "🤖 SwarmBot",
      message: "Backup engineer is on standby if additional help is needed",
      type: "system",
    },
    {
      id: 4,
      user: "System Alert",
      message: "Fix has been applied to staging environment - testing in progress",
      type: "alert",
    },
  ])

  const [tickets, setTickets] = useState([
    {
      id: "TKT-003",
      title: "SAP HANA Connection Timeout",
      status: "new",
      priority: "high",
      customer: "Alice Corp",
      created: "2024-01-17",
      isKBA: false,
      description: "Database connection keeps timing out after 30 seconds",
      engineerType: "regular",
    },
    {
      id: "TKT-004",
      title: "Login Authentication Error",
      status: "new",
      priority: "low",
      customer: "John Customer",
      created: "2024-01-17",
      isKBA: true,
      kbaContent: {
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
      description: "Users unable to login with correct credentials",
      engineerType: "low-priority",
    },
    {
      id: "TKT-005",
      title: "Data Export Performance Issue",
      status: "backup-needed",
      priority: "medium",
      customer: "Tech Solutions Inc",
      created: "2024-01-17",
      isKBA: false,
      description: "Large data exports are taking too long and timing out",
      engineerType: "backup",
    },
  ])

  const [kbaArticles] = useState([
    {
      id: "KBA-001",
      title: "SAP HANA Connection Timeout Solutions",
      category: "Database",
      solution:
        "1. Increase connection timeout in configuration\n2. Check network connectivity\n3. Verify database server resources\n4. Review connection pool settings",
      estimatedTime: "30 minutes",
      successRate: "95%",
      tags: ["HANA", "Connection", "Timeout"],
      author: "Sarah Engineer",
      created: "2024-01-15",
    },
    {
      id: "KBA-002",
      title: "Login Authentication Issues",
      category: "Security",
      solution:
        "1. Clear browser cache and cookies\n2. Reset password via admin panel\n3. Check user permissions\n4. Verify SSO configuration\n5. Try incognito/private browsing mode",
      estimatedTime: "15 minutes",
      successRate: "98%",
      tags: ["Authentication", "Login", "SSO"],
      author: "Mike Junior",
      created: "2024-01-14",
    },
    {
      id: "KBA-003",
      title: "Data Export Performance Optimization",
      category: "Performance",
      solution:
        "1. Reduce data range for export\n2. Use scheduled export for large datasets\n3. Check system resources\n4. Optimize query parameters\n5. Use incremental export",
      estimatedTime: "45 minutes",
      successRate: "92%",
      tags: ["Export", "Performance", "Optimization"],
      author: "Lisa Backup",
      created: "2024-01-13",
    },
    {
      id: "KBA-004",
      title: "API Integration Troubleshooting",
      category: "Integration",
      solution:
        "1. Verify API endpoint URLs\n2. Check authentication tokens\n3. Review request/response formats\n4. Test with API client tools\n5. Check rate limiting",
      estimatedTime: "25 minutes",
      successRate: "90%",
      tags: ["API", "Integration", "Troubleshooting"],
      author: "Sarah Engineer",
      created: "2024-01-12",
    },
  ])

  const [swarmRooms, setSwarmRooms] = useState([
    {
      id: "SW-001",
      title: "API Integration Issue",
      participants: 2,
      status: "active",
      logs: [
        "2024-01-17 14:30:15 - Swarm session started",
        "2024-01-17 14:32:22 - Root cause identified: API timeout configuration",
        "2024-01-17 14:35:45 - Implementing timeout increase fix",
        "2024-01-17 14:38:12 - Testing fix in staging environment",
        "2024-01-17 14:40:33 - Fix validated, applying to production",
      ],
    },
    {
      id: "SW-002",
      title: "Performance Optimization",
      participants: 3,
      status: "active",
      logs: [
        "2024-01-17 15:15:30 - Performance analysis initiated",
        "2024-01-17 15:18:45 - Database queries identified as bottleneck",
        "2024-01-17 15:22:10 - Query optimization in progress",
        "2024-01-17 15:25:33 - Index creation completed",
        "2024-01-17 15:28:15 - Performance improved by 40%",
      ],
    },
  ])

  const [showSwarmRoom, setShowSwarmRoom] = useState(false)
  const [currentSwarm, setCurrentSwarm] = useState(null)
  const [showKBACreation, setShowKBACreation] = useState(false)
  const [showIncidentCapsule, setShowIncidentCapsule] = useState(false)
  const [showEnteringSwarm, setShowEnteringSwarm] = useState(false)
  const [swarmEnded, setSwarmEnded] = useState(false)
  const [kbaContent, setKbaContent] = useState("")
  const [showBackupCall, setShowBackupCall] = useState(false)
  const [backupCalled, setBackupCalled] = useState(false)
  const [kbaSearchTerm, setKbaSearchTerm] = useState("")
  const router = useRouter()

  const engineerProfiles = {
    regular: {
      name: "Sarah Engineer",
      level: 15,
      xp: 2450,
      nextLevelXp: 3000,
      karma: 1250,
      badges: ["API Master", "Database Ninja", "Swarm Hero"],
      type: "Senior Engineer",
      color: "from-blue-600 to-purple-600",
      timezone: "America/Los_Angeles",
      timezoneLabel: "PST (UTC-8)",
    },
    "low-priority": {
      name: "Mike Junior",
      level: 8,
      xp: 850,
      nextLevelXp: 1200,
      karma: 420,
      badges: ["Quick Learner", "KBA Specialist"],
      type: "Junior Engineer",
      color: "from-green-600 to-teal-600",
      timezone: "America/New_York",
      timezoneLabel: "EST (UTC-5)",
    },
    backup: {
      name: "Lisa Backup",
      level: 12,
      xp: 1800,
      nextLevelXp: 2200,
      karma: 890,
      badges: ["Backup Hero", "Problem Solver", "Team Player"],
      type: "Backup Specialist",
      color: "from-orange-600 to-red-600",
      timezone: "Europe/Berlin",
      timezoneLabel: "CET (UTC+1)",
    },
  }

  const currentProfile = engineerProfiles[engineerType]
  const [currentKarma, setCurrentKarma] = useState(currentProfile.karma)

  // Add message to embedded messages
  const addMessage = (message, type = "info") => {
    const newMessage = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString(),
    }
    setMessages((prev) => [...prev, newMessage])

    // Auto-remove message after 5 seconds
    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== newMessage.id))
    }, 5000)
  }

  // Send chat message
  const sendChatMessage = () => {
    if (currentMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        user: currentProfile.name,
        message: currentMessage,
        type: "engineer",
      }
      setChatMessages((prev) => [...prev, newMessage])
      setCurrentMessage("")
    }
  }

  // Update time every minute for timezone display
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Simulate backup notification for backup engineers
  useEffect(() => {
    if (engineerType === "backup") {
      const timer = setTimeout(() => {
        setBackupNotification({
          ticketId: "TKT-003",
          title: "SAP HANA Connection Timeout",
          requester: "Sarah Engineer",
          urgency: "high",
        })
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [engineerType])

  // Add useEffect to sync tickets from customer portal
  useEffect(() => {
    const syncTickets = () => {
      const customerTickets = JSON.parse(localStorage.getItem("swarmbridge-tickets") || "[]")
      const newTickets = customerTickets
        .filter((ticket) => ticket.status === "submitted" || ticket.status === "kba-matched")
        .map((ticket) => ({
          ...ticket,
          status: "new",
        }))

      if (newTickets.length > 0) {
        setTickets((prev) => [...prev, ...newTickets])
        addMessage(`${newTickets.length} new ticket(s) received from customer portal`, "info")
        // Clear processed tickets
        const remainingTickets = customerTickets.filter(
          (ticket) => ticket.status !== "submitted" && ticket.status !== "kba-matched",
        )
        localStorage.setItem("swarmbridge-tickets", JSON.stringify(remainingTickets))
      }
    }

    // Check for new tickets every 2 seconds
    const interval = setInterval(syncTickets, 2000)
    return () => clearInterval(interval)
  }, [])

  // Add backup notification state and effect
  useEffect(() => {
    if (engineerType === "backup") {
      // Check for backup requests
      const checkBackupRequests = () => {
        const requests = JSON.parse(localStorage.getItem("backup-requests") || "[]")
        if (requests.length > 0) {
          setBackupNotification(requests[0])
          // Remove processed request
          localStorage.setItem("backup-requests", JSON.stringify(requests.slice(1)))
        }
      }

      const interval = setInterval(checkBackupRequests, 3000)
      return () => clearInterval(interval)
    }
  }, [engineerType])

  // Add timezone calculation
  const getLocalTime = (timezone) => {
    const now = new Date()
    const options = {
      timeZone: timezone.includes("PST")
        ? "America/Los_Angeles"
        : timezone.includes("EST")
          ? "America/New_York"
          : timezone.includes("CET")
            ? "Europe/Berlin"
            : "UTC",
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    }
    return now.toLocaleTimeString("en-US", options)
  }

  const achievements = [
    { name: "Quick Resolver", description: "Resolved 50 tickets in under 1 hour", earned: true, icon: "⚡" },
    { name: "Team Player", description: "Participated in 100 swarm sessions", earned: true, icon: "🤝" },
    { name: "Knowledge Sharer", description: "Created 25 KBA articles", earned: false, icon: "📚" },
    { name: "Swarm Master", description: "Led 50 successful swarm sessions", earned: true, icon: "👑" },
    { name: "Bug Hunter", description: "Found and fixed 100 critical bugs", earned: false, icon: "🐛" },
    { name: "Speed Demon", description: "Average resolution time under 30 minutes", earned: true, icon: "🏃" },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "offline":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleAcceptTicket = (ticketId) => {
    const ticket = tickets.find((t) => t.id === ticketId)

    if (ticket?.isKBA) {
      addMessage(`🎯 KBA Solution Available for: ${ticket.title}`, "success")
      addMessage(
        `Estimated Time: ${ticket.kbaContent.estimatedTime} | Success Rate: ${ticket.kbaContent.successRate}`,
        "info",
      )
      // Simulate quick resolution for KBA tickets
      setTimeout(() => {
        const karmaGained = 25
        setCurrentKarma((prev) => prev + karmaGained)
        addMessage("✅ KBA Solution Applied Successfully! Customer has been notified.", "success")
        addMessage(`🏆 +${karmaGained} Karma points earned for quick KBA resolution!`, "success")
      }, 2000)
    } else {
      setShowEnteringSwarm(true)
      setTimeout(() => {
        setShowEnteringSwarm(false)
        setCurrentSwarm({ id: ticketId, title: ticket?.title })
        setShowSwarmRoom(true)
        addMessage(`🚀 Entered swarm room for: ${ticket?.title}`, "info")
      }, 2000)
    }
    setTickets(tickets.filter((t) => t.id !== ticketId))
  }

  const handleCallBackup = () => {
    setShowBackupCall(true)

    // Add backup request to localStorage
    const backupRequest = {
      ticketId: currentSwarm?.id || "TKT-003",
      title: currentSwarm?.title || "SAP HANA Connection Timeout",
      requester: currentProfile.name,
      urgency: "high",
      timestamp: new Date().toISOString(),
    }

    const existingRequests = JSON.parse(localStorage.getItem("backup-requests") || "[]")
    localStorage.setItem("backup-requests", JSON.stringify([...existingRequests, backupRequest]))

    setTimeout(() => {
      setBackupCalled(true)
      setShowBackupCall(false)
      addMessage("🆘 Backup Engineer Notified! They will join the swarm room shortly.", "success")

      // Add backup engineer to chat
      const backupMessage = {
        id: Date.now(),
        user: "Lisa Backup",
        message: "🆘 Backup engineer here! What's the current status?",
        type: "backup",
      }
      setChatMessages((prev) => [...prev, backupMessage])
    }, 2000)
  }

  const handleEndSwarm = () => {
    setSwarmEnded(true)
    setTimeout(() => {
      setShowSwarmRoom(false)
      setSwarmEnded(false)
      setShowKBACreation(true)
      addMessage("🔗 Swarm session completed. Opening KBA creation form.", "info")
    }, 2000)
  }

  const handleCreateKBA = () => {
    if (kbaContent.trim()) {
      setShowKBACreation(false)
      const karmaGained = 50
      setCurrentKarma((prev) => prev + karmaGained)
      addMessage("🎉 KBA Article Created Successfully!", "success")
      addMessage(
        `📚 Article added to knowledge base | ✅ Customer notified | 🏆 +${karmaGained} Karma points earned`,
        "success",
      )
      setKbaContent("")
    }
  }

  const handleAcceptBackup = () => {
    setBackupNotification(null)
    addMessage("🚀 Joining Swarm as Backup! You're now assisting with the issue.", "info")
    setCurrentSwarm({ id: backupNotification.ticketId, title: backupNotification.title })
    setShowSwarmRoom(true)
  }

  const filteredTickets = tickets.filter((ticket) => {
    if (engineerType === "low-priority") return ticket.isKBA || ticket.priority === "low"
    if (engineerType === "backup") return ticket.status === "backup-needed"
    return ticket.engineerType === "regular"
  })

  const filteredKBAArticles = kbaArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(kbaSearchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(kbaSearchTerm.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(kbaSearchTerm.toLowerCase())),
  )

  const handleDownloadLogs = (swarmId) => {
    const swarm = swarmRooms.find((s) => s.id === swarmId)
    if (swarm) {
      const logContent = swarm.logs.join("\n")
      const blob = new Blob([logContent], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `swarm-logs-${swarmId}-${new Date().toISOString().split("T")[0]}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      addMessage("📥 Logs downloaded successfully!", "success")
    }
  }

  const handleCloseSwarm = () => {
    setSwarmEnded(true)
    setTimeout(() => {
      setShowSwarmRoom(false)
      setSwarmEnded(false)
      setShowKBACreation(true)
    }, 2000)
  }

  const handleCreateIncidentCapsule = () => {
    const capsule = {
      id: `IC-${Date.now()}`,
      ticketId: currentSwarm?.id,
      title: currentSwarm?.title,
      creator: currentProfile.name,
      timestamp: new Date().toISOString(),
      contents: {
        systemLogs: true,
        errorMessages: true,
        swarmTranscript: true,
        recentCommits: true,
        attemptedSolutions: true,
        performanceMetrics: true,
      },
      routedTo: "domain-experts",
    }

    // Store capsule for routing
    const existingCapsules = JSON.parse(localStorage.getItem("incident-capsules") || "[]")
    localStorage.setItem("incident-capsules", JSON.stringify([...existingCapsules, capsule]))

    setShowIncidentCapsule(false)
    setShowSwarmRoom(false)

    addMessage("📦 Incident Capsule Created Successfully!", "success")
    addMessage(`🎯 Capsule ID: ${capsule.id}`, "info")
    addMessage(
      "✅ All progress, logs, and context preserved | 🔄 Routed to domain experts | 📧 Customer notified",
      "info",
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Embedded Messages */}
      {messages.length > 0 && (
        <div className="fixed top-20 right-4 z-40 space-y-2 max-w-md">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-lg shadow-lg border animate-bounce-in ${
                msg.type === "success"
                  ? "bg-green-600 border-green-500 text-white"
                  : msg.type === "error"
                    ? "bg-red-600 border-red-500 text-white"
                    : "bg-blue-600 border-blue-500 text-white"
              }`}
            >
              <div className="text-sm font-medium">{msg.message}</div>
              <div className="text-xs opacity-75">{msg.timestamp}</div>
            </div>
          ))}
        </div>
      )}

      {/* Backup Notification */}
      {backupNotification && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-red-600 to-pink-600 text-white p-4 rounded-xl shadow-2xl border border-red-400 animate-bounce-in max-w-sm">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-5 h-5 animate-pulse" />
                <span className="font-bold">🆘 Backup Request!</span>
              </div>
              <div className="text-sm space-y-1">
                <div>
                  <strong>Ticket:</strong> {backupNotification.ticketId}
                </div>
                <div>
                  <strong>Issue:</strong> {backupNotification.title}
                </div>
                <div>
                  <strong>From:</strong> {backupNotification.requester}
                </div>
                <div>
                  <strong>Urgency:</strong> {backupNotification.urgency.toUpperCase()}
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Button size="sm" onClick={handleAcceptBackup} className="bg-green-600 hover:bg-green-700 text-xs">
                  Accept & Join
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setBackupNotification(null)}
                  className="text-xs border-white/30 text-white hover:bg-white/10"
                >
                  Decline
                </Button>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setBackupNotification(null)}
              className="text-white hover:bg-white/10 p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 text-purple-300/20 animate-pulse">
          <Star size={80} className="rotate-12" />
        </div>
        <div className="absolute bottom-20 left-20 text-blue-300/15 animate-bounce">
          <Sparkles size={100} />
        </div>
        <div className="absolute top-1/3 left-10 text-indigo-300/25">
          <Crown size={60} className="animate-spin-slow" />
        </div>
      </div>

      {/* Header */}
      <div className="bg-black/20 backdrop-blur-lg shadow-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-2xl">
                <div className="text-white font-bold text-sm">SAP</div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">SwarmBridge</h1>
                <p className="text-purple-200 font-medium">Engineer Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Status Indicator */}
              <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(engineerStatus)} animate-pulse`}></div>
                <select
                  value={engineerStatus}
                  onChange={(e) => setEngineerStatus(e.target.value)}
                  className="bg-transparent text-white text-sm border-none outline-none"
                >
                  <option value="available" className="text-black">
                    Available
                  </option>
                  <option value="busy" className="text-black">
                    Busy
                  </option>
                  <option value="offline" className="text-black">
                    Offline
                  </option>
                </select>
              </div>

              {/* Timezone Display */}
              <div className="text-xs text-white/70 px-2 py-1 bg-white/10 rounded">
                <Clock className="w-3 h-3 inline mr-1" />
                {currentProfile.timezoneLabel}
                <br />
                {getLocalTime(currentProfile.timezone)}
              </div>

              {/* Engineer Type Selector */}
              <select
                value={engineerType}
                onChange={(e) => setEngineerType(e.target.value)}
                className="px-3 py-1 bg-white/10 text-white rounded-lg border border-white/20 text-sm"
              >
                <option value="regular" className="text-black">
                  Regular Engineer
                </option>
                <option value="low-priority" className="text-black">
                  Low-Priority Engineer
                </option>
                <option value="backup" className="text-black">
                  Backup Engineer
                </option>
              </select>

              <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
                <User className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">{currentProfile.name}</span>
                <Badge className={`bg-gradient-to-r ${currentProfile.color} text-white border-0`}>
                  Level {currentProfile.level}
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/")}
                className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-black/20 backdrop-blur-lg border border-white/20">
            <TabsTrigger
              value="tickets"
              className="flex items-center gap-2 text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500"
            >
              <AlertCircle className="w-4 h-4" />
              New Tickets ({filteredTickets.length})
            </TabsTrigger>
            <TabsTrigger
              value="swarms"
              className="flex items-center gap-2 text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500"
            >
              <Users className="w-4 h-4" />
              Active Swarms ({swarmRooms.length})
            </TabsTrigger>
            <TabsTrigger
              value="kba"
              className="flex items-center gap-2 text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500"
            >
              <BookOpen className="w-4 h-4" />
              Knowledge Base ({kbaArticles.length})
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="flex items-center gap-2 text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500"
            >
              <Trophy className="w-4 h-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="flex items-center gap-2 text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500"
            >
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tickets">
            <div className="space-y-6">
              {filteredTickets.length === 0 ? (
                <Card className="shadow-2xl border-0 bg-white/10 backdrop-blur-lg text-white">
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400" />
                    <h3 className="text-xl font-bold mb-2">All Caught Up! 🎉</h3>
                    <p className="text-gray-300">No new tickets assigned to your expertise level.</p>
                  </CardContent>
                </Card>
              ) : (
                filteredTickets.map((ticket) => (
                  <Card
                    key={ticket.id}
                    className="shadow-2xl border-0 bg-white/10 backdrop-blur-lg hover:bg-white/15 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <h3 className="font-bold text-xl text-white">{ticket.title}</h3>
                            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center gap-2 px-3 py-1">
                              <AlertCircle className="w-4 h-4" />
                              NEW
                            </Badge>
                            {ticket.isKBA && (
                              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                KBA SOLUTION READY
                              </Badge>
                            )}
                            {ticket.status === "backup-needed" && (
                              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                BACKUP NEEDED
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-6 text-sm text-gray-300 mb-4">
                            <span className="font-semibold">ID: {ticket.id}</span>
                            <span>Customer: {ticket.customer}</span>
                            <span>Created: {ticket.created}</span>
                            <Badge
                              variant="outline"
                              className={
                                ticket.priority === "high"
                                  ? "border-red-400 text-red-300 bg-red-500/20"
                                  : ticket.priority === "medium"
                                    ? "border-yellow-400 text-yellow-300 bg-yellow-500/20"
                                    : "border-green-400 text-green-300 bg-green-500/20"
                              }
                            >
                              {ticket.priority.toUpperCase()} PRIORITY
                            </Badge>
                          </div>
                          <p className="text-gray-200 mb-4 font-medium">{ticket.description}</p>
                          {ticket.isKBA && ticket.kbaContent && (
                            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-xl p-4 mb-4">
                              <div className="flex items-center gap-2 mb-2">
                                <FileText className="w-5 h-5 text-yellow-400" />
                                <span className="font-bold text-yellow-300">📚 KBA Solution Available:</span>
                              </div>
                              <h4 className="font-semibold text-yellow-200 mb-2">{ticket.kbaContent.title}</h4>
                              <div className="text-yellow-100 font-medium text-sm whitespace-pre-line mb-3">
                                {ticket.kbaContent.solution}
                              </div>
                              <div className="flex gap-4 text-xs text-yellow-300">
                                <span>⏱️ Est. Time: {ticket.kbaContent.estimatedTime}</span>
                                <span>✅ Success Rate: {ticket.kbaContent.successRate}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="ml-6">
                          <Button
                            onClick={() => handleAcceptTicket(ticket.id)}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
                          >
                            {ticket.isKBA ? "🎯 Accept & Apply KBA" : "⚡ Accept Ticket"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="swarms">
            <div className="space-y-6">
              {swarmRooms.map((swarm) => (
                <Card key={swarm.id} className="shadow-2xl border-0 bg-white/10 backdrop-blur-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <h3 className="font-bold text-xl text-white">{swarm.title}</h3>
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            ACTIVE SWARM
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-300 mb-4">
                          <span className="font-semibold">ID: {swarm.id}</span>
                          <span>👥 {swarm.participants} Participants</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              View Logs
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="text-xl">🔍 Swarm Session Logs - {swarm.id}</DialogTitle>
                              <DialogDescription className="text-gray-300">
                                Real-time activity logs for this swarm session
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-3 max-h-80 overflow-y-auto">
                              {swarm.logs.map((log, index) => (
                                <div
                                  key={index}
                                  className="p-3 bg-gray-800 rounded-lg text-sm font-mono border border-gray-700"
                                >
                                  <span className="text-cyan-400">[LOG {index + 1}]</span> {log}
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleDownloadLogs(swarm.id)}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download Complete Logs
                              </Button>
                              <Button
                                variant="outline"
                                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                              >
                                📋 Copy to Clipboard
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          onClick={() => {
                            setCurrentSwarm(swarm)
                            setShowSwarmRoom(true)
                          }}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold"
                        >
                          🚀 Join Swarm
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="kba">
            <div className="space-y-6">
              <Card className="shadow-2xl border-0 bg-white/10 backdrop-blur-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    📚 Knowledge Base Articles
                  </CardTitle>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Search articles by title, category, or tags..."
                        value={kbaSearchTerm}
                        onChange={(e) => setKbaSearchTerm(e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredKBAArticles.map((article) => (
                      <Card
                        key={article.id}
                        className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-white mb-2">{article.title}</h3>
                              <div className="flex items-center gap-2 mb-3">
                                <Badge className="bg-blue-600 text-white">{article.category}</Badge>
                                <span className="text-sm text-gray-300">by {article.author}</span>
                                <span className="text-sm text-gray-400">• {article.created}</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-black/20 p-4 rounded-lg mb-4">
                            <div className="text-sm text-gray-200 whitespace-pre-line mb-3">{article.solution}</div>
                            <div className="flex gap-4 text-xs text-gray-300">
                              <span>⏱️ {article.estimatedTime}</span>
                              <span>✅ {article.successRate}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {article.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <Button
                            size="sm"
                            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                            onClick={() => addMessage(`📚 Applied KBA: ${article.title}`, "success")}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Apply This Solution
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Game-like Achievement System */}
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-yellow-600 via-orange-600 to-red-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-yellow-800" />
                    </div>
                    🏆 Achievement Vault
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="grid grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                          achievement.earned
                            ? "bg-gradient-to-br from-green-500/30 to-emerald-500/30 border-green-400 shadow-lg shadow-green-500/20"
                            : "bg-black/30 border-gray-600 opacity-60"
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-2">{achievement.icon}</div>
                          <h4 className="font-bold text-sm mb-1">{achievement.name}</h4>
                          <p className="text-xs opacity-90">{achievement.description}</p>
                          {achievement.earned && (
                            <div className="mt-2">
                              <Badge className="bg-green-500 text-white text-xs">✅ UNLOCKED</Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Badge Showcase */}
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-10 h-10 bg-purple-400 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-purple-800" />
                    </div>
                    🎖️ Badge Collection
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="grid grid-cols-1 gap-4">
                    {currentProfile.badges.map((badge, index) => (
                      <div
                        key={index}
                        className="bg-white/20 p-4 rounded-xl text-center border border-white/30 hover:bg-white/30 transition-all duration-300"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
                          <Star className="w-8 h-8 text-yellow-800" />
                        </div>
                        <p className="font-bold text-lg">{badge}</p>
                        <Badge className="mt-2 bg-yellow-500 text-yellow-900">EARNED</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8" />
                  </div>
                  🎮 Player Profile - Level {currentProfile.level}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center border-4 border-white/30">
                      <User className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{currentProfile.name}</h3>
                      <p className="text-lg opacity-90">{currentProfile.type}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          className={`bg-gradient-to-r ${currentProfile.color} text-white border-0 text-sm px-3 py-1`}
                        >
                          🏅 Level {currentProfile.level} Engineer
                        </Badge>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(engineerStatus)}`}></div>
                        <span className="text-sm">{engineerStatus}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-lg mb-3">
                        <span className="font-semibold">⚡ Experience Points</span>
                        <span className="font-bold">
                          {currentProfile.xp} / {currentProfile.nextLevelXp} XP
                        </span>
                      </div>
                      <Progress
                        value={(currentProfile.xp / currentProfile.nextLevelXp) * 100}
                        className="h-4 bg-white/20"
                      />
                      <p className="text-sm mt-2 opacity-80">
                        {currentProfile.nextLevelXp - currentProfile.xp} XP needed for next level
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div className="bg-white/20 p-6 rounded-xl text-center border border-white/30">
                        <div className="text-3xl font-bold text-yellow-300">{currentKarma}</div>
                        <div className="text-sm opacity-90 mt-1">🌟 Karma Points</div>
                      </div>
                      <div className="bg-white/20 p-6 rounded-xl text-center border border-white/30">
                        <div className="text-3xl font-bold text-green-300">{currentProfile.badges.length}</div>
                        <div className="text-sm opacity-90 mt-1">🏆 Badges Earned</div>
                      </div>
                      <div className="bg-white/20 p-6 rounded-xl text-center border border-white/30">
                        <div className="text-3xl font-bold text-blue-300">#{Math.floor(Math.random() * 10) + 1}</div>
                        <div className="text-sm opacity-90 mt-1">📊 Global Rank</div>
                      </div>
                    </div>

                    <div className="bg-white/10 p-4 rounded-xl">
                      <h4 className="font-semibold mb-2">🌍 Timezone & Availability</h4>
                      <div className="text-sm space-y-1">
                        <div>Timezone: {currentProfile.timezoneLabel}</div>
                        <div>Local Time: {getLocalTime(currentProfile.timezone)}</div>
                        <div>
                          Status: <span className="capitalize">{engineerStatus}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Entering Swarm Animation */}
      {showEnteringSwarm && (
        <Dialog open={showEnteringSwarm} onOpenChange={() => {}}>
          <DialogContent className="bg-gradient-to-br from-blue-900 to-purple-900 text-white border-0 max-w-md">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">🚀 Entering Swarm Room...</h3>
              <p className="text-blue-200">Initializing collaborative environment</p>
              <div className="mt-4">
                <div className="w-8 h-8 border-4 border-blue-300/30 border-t-blue-300 rounded-full animate-spin mx-auto"></div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Call for Backup Animation */}
      {showBackupCall && (
        <Dialog open={showBackupCall} onOpenChange={() => {}}>
          <DialogContent className="bg-gradient-to-br from-red-900 to-orange-900 text-white border-0 max-w-md">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">🆘 Calling for Backup...</h3>
              <p className="text-red-200">Notifying available backup engineers</p>
              <div className="mt-4">
                <div className="w-8 h-8 border-4 border-red-300/30 border-t-red-300 rounded-full animate-spin mx-auto"></div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Enhanced Swarm Room */}
      {showSwarmRoom && (
        <Dialog open={showSwarmRoom} onOpenChange={() => {}}>
          <DialogContent className="max-w-6xl h-[90vh] bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white border-0">
            {swarmEnded ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">🔗 Swarm Session Completed</h3>
                  <p className="text-gray-300 mb-4">Thank you for your contribution to resolving this issue!</p>
                  <Button
                    onClick={() => {
                      setSwarmEnded(false)
                      setShowSwarmRoom(false)
                      setShowKBACreation(true)
                    }}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    Continue to KBA Creation
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Zap className="w-5 h-5 text-yellow-800" />
                    </div>
                    🌊 Swarm Room - {currentSwarm?.title}
                  </DialogTitle>
                  <DialogDescription className="text-gray-300 text-lg">
                    Collaborative problem-solving environment • Real-time collaboration active
                    {backupCalled && <span className="text-yellow-300 ml-2">• Backup engineer joining...</span>}
                  </DialogDescription>
                </DialogHeader>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
                  {/* Chat Section */}
                  <div className="bg-black/40 rounded-xl p-6 border border-white/10 flex flex-col">
                    <h3 className="font-bold mb-4 flex items-center gap-2 text-lg">
                      <MessageSquare className="w-5 h-5 text-blue-400" />💬 Live Collaboration Chat
                    </h3>
                    <div className="flex-1 overflow-y-auto mb-4 space-y-3 text-sm max-h-64">
                      {chatMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-3 rounded-lg border ${
                            msg.type === "engineer"
                              ? "bg-blue-600/30 border-blue-500/30"
                              : msg.type === "backup"
                                ? "bg-orange-600/30 border-orange-500/30"
                                : msg.type === "system"
                                  ? "bg-purple-600/30 border-purple-500/30"
                                  : "bg-yellow-600/30 border-yellow-500/30"
                          }`}
                        >
                          <div
                            className={`font-semibold ${
                              msg.type === "engineer"
                                ? "text-blue-300"
                                : msg.type === "backup"
                                  ? "text-orange-300"
                                  : msg.type === "system"
                                    ? "text-purple-300"
                                    : "text-yellow-300"
                            }`}
                          >
                            {msg.user}
                          </div>
                          <div>{msg.message}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Type your message..."
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            sendChatMessage()
                          }
                        }}
                        className="flex-1 bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                      <Button size="sm" onClick={sendChatMessage} className="bg-blue-600 hover:bg-blue-700">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Logs Section */}
                  <div className="bg-black/40 rounded-xl p-6 border border-white/10 flex flex-col">
                    <h3 className="font-bold mb-4 flex items-center gap-2 text-lg">
                      <FileText className="w-5 h-5 text-green-400" />📋 System Logs & Diagnostics
                    </h3>
                    <div className="flex-1 overflow-y-auto bg-black/50 p-4 rounded-lg border border-gray-700 mb-4 max-h-64">
                      <div className="space-y-2 text-xs font-mono">
                        <div className="text-cyan-400">[2024-01-17 14:30:15] Connection established to SAP HANA</div>
                        <div className="text-red-400">[2024-01-17 14:30:22] ERROR: Connection timeout after 30s</div>
                        <div className="text-yellow-400">[2024-01-17 14:30:45] Retry attempt 1 initiated</div>
                        <div className="text-red-400">[2024-01-17 14:31:02] ERROR: Retry attempt 1 failed</div>
                        <div className="text-yellow-400">[2024-01-17 14:31:15] Retry attempt 2 initiated</div>
                        <div className="text-green-400">[2024-01-17 14:31:32] Timeout configuration updated to 60s</div>
                        <div className="text-green-400">
                          [2024-01-17 14:31:45] Connection successful with new timeout
                        </div>
                        <div className="text-blue-400">[2024-01-17 14:32:01] Testing connection stability...</div>
                        {backupCalled && (
                          <div className="text-orange-400">
                            [2024-01-17 14:32:15] Backup engineer Lisa joined session
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full bg-gray-700 hover:bg-gray-600"
                      onClick={() => {
                        const logContent = `[2024-01-17 14:30:15] Connection established to SAP HANA
[2024-01-17 14:30:22] ERROR: Connection timeout after 30s
[2024-01-17 14:30:45] Retry attempt 1 initiated
[2024-01-17 14:31:02] ERROR: Retry attempt 1 failed
[2024-01-17 14:31:15] Retry attempt 2 initiated
[2024-01-17 14:31:32] Timeout configuration updated to 60s
[2024-01-17 14:31:45] Connection successful with new timeout
[2024-01-17 14:32:01] Testing connection stability...
${backupCalled ? "[2024-01-17 14:32:15] Backup engineer Lisa joined session" : ""}`

                        const blob = new Blob([logContent], { type: "text/plain" })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement("a")
                        a.href = url
                        a.download = `swarm-logs-${currentSwarm?.id || "current"}-${new Date().toISOString().split("T")[0]}.txt`
                        document.body.appendChild(a)
                        a.click()
                        document.body.removeChild(a)
                        URL.revokeObjectURL(url)
                        addMessage("📥 Logs downloaded successfully!", "success")
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Full Diagnostic Report
                    </Button>
                  </div>
                </div>

                {/* Action Buttons - ALWAYS VISIBLE AT BOTTOM */}
                <div className="flex gap-3 pt-6 border-t border-white/10 mt-6">
                  <Button
                    onClick={handleCallBackup}
                    disabled={backupCalled}
                    className={`${
                      backupCalled
                        ? "bg-green-600/20 border-green-500 text-green-300"
                        : "bg-yellow-600/20 border-yellow-500 text-yellow-300 hover:bg-yellow-600/30"
                    } border`}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {backupCalled ? "✅ Backup Called" : "🆘 Call for Backup"}
                  </Button>

                  <Button
                    onClick={handleEndSwarm}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />✅ Close Swarm & Create KBA
                  </Button>

                  <Button
                    onClick={() => setShowIncidentCapsule(true)}
                    className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                  >
                    <Package className="w-4 h-4 mr-2" />📦 Package Incident Capsule
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}

      {/* Enhanced KBA Creation Modal */}
      {showKBACreation && (
        <Dialog open={showKBACreation} onOpenChange={setShowKBACreation}>
          <DialogContent className="max-w-2xl bg-gradient-to-br from-green-900 to-emerald-900 text-white border-0">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-xl">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                📚 Create Knowledge Base Article
              </DialogTitle>
              <DialogDescription className="text-green-200">
                Document this solution for future engineers and customers
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="p-4 bg-green-500/20 border border-green-400/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="font-bold text-green-300">🎉 Issue Resolved Successfully!</span>
                </div>
                <p className="text-green-200">
                  Great work! The customer's issue has been resolved. Creating a KBA article will help future engineers
                  solve similar problems faster and earn you karma points.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">📝 Solution Summary</label>
                  <Textarea
                    placeholder="Describe the solution, steps taken, and key learnings..."
                    value={kbaContent}
                    onChange={(e) => setKbaContent(e.target.value)}
                    className="w-full min-h-32 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg p-3"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <div className="font-semibold mb-1">📊 Impact</div>
                    <div className="text-gray-300">High - Critical system functionality</div>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg">
                    <div className="font-semibold mb-1">⏱️ Resolution Time</div>
                    <div className="text-gray-300">45 minutes</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleCreateKBA}
                  disabled={!kbaContent.trim()}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-bold"
                >
                  <FileText className="w-4 h-4 mr-2" />🚀 Create KBA Article
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowKBACreation(false)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Skip for Now
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Enhanced Incident Capsule Modal */}
      {showIncidentCapsule && (
        <Dialog open={showIncidentCapsule} onOpenChange={setShowIncidentCapsule}>
          <DialogContent className="max-w-2xl bg-gradient-to-br from-orange-900 to-red-900 text-white border-0">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-xl">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                📦 Package Incident Capsule
              </DialogTitle>
              <DialogDescription className="text-orange-200">
                Create a comprehensive escalation package for another domain expert
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="p-4 bg-orange-500/20 border border-orange-400/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-orange-400" />
                  <span className="font-bold text-orange-300">⚠️ Escalation Required</span>
                </div>
                <p className="text-orange-200">
                  This will package all progress, logs, and context for another expert to continue where you left off.
                  The capsule will be automatically routed to available domain experts.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-lg">📋 Capsule Contents:</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                    <span>🗂️ System Logs</span>
                    <Badge className="bg-green-500 text-white">✓ Included</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                    <span>❌ Error Messages</span>
                    <Badge className="bg-green-500 text-white">✓ Included</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                    <span>💬 Swarm Transcript</span>
                    <Badge className="bg-green-500 text-white">✓ Included</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                    <span>🔄 Recent Commits</span>
                    <Badge className="bg-green-500 text-white">✓ Included</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                    <span>🛠️ Attempted Solutions</span>
                    <Badge className="bg-green-500 text-white">✓ Included</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                    <span>📊 Performance Metrics</span>
                    <Badge className="bg-green-500 text-white">✓ Included</Badge>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4">
                <div className="font-semibold mb-2">🎯 Smart Routing</div>
                <p className="text-sm text-blue-200">
                  This capsule will be automatically routed to available experts in the same domain with similar
                  expertise. They'll receive a notification and can accept the escalated issue.
                </p>
              </div>

              <Button
                onClick={handleCreateIncidentCapsule}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 font-bold text-lg py-3"
              >
                <Package className="w-5 h-5 mr-2" />🚀 Create & Route Incident Capsule
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

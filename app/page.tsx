"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Zap, Shield, Triangle, Sparkles, Star } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState("")
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const router = useRouter()

  const handleLogin = () => {
    if (selectedRole && credentials.username && credentials.password) {
      switch (selectedRole) {
        case "customer":
          router.push("/customer-dashboard")
          break
        case "engineer":
          router.push("/engineer-dashboard")
          break
        case "manager":
          router.push("/manager-dashboard")
          break
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 text-white/20 animate-pulse">
          <Triangle size={80} className="rotate-12" />
        </div>
        <div className="absolute bottom-20 right-20 text-white/15 animate-bounce">
          <Triangle size={100} className="rotate-180" />
        </div>
        <div className="absolute top-1/3 right-10 text-white/25 animate-spin-slow">
          <Star size={60} className="rotate-45" />
        </div>
        <div className="absolute bottom-1/3 left-20 text-white/20">
          <Sparkles size={70} className="animate-pulse" />
        </div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-cyan-300/40 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-purple-300/50 rounded-full animate-bounce"></div>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-lg relative z-10">
        <CardHeader className="text-center pb-2">
          {/* SAP Logo */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="text-white font-bold text-2xl">SAP</div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            SwarmBridge
          </CardTitle>
          <CardDescription className="text-gray-600 font-medium">
            SAP's Intelligent Issue Resolution Platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-semibold text-gray-700">
              Select Your Role
            </Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="h-14 border-2 border-gray-200 focus:border-blue-500 bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                <SelectValue placeholder="Choose your access level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer" className="py-4 hover:bg-green-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Customer / User</div>
                      <div className="text-xs text-gray-500">Submit and track issues</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="engineer" className="py-4 hover:bg-blue-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Engineer / Expert</div>
                      <div className="text-xs text-gray-500">Resolve technical issues</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="manager" className="py-4 hover:bg-purple-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Manager</div>
                      <div className="text-xs text-gray-500">Oversee team performance</div>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-semibold text-gray-700">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="h-12 border-2 border-gray-200 focus:border-blue-500 bg-gradient-to-r from-gray-50 to-blue-50"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="h-12 border-2 border-gray-200 focus:border-blue-500 bg-gradient-to-r from-gray-50 to-blue-50"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>

          <Button
            onClick={handleLogin}
            className="w-full h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white font-bold rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
            disabled={!selectedRole || !credentials.username || !credentials.password}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Access SwarmBridge
          </Button>

          <div className="text-center text-xs text-gray-500 mt-4 font-medium">
            Powered by Team SAPiens • Innothon 2025
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

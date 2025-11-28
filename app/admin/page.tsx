"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, LogOut, Bell } from "lucide-react"
import { useTheme } from "@/app/providers"
import { useRouter } from "next/navigation"
import PendingProfiles from "@/components/admin/pending-profiles"
import Link from "next/link"

export default function AdminPage() {
  const { isDark, setIsDark } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [pendingCount, setPendingCount] = useState(0)
  const [showNotification, setShowNotification] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userJson = localStorage.getItem("user")
    if (!userJson) {
      router.push("/signin")
      return
    }

    const user = JSON.parse(userJson)
    if (user.role !== "admin") {
      alert("You are not authorized to access this page")
      router.push("/dashboard")
      return
    }

    setIsAuthorized(true)
    setMounted(true)

    fetchPendingCount()
  }, [router])

  useEffect(() => {
    if (!isAuthorized) return

    const interval = setInterval(() => {
      fetchPendingCount()
    }, 3000) // Poll every 3 seconds

    return () => clearInterval(interval)
  }, [isAuthorized])

  const fetchPendingCount = async () => {
    try {
      const response = await fetch("/api/profiles/pending")
      const data = await response.json()

      if (data.success) {
        const newCount = data.profiles.length
        if (newCount > pendingCount && pendingCount > 0) {
          setShowNotification(true)
          setTimeout(() => setShowNotification(false), 5000)
        }
        setPendingCount(newCount)
      }
    } catch (err) {
      console.error("[v0] Failed to fetch pending count:", err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!mounted || !isAuthorized) {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <div className="min-h-screen bg-background">
      {showNotification && (
        <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white py-3 px-4 flex items-center gap-2 z-50">
          <Bell className="w-5 h-5" />
          <span className="font-semibold">New student profile submitted for approval!</span>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">CC</span>
                </div>
                <span className="font-bold text-lg text-foreground hidden sm:inline">Campus Connect</span>
              </Link>
              <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full font-semibold">Admin</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
                {pendingCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {pendingCount > 9 ? "9+" : pendingCount}
                  </span>
                )}
              </div>

              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5 text-primary" />}
              </button>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Review and approve student profile applications</p>
            </div>
            {pendingCount > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 rounded-lg px-4 py-2">
                <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-300">
                  {pendingCount} pending approval{pendingCount !== 1 ? "s" : ""}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Pending Profiles Section */}
        <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">Pending Approvals</h2>
          <PendingProfiles key={pendingCount} />
        </div>
      </div>
    </div>
  )
}

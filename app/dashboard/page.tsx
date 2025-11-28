"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/dashboard/sidebar"
import DashboardHeader from "@/components/dashboard/header"
import QuickActions from "@/components/dashboard/quick-actions"
import AnnouncementsFeed from "@/components/dashboard/announcements-feed"
import UpcomingEvents from "@/components/dashboard/upcoming-events"
import MyBookings from "@/components/dashboard/my-bookings"
import Recommendations from "@/components/dashboard/recommendations"

interface User {
  id: string
  email: string
  fullName: string
  status: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userJson = localStorage.getItem("user")
    if (!userJson) {
      router.push("/signin")
      return
    }

    const userData = JSON.parse(userJson)
    if (userData.status !== "approved") {
      alert("Your profile has not been approved yet. Please contact admin.")
      router.push("/signin")
      return
    }

    setUser(userData)
    setLoading(false)
  }, [router])

  if (loading) {
    return <div className="min-h-screen bg-background" />
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar userRole="student" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader userName={user.fullName} notificationCount={2} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-4 md:p-8">
            <div className="space-y-8 md:pt-4">
              {/* Welcome Banner */}
              <div className="hidden md:block bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back, {user.fullName}! 👋</h1>
                <p className="text-muted-foreground">
                  Your profile is approved. Start exploring campus resources and connecting with peers.
                </p>
              </div>

              {/* Quick Actions */}
              <QuickActions />

              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Announcements */}
                <div className="lg:col-span-2 space-y-8">
                  <AnnouncementsFeed />
                  <UpcomingEvents />
                </div>

                {/* Right Column - Sidebar Info */}
                <div className="space-y-8">
                  <MyBookings />
                  <Recommendations />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

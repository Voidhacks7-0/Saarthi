"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/dashboard/sidebar"
import DashboardHeader from "@/components/dashboard/header"
import FacultyQuickActions from "@/components/faculty/faculty-quick-actions"
import FacultyAnnouncements from "@/components/faculty/faculty-announcements"
import FacultyEvents from "@/components/faculty/faculty-events"
import FacultyCourses from "@/components/faculty/faculty-courses"
import FacultyGroups from "@/components/faculty/faculty-groups"
import FacultyBookings from "@/components/faculty/faculty-bookings"
import FacultyStats from "@/components/faculty/faculty-stats"

interface FacultyUser {
  id: string
  email: string
  fullName: string
  status: string
  role: "faculty"
  department: string
  designation: string
  courses: string[]
  isLabInCharge?: boolean
}

export default function FacultyDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<FacultyUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userJson = localStorage.getItem("user")
    if (!userJson) {
      router.push("/signin")
      return
    }

    const userData = JSON.parse(userJson)
    if (userData.role !== "faculty") {
      alert("Access denied. This page is for faculty only.")
      router.push("/dashboard")
      return
    }
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
      <Sidebar userRole="faculty" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader userName={user.fullName} notificationCount={2} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-8">
            <div className="space-y-8 md:pt-4">
              {/* Welcome Banner */}
              <div className="hidden md:block bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back, {user.fullName}! 👋</h1>
                <div className="flex flex-col md:flex-row md:items-center gap-4 text-muted-foreground">
                  <span>
                    {user.department} • {user.designation}
                  </span>
                  <span className="hidden md:inline">•</span>
                  <span>{user.courses.length} Courses</span>
                </div>
              </div>

              {/* Quick Stats */}
              <FacultyStats
                totalAnnouncements={3}
                totalEvents={2}
                coursesManaged={user.courses.length}
                pendingBookings={user.isLabInCharge ? 2 : 0}
              />

              {/* Quick Actions */}
              <FacultyQuickActions />

              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Announcements & Events */}
                <div className="lg:col-span-2 space-y-8">
                  <FacultyAnnouncements />
                  <FacultyEvents />
                  <FacultyGroups />
                </div>

                {/* Right Column - Courses & Bookings */}
                <div className="space-y-8">
                  <FacultyCourses courses={user.courses} />
                  {user.isLabInCharge && <FacultyBookings isLabInCharge={user.isLabInCharge} />}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

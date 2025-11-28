"use client"

import { Bell, Calendar, Users, BookOpen } from "lucide-react"

interface StatsProps {
  totalAnnouncements: number
  totalEvents: number
  coursesManaged: number
  pendingBookings: number
}

export default function FacultyStats({ totalAnnouncements, totalEvents, coursesManaged, pendingBookings }: StatsProps) {
  const stats = [
    {
      label: "Total Announcements",
      value: totalAnnouncements,
      icon: Bell,
      color: "from-blue-500/10 to-blue-600/10",
      iconColor: "text-blue-600",
    },
    {
      label: "Events Created",
      value: totalEvents,
      icon: Calendar,
      color: "from-purple-500/10 to-purple-600/10",
      iconColor: "text-purple-600",
    },
    {
      label: "Courses Managed",
      value: coursesManaged,
      icon: Users,
      color: "from-emerald-500/10 to-emerald-600/10",
      iconColor: "text-emerald-600",
    },
    {
      label: "Pending Bookings",
      value: pendingBookings,
      icon: BookOpen,
      color: "from-orange-500/10 to-orange-600/10",
      iconColor: "text-orange-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className={`bg-gradient-to-br ${stat.color} border border-border rounded-lg p-4`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              <Icon className={`w-6 h-6 ${stat.iconColor} opacity-50`} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

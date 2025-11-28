"use client"

import { useState } from "react"
import { BookOpen, Clock, MapPin, XCircle } from "lucide-react"

interface Booking {
  id: string
  resourceName: string
  type: string
  date: string
  time: string
  location: string
  status: "confirmed" | "pending" | "rejected"
}

export default function MyBookings() {
  const [bookings] = useState<Booking[]>([
    {
      id: "1",
      resourceName: "Study Room 101",
      type: "Study Room",
      date: "Dec 15",
      time: "2:00 PM - 4:00 PM",
      location: "Building A",
      status: "confirmed",
    },
    {
      id: "2",
      resourceName: "GPU Workstation #5",
      type: "Lab Equipment",
      date: "Dec 16",
      time: "10:00 AM - 12:00 PM",
      location: "AI Lab",
      status: "pending",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
      case "rejected":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">My Bookings</h2>
        <a href="/dashboard/my-bookings" className="text-sm text-primary hover:text-primary/80">
          View All →
        </a>
      </div>

      <div className="space-y-3">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-foreground">{booking.resourceName}</h3>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded capitalize ${getStatusColor(booking.status)}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {booking.date} • {booking.time}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {booking.location}
                  </div>
                </div>
              </div>

              {booking.status === "confirmed" && (
                <button className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                  <XCircle className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

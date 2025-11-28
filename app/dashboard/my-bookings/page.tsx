"use client"

import { useState } from "react"
import { Bookmark, Download, X, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Sidebar from "@/components/dashboard/sidebar"

interface Booking {
  id: string
  resource: string
  date: string
  time: string
  status: "approved" | "pending" | "rejected"
  qrCode?: string
}

export default function MyBookingsPage() {
  const [bookings] = useState<Booking[]>([
    {
      id: "1",
      resource: "Seminar Hall",
      date: "2024-01-15",
      time: "10:00 AM - 12:00 PM",
      status: "approved",
      qrCode: "QR123456",
    },
    {
      id: "2",
      resource: "Lab 301",
      date: "2024-01-18",
      time: "2:00 PM - 4:00 PM",
      status: "pending",
    },
    {
      id: "3",
      resource: "Library Study Room",
      date: "2024-01-20",
      time: "3:00 PM - 5:00 PM",
      status: "approved",
      qrCode: "QR789012",
    },
  ])

  const [filter, setFilter] = useState("upcoming")

  const statusColors = {
    approved: "bg-green-500/20 text-green-600 border-green-500/30",
    pending: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30",
    rejected: "bg-red-500/20 text-red-600 border-red-500/30",
  }

  const statusIcons = {
    approved: <CheckCircle className="w-4 h-4" />,
    pending: <AlertCircle className="w-4 h-4" />,
    rejected: <X className="w-4 h-4" />,
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Bookmark className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">My Bookings</h1>
            </div>
            <p className="text-muted-foreground">View and manage your resource bookings</p>
          </div>

          {/* Filter */}
          <div className="flex gap-2 mb-6">
            {["upcoming", "past", "all"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === f ? "bg-primary text-white" : "bg-card border border-border text-foreground hover:bg-muted"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Bookings Table */}
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-card border border-border rounded-lg p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2">{booking.resource}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          {booking.date} • {booking.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${statusColors[booking.status]}`}
                        >
                          {statusIcons[booking.status]}
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {booking.status === "approved" && booking.qrCode && (
                      <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download Pass
                      </button>
                    )}
                    {booking.status === "pending" && (
                      <button className="px-4 py-2 bg-destructive/10 text-destructive rounded-lg font-medium hover:bg-destructive/20 transition-colors">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

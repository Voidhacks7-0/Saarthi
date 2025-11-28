"use client"

import { useState } from "react"
import { CheckCircle, XCircle, Clock, User, BookOpen } from "lucide-react"

interface BookingRequest {
  id: string
  studentName: string
  resource: string
  dateTime: string
  purpose: string
  status: "pending" | "approved" | "rejected"
}

interface FacultyBookingsProps {
  isLabInCharge: boolean
}

export default function FacultyBookings({ isLabInCharge }: FacultyBookingsProps) {
  const [requests] = useState<BookingRequest[]>([
    {
      id: "1",
      studentName: "John Doe",
      resource: "GPU Workstation #5",
      dateTime: "Dec 20, 2:00 PM",
      purpose: "ML Project Training",
      status: "pending",
    },
    {
      id: "2",
      studentName: "Jane Smith",
      resource: "Lab Room 3",
      dateTime: "Dec 21, 10:00 AM",
      purpose: "IoT Experiment Setup",
      status: "pending",
    },
  ])

  if (!isLabInCharge) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Booking Approvals</h2>
        <span className="text-sm bg-accent/10 text-accent px-3 py-1 rounded-full">
          {requests.filter((r) => r.status === "pending").length} Pending
        </span>
      </div>

      <div className="space-y-3">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div
              key={request.id}
              className={`bg-card border rounded-lg p-4 ${
                request.status === "pending" ? "border-accent/50" : "border-border"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">{request.studentName}</h3>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      {request.resource}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {request.dateTime}
                    </div>
                    <p className="text-xs mt-1">Purpose: {request.purpose}</p>
                  </div>
                </div>
              </div>

              {request.status === "pending" && (
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-lg text-sm font-medium transition-colors">
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-lg text-sm font-medium transition-colors">
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center py-4">No pending booking requests</p>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Clock, Edit2, Trash2 } from "lucide-react"

interface Announcement {
  id: string
  title: string
  description: string
  audience: string
  timestamp: string
}

export default function FacultyAnnouncements() {
  const [announcements] = useState<Announcement[]>([
    {
      id: "1",
      title: "Assignment 3 Deadline Extended",
      description: "The deadline for Assignment 3 has been extended to Dec 20.",
      audience: "CS101 - Section A",
      timestamp: "2h ago",
    },
    {
      id: "2",
      title: "Lab Session Cancelled",
      description: "Lab session on Dec 15 is cancelled due to equipment maintenance.",
      audience: "CS102 - Lab Group",
      timestamp: "5h ago",
    },
    {
      id: "3",
      title: "Midterm Exam Schedule",
      description: "Midterm exams will be conducted from Dec 25 to Jan 5.",
      audience: "All Classes",
      timestamp: "1d ago",
    },
  ])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">My Announcements</h2>
        <a href="/dashboard/faculty/announcements" className="text-sm text-primary hover:text-primary/80">
          View All →
        </a>
      </div>

      <div className="space-y-3">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{announcement.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{announcement.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded">{announcement.audience}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {announcement.timestamp}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4 text-muted-foreground hover:text-primary" />
                </button>
                <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

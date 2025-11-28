"use client"

import { useState } from "react"
import { User, Clock, Bookmark } from "lucide-react"

interface Announcement {
  id: string
  title: string
  description: string
  postedBy: string
  timestamp: string
  tag: string
  content?: string
}

export default function AnnouncementsFeed() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      title: "New Lab Equipment Available",
      description: "The AI/ML lab has received new GPU workstations. Book your slot now!",
      postedBy: "Lab Admin",
      timestamp: "2h ago",
      tag: "Lab",
      content:
        "We are excited to announce that the AI/ML lab has been upgraded with the latest NVIDIA RTX 4090 GPUs...",
    },
    {
      id: "2",
      title: "Hackathon 2025 Registration Open",
      description: "Join us for the biggest hackathon of the semester. Teams of 3-4 students.",
      postedBy: "Event Coordinator",
      timestamp: "4h ago",
      tag: "Event",
      content: "Registration for Campus Hackathon 2025 is now open! Form teams and compete for amazing prizes...",
    },
    {
      id: "3",
      title: "Library Extended Hours",
      description: "Main library will be open until midnight during exam season.",
      postedBy: "Library",
      timestamp: "1d ago",
      tag: "Notice",
      content: "To support our students during exam season, the main library will extend its hours...",
    },
  ])

  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set())

  const toggleBookmark = (id: string) => {
    const newBookmarked = new Set(bookmarked)
    if (newBookmarked.has(id)) {
      newBookmarked.delete(id)
    } else {
      newBookmarked.add(id)
    }
    setBookmarked(newBookmarked)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Announcements</h2>
        <a href="/dashboard/announcements" className="text-sm text-primary hover:text-primary/80">
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
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                    {announcement.tag}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-1 text-pretty">{announcement.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{announcement.description}</p>

                {expandedId === announcement.id && (
                  <div className="mt-3 p-3 bg-muted rounded-lg text-sm text-foreground border-l-2 border-primary">
                    {announcement.content}
                  </div>
                )}

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {announcement.postedBy}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {announcement.timestamp}
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleBookmark(announcement.id)}
                className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
              >
                <Bookmark
                  className={`w-5 h-5 ${
                    bookmarked.has(announcement.id) ? "fill-primary text-primary" : "text-muted-foreground"
                  }`}
                />
              </button>
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setExpandedId(expandedId === announcement.id ? null : announcement.id)}
                className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {expandedId === announcement.id ? "Show less" : "Read more"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

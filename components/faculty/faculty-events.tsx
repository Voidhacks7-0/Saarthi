"use client"

import { useState } from "react"
import { Calendar, MapPin, Users, Edit2, Trash2 } from "lucide-react"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  rsvpCount: number
}

export default function FacultyEvents() {
  const [events] = useState<Event[]>([
    {
      id: "1",
      title: "Guest Lecture: AI in Industry",
      date: "Dec 18",
      time: "3:00 PM",
      location: "Auditorium A",
      rsvpCount: 45,
    },
    {
      id: "2",
      title: "Lab Session",
      date: "Dec 20",
      time: "2:00 PM",
      location: "Lab Room 3",
      rsvpCount: 32,
    },
  ])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Upcoming Events</h2>
        <a href="/dashboard/faculty/events" className="text-sm text-primary hover:text-primary/80">
          View All →
        </a>
      </div>

      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">{event.title}</h3>
                <div className="space-y-1 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    {event.date} at {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    {event.rsvpCount} RSVPs
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

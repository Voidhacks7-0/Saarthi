"use client"

import { useState } from "react"

import { Calendar, MapPin, Bell } from "lucide-react"

interface Event {
  id: string
  name: string
  date: string
  time: string
  location: string
}

export default function UpcomingEvents() {
  const [events] = useState<Event[]>([
    {
      id: "1",
      name: "AI/ML Webinar",
      date: "Dec 15",
      time: "2:00 PM",
      location: "Auditorium A",
    },
    {
      id: "2",
      name: "Career Fair 2025",
      date: "Dec 18",
      time: "10:00 AM",
      location: "Gym",
    },
    {
      id: "3",
      name: "End Sem Exam - CS101",
      date: "Dec 20",
      time: "9:00 AM",
      location: "Hall 3",
    },
  ])

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Upcoming Events</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {events.map((event) => (
          <div key={event.id} className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3 line-clamp-2">{event.name}</h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                {event.date} at {event.time}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                {event.location}
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors text-sm font-medium">
              <Bell className="w-4 h-4" />
              Remind Me
            </button>
          </div>
        ))}
      </div>

      <a
        href="/dashboard/calendar"
        className="text-sm text-primary hover:text-primary/80 font-medium transition-colors inline-block"
      >
        View Full Calendar →
      </a>
    </div>
  )
}

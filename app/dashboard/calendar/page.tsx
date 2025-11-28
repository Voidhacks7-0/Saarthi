"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Bell } from "lucide-react"
import Sidebar from "@/components/dashboard/sidebar"

interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  type: "event" | "class" | "booking" | "exam"
  location?: string
  description?: string
  reminder: boolean
}

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 0))
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [events] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "ML Workshop",
      date: "2024-01-12",
      time: "10:00 AM - 2:00 PM",
      type: "event",
      location: "Tech Building, Room 101",
      description: "Learn about machine learning basics",
      reminder: true,
    },
    {
      id: "2",
      title: "Library Booking",
      date: "2024-01-16",
      time: "2:00 PM - 4:00 PM",
      type: "booking",
      location: "Main Library, Study Room 5",
      reminder: false,
    },
    {
      id: "3",
      title: "Mid-Term Exam",
      date: "2024-01-20",
      time: "9:00 AM - 12:00 PM",
      type: "exam",
      location: "Exam Hall A",
      reminder: true,
    },
  ])

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  const days = Array.from({ length: daysInMonth(currentMonth) }, (_, i) => i + 1)
  const previousDays = Array.from({ length: firstDay }, (_, i) => -i - 1).reverse()

  const typeColors = {
    event: "bg-green-500/20 text-green-600 border-green-500/30",
    class: "bg-blue-500/20 text-blue-600 border-blue-500/30",
    booking: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30",
    exam: "bg-red-500/20 text-red-600 border-red-500/30",
  }

  const getEventsForDate = (day: number) => {
    const dateStr = `2024-01-${String(day).padStart(2, "0")}`
    return events.filter((e) => e.date === dateStr)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Calendar</h1>
            </div>
            <p className="text-muted-foreground">View your events, deadlines, bookings and exams</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-6">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">
                    {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Weekday Headers */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {previousDays.map((day) => (
                    <div key={`prev-${day}`} className="aspect-square p-2 bg-muted rounded-lg opacity-50" />
                  ))}
                  {days.map((day) => {
                    const dateStr = `2024-01-${String(day).padStart(2, "0")}`
                    const dayEvents = getEventsForDate(day)
                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDate(dateStr)}
                        className={`aspect-square p-2 rounded-lg border transition-all text-xs font-medium ${
                          selectedDate === dateStr
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary text-foreground"
                        }`}
                      >
                        <div className="mb-1">{day}</div>
                        <div className="space-y-0.5">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={`px-1 py-0.5 rounded text-white truncate ${
                                event.type === "event"
                                  ? "bg-green-500"
                                  : event.type === "class"
                                    ? "bg-blue-500"
                                    : event.type === "booking"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                              }`}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-muted-foreground text-xs">+{dayEvents.length - 2} more</div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Events List */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">{selectedDate ? "Events" : "Upcoming Events"}</h3>
              <div className="space-y-3">
                {(selectedDate
                  ? getEventsForDate(Number.parseInt(selectedDate.split("-")[2]))
                  : events.slice(0, 5)
                ).map((event) => (
                  <div key={event.id} className={`p-3 rounded-lg border ${typeColors[event.type]}`}>
                    <h4 className="font-semibold text-sm mb-2">{event.title}</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>{event.time}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {event.reminder && (
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-current opacity-70">
                          <Bell className="w-3 h-3" />
                          <span>Reminder set</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

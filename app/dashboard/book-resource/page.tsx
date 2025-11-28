"use client"

import type React from "react"

import { useState } from "react"
import { BookOpen, Plus, Users } from "lucide-react"
import Sidebar from "@/components/dashboard/sidebar"

interface Resource {
  id: string
  name: string
  capacity: number
  availableSlots: string[]
  requiresApproval: boolean
  description: string
}

export default function BookResourcePage() {
  const [resources] = useState<Resource[]>([
    {
      id: "1",
      name: "Seminar Hall",
      capacity: 60,
      availableSlots: ["10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"],
      requiresApproval: true,
      description: "Large hall for presentations and seminars",
    },
    {
      id: "2",
      name: "Lab 102",
      capacity: 30,
      availableSlots: ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "3:00 PM - 5:00 PM"],
      requiresApproval: true,
      description: "Computer lab with 30 workstations",
    },
    {
      id: "3",
      name: "Library Study Room",
      capacity: 8,
      availableSlots: ["10:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
      requiresApproval: false,
      description: "Private study room for group work",
    },
  ])

  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    resource: "",
    slot: "",
    date: "",
    purpose: "Study",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Booking submitted:", formData)
    setShowForm(false)
    setFormData({ resource: "", slot: "", date: "", purpose: "Study", notes: "" })
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Book Resource</h1>
            </div>
            <p className="text-muted-foreground">Reserve seminar halls, labs, study rooms and more</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Resources List */}
            <div className="lg:col-span-2 space-y-4">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-1">{resource.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>Capacity: {resource.capacity}</span>
                        </div>
                        <div className="px-2 py-1 bg-muted rounded text-foreground text-xs font-medium">
                          {resource.requiresApproval ? "Approval Required" : "Auto Approved"}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedResource(resource)
                        setShowForm(true)
                      }}
                      className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                      <Plus className="w-4 h-4 inline mr-2" />
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Booking Form */}
            {showForm && (
              <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-4">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {selectedResource ? `Book ${selectedResource.name}` : "Select Resource"}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Time Slot</label>
                    <select
                      required
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      value={formData.slot}
                      onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                    >
                      <option value="">Select a slot</option>
                      {selectedResource?.availableSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Purpose</label>
                    <select
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    >
                      <option value="Study">Study</option>
                      <option value="Presentation">Presentation</option>
                      <option value="Event">Event</option>
                      <option value="Project">Project</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Notes (Optional)</label>
                    <textarea
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Add any special requirements..."
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                      Confirm Booking
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Users, MessageSquare } from "lucide-react"

interface Group {
  id: string
  name: string
  courseName: string
  studentCount: number
  unreadMessages: number
}

export default function FacultyGroups() {
  const [groups] = useState<Group[]>([
    {
      id: "1",
      name: "CS101 - Discussion Board",
      courseName: "Data Structures",
      studentCount: 45,
      unreadMessages: 3,
    },
    {
      id: "2",
      name: "CS102 - Lab Group",
      courseName: "Web Development",
      studentCount: 32,
      unreadMessages: 1,
    },
  ])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Course Groups & Forums</h2>
        <a href="/dashboard/faculty/groups" className="text-sm text-primary hover:text-primary/80">
          View All →
        </a>
      </div>

      <div className="space-y-3">
        {groups.map((group) => (
          <div
            key={group.id}
            className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{group.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{group.courseName}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {group.studentCount} students
                  </div>
                  {group.unreadMessages > 0 && (
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {group.unreadMessages} new messages
                    </div>
                  )}
                </div>
              </div>
              <button className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
                Open Group
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

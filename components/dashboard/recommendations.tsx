"use client"

import { useState } from "react"

import { Zap } from "lucide-react"

interface Recommendation {
  id: string
  type: "group" | "teammate" | "event"
  title: string
  description: string
  matchScore: number
  action: string
}

export default function Recommendations() {
  const [recommendations] = useState<Recommendation[]>([
    {
      id: "1",
      type: "group",
      title: "AI/ML Study Group",
      description: "Perfect match based on your skills in Python and Machine Learning",
      matchScore: 5,
      action: "Join Group",
    },
    {
      id: "2",
      type: "teammate",
      title: "Suggested Teammates",
      description: "3 students with complementary skills for upcoming hackathon",
      matchScore: 4,
      action: "View Profiles",
    },
    {
      id: "3",
      type: "event",
      title: "Robotics Workshop",
      description: "Learn advanced robotics concepts matching your interests",
      matchScore: 4,
      action: "Register Now",
    },
  ])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold text-foreground">Recommended For You</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-4 hover:border-primary/50 transition-colors"
          >
            <h3 className="font-semibold text-foreground mb-1">{rec.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i < rec.matchScore ? "bg-primary" : "bg-muted"}`} />
                ))}
              </div>
              <button className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                {rec.action} →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

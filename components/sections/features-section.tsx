"use client"

import { Bell, Calendar, Zap, Users, BookOpen, MessageSquare } from "lucide-react"

const features = [
  {
    icon: Bell,
    title: "Announcements & Notifications",
    description: "Never miss important updates from faculty or administration.",
  },
  {
    icon: Calendar,
    title: "Events & Calendar",
    description: "Stay organized with a unified academic and campus event calendar.",
  },
  {
    icon: Zap,
    title: "Resource Booking",
    description: "Book study rooms, labs, and equipment seamlessly.",
  },
  {
    icon: Users,
    title: "Group Discussion",
    description: "Join forums, project groups, and hackathon matchmaking.",
  },
  {
    icon: BookOpen,
    title: "Library & Lab Tools",
    description: "Easy access to digital resources and lab equipment management.",
  },
  {
    icon: MessageSquare,
    title: "Faculty Interaction",
    description: "Clear communication channels for queries and academic support.",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Everything You Need for Campus Life</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive features designed to streamline your entire campus experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 hover:scale-105 cursor-pointer"
              >
                <div className="mb-4 p-3 w-fit bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

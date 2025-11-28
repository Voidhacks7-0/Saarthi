"use client"

import Link from "next/link"
import { BookOpen, Calendar, Users } from "lucide-react"

const quickActions = [
  {
    title: "Book Resource",
    description: "Reserve study room or equipment",
    icon: BookOpen,
    href: "/dashboard/book-resource",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "View Calendar",
    description: "Check events and deadlines",
    icon: Calendar,
    href: "/dashboard/calendar",
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Join Groups",
    description: "Connect with study groups",
    icon: Users,
    href: "/dashboard/groups",
    color: "from-emerald-500 to-emerald-600",
  },
]

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {quickActions.map((action) => {
        const Icon = action.icon
        return (
          <Link key={action.href} href={action.href}>
            <div className="group h-full bg-gradient-to-br from-card to-muted border border-border rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg">
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{action.title}</h3>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

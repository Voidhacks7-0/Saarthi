"use client"

import { UserPlus, Zap, Rocket } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Choose your role: Student / Faculty / Admin.",
  },
  {
    icon: Zap,
    title: "Get Connected",
    description: "Access announcements, events, bookings, and groups instantly.",
  },
  {
    icon: Rocket,
    title: "Collaborate & Grow",
    description: "Join discussions, book resources, and stay informed.",
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Getting Started is Easy</h2>
          <p className="text-lg text-muted-foreground">Three simple steps to unlock your campus potential</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {/* Step number */}
                <div className="absolute -top-6 left-0 right-0 flex justify-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                </div>

                {/* Card */}
                <div className="pt-8 p-6 rounded-xl bg-card border border-border text-center">
                  <div className="mb-4 p-3 w-fit mx-auto bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border"></div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

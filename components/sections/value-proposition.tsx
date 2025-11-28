"use client"

import { CheckCircle } from "lucide-react"

const benefits = [
  "One platform for your entire campus life",
  "Real-time updates and smart reminders",
  "Easy collaboration with classmates & faculty",
  "Mobile-friendly and beautifully designed",
  "Secure & role-based access",
]

export default function ValuePropositionSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Campus Connect?</h2>
              <p className="text-lg text-muted-foreground">
                Built specifically for the modern campus, with every feature designed to enhance your academic and
                social experience.
              </p>
            </div>

            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Illustration */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 border border-border flex items-center justify-center">
              <div className="relative w-full h-full max-w-sm">
                {/* Mock dashboard illustration */}
                <div className="absolute inset-4 bg-card rounded-lg shadow-xl border border-border overflow-hidden">
                  <div className="p-4 border-b border-border">
                    <div className="h-3 bg-muted rounded w-1/3 mb-2"></div>
                    <div className="h-2 bg-muted rounded w-1/2"></div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="h-12 bg-primary/20 rounded"></div>
                    <div className="h-12 bg-accent/20 rounded"></div>
                    <div className="h-12 bg-primary/20 rounded"></div>
                  </div>
                </div>

                {/* Floating card */}
                <div className="absolute -bottom-4 -right-4 w-32 h-20 bg-accent rounded-lg shadow-lg border border-border p-3 animate-float">
                  <p className="text-xs font-semibold text-accent-foreground">📱 Mobile Ready</p>
                  <p className="text-xs text-accent-foreground/80 mt-1">Works perfectly on all devices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

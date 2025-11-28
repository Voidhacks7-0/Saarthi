"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4 sm:px-6 lg:px-8">
      {/* Background gradient shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border animate-fadeIn">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-foreground">Welcome to Campus Connect</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-balance animate-slideInUp">
            Your Smart
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Campus Hub</span>
          </h1>
          <p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance animate-slideInUp"
            style={{ animationDelay: "0.1s" }}
          >
            A unified platform for announcements, events, bookings, groups, and collaboration — all in one place.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-slideInUp"
          style={{ animationDelay: "0.2s" }}
        >
          <Link
            href="/signup"
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95 flex items-center justify-center gap-2 group"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/signin"
            className="px-8 py-4 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-all active:scale-95"
          >
            Login to Your Account
          </Link>
        </div>

        {/* Social Proof */}
        <div className="pt-8 animate-slideInUp" style={{ animationDelay: "0.3s" }}>
          <p className="text-sm text-muted-foreground mb-4">Trusted by students and faculty at</p>
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-60 hover:opacity-100 transition-opacity">
            <div className="text-sm font-semibold text-foreground">Princeton University</div>
            <div className="w-1 h-1 bg-border rounded-full"></div>
            <div className="text-sm font-semibold text-foreground">MIT</div>
            <div className="w-1 h-1 bg-border rounded-full"></div>
            <div className="text-sm font-semibold text-foreground">Stanford</div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-accent/10 border-t border-b border-border">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Accent */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-foreground">Ready to get started?</span>
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">Start Your Campus Journey Today</h2>
          <p className="text-lg text-muted-foreground">Simple. Connected. Smart.</p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/signup"
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95 flex items-center justify-center gap-2 group"
          >
            Create Account
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/signin"
            className="px-8 py-4 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-all active:scale-95"
          >
            Login
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-sm text-muted-foreground">No credit card required. Free for all students and faculty.</p>
      </div>
    </section>
  )
}

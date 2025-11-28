"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/layout/navbar"
import HeroSection from "@/components/sections/hero-section"
import FeaturesSection from "@/components/sections/features-section"
import ValuePropositionSection from "@/components/sections/value-proposition"
import HowItWorksSection from "@/components/sections/how-it-works"
import TestimonialsSection from "@/components/sections/testimonials-section"
import CTASection from "@/components/sections/cta-section"
import Footer from "@/components/layout/footer"
import { useTheme } from "./providers"

export default function Page() {
  const { isDark, setIsDark } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ValuePropositionSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

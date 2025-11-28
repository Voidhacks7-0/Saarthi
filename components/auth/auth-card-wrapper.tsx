"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/app/providers"

interface AuthCardWrapperProps {
  children: ReactNode
  title: string
  subtitle: string
  switchText: string
  switchHref: string
  switchLinkText: string
}

export default function AuthCardWrapper({
  children,
  title,
  subtitle,
  switchText,
  switchHref,
  switchLinkText,
}: AuthCardWrapperProps) {
  const { isDark, setIsDark } = useTheme()

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5 text-primary" />}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">CC</span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">Campus Connect</span>
          </Link>

          {/* Card */}
          <div className="bg-card rounded-2xl border border-border p-8 sm:p-10 shadow-sm">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{title}</h1>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>

            {/* Form Content */}
            {children}

            {/* Switch */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              {switchText}{" "}
              <Link href={switchHref} className="text-primary font-semibold hover:text-primary/90 transition-colors">
                {switchLinkText}
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>Campus Connect - Your Smart Campus Hub</div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

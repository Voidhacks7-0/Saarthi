"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Moon, Sun, LogOut, Clock, CheckCircle2 } from "lucide-react"
import { useTheme } from "@/app/providers"

export default function PendingApprovalPage() {
  const { isDark, setIsDark } = useTheme()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [checkApprovalInterval, setCheckApprovalInterval] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Get the submitted profile info from localStorage
    const userJson = localStorage.getItem("pendingUser")
    if (!userJson) {
      router.push("/signup")
      return
    }

    const userData = JSON.parse(userJson)
    setUser(userData)
    setLoading(false)

    // Auto-check approval status every 5 seconds
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/profiles/check-status?email=${userData.email}`)
        const data = await response.json()

        if (data.status === "approved") {
          localStorage.removeItem("pendingUser")
          localStorage.setItem("user", JSON.stringify(data.profile))
          router.push("/dashboard")
        } else if (data.status === "rejected") {
          localStorage.removeItem("pendingUser")
          alert("Your profile has been rejected. Please contact admin for more information.")
          router.push("/")
        }
      } catch (err) {
        console.error("Error checking approval status:", err)
      }
    }, 5000)

    setCheckApprovalInterval(interval)

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("pendingUser")
    if (checkApprovalInterval) clearInterval(checkApprovalInterval)
    router.push("/")
  }

  if (loading) {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CC</span>
              </div>
              <span className="font-bold text-lg text-foreground hidden sm:inline">Campus Connect</span>
            </Link>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5 text-primary" />}
              </button>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid gap-6">
          {/* Pending Status Section */}
          <div className="bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/30 rounded-xl p-6 sm:p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center animate-pulse">
                <Clock className="w-8 h-8 text-accent" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-2">Profile Under Review</h1>
            <p className="text-muted-foreground mb-4">
              Your profile has been submitted successfully for admin approval. This typically takes 24-48 hours.
            </p>

            <div className="space-y-3 text-left bg-card border border-border rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">{user?.fullName}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">{user?.department}</p>
                  <p className="text-sm text-muted-foreground">{user?.year}</p>
                </div>
              </div>
            </div>

            <div className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-lg font-semibold mb-6">
              Status: Pending Approval ⏳
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              We will automatically refresh this page and redirect you to your dashboard once your profile is approved.
              You can also check back later by signing in.
            </p>

            <Link
              href="/"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Return to Home
            </Link>
          </div>

          {/* Info Box */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-3">What happens next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-accent font-bold">1.</span>
                <span>Admin will review your profile and submitted information</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">2.</span>
                <span>Once approved, you'll automatically be redirected to your dashboard</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">3.</span>
                <span>You can then start exploring all Campus Connect features</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">4.</span>
                <span>If rejected, you'll be notified with the reason</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

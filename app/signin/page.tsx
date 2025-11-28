"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import AuthCardWrapper from "@/components/auth/auth-card-wrapper"
import AuthFormInputs from "@/components/auth/auth-form-inputs"
import GoogleButton from "@/components/auth/google-button"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!email.trim()) {
        throw new Error("Email is required")
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters")
      }

      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Sign in failed")
      }

      // Store user info in localStorage (replace with secure session in production)
      localStorage.setItem("user", JSON.stringify(data.user))

      if (data.user.role === "admin") {
        router.push("/admin")
      } else if (data.user.role === "faculty") {
        router.push("/dashboard/faculty")
      } else {
        router.push("/dashboard")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      // TODO: Add Google OAuth integration
      console.log("[v0] Google sign in initiated")
    } catch (err) {
      setError("Google sign in failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCardWrapper
      title="Welcome Back"
      subtitle="Sign in to continue."
      switchText="Don't have an account?"
      switchHref="/signup"
      switchLinkText="Sign Up"
    >
      <form onSubmit={handleSignIn} className="space-y-6">
        <AuthFormInputs email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} />

        <div className="flex justify-end">
          <Link href="#" className="text-sm text-primary hover:text-primary/90 transition-colors font-semibold">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <GoogleButton onClick={handleGoogleSignIn} loading={loading} mode="signin" />
      </form>
    </AuthCardWrapper>
  )
}

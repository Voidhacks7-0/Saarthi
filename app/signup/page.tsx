"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AuthCardWrapper from "@/components/auth/auth-card-wrapper"
import AuthFormInputs from "@/components/auth/auth-form-inputs"
import RoleSelector from "@/components/auth/role-selector"
import GoogleButton from "@/components/auth/google-button"

export default function SignUpPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"student" | "faculty" | "admin">("student")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Validation
      if (!fullName.trim()) {
        throw new Error("Full name is required")
      }
      if (!email.trim()) {
        throw new Error("Email is required")
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters")
      }

      console.log("[v0] Sign up submitted:", { fullName, email, password, role })

      localStorage.setItem("signupUser", JSON.stringify({ fullName, email, password, role }))

      if (role === "student") {
        router.push("/profile/setup")
      } else if (role === "faculty") {
        router.push("/profile/faculty-setup")
      } else {
        router.push("/dashboard")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setLoading(true)
    try {
      // TODO: Add Google OAuth integration
      console.log("[v0] Google sign up initiated for role:", role)

      if (role === "student") {
        router.push("/profile/setup")
      } else if (role === "faculty") {
        router.push("/profile/faculty-setup")
      } else {
        router.push("/dashboard")
      }
    } catch (err) {
      setError("Google sign up failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCardWrapper
      title="Create your account"
      subtitle="Join your campus digital ecosystem."
      switchText="Already have an account?"
      switchHref="/signin"
      switchLinkText="Sign In"
    >
      <form onSubmit={handleSignUp} className="space-y-6">
        <AuthFormInputs
          fullName
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          fullNameValue={fullName}
          onFullNameChange={setFullName}
          error={error}
        />

        <RoleSelector selectedRole={role} onRoleChange={setRole} />

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <GoogleButton onClick={handleGoogleSignUp} loading={loading} mode="signup" />
      </form>
    </AuthCardWrapper>
  )
}

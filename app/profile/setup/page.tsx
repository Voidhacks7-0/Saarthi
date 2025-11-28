"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Moon, Sun, ChevronLeft, ChevronRight } from "lucide-react"
import { useTheme } from "@/app/providers"
import ProgressIndicator from "@/components/profile/progress-indicator"
import FormSection from "@/components/profile/form-section"
import ChipSelector from "@/components/profile/chip-selector"
import TextInput from "@/components/profile/text-input"
import CheckboxGroup from "@/components/profile/checkbox-group"

interface StudentProfileForm {
  // Basic info
  fullName: string
  email: string
  department: string
  year: string
  rollNumber: string
  // Profile setup
  skills: string[]
  interests: string[]
  preferredProjectType: string
  preferredRole: string
  availability: string[]
  bio: string
  github: string
  linkedin: string
  portfolio: string
}

const SKILLS_LIST = [
  "Web Development",
  "Android/Flutter",
  "UI/UX",
  "Python",
  "Machine Learning",
  "Data Science",
  "Cybersecurity",
  "Cloud Computing",
  "IoT",
  "C/C++",
  "Java",
  "Robotics",
  "AR/VR",
  "React",
  "Node.js",
  "Figma",
]

const INTERESTS_LIST = [
  "Hackathons",
  "Startups",
  "Open Source",
  "Competitive Coding",
  "Research",
  "Robotics",
  "Blockchain",
  "AI/ML",
  "FinTech",
  "Gaming",
  "Deep Learning",
]

const PROJECT_TYPES = [
  "Hackathons",
  "Mini Projects",
  "Major Projects",
  "Research Work",
  "Startups / Entrepreneurship",
  "Coding Contests",
]

const AVAILABILITY_OPTIONS = [
  { id: "weekday_evening", label: "Weekdays (Evening)" },
  { id: "weekend", label: "Weekends" },
  { id: "morning", label: "Mornings" },
  { id: "late_night", label: "Late Night" },
  { id: "flexible", label: "Flexible" },
]

export default function ProfileSetupPage() {
  const { isDark, setIsDark } = useTheme()
  const [step, setStep] = useState(1)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState<StudentProfileForm>({
    fullName: "",
    email: "",
    department: "",
    year: "",
    rollNumber: "",
    skills: [],
    interests: [],
    preferredProjectType: "",
    preferredRole: "",
    availability: [],
    bio: "",
    github: "",
    linkedin: "",
    portfolio: "",
  })

  const departments = [
    "Computer Science & Engineering",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Chemical Engineering",
    "MBA",
    "BBA",
    "Other",
  ]

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Semester 1", "Semester 2", "Semester 3", "Semester 4"]

  const projectTypes = PROJECT_TYPES

  const preferredRoles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "App Developer",
    "UI/UX Designer",
    "Researcher",
    "Content/Documentation",
    "Project Manager",
    "Hardware/IoT Engineer",
  ]

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!form.fullName.trim()) {
      setError("Full name is required")
      return
    }
    if (!form.email.trim()) {
      setError("Email is required")
      return
    }
    if (!form.department) {
      setError("Department is required")
      return
    }
    if (!form.year) {
      setError("Year/Semester is required")
      return
    }
    if (!form.rollNumber.trim()) {
      setError("Roll number is required")
      return
    }

    setStep(2)
  }

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      console.log("[v0] Form data before submission:", form)

      if (form.skills.length === 0) {
        throw new Error("Please select at least one skill")
      }
      if (form.interests.length === 0) {
        throw new Error("Please select at least one interest")
      }
      if (!form.preferredProjectType) {
        throw new Error("Please select a preferred project type")
      }
      if (!form.preferredRole) {
        throw new Error("Please select a preferred role")
      }
      if (form.availability.length === 0) {
        throw new Error("Please select at least one availability option")
      }

      const userJson = localStorage.getItem("signupUser")
      if (!userJson) {
        throw new Error("Session expired. Please sign up again.")
      }

      const signupData = JSON.parse(userJson)
      const submissionData = {
        ...form,
        password: signupData.password, // Include password from signup
      }

      console.log("[v0] Submitting profile with password:", { email: submissionData.email })

      const response = await fetch("/api/profiles/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      })

      const data = await response.json()
      console.log("[v0] API Response:", { status: response.status, data })

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit profile")
      }

      localStorage.setItem("pendingUser", JSON.stringify(form))
      alert("Profile submitted successfully! Please wait for admin approval.")
      window.location.href = "/profile/pending-approval"
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Profile setup failed"
      console.log("[v0] Form submission error:", errorMsg)
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5 text-primary" />}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="flex items-center justify-center gap-2 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CC</span>
              </div>
              <span className="font-bold text-xl text-foreground hidden sm:inline">Campus Connect</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Complete Your Profile</h1>
            <p className="text-sm text-muted-foreground">
              {step === 1
                ? "Let's set up your basic information for better experience"
                : "Help us find the perfect matches for you"}
            </p>
          </div>

          {/* Card */}
          <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
            {/* Progress Indicator */}
            <div className="mb-8">
              <ProgressIndicator currentStep={step} totalSteps={2} />
            </div>

            {/* Form Content */}
            {step === 1 ? (
              <form onSubmit={handleStep1Submit} className="space-y-6">
                {/* Basic Information */}
                <FormSection title="Basic Information" description="Tell us about yourself">
                  <div className="space-y-4">
                    <TextInput
                      label="Full Name"
                      placeholder="John Doe"
                      value={form.fullName}
                      onChange={(value) => setForm({ ...form, fullName: value })}
                    />

                    <TextInput
                      label="Email"
                      placeholder="john@university.edu"
                      value={form.email}
                      onChange={(value) => setForm({ ...form, email: value })}
                      type="email"
                    />

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">Department</label>
                      <select
                        value={form.department}
                        onChange={(e) => setForm({ ...form, department: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors text-foreground"
                      >
                        <option value="">Select your department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">Year / Semester</label>
                        <select
                          value={form.year}
                          onChange={(e) => setForm({ ...form, year: e.target.value })}
                          className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors text-foreground"
                        >
                          <option value="">Select year</option>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>

                      <TextInput
                        label="Roll Number"
                        placeholder="CSE2023-089"
                        value={form.rollNumber}
                        onChange={(value) => setForm({ ...form, rollNumber: value })}
                      />
                    </div>
                  </div>
                </FormSection>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
                    {error}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link
                    href="/signup"
                    className="px-6 py-3 text-center rounded-lg border border-input hover:bg-muted transition-colors text-foreground font-semibold"
                  >
                    Back
                  </Link>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Next Step
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleStep2Submit} className="space-y-8">
                {/* Skills */}
                <FormSection
                  title="Skills"
                  description="Select the skills you have or want to develop (select at least one)"
                >
                  <ChipSelector
                    label="Your Skills"
                    items={SKILLS_LIST}
                    selected={form.skills}
                    onToggle={(skill) => {
                      if (form.skills.includes(skill)) {
                        setForm({ ...form, skills: form.skills.filter((s) => s !== skill) })
                      } else {
                        setForm({ ...form, skills: [...form.skills, skill] })
                      }
                    }}
                  />
                </FormSection>

                {/* Interests */}
                <FormSection
                  title="Interests & Domains"
                  description="What are you interested in? (select at least one)"
                >
                  <ChipSelector
                    label="Your Interests"
                    items={INTERESTS_LIST}
                    selected={form.interests}
                    onToggle={(interest) => {
                      if (form.interests.includes(interest)) {
                        setForm({ ...form, interests: form.interests.filter((i) => i !== interest) })
                      } else {
                        setForm({ ...form, interests: [...form.interests, interest] })
                      }
                    }}
                  />
                </FormSection>

                {/* Preferred Project Type */}
                <FormSection title="Preferred Project Type" description="What kind of projects interest you?">
                  <ChipSelector
                    label="Project Types"
                    items={projectTypes}
                    selected={form.preferredProjectType ? [form.preferredProjectType] : []}
                    onToggle={(type) => {
                      setForm({
                        ...form,
                        preferredProjectType: form.preferredProjectType === type ? "" : type,
                      })
                    }}
                    maxSelections={1}
                  />
                </FormSection>

                {/* Preferred Role */}
                <FormSection title="Preferred Role" description="Which role do you prefer in a team?">
                  <div className="space-y-2">
                    <select
                      value={form.preferredRole}
                      onChange={(e) => setForm({ ...form, preferredRole: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors text-foreground"
                    >
                      <option value="">Select a role</option>
                      {preferredRoles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                </FormSection>

                {/* Availability */}
                <FormSection title="Availability" description="When can you typically work? (select at least one)">
                  <CheckboxGroup
                    label="Your Availability"
                    items={AVAILABILITY_OPTIONS}
                    selected={form.availability}
                    onChange={(availability) => setForm({ ...form, availability })}
                  />
                </FormSection>

                {/* Optional Section */}
                <FormSection
                  title="Tell us more about yourself"
                  description="These fields are optional but help us understand you better"
                  optional
                >
                  <div className="space-y-4">
                    <TextInput
                      label="Bio"
                      placeholder="e.g., Final year CSE student passionate about ML & Web Dev"
                      value={form.bio}
                      onChange={(value) => setForm({ ...form, bio: value })}
                      optional
                    />

                    <TextInput
                      label="GitHub Profile"
                      placeholder="https://github.com/yourprofile"
                      value={form.github}
                      onChange={(value) => setForm({ ...form, github: value })}
                      optional
                    />

                    <TextInput
                      label="LinkedIn Profile"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={form.linkedin}
                      onChange={(value) => setForm({ ...form, linkedin: value })}
                      optional
                    />

                    <TextInput
                      label="Portfolio / Website"
                      placeholder="https://yourportfolio.com"
                      value={form.portfolio}
                      onChange={(value) => setForm({ ...form, portfolio: value })}
                      optional
                    />
                  </div>
                </FormSection>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
                    {error}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    disabled={loading}
                    className="px-6 py-3 rounded-lg border border-input hover:bg-muted transition-colors text-foreground font-semibold flex items-center justify-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Setting up profile..." : "Complete Setup"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-xs text-muted-foreground">
            <p>We take your privacy seriously. Your data is secure with us.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

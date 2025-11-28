"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Moon, Sun, ChevronLeft, ChevronRight } from "lucide-react"
import { useTheme } from "@/app/providers"
import ProgressIndicator from "@/components/profile/progress-indicator"
import FormSection from "@/components/profile/form-section"
import TextInput from "@/components/profile/text-input"
import CheckboxGroup from "@/components/profile/checkbox-group"

interface FacultyProfileForm {
  // Basic Information
  fullName: string
  email: string
  password: string
  facultyId: string
  // Academic Details
  department: string
  designation: string
  courses: string[]
  // Special Roles
  isLabInCharge: boolean
  isLibrarian: boolean
  // Optional Details
  officeHours: string
  contactNumber: string
  bio: string
}

const DEPARTMENTS = [
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

const DESIGNATIONS = [
  "Professor",
  "Associate Professor",
  "Assistant Professor",
  "Lecturer",
  "HOD",
  "Lab In-Charge",
  "Librarian",
]

const COURSES_LIST = [
  "Data Structures",
  "Web Design",
  "Operating Systems",
  "Database Management",
  "Machine Learning",
  "Artificial Intelligence",
  "Web Development",
  "Mobile App Development",
  "Cloud Computing",
  "Cybersecurity",
  "Networks",
  "Software Engineering",
  "Algorithm Design",
  "Theory of Computation",
  "Compiler Design",
]

const SPECIAL_ROLES_OPTIONS = [
  { id: "lab_incharge", label: "Lab In-Charge (Lab equipment & resource management)" },
  { id: "librarian", label: "Librarian (Library management & booking approvals)" },
]

export default function FacultySetupPage() {
  const { isDark, setIsDark } = useTheme()
  const [step, setStep] = useState(1)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState<FacultyProfileForm>({
    fullName: "",
    email: "",
    password: "",
    facultyId: "",
    department: "",
    designation: "",
    courses: [],
    isLabInCharge: false,
    isLibrarian: false,
    officeHours: "",
    contactNumber: "",
    bio: "",
  })

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
    if (!form.password.trim()) {
      setError("Password is required")
      return
    }
    if (!form.facultyId.trim()) {
      setError("Faculty ID is required")
      return
    }

    setStep(2)
  }

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!form.department) {
      setError("Department is required")
      return
    }
    if (!form.designation) {
      setError("Designation is required")
      return
    }
    if (form.courses.length === 0) {
      setError("Please select at least one course")
      return
    }

    setStep(3)
  }

  const handleStep3Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const userJson = localStorage.getItem("signupUser")
      if (!userJson) {
        throw new Error("Session expired. Please sign up again.")
      }

      const signupData = JSON.parse(userJson)

      const submissionData = {
        ...form,
        role: "faculty",
        password: signupData.password,
      }

      console.log("[v0] Submitting faculty profile:", { email: submissionData.email })

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
      alert("Faculty profile submitted successfully! Please wait for admin approval.")
      window.location.href = "/profile/faculty-pending-approval"
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
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Faculty Profile Setup</h1>
            <p className="text-sm text-muted-foreground">
              {step === 1
                ? "Let's set up your basic information"
                : step === 2
                  ? "Tell us about your academic role"
                  : "Complete your faculty profile"}
            </p>
          </div>

          {/* Card */}
          <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
            {/* Progress Indicator */}
            <div className="mb-8">
              <ProgressIndicator currentStep={step} totalSteps={3} />
            </div>

            {/* Form Content */}
            {step === 1 ? (
              <form onSubmit={handleStep1Submit} className="space-y-6">
                {/* Basic Information */}
                <FormSection title="Basic Information" description="Required for account setup">
                  <div className="space-y-4">
                    <TextInput
                      label="Full Name"
                      placeholder="Dr. John Doe"
                      value={form.fullName}
                      onChange={(value) => setForm({ ...form, fullName: value })}
                    />

                    <TextInput
                      label="Official Email"
                      placeholder="john.doe@university.edu"
                      value={form.email}
                      onChange={(value) => setForm({ ...form, email: value })}
                      type="email"
                    />

                    <TextInput
                      label="Password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(value) => setForm({ ...form, password: value })}
                      type="password"
                    />

                    <TextInput
                      label="Faculty ID / Employee Code"
                      placeholder="FAC-2023-001"
                      value={form.facultyId}
                      onChange={(value) => setForm({ ...form, facultyId: value })}
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
            ) : step === 2 ? (
              <form onSubmit={handleStep2Submit} className="space-y-6">
                {/* Academic Details */}
                <FormSection title="Academic Details" description="Your teaching responsibilities">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">Department</label>
                      <select
                        value={form.department}
                        onChange={(e) => setForm({ ...form, department: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors text-foreground"
                      >
                        <option value="">Select your department</option>
                        {DEPARTMENTS.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">Designation</label>
                      <select
                        value={form.designation}
                        onChange={(e) => setForm({ ...form, designation: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors text-foreground"
                      >
                        <option value="">Select your designation</option>
                        {DESIGNATIONS.map((desig) => (
                          <option key={desig} value={desig}>
                            {desig}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-foreground">Courses / Subjects You Teach</label>
                      <div className="space-y-2 max-h-64 overflow-y-auto bg-background border border-input rounded-lg p-3">
                        {COURSES_LIST.map((course) => (
                          <label
                            key={course}
                            className="flex items-center gap-3 p-2 hover:bg-muted rounded cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={form.courses.includes(course)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setForm({ ...form, courses: [...form.courses, course] })
                                } else {
                                  setForm({ ...form, courses: form.courses.filter((c) => c !== course) })
                                }
                              }}
                              className="w-4 h-4 rounded border-input"
                            />
                            <span className="text-sm text-foreground">{course}</span>
                          </label>
                        ))}
                      </div>
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
                    className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Next Step
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleStep3Submit} className="space-y-6">
                {/* Special Roles */}
                <FormSection title="Special Roles (Optional)" description="Do you have any special responsibilities?">
                  <CheckboxGroup
                    label="Special Roles"
                    items={SPECIAL_ROLES_OPTIONS}
                    selected={[
                      ...(form.isLabInCharge ? ["lab_incharge"] : []),
                      ...(form.isLibrarian ? ["librarian"] : []),
                    ]}
                    onChange={(selected) => {
                      setForm({
                        ...form,
                        isLabInCharge: selected.includes("lab_incharge"),
                        isLibrarian: selected.includes("librarian"),
                      })
                    }}
                  />
                </FormSection>

                {/* Optional Details */}
                <FormSection title="Additional Information" description="Help students find you" optional>
                  <div className="space-y-4">
                    <TextInput
                      label="Office Hours"
                      placeholder="e.g., 10 AM - 1 PM (Mon-Fri)"
                      value={form.officeHours}
                      onChange={(value) => setForm({ ...form, officeHours: value })}
                      optional
                    />

                    <TextInput
                      label="Contact Number"
                      placeholder="+91-9876543210"
                      value={form.contactNumber}
                      onChange={(value) => setForm({ ...form, contactNumber: value })}
                      optional
                    />

                    <TextInput
                      label="Bio"
                      placeholder="e.g., Assistant Professor with 6+ years experience in AI & ML"
                      value={form.bio}
                      onChange={(value) => setForm({ ...form, bio: value })}
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
                    onClick={() => setStep(2)}
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
                    {loading ? "Submitting..." : "Submit for Approval"}
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

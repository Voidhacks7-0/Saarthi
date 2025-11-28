"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

interface StudentProfile {
  id: string
  fullName: string
  email: string
  department: string
  year: string
  rollNumber: string
  skills: string[]
  interests: string[]
  preferredRole: string
  submittedAt: string
  role: "student"
}

interface FacultyProfile {
  id: string
  fullName: string
  email: string
  department: string
  designation: string
  courses: string[]
  isLabInCharge: boolean
  isLibrarian: boolean
  submittedAt: string
  role: "faculty"
}

type Profile = StudentProfile | FacultyProfile

export default function PendingProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchProfiles()
    const interval = setInterval(fetchProfiles, 2000)
    return () => clearInterval(interval)
  }, [])

  const fetchProfiles = async () => {
    try {
      console.log("[v0] Fetching pending profiles...")
      setLoading(true)
      const response = await fetch("/api/profiles/pending")
      const data = await response.json()

      console.log("[v0] Pending profiles response:", data)

      if (data.success) {
        console.log("[v0] Found pending profiles:", data.profiles.length)
        setProfiles(data.profiles)
        setError("")
      } else {
        setError(data.error || "Failed to load profiles")
      }
    } catch (err) {
      setError("Failed to load profiles")
      console.error("[v0] Error fetching profiles:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (profileId: string) => {
    try {
      setActionLoading(profileId)
      console.log("[v0] Approving profile:", profileId)
      const response = await fetch(`/api/profiles/${profileId}/approve`, {
        method: "POST",
      })
      const data = await response.json()

      console.log("[v0] Approve response:", data)

      if (data.success) {
        setProfiles(profiles.filter((p) => p.id !== profileId))
        setTimeout(() => fetchProfiles(), 500)
      } else {
        setError(data.error || "Failed to approve profile")
      }
    } catch (err) {
      setError("Failed to approve profile")
      console.error("[v0] Error approving profile:", err)
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (profileId: string) => {
    try {
      setActionLoading(profileId)
      console.log("[v0] Rejecting profile:", profileId)
      const response = await fetch(`/api/profiles/${profileId}/reject`, {
        method: "POST",
      })
      const data = await response.json()

      console.log("[v0] Reject response:", data)

      if (data.success) {
        setProfiles(profiles.filter((p) => p.id !== profileId))
        setTimeout(() => fetchProfiles(), 500)
      } else {
        setError(data.error || "Failed to reject profile")
      }
    } catch (err) {
      setError("Failed to reject profile")
      console.error("[v0] Error rejecting profile:", err)
    } finally {
      setActionLoading(null)
    }
  }

  const renderProfileDetails = (profile: Profile) => {
    if (profile.role === "faculty") {
      const fProfile = profile as FacultyProfile
      return (
        <>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Department:</span>
              <p className="text-foreground font-medium">{fProfile.department}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Designation:</span>
              <p className="text-foreground font-medium">{fProfile.designation}</p>
            </div>
          </div>
          {fProfile.courses.length > 0 && (
            <div className="mt-3">
              <p className="text-xs text-muted-foreground mb-1">Courses:</p>
              <div className="flex flex-wrap gap-1">
                {fProfile.courses.slice(0, 4).map((course) => (
                  <span key={course} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">
                    {course}
                  </span>
                ))}
                {fProfile.courses.length > 4 && (
                  <span className="px-2 py-1 text-xs text-muted-foreground">+{fProfile.courses.length - 4} more</span>
                )}
              </div>
            </div>
          )}
          {(fProfile.isLabInCharge || fProfile.isLibrarian) && (
            <div className="mt-3">
              <p className="text-xs text-muted-foreground mb-1">Special Roles:</p>
              <div className="flex flex-wrap gap-1">
                {fProfile.isLabInCharge && (
                  <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-300 text-xs rounded">
                    Lab In-Charge
                  </span>
                )}
                {fProfile.isLibrarian && (
                  <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-300 text-xs rounded">
                    Librarian
                  </span>
                )}
              </div>
            </div>
          )}
        </>
      )
    } else {
      const sProfile = profile as StudentProfile
      return (
        <>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Department:</span>
              <p className="text-foreground font-medium">{sProfile.department}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Year:</span>
              <p className="text-foreground font-medium">{sProfile.year}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Roll Number:</span>
              <p className="text-foreground font-medium">{sProfile.rollNumber}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Preferred Role:</span>
              <p className="text-foreground font-medium">{sProfile.preferredRole}</p>
            </div>
          </div>

          {sProfile.skills.length > 0 && (
            <div className="mt-3">
              <p className="text-xs text-muted-foreground mb-1">Skills:</p>
              <div className="flex flex-wrap gap-1">
                {sProfile.skills.slice(0, 3).map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                    {skill}
                  </span>
                ))}
                {sProfile.skills.length > 3 && (
                  <span className="px-2 py-1 text-xs text-muted-foreground">+{sProfile.skills.length - 3} more</span>
                )}
              </div>
            </div>
          )}
        </>
      )
    }
  }

  if (loading && profiles.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      {profiles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No pending profiles to approve</p>
        </div>
      ) : (
        <div className="space-y-3">
          {profiles.map((profile) => (
            <div key={profile.id} className="bg-card border border-border rounded-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{profile.fullName}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded font-semibold ${profile.role === "faculty" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"}`}
                    >
                      {profile.role === "faculty" ? "Faculty" : "Student"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{profile.email}</p>

                  {renderProfileDetails(profile)}
                </div>

                <div className="flex gap-2 sm:flex-col">
                  <button
                    onClick={() => handleApprove(profile.id)}
                    disabled={actionLoading === profile.id}
                    className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 font-semibold"
                  >
                    {actionLoading === profile.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    <span className="hidden sm:inline">Approve</span>
                  </button>
                  <button
                    onClick={() => handleReject(profile.id)}
                    disabled={actionLoading === profile.id}
                    className="flex-1 sm:flex-none px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 font-semibold"
                  >
                    {actionLoading === profile.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                    <span className="hidden sm:inline">Reject</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { User, Edit, Save, X } from "lucide-react"
import Sidebar from "@/components/dashboard/sidebar"

interface UserProfile {
  name: string
  email: string
  year: string
  branch: string
  skills: string[]
  interests: string[]
  github: string
  linkedin: string
  portfolio: string
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john@university.edu",
    year: "3rd Year",
    branch: "B.Tech CSE",
    skills: ["React", "MongoDB", "UI/UX"],
    interests: ["Hackathon", "AI", "Web Dev"],
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    portfolio: "https://johndoe.portfolio.com",
  })

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <User className="w-8 h-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">My Profile</h1>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4" />
                    Edit
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-6">
            {/* Personal Info */}
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <p className="text-foreground font-medium">{profile.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
                  <p className="text-foreground font-medium">{profile.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Year</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.year}
                      onChange={(e) => setProfile({ ...profile, year: e.target.value })}
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <p className="text-foreground font-medium">{profile.year}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Branch</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.branch}
                      onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <p className="text-foreground font-medium">{profile.branch}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <span key={interest} className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4">Links</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">GitHub</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={profile.github}
                      onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {profile.github}
                    </a>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">LinkedIn</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={profile.linkedin}
                      onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {profile.linkedin}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <button
                onClick={handleSave}
                className="w-full px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

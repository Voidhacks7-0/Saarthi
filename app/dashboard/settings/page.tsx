"use client"

import { useState } from "react"
import { Settings, Sun, LogOut, Lock } from "lucide-react"
import Sidebar from "@/components/dashboard/sidebar"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState({
    theme: "dark",
    notifications: true,
    emailNotifications: true,
    privateProfile: false,
  })

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Settings className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Settings</h1>
            </div>
            <p className="text-muted-foreground">Manage your preferences and account settings</p>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Theme */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Appearance</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sun className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">Theme</span>
                  </div>
                  <div className="flex gap-2">
                    {["light", "dark"].map((theme) => (
                      <button
                        key={theme}
                        onClick={() => setSettings({ ...settings, theme })}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          settings.theme === theme
                            ? "bg-primary text-white"
                            : "bg-muted text-foreground hover:bg-muted/80"
                        }`}
                      >
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Push Notifications</span>
                  <button
                    onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.notifications ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.notifications ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Email Notifications</span>
                  <button
                    onClick={() => setSettings({ ...settings, emailNotifications: !settings.emailNotifications })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.emailNotifications ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.emailNotifications ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Privacy */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Privacy</h2>
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Private Profile</span>
                <button
                  onClick={() => setSettings({ ...settings, privateProfile: !settings.privateProfile })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.privateProfile ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.privateProfile ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Account */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Account</h2>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  Change Password
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 bg-destructive/10 text-destructive rounded-lg font-medium hover:bg-destructive/20 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

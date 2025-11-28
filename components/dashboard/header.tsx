"use client"
import { Moon, Sun, Bell } from "lucide-react"
import { useTheme } from "@/app/providers"

interface HeaderProps {
  userName: string
  notificationCount?: number
}

export default function DashboardHeader({ userName, notificationCount = 0 }: HeaderProps) {
  const { isDark, setIsDark } = useTheme()

  return (
    <header className="bg-card border-b border-border sticky top-0 z-20">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left - Welcome */}
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold text-foreground">
              Welcome back, <span className="text-primary">{userName}</span>
            </h1>
            <p className="text-xs text-muted-foreground">Manage your campus activities</p>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Notifications">
              <Bell className="w-5 h-5 text-foreground" />
              {notificationCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5 text-primary" />}
            </button>

            {/* Profile Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
              <span className="text-white font-bold text-sm">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

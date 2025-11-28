"use client"

import { Users, BookOpen, Shield } from "lucide-react"

interface RoleSelectorProps {
  selectedRole: "student" | "faculty" | "admin"
  onRoleChange: (role: "student" | "faculty" | "admin") => void
}

export default function RoleSelector({ selectedRole, onRoleChange }: RoleSelectorProps) {
  const roles = [
    {
      id: "student",
      label: "Student",
      icon: Users,
      description: "Access events, groups, and resources",
    },
    {
      id: "faculty",
      label: "Faculty",
      icon: BookOpen,
      description: "Manage classes and announcements",
    },
    {
      id: "admin",
      label: "Admin",
      icon: Shield,
      description: "System administration",
    },
  ]

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground">Select Role</label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {roles.map((role) => {
          const Icon = role.icon
          const isSelected = selectedRole === role.id

          return (
            <button
              key={role.id}
              onClick={() => onRoleChange(role.id as "student" | "faculty" | "admin")}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                isSelected ? "border-primary bg-primary/10" : "border-input bg-background hover:border-primary/50"
              }`}
            >
              <Icon className={`w-5 h-5 mb-2 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
              <div className={`font-semibold text-sm ${isSelected ? "text-primary" : "text-foreground"}`}>
                {role.label}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{role.description}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

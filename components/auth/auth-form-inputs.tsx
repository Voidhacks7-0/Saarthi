"use client"

import { Mail, Lock, User } from "lucide-react"

interface AuthFormInputsProps {
  fullName?: boolean
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  onFullNameChange?: (name: string) => void
  fullNameValue?: string
  error?: string
}

export default function AuthFormInputs({
  fullName,
  email,
  setEmail,
  password,
  setPassword,
  onFullNameChange,
  fullNameValue = "",
  error,
}: AuthFormInputsProps) {
  return (
    <div className="space-y-4">
      {fullName && (
        <div>
          <label htmlFor="fullname" className="block text-sm font-medium text-foreground mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              id="fullname"
              type="text"
              placeholder="John Doe"
              value={fullNameValue}
              onChange={(e) => onFullNameChange?.(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <input
            id="email"
            type="email"
            placeholder="you@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}
    </div>
  )
}

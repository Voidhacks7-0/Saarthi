"use client"

import type { ReactNode } from "react"

interface FormSectionProps {
  title: string
  description?: string
  children: ReactNode
  optional?: boolean
}

export default function FormSection({ title, description, children, optional }: FormSectionProps) {
  return (
    <div className="space-y-4 pb-8 border-b border-border last:border-b-0 last:pb-0">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {optional && <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Optional</span>}
        </div>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      {children}
    </div>
  )
}

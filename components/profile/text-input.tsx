"use client"

interface TextInputProps {
  label: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  type?: string
  optional?: boolean
}

export default function TextInput({ label, placeholder, value, onChange, type = "text", optional }: TextInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label}
        {optional && <span className="text-xs text-muted-foreground ml-1">(Optional)</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors text-foreground placeholder:text-muted-foreground"
      />
    </div>
  )
}

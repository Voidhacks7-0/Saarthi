"use client"

interface CheckboxGroupProps {
  label: string
  description?: string
  items: { id: string; label: string }[]
  selected: string[]
  onChange: (items: string[]) => void
}

export default function CheckboxGroup({ label, description, items, selected, onChange }: CheckboxGroupProps) {
  const handleToggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((item) => item !== id))
    } else {
      onChange([...selected, id])
    }
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
        {description && <p className="text-xs text-muted-foreground mb-2">{description}</p>}
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={selected.includes(item.id)}
              onChange={() => handleToggle(item.id)}
              className="w-5 h-5 rounded border-input bg-background text-primary accent-primary cursor-pointer"
            />
            <span className="text-sm text-foreground group-hover:text-primary transition-colors">{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

"use client"

interface ChipSelectorProps {
  label: string
  description?: string
  items: string[]
  selected: string[]
  onToggle: (item: string) => void
  maxSelections?: number
  multiline?: boolean
}

export default function ChipSelector({
  label,
  description,
  items,
  selected,
  onToggle,
  maxSelections,
  multiline = true,
}: ChipSelectorProps) {
  const handleToggle = (item: string) => {
    if (selected.includes(item)) {
      onToggle(item)
    } else if (!maxSelections || selected.length < maxSelections) {
      onToggle(item)
    }
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
        {description && <p className="text-xs text-muted-foreground mb-2">{description}</p>}
      </div>
      <div className={`flex flex-wrap gap-2 ${multiline ? "flex-wrap" : "flex-nowrap overflow-x-auto pb-2"}`}>
        {items.map((item) => {
          const isSelected = selected.includes(item)
          const isDisabled = !isSelected && maxSelections && selected.length >= maxSelections

          return (
            <button
              key={item}
              onClick={() => handleToggle(item)}
              disabled={isDisabled}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-md hover:shadow-lg"
                  : isDisabled
                    ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                    : "bg-muted text-foreground hover:bg-accent/20 border border-input hover:border-accent"
              }`}
            >
              {item}
            </button>
          )
        })}
      </div>
      {maxSelections && (
        <p className="text-xs text-muted-foreground">
          Selected: {selected.length} / {maxSelections}
        </p>
      )}
    </div>
  )
}

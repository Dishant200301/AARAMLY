import * as React from "react"
import { ChevronDown, Check } from "lucide-react"

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  className?: string
  disabled?: boolean
}

export const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  options,
  placeholder = "Select an option",
  className = "",
  disabled = false
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div className={`relative inline-block w-full font-sans text-xs`} ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-9 w-full items-center justify-between rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-black shadow-2xs transition-colors hover:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-black disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer ${className}`}
      >
        <span className={selectedOption ? "text-black" : "text-neutral-400"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-neutral-400 opacity-80" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 z-50 max-h-60 w-full overflow-auto rounded-md border border-neutral-200 bg-white p-1 shadow-lg animate-in fade-in-80 zoom-in-95 duration-100">
          {options.map((option) => {
            const isSelected = option.value === value
            return (
              <div
                key={option.value}
                onClick={() => {
                  onValueChange(option.value)
                  setIsOpen(false)
                }}
                className={`relative flex w-full cursor-pointer select-none items-center justify-between rounded-sm px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-neutral-100 font-semibold text-black"
                    : "text-neutral-700 hover:bg-neutral-100 hover:text-black"
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <Check className="h-3.5 w-3.5 text-black" />}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

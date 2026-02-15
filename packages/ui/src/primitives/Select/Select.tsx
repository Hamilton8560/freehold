import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string
  error?: string
  hint?: string
  options: SelectOption[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, options, placeholder, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const descriptionId = (error || hint) ? `${selectId}-description` : undefined

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="mb-1.5 block text-sm font-medium text-[#2C2824]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={error ? true : undefined}
            aria-describedby={descriptionId}
            className={cn(
              'flex h-10 w-full appearance-none rounded-[10px] border bg-white px-3 py-2 pr-10',
              'text-sm text-[#2C2824]',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
              error
                ? 'border-[#F87171] focus:ring-[#F87171]/20'
                : 'border-[rgba(184,164,142,0.25)] focus:border-[#B8A48E] focus:ring-[#B8A48E]/20',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F5F3EF]',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-4 w-4 text-[#5C574F]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {(error || hint) && (
          <p
            id={descriptionId}
            className={cn(
              'mt-1.5 text-sm',
              error ? 'text-[#991B1B]' : 'text-[#5C574F]'
            )}
          >
            {error || hint}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

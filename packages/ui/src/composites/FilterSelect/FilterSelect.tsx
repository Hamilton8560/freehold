import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface FilterOption {
  value: string
  label: string
}

export interface FilterSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  options: FilterOption[]
  placeholder?: string
  icon?: React.ReactNode
}

export const FilterSelect = forwardRef<HTMLSelectElement, FilterSelectProps>(
  ({ className, options, placeholder, icon, ...props }, ref) => {
    return (
      <div className="relative inline-block">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-[#8A847A]">{icon}</span>
          </div>
        )}
        <select
          ref={ref}
          className={cn(
            'h-10 appearance-none rounded-[10px] border bg-white py-2 pr-10 text-sm',
            'text-[#2C2824] transition-all duration-200',
            'border-[rgba(184,164,142,0.25)]',
            'focus:outline-none focus:border-[#B8A48E] focus:ring-2 focus:ring-[#B8A48E]/20 focus:ring-offset-1',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F5F3EF]',
            icon ? 'pl-10' : 'pl-3',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="">{placeholder}</option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
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
    )
  }
)

FilterSelect.displayName = 'FilterSelect'

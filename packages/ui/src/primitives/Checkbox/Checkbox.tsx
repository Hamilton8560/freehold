import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  hint?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const descriptionId = (error || hint) ? `${checkboxId}-description` : undefined

    return (
      <div className="w-full">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center">
            <input
              ref={ref}
              id={checkboxId}
              type="checkbox"
              aria-invalid={error ? true : undefined}
              aria-describedby={descriptionId}
              className={cn(
                'peer h-[18px] w-[18px] shrink-0 appearance-none rounded-[6px] border bg-white',
                'transition-all duration-200 cursor-pointer',
                'checked:bg-[#2C2824] checked:border-[#2C2824]',
                'focus:outline-none focus:ring-2 focus:ring-offset-1',
                error
                  ? 'border-[#F87171] focus:ring-[#F87171]/20'
                  : 'border-[rgba(184,164,142,0.25)] focus:ring-[#B8A48E]/20',
                'disabled:cursor-not-allowed disabled:opacity-50',
                className
              )}
              {...props}
            />
            <svg
              className="pointer-events-none absolute left-0 h-[18px] w-[18px] text-white opacity-0 peer-checked:opacity-100"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4.5 9.5L7.5 12.5L13.5 6.5" />
            </svg>
          </div>
          {label && (
            <label
              htmlFor={checkboxId}
              className="text-sm font-medium text-[#2C2824] cursor-pointer"
            >
              {label}
            </label>
          )}
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

Checkbox.displayName = 'Checkbox'

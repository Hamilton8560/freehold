import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import { FormControl } from '../FormControl'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, hint, id, ...props }, ref) => {
    return (
      <FormControl label={label} error={error} hint={hint} id={id}>
        {({ id: inputId, descriptionId }) => (
          <input
            ref={ref}
            id={inputId}
            type={type}
            aria-invalid={error ? true : undefined}
            aria-describedby={descriptionId}
            className={cn(
              'flex h-10 w-full rounded-[10px] border bg-white px-3 py-2',
              'text-sm text-[#2C2824] placeholder:text-[#8A847A]',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
              error
                ? 'border-[#F87171] focus:ring-[#F87171]/20'
                : 'border-[rgba(184,164,142,0.25)] focus:border-[#B8A48E] focus:ring-[#B8A48E]/20',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F5F3EF]',
              className
            )}
            {...props}
          />
        )}
      </FormControl>
    )
  }
)

Input.displayName = 'Input'

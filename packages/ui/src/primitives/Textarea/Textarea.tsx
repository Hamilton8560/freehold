import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const descriptionId = (error || hint) ? `${textareaId}-description` : undefined

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-1.5 block text-sm font-medium text-[#2C2824]"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={error ? true : undefined}
          aria-describedby={descriptionId}
          className={cn(
            'flex min-h-[80px] w-full resize-y rounded-[10px] border bg-white px-3 py-2',
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

Textarea.displayName = 'Textarea'

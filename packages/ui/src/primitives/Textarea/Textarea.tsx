import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import { FormControl } from '../FormControl'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    return (
      <FormControl label={label} error={error} hint={hint} id={id}>
        {({ id: textareaId, descriptionId }) => (
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
        )}
      </FormControl>
    )
  }
)

Textarea.displayName = 'Textarea'

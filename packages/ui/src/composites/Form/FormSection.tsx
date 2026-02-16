import { type ReactNode, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface FormSectionProps extends HTMLAttributes<HTMLDivElement> {
  /** Section heading */
  title?: string
  /** Section description */
  description?: string
  /** Fields within this section */
  children: ReactNode
}

export function FormSection({
  title,
  description,
  children,
  className,
  ...props
}: FormSectionProps) {
  return (
    <div
      className={cn(
        'border-b border-[rgba(184,164,142,0.15)] pb-6 last:border-b-0 last:pb-0',
        className
      )}
      role="group"
      aria-labelledby={title ? `section-${title.toLowerCase().replace(/\s+/g, '-')}` : undefined}
      {...props}
    >
      {(title || description) && (
        <div className="mb-5">
          {title && (
            <h3
              id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
              className="font-heading text-lg text-[#2C2824]"
            >
              {title}
            </h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-[#5C574F]">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-5">{children}</div>
    </div>
  )
}

FormSection.displayName = 'FormSection'

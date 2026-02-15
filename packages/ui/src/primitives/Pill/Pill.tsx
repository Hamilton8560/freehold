import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const pillVariants = cva(
  [
    'inline-flex items-center gap-2 px-4 py-1.5',
    'rounded-full border',
    'font-sans text-sm',
    'transition-colors duration-200',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-white text-[#5C574F]',
          'border-[rgba(184,164,142,0.25)]',
        ],
        success: [
          'bg-[#D1FAE5] text-[#065F46]',
          'border-[#6EE7B7]',
        ],
        warning: [
          'bg-[#FEF3C7] text-[#92400E]',
          'border-[#FCD34D]',
        ],
        error: [
          'bg-[#FEE2E2] text-[#991B1B]',
          'border-[#FCA5A5]',
        ],
        accent: [
          'bg-[#B8A48E]/10 text-[#6B5A48]',
          'border-[#B8A48E]/30',
        ],
      },
      size: {
        sm: 'text-xs px-3 py-1',
        md: 'text-sm px-4 py-1.5',
        lg: 'text-base px-5 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const dotColors = {
  default: 'bg-[#B8A48E]',
  success: 'bg-[#8DB580]',
  warning: 'bg-[#D4B86A]',
  error: 'bg-[#C4796B]',
  accent: 'bg-[#B8A48E]',
}

export interface PillProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pillVariants> {
  showDot?: boolean
}

export const Pill = forwardRef<HTMLDivElement, PillProps>(
  ({ className, variant = 'default', size, showDot = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(pillVariants({ variant, size }), className)}
        {...props}
      >
        {showDot && (
          <div
            className={cn(
              'w-1.5 h-1.5 rounded-full',
              dotColors[variant || 'default']
            )}
          />
        )}
        <span>{children}</span>
      </div>
    )
  }
)

Pill.displayName = 'Pill'

export { pillVariants }

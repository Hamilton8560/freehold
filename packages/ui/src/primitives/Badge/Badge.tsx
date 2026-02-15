import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const badgeVariants = cva(
  [
    'inline-flex items-center rounded-full px-2.5 py-0.5',
    'text-xs font-medium',
    'border',
    'transition-colors duration-200',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-[#F5F3EF] text-[#2C2824]',
          'border-[rgba(184,164,142,0.25)]',
        ],
        pending: [
          'bg-[#FEF3C7] text-[#92400E]',
          'border-[#FCD34D]',
        ],
        approved: [
          'bg-[#D1FAE5] text-[#065F46]',
          'border-[#6EE7B7]',
        ],
        paid: [
          'bg-[#DBEAFE] text-[#1E40AF]',
          'border-[#93C5FD]',
        ],
        error: [
          'bg-[#FEE2E2] text-[#991B1B]',
          'border-[#FCA5A5]',
        ],
        accent: [
          'bg-[#B8A48E]/20 text-[#6B5A48]',
          'border-[#B8A48E]/40',
        ],
      },
      size: {
        sm: 'text-[10px] px-2 py-0.5',
        md: 'text-xs px-2.5 py-0.5',
        lg: 'text-sm px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export { badgeVariants }

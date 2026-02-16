import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const securityBadgeVariants = cva(
  ['inline-flex items-center gap-1.5 font-medium'],
  {
    variants: {
      variant: {
        default: 'text-sm text-[#5C574F]',
        subtle: 'text-xs text-[#8A847A]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface SecurityBadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof securityBadgeVariants> {
  label?: string
}

export const SecurityBadge = forwardRef<HTMLDivElement, SecurityBadgeProps>(
  ({ className, variant, label = 'Secure checkout', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(securityBadgeVariants({ variant }), className)}
        {...props}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>{label}</span>
      </div>
    )
  }
)

SecurityBadge.displayName = 'SecurityBadge'

export { securityBadgeVariants }

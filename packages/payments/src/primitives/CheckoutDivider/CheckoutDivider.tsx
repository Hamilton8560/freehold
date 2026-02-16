import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface CheckoutDividerProps
  extends HTMLAttributes<HTMLDivElement> {
  label?: string
}

export const CheckoutDivider = forwardRef<HTMLDivElement, CheckoutDividerProps>(
  ({ className, label = 'or', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('relative flex items-center py-2', className)}
        {...props}
      >
        <div className="flex-1 border-t border-[rgba(184,164,142,0.2)]" />
        <span className="px-3 text-xs font-medium text-[#8A847A] uppercase tracking-wider">
          {label}
        </span>
        <div className="flex-1 border-t border-[rgba(184,164,142,0.2)]" />
      </div>
    )
  }
)

CheckoutDivider.displayName = 'CheckoutDivider'

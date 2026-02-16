import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface PricingGridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4
}

const columnClasses = {
  2: 'md:grid-cols-2 max-w-3xl',
  3: 'md:grid-cols-2 lg:grid-cols-3 max-w-5xl',
  4: 'md:grid-cols-2 lg:grid-cols-4 max-w-6xl',
} as const

export const PricingGrid = forwardRef<HTMLDivElement, PricingGridProps>(
  ({ className, columns = 3, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid grid-cols-1 gap-6 items-start mx-auto',
          columnClasses[columns],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

PricingGrid.displayName = 'PricingGrid'

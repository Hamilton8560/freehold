import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import type { CheckoutHeaderConfig } from '../../types'

export interface CheckoutHeaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    CheckoutHeaderConfig {}

export const CheckoutHeader = forwardRef<HTMLDivElement, CheckoutHeaderProps>(
  ({ className, title, description, logo, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {logo && <div className="mb-3">{logo}</div>}
        <h2 className="font-['DM_Serif_Display',serif] text-xl text-[#2C2824]">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-[#5C574F]">{description}</p>
        )}
      </div>
    )
  }
)

CheckoutHeader.displayName = 'CheckoutHeader'

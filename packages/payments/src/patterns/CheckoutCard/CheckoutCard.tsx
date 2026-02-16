import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import { CheckoutHeader } from '../../composites/CheckoutHeader/CheckoutHeader'
import { CheckoutFooter } from '../../composites/CheckoutFooter/CheckoutFooter'
import type { CheckoutHeaderConfig, CheckoutFooterConfig } from '../../types'

export interface CheckoutCardProps extends HTMLAttributes<HTMLDivElement> {
  header?: CheckoutHeaderConfig
  footer?: CheckoutFooterConfig
}

export const CheckoutCard = forwardRef<HTMLDivElement, CheckoutCardProps>(
  ({ className, header, footer, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-md mx-auto',
          'bg-white rounded-[14px]',
          'border border-[rgba(184,164,142,0.15)]',
          'shadow-[0_2px_4px_0_rgba(184,164,142,0.08),0_8px_24px_0_rgba(44,40,36,0.06)]',
          'p-6 sm:p-8',
          className
        )}
        {...props}
      >
        <div className="space-y-6">
          {header && <CheckoutHeader {...header} />}
          {children}
          {footer && <CheckoutFooter {...footer} />}
        </div>
      </div>
    )
  }
)

CheckoutCard.displayName = 'CheckoutCard'

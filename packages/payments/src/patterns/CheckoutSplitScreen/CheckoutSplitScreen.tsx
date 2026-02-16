import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { CheckoutHeader } from '../../composites/CheckoutHeader/CheckoutHeader'
import { CheckoutFooter } from '../../composites/CheckoutFooter/CheckoutFooter'
import type { CheckoutHeaderConfig, CheckoutFooterConfig } from '../../types'

export interface CheckoutSplitScreenProps extends HTMLAttributes<HTMLDivElement> {
  left: ReactNode
  header?: CheckoutHeaderConfig
  footer?: CheckoutFooterConfig
}

export const CheckoutSplitScreen = forwardRef<HTMLDivElement, CheckoutSplitScreenProps>(
  ({ className, left, header, footer, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'min-h-screen flex flex-col md:flex-row',
          className
        )}
        {...props}
      >
        {/* Left panel — dark */}
        <div
          className={cn(
            'md:w-1/2 bg-[#2C2824] text-[#FAF9F6]',
            'flex items-center justify-center',
            'p-8 md:p-12 lg:p-16',
            'min-h-[240px] md:min-h-screen'
          )}
        >
          <div className="w-full max-w-md">{left}</div>
        </div>

        {/* Right panel — light */}
        <div
          className={cn(
            'md:w-1/2 bg-white',
            'flex items-center justify-center',
            'p-6 sm:p-8 md:p-12 lg:p-16'
          )}
        >
          <div className="w-full max-w-md">
            <div className="space-y-6">
              {header && <CheckoutHeader {...header} />}
              {children}
              {footer && <CheckoutFooter {...footer} />}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

CheckoutSplitScreen.displayName = 'CheckoutSplitScreen'

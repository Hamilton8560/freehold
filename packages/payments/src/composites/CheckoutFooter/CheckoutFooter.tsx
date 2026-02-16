import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import type { CheckoutFooterConfig } from '../../types'

export interface CheckoutFooterProps
  extends HTMLAttributes<HTMLDivElement>,
    CheckoutFooterConfig {}

export const CheckoutFooter = forwardRef<HTMLDivElement, CheckoutFooterProps>(
  ({ className, termsUrl, privacyUrl, showPoweredBy = false, ...props }, ref) => {
    const hasLinks = termsUrl || privacyUrl

    if (!hasLinks && !showPoweredBy) return null

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center gap-2 pt-4 text-xs text-[#8A847A]',
          className
        )}
        {...props}
      >
        {hasLinks && (
          <div className="flex items-center gap-3">
            {termsUrl && (
              <a
                href={termsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-[#5C574F] transition-colors"
              >
                Terms
              </a>
            )}
            {termsUrl && privacyUrl && (
              <span className="text-[rgba(184,164,142,0.4)]">&middot;</span>
            )}
            {privacyUrl && (
              <a
                href={privacyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-[#5C574F] transition-colors"
              >
                Privacy
              </a>
            )}
          </div>
        )}
        {showPoweredBy && (
          <span className="text-[10px] text-[#8A847A]/70">
            Powered by Freehold
          </span>
        )}
      </div>
    )
  }
)

CheckoutFooter.displayName = 'CheckoutFooter'

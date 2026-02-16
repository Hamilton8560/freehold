import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'
import { formatCurrency } from '../../utils/format-currency'
import type { PricingTier } from '../../types'

const pricingCardVariants = cva(
  [
    'relative flex flex-col',
    'bg-white rounded-[14px]',
    'border',
    'p-6 sm:p-8',
    'transition-all duration-200',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-[rgba(184,164,142,0.15)]',
          'shadow-[0_2px_4px_0_rgba(184,164,142,0.08),0_4px_8px_0_rgba(44,40,36,0.04)]',
        ],
        featured: [
          'border-[#B8A48E]',
          'shadow-[0_4px_8px_0_rgba(184,164,142,0.08),0_8px_16px_-4px_rgba(44,40,36,0.06)]',
          'scale-[1.02]',
          'z-10',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const billingPeriodLabels: Record<string, string> = {
  monthly: '/mo',
  yearly: '/yr',
  'one-time': '',
}

export interface PricingCardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof pricingCardVariants>,
    Omit<PricingTier, 'id'> {
  ctaSlot?: ReactNode
  onCtaClick?: () => void
}

export const PricingCard = forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      className,
      variant: variantProp,
      name,
      description,
      price,
      currency,
      billingPeriod,
      billingLabel,
      features,
      badge,
      ctaLabel,
      featured,
      originalPrice,
      ctaSlot,
      onCtaClick,
      ...props
    },
    ref
  ) => {
    const resolvedVariant = variantProp ?? (featured ? 'featured' : 'default')
    const periodLabel = billingLabel || billingPeriodLabels[billingPeriod] || ''

    return (
      <div
        ref={ref}
        className={cn(pricingCardVariants({ variant: resolvedVariant }), className)}
        {...props}
      >
        {badge && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span
              className={cn(
                'inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wide whitespace-nowrap',
                resolvedVariant === 'featured'
                  ? 'bg-[#2C2824] text-[#FAF9F6]'
                  : 'bg-[#F5F3EF] text-[#5C574F] border border-[rgba(184,164,142,0.25)]'
              )}
            >
              {badge}
            </span>
          </div>
        )}

        <div className={cn('text-center', badge && 'mt-2')}>
          <h3 className="font-['DM_Serif_Display',serif] text-xl text-[#2C2824]">
            {name}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-[#5C574F]">{description}</p>
          )}
        </div>

        <div className="text-center py-6">
          {originalPrice !== undefined && (
            <span className="text-sm text-[#8A847A] line-through mr-2">
              {formatCurrency(originalPrice, currency)}
            </span>
          )}
          <div className="flex items-baseline justify-center gap-1">
            <span className="font-['DM_Serif_Display',serif] text-4xl text-[#2C2824]">
              {formatCurrency(price, currency)}
            </span>
            {periodLabel && (
              <span className="text-sm text-[#8A847A]">{periodLabel}</span>
            )}
          </div>
        </div>

        <div className="border-t border-[rgba(184,164,142,0.15)]" />

        <ul className="flex-1 space-y-3 py-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2.5">
              {feature.included !== false ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8DB580"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C4796B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
              <span
                className={cn(
                  'text-sm',
                  feature.included !== false
                    ? 'text-[#2C2824]'
                    : 'text-[#8A847A]'
                )}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        {ctaSlot ?? (
          <button
            onClick={onCtaClick}
            className={cn(
              'w-full py-2.5 px-4 rounded-[10px] text-sm font-medium',
              'transition-colors duration-200',
              resolvedVariant === 'featured'
                ? 'bg-[#2C2824] text-[#FAF9F6] hover:bg-[#3d3832]'
                : 'bg-[#F5F3EF] text-[#2C2824] hover:bg-[#EFECE6] border border-[rgba(184,164,142,0.25)]'
            )}
          >
            {ctaLabel}
          </button>
        )}
      </div>
    )
  }
)

PricingCard.displayName = 'PricingCard'

export { pricingCardVariants }

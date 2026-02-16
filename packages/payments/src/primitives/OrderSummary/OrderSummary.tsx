import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'
import { formatCurrency } from '../../utils/format-currency'
import type { OrderSummaryData } from '../../types'

const orderSummaryVariants = cva(
  ['w-full font-sans'],
  {
    variants: {
      variant: {
        default: 'space-y-3',
        compact: 'space-y-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface OrderSummaryProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof orderSummaryVariants>,
    OrderSummaryData {}

export const OrderSummary = forwardRef<HTMLDivElement, OrderSummaryProps>(
  (
    {
      className,
      variant,
      items,
      subtotal,
      tax,
      discount,
      total,
      currency,
      ...props
    },
    ref
  ) => {
    const isCompact = variant === 'compact'

    return (
      <div
        ref={ref}
        className={cn(orderSummaryVariants({ variant }), className)}
        {...props}
      >
        {/* Line items */}
        <div className={cn('space-y-2', isCompact && 'space-y-1')}>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'text-[#2C2824] font-medium truncate',
                    isCompact ? 'text-sm' : 'text-sm'
                  )}>
                    {item.name}
                  </span>
                  {item.quantity > 1 && (
                    <span className="text-xs text-[#8A847A] shrink-0">
                      x{item.quantity}
                    </span>
                  )}
                </div>
                {!isCompact && item.description && (
                  <p className="text-xs text-[#5C574F] mt-0.5 truncate">
                    {item.description}
                  </p>
                )}
              </div>
              <span className="text-sm text-[#2C2824] font-medium shrink-0">
                {formatCurrency(item.unitPrice * item.quantity, currency)}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-[rgba(184,164,142,0.15)]" />

        {/* Totals */}
        <div className={cn('space-y-1.5', isCompact && 'space-y-1')}>
          <div className="flex justify-between text-sm text-[#5C574F]">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal, currency)}</span>
          </div>

          {discount !== undefined && discount > 0 && (
            <div className="flex justify-between text-sm text-[#8DB580]">
              <span>Discount</span>
              <span>-{formatCurrency(discount, currency)}</span>
            </div>
          )}

          {tax !== undefined && tax > 0 && (
            <div className="flex justify-between text-sm text-[#5C574F]">
              <span>Tax</span>
              <span>{formatCurrency(tax, currency)}</span>
            </div>
          )}

          <div className="border-t border-[rgba(184,164,142,0.15)] pt-1.5">
            <div className="flex justify-between">
              <span className="text-sm font-semibold text-[#2C2824]">Total</span>
              <span className="text-base font-semibold text-[#2C2824]">
                {formatCurrency(total, currency)}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

OrderSummary.displayName = 'OrderSummary'

export { orderSummaryVariants }

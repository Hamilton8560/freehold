import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import {
  VisaIcon,
  MastercardIcon,
  AmexIcon,
  ApplePayIcon,
  GooglePayIcon,
  PayPalIcon,
} from './icons'

const iconMap = {
  visa: VisaIcon,
  mastercard: MastercardIcon,
  amex: AmexIcon,
  'apple-pay': ApplePayIcon,
  'google-pay': GooglePayIcon,
  paypal: PayPalIcon,
} as const

export type PaymentMethod = keyof typeof iconMap

export interface PaymentMethodIconProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  method: PaymentMethod
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'w-8 h-5',
  md: 'w-10 h-6',
  lg: 'w-12 h-8',
} as const

export const PaymentMethodIcon = forwardRef<HTMLSpanElement, PaymentMethodIconProps>(
  ({ className, method, size = 'md', ...props }, ref) => {
    const Icon = iconMap[method]

    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center', className)}
        {...props}
      >
        <Icon className={sizeClasses[size]} aria-label={method} />
      </span>
    )
  }
)

PaymentMethodIcon.displayName = 'PaymentMethodIcon'

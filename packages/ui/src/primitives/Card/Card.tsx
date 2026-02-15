import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const cardVariants = cva(
  [
    'rounded-[14px] transition-all duration-200',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-white',
          'border border-[rgba(184,164,142,0.15)]',
        ],
        elevated: [
          'bg-white',
          'shadow-[0_4px_8px_0_rgba(184,164,142,0.08),0_8px_16px_-4px_rgba(44,40,36,0.06)]',
          'hover:shadow-[0_8px_16px_-4px_rgba(184,164,142,0.12),0_12px_24px_-6px_rgba(44,40,36,0.06)]',
          'hover:-translate-y-0.5',
        ],
        outlined: [
          'bg-transparent',
          'border-2 border-[rgba(184,164,142,0.25)]',
        ],
        stat: [
          'bg-white',
          'border border-[rgba(184,164,142,0.15)]',
          'hover:border-[rgba(184,164,142,0.3)]',
          'hover:-translate-y-0.5',
        ],
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
)

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding }), className)}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

// Card subcomponents
export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'font-heading text-xl font-medium text-[#2C2824]',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-[#5C574F]', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
))
CardContent.displayName = 'CardContent'

export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { cardVariants }

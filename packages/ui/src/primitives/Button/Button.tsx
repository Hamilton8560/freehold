import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'
import { Spinner } from '../Spinner'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-[0.98]',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-[#2C2824] text-[#FAF9F6]',
          'hover:bg-[#3D3832] hover:-translate-y-0.5',
          'focus-visible:ring-[#2C2824]',
        ],
        secondary: [
          'bg-[#F5F3EF] text-[#2C2824]',
          'border border-[rgba(184,164,142,0.25)]',
          'hover:bg-[#EFECE6] hover:-translate-y-0.5',
          'focus-visible:ring-[#B8A48E]',
        ],
        ghost: [
          'text-[#5C574F]',
          'hover:bg-[#F5F3EF] hover:text-[#2C2824]',
          'focus-visible:ring-[#B8A48E]',
        ],
        accent: [
          'bg-[#B8A48E] text-[#2C2824]',
          'hover:bg-[#A08A6E] hover:-translate-y-0.5',
          'focus-visible:ring-[#B8A48E]',
        ],
        danger: [
          'bg-[#FEE2E2] text-[#991B1B]',
          'hover:bg-[#FECACA] hover:-translate-y-0.5',
          'focus-visible:ring-[#F87171]',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-sm rounded-md',
        md: 'h-10 px-4 text-sm rounded-lg',
        lg: 'h-12 px-6 text-base rounded-lg',
        icon: 'h-10 w-10 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, asChild, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Spinner size="sm" className="text-current" />}
        {children}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export { buttonVariants }

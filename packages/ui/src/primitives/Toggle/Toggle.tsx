import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'
import { FormControl } from '../FormControl'

const toggleVariants = cva(
  [
    'relative inline-flex shrink-0 cursor-pointer rounded-full',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-[#B8A48E]/20 focus:ring-offset-1',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        sm: 'h-5 w-8',
        md: 'h-6 w-10',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const thumbVariants = cva(
  [
    'pointer-events-none inline-block rounded-full bg-white shadow-sm',
    'transition-transform duration-200',
  ],
  {
    variants: {
      size: {
        sm: 'h-3.5 w-3.5',
        md: 'h-4.5 w-4.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface ToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof toggleVariants> {
  label?: string
  error?: string
  hint?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, label, error, hint, size, checked = false, onChange, disabled, id, ...props }, ref) => {
    const handleClick = () => {
      if (!disabled) {
        onChange?.(!checked)
      }
    }

    return (
      <FormControl label={label} error={error} hint={hint} id={id} inline onLabelClick={handleClick}>
        {({ id: toggleId }) => (
          <button
            ref={ref}
            id={toggleId}
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={handleClick}
            className={cn(
              toggleVariants({ size }),
              checked ? 'bg-[#2C2824]' : 'bg-[rgba(184,164,142,0.25)]',
              error && 'ring-1 ring-[#F87171] focus:ring-[#F87171]/20',
              className
            )}
            {...props}
          >
            <span
              className={cn(
                thumbVariants({ size }),
                'absolute top-1/2 -translate-y-1/2',
                checked
                  ? size === 'sm' ? 'translate-x-[15px]' : 'translate-x-[19px]'
                  : 'translate-x-[3px]'
              )}
            />
          </button>
        )}
      </FormControl>
    )
  }
)

Toggle.displayName = 'Toggle'

export { toggleVariants }

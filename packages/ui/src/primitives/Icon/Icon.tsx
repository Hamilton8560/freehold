import { forwardRef, type SVGProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'
import { iconPaths, type IconName } from './icons'

const iconVariants = cva('inline-block shrink-0', {
  variants: {
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
    },
    color: {
      default: 'text-[#B8A48E]',
      primary: 'text-[#2C2824]',
      secondary: 'text-[#5C574F]',
      muted: 'text-[#8A847A]',
      success: 'text-[#8DB580]',
      warning: 'text-[#D4B86A]',
      error: 'text-[#C4796B]',
      inherit: 'text-inherit',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'default',
  },
})

export interface IconProps
  extends Omit<SVGProps<SVGSVGElement>, 'color'>,
    VariantProps<typeof iconVariants> {
  name: IconName
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, size, color, className, ...props }, ref) => {
    const IconComponent = iconPaths[name]

    if (!IconComponent) {
      console.warn(`Icon "${name}" not found`)
      return null
    }

    return (
      <IconComponent
        ref={ref}
        className={cn(iconVariants({ size, color }), className)}
        aria-hidden="true"
        {...props}
      />
    )
  }
)

Icon.displayName = 'Icon'

export { iconVariants }
export type { IconName }

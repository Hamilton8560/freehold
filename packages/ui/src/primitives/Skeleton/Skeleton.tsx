import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const skeletonVariants = cva(
  ['animate-skeleton-pulse', 'bg-[#E5DDD1]'],
  {
    variants: {
      variant: {
        line: 'h-4 rounded-md',
        circle: 'rounded-full',
        rectangle: 'rounded-[14px]',
      },
    },
    defaultVariants: {
      variant: 'rectangle',
    },
  }
)

export interface SkeletonProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number
  height?: string | number
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, width, height, style, ...props }, ref) => {
    const computedStyle = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      ...style,
    }

    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant }), className)}
        style={computedStyle}
        aria-hidden="true"
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'

export { skeletonVariants }

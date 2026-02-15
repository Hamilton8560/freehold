import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import { Skeleton } from './Skeleton'

const spacingMap = {
  sm: 'space-y-1',
  md: 'space-y-2',
  lg: 'space-y-3',
}

export interface SkeletonTextProps extends HTMLAttributes<HTMLDivElement> {
  lines?: number
  spacing?: 'sm' | 'md' | 'lg'
  lastLineWidth?: string
}

export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  (
    { className, lines = 3, spacing = 'md', lastLineWidth = '60%', ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col', spacingMap[spacing], className)}
        aria-hidden="true"
        {...props}
      >
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            variant="line"
            width={index === lines - 1 ? lastLineWidth : '100%'}
          />
        ))}
      </div>
    )
  }
)

SkeletonText.displayName = 'SkeletonText'

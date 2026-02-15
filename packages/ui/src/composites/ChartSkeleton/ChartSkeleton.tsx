'use client'

import { Skeleton } from '../../primitives/Skeleton'
import { cn } from '../../utils/cn'

export interface ChartSkeletonProps {
  variant?: 'pie' | 'bar' | 'line'
  height?: number
  showLegend?: boolean
  className?: string
}

export function ChartSkeleton({
  variant = 'bar',
  height = 250,
  showLegend = true,
  className,
}: ChartSkeletonProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Chart area */}
      <div className="relative" style={{ height }}>
        {variant === 'pie' ? (
          /* Pie/Donut chart skeleton */
          <div className="flex h-full items-center justify-center">
            <Skeleton variant="circle" width={180} height={180} />
          </div>
        ) : (
          /* Bar/Line chart skeleton */
          <div className="flex h-full items-end justify-between gap-2 px-8 pb-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <Skeleton
                  variant="rectangle"
                  width="100%"
                  height={`${40 + Math.random() * 50}%`}
                  className="rounded-t-md"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="mt-4 flex items-center justify-center gap-6">
          {Array.from({ length: variant === 'pie' ? 3 : 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton variant="rectangle" width={12} height={12} className="rounded-sm" />
              <Skeleton variant="line" width={60} height={14} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

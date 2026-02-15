'use client'

import { Card } from '../../primitives/Card'
import { Skeleton } from '../../primitives/Skeleton'
import { cn } from '../../utils/cn'

export interface StatCardSkeletonProps {
  showTrend?: boolean
  className?: string
}

export function StatCardSkeleton({ showTrend = false, className }: StatCardSkeletonProps) {
  return (
    <Card variant="stat" padding="md" className={cn('', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Label */}
          <Skeleton variant="line" width="60%" height={14} />
          {/* Value */}
          <Skeleton variant="line" width="80%" height={28} className="mt-2" />
          {/* Trend */}
          {showTrend && (
            <Skeleton variant="line" width="40%" height={12} className="mt-2" />
          )}
        </div>
        {/* Icon */}
        <Skeleton variant="rectangle" width={40} height={40} className="rounded-[10px]" />
      </div>
    </Card>
  )
}

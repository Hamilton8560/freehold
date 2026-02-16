import { useMemo } from 'react'
import { StatCard } from '../../primitives/StatCard'
import { StatCardSkeleton } from '../../composites/StatCardSkeleton'
import type { DashboardStatConfig } from './types'

const GRID_COL_CLASSES: Record<number, string> = {
  1: 'xl:grid-cols-1',
  2: 'xl:grid-cols-2',
  3: 'xl:grid-cols-3',
  4: 'xl:grid-cols-4',
  5: 'xl:grid-cols-5',
  6: 'xl:grid-cols-6',
  7: 'xl:grid-cols-7',
}

interface DashboardStatsGridProps<T> {
  data: T[]
  stats: DashboardStatConfig<T>[]
  columns?: number
  isLoading?: boolean
}

export function DashboardStatsGrid<T>({
  data,
  stats,
  columns,
  isLoading,
}: DashboardStatsGridProps<T>) {
  const computedStats = useMemo(
    () =>
      stats.map((stat) => ({
        key: stat.key,
        label: stat.label,
        value: stat.getValue(data),
        format: stat.format,
        icon: stat.icon,
        trend: stat.getTrend?.(data),
      })),
    [data, stats]
  )

  const colCount = columns ?? stats.length
  const xlClass = GRID_COL_CLASSES[colCount] ?? `xl:grid-cols-${colCount}`

  if (isLoading) {
    return (
      <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 ${xlClass}`}>
        {Array.from({ length: stats.length }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 ${xlClass}`}>
      {computedStats.map((s) => (
        <StatCard
          key={s.key}
          label={s.label}
          value={s.value}
          format={s.format}
          icon={s.icon}
          trend={s.trend}
        />
      ))}
    </div>
  )
}

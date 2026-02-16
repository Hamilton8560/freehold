import { type ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { Spinner } from '../../primitives/Spinner'

export interface ChartContainerProps {
  children: ReactNode
  className?: string
  height?: number
  isLoading?: boolean
  isEmpty?: boolean
  emptyMessage?: string
}

export function ChartContainer({
  children,
  className,
  height = 300,
  isLoading = false,
  isEmpty = false,
  emptyMessage = 'No data available',
}: ChartContainerProps) {
  if (isLoading) {
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded-[14px] border border-[rgba(184,164,142,0.15)] bg-white',
          className
        )}
        style={{ height }}
      >
        <div className="flex items-center gap-2 text-[#B8A48E]">
          <Spinner size="sm" className="text-current" />
          <span className="text-sm">Loading chart...</span>
        </div>
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded-[14px] border border-[rgba(184,164,142,0.15)] bg-white',
          className
        )}
        style={{ height }}
      >
        <p className="text-sm text-[#8A847A]">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      {children}
    </div>
  )
}

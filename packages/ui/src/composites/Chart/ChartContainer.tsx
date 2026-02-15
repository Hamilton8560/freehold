import { type ReactNode } from 'react'
import { cn } from '../../utils/cn'

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
          <svg
            className="h-5 w-5 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
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

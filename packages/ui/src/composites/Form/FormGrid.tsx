import { type ReactNode, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface FormGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns on desktop (stacks to 1 on mobile) */
  columns?: 2 | 3 | 4
  /** Fields within this grid */
  children: ReactNode
}

const columnMap = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
} as const

export function FormGrid({
  columns = 2,
  children,
  className,
  ...props
}: FormGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-x-4 gap-y-5',
        columnMap[columns],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

FormGrid.displayName = 'FormGrid'

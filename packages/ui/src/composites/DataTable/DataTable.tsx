import { type ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface Column<T> {
  key: string
  header: string
  width?: string
  align?: 'left' | 'center' | 'right'
  render?: (item: T, index: number) => ReactNode
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyExtractor: (item: T) => string | number
  className?: string
  emptyMessage?: string
  onRowClick?: (item: T) => void
  isLoading?: boolean
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  className,
  emptyMessage = 'No data available',
  onRowClick,
  isLoading,
}: DataTableProps<T>) {
  const getAlignment = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center':
        return 'text-center'
      case 'right':
        return 'text-right'
      default:
        return 'text-left'
    }
  }

  if (isLoading) {
    return (
      <div className={cn('w-full', className)}>
        <div className="flex items-center justify-center py-12">
          <svg
            className="h-8 w-8 animate-spin text-[#B8A48E]"
            xmlns="http://www.w3.org/2000/svg"
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
        </div>
      </div>
    )
  }

  return (
    <div className={cn('w-full overflow-hidden rounded-[14px] border border-[rgba(184,164,142,0.15)]', className)}>
      <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(184,164,142,0.15)] bg-[#F9F7F4]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'px-3 py-2.5 sm:px-4 sm:py-3 text-xs font-semibold uppercase tracking-wider text-[#5C574F] whitespace-nowrap',
                    getAlignment(column.align)
                  )}
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(184,164,142,0.1)] bg-white">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-sm text-[#8A847A]"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={keyExtractor(item)}
                  className={cn(
                    'transition-colors duration-150',
                    onRowClick && 'cursor-pointer hover:bg-[#FAF9F6]'
                  )}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        'px-3 py-2.5 sm:px-4 sm:py-3 text-sm text-[#2C2824]',
                        getAlignment(column.align)
                      )}
                    >
                      {column.render
                        ? column.render(item, index)
                        : String((item as Record<string, unknown>)[column.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

DataTable.displayName = 'DataTable'

'use client'

import { Skeleton } from '../../primitives/Skeleton'
import { cn } from '../../utils/cn'

export interface DataTableSkeletonProps {
  rows?: number
  columns?: number
  showHeader?: boolean
  className?: string
}

export function DataTableSkeleton({
  rows = 5,
  columns = 6,
  showHeader = true,
  className,
}: DataTableSkeletonProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Table */}
      <div className="overflow-hidden rounded-[14px] border border-[rgba(184,164,142,0.2)]">
        <table className="w-full">
          {/* Header */}
          {showHeader && (
            <thead className="bg-[#F5F3EF]">
              <tr>
                {Array.from({ length: columns }).map((_, i) => (
                  <th key={i} className="px-4 py-3">
                    <Skeleton variant="line" width="70%" height={14} />
                  </th>
                ))}
              </tr>
            </thead>
          )}
          {/* Body */}
          <tbody className="divide-y divide-[rgba(184,164,142,0.15)]">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex} className="bg-white">
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="px-4 py-3">
                    {colIndex === 0 ? (
                      /* First column - avatar + text */
                      <div className="flex items-center gap-3">
                        <Skeleton variant="circle" width={36} height={36} />
                        <div className="flex-1">
                          <Skeleton variant="line" width="80%" height={14} />
                          <Skeleton variant="line" width="50%" height={12} className="mt-1" />
                        </div>
                      </div>
                    ) : colIndex === columns - 1 ? (
                      /* Last column - actions */
                      <div className="flex items-center justify-end gap-2">
                        <Skeleton variant="rectangle" width={70} height={28} className="rounded-md" />
                        <Skeleton variant="rectangle" width={32} height={28} className="rounded-md" />
                      </div>
                    ) : colIndex === columns - 2 ? (
                      /* Second to last - badge */
                      <div className="flex justify-center">
                        <Skeleton variant="rectangle" width={70} height={22} className="rounded-full" />
                      </div>
                    ) : (
                      /* Regular cells */
                      <Skeleton
                        variant="line"
                        width={`${60 + Math.random() * 30}%`}
                        height={14}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

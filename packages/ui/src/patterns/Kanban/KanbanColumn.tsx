'use client'

import type { ReactNode } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { cn } from '../../utils/cn'
import { KanbanCard } from './KanbanCard'
import type { KanbanColumnConfig } from './types'

interface KanbanColumnProps<T> {
  column: KanbanColumnConfig<T>
  keyExtractor: (item: T) => string
  renderCard: (item: T) => ReactNode
  columnHeader?: (column: KanbanColumnConfig<T>, count: number) => ReactNode
  emptyColumn?: ReactNode
}

export function KanbanColumn<T>({
  column,
  keyExtractor,
  renderCard,
  columnHeader,
  emptyColumn,
}: KanbanColumnProps<T>) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id })
  const itemIds = column.items.map(keyExtractor)

  return (
    <div className="flex flex-col min-w-[280px] max-w-[320px] w-[280px] shrink-0">
      {/* Header */}
      <div className="px-3 py-2 mb-2">
        {columnHeader ? (
          columnHeader(column, column.items.length)
        ) : (
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-text-primary">{column.title}</h3>
            <span className="text-xs font-medium text-text-tertiary bg-background-secondary rounded-full px-2 py-0.5">
              {column.items.length}
              {column.limit != null && ` / ${column.limit}`}
            </span>
          </div>
        )}
      </div>

      {/* Card list */}
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={cn(
            'flex-1 flex flex-col gap-2 p-2 rounded-xl min-h-[120px] transition-colors duration-200',
            'bg-background-secondary',
            isOver && 'bg-sand-100 ring-2 ring-sand-300/50'
          )}
        >
          {column.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-sm text-text-tertiary py-8">
              {emptyColumn ?? 'No items'}
            </div>
          ) : (
            column.items.map((item) => (
              <KanbanCard key={keyExtractor(item)} id={keyExtractor(item)}>
                {renderCard(item)}
              </KanbanCard>
            ))
          )}
        </div>
      </SortableContext>
    </div>
  )
}

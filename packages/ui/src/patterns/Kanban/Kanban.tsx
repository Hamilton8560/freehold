'use client'

import { useState, useCallback, useMemo } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable'
import { cn } from '../../utils/cn'
import { KanbanColumn } from './KanbanColumn'
import { KanbanCardOverlay } from './KanbanCard'
import type { KanbanProps } from './types'

export function Kanban<T>({
  columns,
  keyExtractor,
  renderCard,
  onCardMove,
  columnHeader,
  emptyColumn,
  className,
}: KanbanProps<T>) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  // Build a lookup: cardId → { item, columnId }
  const cardLookup = useMemo(() => {
    const map = new Map<string, { item: T; columnId: string }>()
    for (const col of columns) {
      for (const item of col.items) {
        map.set(keyExtractor(item), { item, columnId: col.id })
      }
    }
    return map
  }, [columns, keyExtractor])

  // Find which column a given sortable id belongs to
  const findColumnId = useCallback(
    (id: string): string | undefined => {
      // Check if it's a column id first
      if (columns.some((c) => c.id === id)) return id
      // Otherwise look up as a card id
      return cardLookup.get(id)?.columnId
    },
    [columns, cardLookup]
  )

  const activeItem = activeId ? cardLookup.get(activeId)?.item : undefined

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(String(event.active.id))
  }, [])

  const handleDragOver = useCallback(
    (_event: DragOverEvent) => {
      // Visual feedback is handled by useDroppable isOver in KanbanColumn
    },
    []
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveId(null)

      const { active, over } = event
      if (!over) return

      const activeCardId = String(active.id)
      const overId = String(over.id)

      const fromColumnId = findColumnId(activeCardId)
      let toColumnId = findColumnId(overId)

      if (!fromColumnId || !toColumnId) return

      // If dropped on a column header / empty area, toColumnId is the column itself
      if (columns.some((c) => c.id === overId)) {
        toColumnId = overId
      }

      const toColumn = columns.find((c) => c.id === toColumnId)
      if (!toColumn) return

      // Calculate new index
      let newIndex: number
      if (fromColumnId === toColumnId) {
        // Reorder within same column
        const itemIds = toColumn.items.map(keyExtractor)
        const oldIndex = itemIds.indexOf(activeCardId)
        const overIndex = itemIds.indexOf(overId)
        if (oldIndex === -1 || overIndex === -1) return
        if (oldIndex === overIndex) return
        const reordered = arrayMove(itemIds, oldIndex, overIndex)
        newIndex = reordered.indexOf(activeCardId)
      } else {
        // Moving to a different column
        const toItemIds = toColumn.items.map(keyExtractor)
        const overIndex = toItemIds.indexOf(overId)
        newIndex = overIndex >= 0 ? overIndex : toColumn.items.length
      }

      onCardMove(activeCardId, fromColumnId, toColumnId, newIndex)
    },
    [columns, keyExtractor, findColumnId, onCardMove]
  )

  const handleDragCancel = useCallback(() => {
    setActiveId(null)
  }, [])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div
        className={cn(
          'flex gap-4 overflow-x-auto pb-4',
          className
        )}
      >
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            keyExtractor={keyExtractor}
            renderCard={renderCard}
            columnHeader={columnHeader}
            emptyColumn={emptyColumn}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeId && activeItem ? (
          <KanbanCardOverlay>{renderCard(activeItem)}</KanbanCardOverlay>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

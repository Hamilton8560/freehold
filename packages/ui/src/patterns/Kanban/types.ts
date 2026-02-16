import type { ReactNode } from 'react'

// --- Column Configuration ---
export interface KanbanColumnConfig<T> {
  /** Unique identifier for this column */
  id: string
  /** Display title for the column header */
  title: string
  /** Items in this column */
  items: T[]
  /** Optional WIP limit — displayed in header */
  limit?: number
}

// --- Main Kanban Props ---
export interface KanbanProps<T> {
  /** Column definitions with items */
  columns: KanbanColumnConfig<T>[]
  /** Extract a unique string key from each item */
  keyExtractor: (item: T) => string
  /** Render custom card content */
  renderCard: (item: T) => ReactNode
  /** Called when a card is moved via drag-and-drop */
  onCardMove: (
    cardId: string,
    fromColumnId: string,
    toColumnId: string,
    newIndex: number
  ) => void
  /** Custom column header renderer */
  columnHeader?: (column: KanbanColumnConfig<T>, count: number) => ReactNode
  /** Content shown when a column has no items */
  emptyColumn?: ReactNode
  /** Additional CSS classes on the board container */
  className?: string
}

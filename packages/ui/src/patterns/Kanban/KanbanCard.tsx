'use client'

import type { ReactNode } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cva } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const kanbanCardVariants = cva(
  [
    'rounded-[14px] border bg-white p-3 transition-all duration-200',
    'border-[rgba(184,164,142,0.15)]',
    'cursor-grab active:cursor-grabbing',
  ],
  {
    variants: {
      state: {
        default: 'shadow-warm-sm hover:shadow-warm-md hover:-translate-y-0.5',
        dragging: 'shadow-warm-lg scale-[1.02] opacity-50',
        overlay: 'shadow-warm-lg scale-[1.03]',
      },
    },
    defaultVariants: { state: 'default' },
  }
)

interface KanbanCardProps {
  id: string
  children: ReactNode
}

export function KanbanCard({ id, children }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(kanbanCardVariants({ state: isDragging ? 'dragging' : 'default' }))}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  )
}

interface KanbanCardOverlayProps {
  children: ReactNode
}

export function KanbanCardOverlay({ children }: KanbanCardOverlayProps) {
  return (
    <div className={cn(kanbanCardVariants({ state: 'overlay' }))}>
      {children}
    </div>
  )
}

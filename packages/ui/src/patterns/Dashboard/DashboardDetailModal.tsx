'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogClose,
} from '../../primitives/Dialog'
import { Button } from '../../primitives/Button'
import type { DashboardDetailConfig } from './types'

interface DashboardDetailModalProps<T> {
  item: T | null
  open: boolean
  onOpenChange: (open: boolean) => void
  detail: DashboardDetailConfig<T>
}

export function DashboardDetailModal<T>({
  item,
  open,
  onOpenChange,
  detail,
}: DashboardDetailModalProps<T>) {
  if (!item) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size={detail.size ?? 'md'}>
        <DialogHeader>{detail.renderHeader(item)}</DialogHeader>
        <DialogBody>{detail.renderContent(item)}</DialogBody>
        <DialogFooter>
          {detail.renderFooter ? (
            detail.renderFooter(item, () => onOpenChange(false))
          ) : (
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

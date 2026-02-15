import { type ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
} from '../../primitives/Dialog'
import { Button } from '../../primitives/Button'
import { cn } from '../../utils/cn'

export interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children?: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void | Promise<void>
  onCancel?: () => void
  variant?: 'default' | 'danger'
  icon?: ReactNode
  isConfirming?: boolean
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'default',
  icon,
  isConfirming = false,
}: ConfirmDialogProps) {
  const handleCancel = () => {
    onCancel?.()
    onOpenChange(false)
  }

  const handleConfirm = async () => {
    await onConfirm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="sm" showCloseButton={false}>
        <DialogHeader>
          <div className="flex items-start gap-4">
            {icon && (
              <div
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                  variant === 'danger' ? 'bg-[#FEE2E2]' : 'bg-[#F5F3EF]'
                )}
              >
                {icon}
              </div>
            )}
            <div className="flex flex-col space-y-1.5">
              <DialogTitle>{title}</DialogTitle>
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </div>
          </div>
        </DialogHeader>
        {children && <DialogBody>{children}</DialogBody>}
        <DialogFooter>
          <Button variant="secondary" onClick={handleCancel}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            onClick={handleConfirm}
            isLoading={isConfirming}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

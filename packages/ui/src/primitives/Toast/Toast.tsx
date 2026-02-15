'use client'

import { forwardRef } from 'react'
import * as RadixToast from '@radix-ui/react-toast'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const toastVariants = cva(
  [
    'group pointer-events-auto relative flex w-full items-center justify-between gap-4',
    'rounded-[14px] border p-4',
    'shadow-[0_8px_16px_-4px_rgba(184,164,142,0.12),0_12px_24px_-6px_rgba(44,40,36,0.06)]',
    'data-[state=open]:animate-toast-in',
    'data-[state=closed]:animate-toast-out',
    'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
    'data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform',
    'data-[swipe=end]:animate-toast-swipe-out',
  ],
  {
    variants: {
      variant: {
        success: ['bg-[#D1FAE5] border-[#6EE7B7] text-[#065F46]'],
        error: ['bg-[#FEE2E2] border-[#FCA5A5] text-[#991B1B]'],
        warning: ['bg-[#FEF3C7] border-[#FCD34D] text-[#92400E]'],
        info: ['bg-[#DBEAFE] border-[#93C5FD] text-[#1E40AF]'],
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
)

export interface ToastProps extends VariantProps<typeof toastVariants> {
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  duration?: number
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

export const Toast = forwardRef<HTMLLIElement, ToastProps>(
  (
    {
      className,
      variant,
      title,
      description,
      action,
      duration = 5000,
      open,
      onOpenChange,
    },
    ref
  ) => {
    return (
      <RadixToast.Root
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        duration={duration}
        open={open}
        onOpenChange={onOpenChange}
      >
        <div className="flex-1">
          <RadixToast.Title className="text-sm font-medium">
            {title}
          </RadixToast.Title>
          {description && (
            <RadixToast.Description className="mt-1 text-sm opacity-90">
              {description}
            </RadixToast.Description>
          )}
        </div>
        <div className="flex items-center gap-2">
          {action && (
            <RadixToast.Action asChild altText={action.label}>
              <button
                onClick={action.onClick}
                className={cn(
                  'rounded-md px-3 py-1.5 text-xs font-medium',
                  'bg-white/20 hover:bg-white/30',
                  'transition-colors duration-200'
                )}
              >
                {action.label}
              </button>
            </RadixToast.Action>
          )}
          <RadixToast.Close asChild>
            <button
              className={cn(
                'rounded-md p-1',
                'hover:bg-white/20',
                'transition-colors duration-200'
              )}
              aria-label="Dismiss"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </RadixToast.Close>
        </div>
      </RadixToast.Root>
    )
  }
)

Toast.displayName = 'Toast'

const positionClasses = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
}

export type ToastPosition = keyof typeof positionClasses

export interface ToastViewportProps {
  position?: ToastPosition
  className?: string
}

export function ToastViewport({
  position = 'bottom-right',
  className,
}: ToastViewportProps) {
  return (
    <RadixToast.Viewport
      className={cn(
        'fixed z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4',
        'sm:max-w-[420px]',
        positionClasses[position],
        className
      )}
    />
  )
}

export { toastVariants }

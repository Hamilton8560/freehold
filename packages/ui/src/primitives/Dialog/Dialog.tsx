import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const overlayVariants = cva([
  'fixed inset-0 z-50',
  'bg-[#2C2824]/50',
  'data-[state=open]:animate-dialog-overlay-in',
  'data-[state=closed]:animate-dialog-overlay-out',
])

const dialogContentVariants = cva(
  [
    'fixed left-[50%] top-[50%] z-50',
    'translate-x-[-50%] translate-y-[-50%]',
    'bg-white rounded-[14px]',
    'shadow-[0_16px_32px_-8px_rgba(184,164,142,0.15),0_24px_48px_-12px_rgba(44,40,36,0.08)]',
    'border border-[rgba(184,164,142,0.15)]',
    'data-[state=open]:animate-dialog-content-in',
    'data-[state=closed]:animate-dialog-content-out',
    'focus:outline-none',
  ],
  {
    variants: {
      size: {
        sm: 'w-full max-w-sm',
        md: 'w-full max-w-md',
        lg: 'w-full max-w-lg',
        xl: 'w-full max-w-xl',
        full: 'w-[calc(100%-2rem)] max-w-4xl max-h-[calc(100%-2rem)]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
  modal?: boolean
}

export function Dialog({ children, ...props }: DialogProps) {
  return <RadixDialog.Root {...props}>{children}</RadixDialog.Root>
}

export const DialogTrigger = RadixDialog.Trigger

export interface DialogContentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogContentVariants> {
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  (
    {
      className,
      size,
      showCloseButton = true,
      closeOnOverlayClick = true,
      children,
      ...props
    },
    ref
  ) => (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className={cn(overlayVariants())} />
      <RadixDialog.Content
        ref={ref}
        className={cn(dialogContentVariants({ size }), className)}
        onPointerDownOutside={
          closeOnOverlayClick ? undefined : (e) => e.preventDefault()
        }
        {...props}
      >
        {children}
        {showCloseButton && (
          <RadixDialog.Close asChild>
            <button
              className={cn(
                'absolute right-4 top-4 h-8 w-8',
                'inline-flex items-center justify-center rounded-lg',
                'text-[#5C574F] hover:bg-[#F5F3EF] hover:text-[#2C2824]',
                'transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8A48E]'
              )}
              aria-label="Close"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </RadixDialog.Close>
        )}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  )
)
DialogContent.displayName = 'DialogContent'

export const DialogHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6 pb-0', className)}
    {...props}
  />
))
DialogHeader.displayName = 'DialogHeader'

export const DialogTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <RadixDialog.Title
    ref={ref}
    className={cn('font-heading text-xl font-medium text-[#2C2824]', className)}
    {...props}
  />
))
DialogTitle.displayName = 'DialogTitle'

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <RadixDialog.Description
    ref={ref}
    className={cn('text-sm text-[#5C574F]', className)}
    {...props}
  />
))
DialogDescription.displayName = 'DialogDescription'

export const DialogBody = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6', className)} {...props} />
))
DialogBody.displayName = 'DialogBody'

export const DialogFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-end gap-3 p-6 pt-0', className)}
    {...props}
  />
))
DialogFooter.displayName = 'DialogFooter'

export const DialogClose = RadixDialog.Close

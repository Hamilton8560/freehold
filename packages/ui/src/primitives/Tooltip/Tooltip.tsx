'use client'

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import * as RadixTooltip from '@radix-ui/react-tooltip'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const tooltipContentVariants = cva(
  [
    'z-50 rounded-lg px-3 py-1.5',
    'text-sm text-[#2C2824]',
    'bg-white',
    'border border-[rgba(184,164,142,0.2)]',
    'shadow-[0_4px_12px_-2px_rgba(184,164,142,0.15),0_2px_4px_-1px_rgba(44,40,36,0.06)]',
    'animate-in fade-in-0 zoom-in-95',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
    'data-[side=bottom]:slide-in-from-top-2',
    'data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2',
    'data-[side=top]:slide-in-from-bottom-2',
  ],
  {
    variants: {
      size: {
        sm: 'text-xs px-2 py-1',
        md: 'text-sm px-3 py-1.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface TooltipProviderProps {
  children: ReactNode
  delayDuration?: number
  skipDelayDuration?: number
}

export function TooltipProvider({
  children,
  delayDuration = 300,
  skipDelayDuration = 150,
}: TooltipProviderProps) {
  return (
    <RadixTooltip.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
    >
      {children}
    </RadixTooltip.Provider>
  )
}

export interface TooltipProps {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Tooltip({ children, ...props }: TooltipProps) {
  return <RadixTooltip.Root {...props}>{children}</RadixTooltip.Root>
}

export const TooltipTrigger = RadixTooltip.Trigger

export interface TooltipContentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltipContentVariants> {
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
}

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, size, side = 'top', sideOffset = 6, align = 'center', children, ...props }, ref) => (
    <RadixTooltip.Portal>
      <RadixTooltip.Content
        ref={ref}
        side={side}
        sideOffset={sideOffset}
        align={align}
        className={cn(tooltipContentVariants({ size }), className)}
        {...props}
      >
        {children}
      </RadixTooltip.Content>
    </RadixTooltip.Portal>
  )
)
TooltipContent.displayName = 'TooltipContent'

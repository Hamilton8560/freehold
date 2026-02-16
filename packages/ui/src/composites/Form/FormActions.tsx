import { type ReactNode, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface FormActionsProps extends HTMLAttributes<HTMLDivElement> {
  /** Alignment: left, center, right, or space-between */
  align?: 'left' | 'center' | 'right' | 'between'
  /** Buttons / actions */
  children: ReactNode
}

export function FormActions({
  align = 'right',
  children,
  className,
  ...props
}: FormActionsProps) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse gap-3 pt-2 sm:flex-row',
        align === 'left' && 'sm:justify-start',
        align === 'center' && 'sm:justify-center',
        align === 'right' && 'sm:justify-end',
        align === 'between' && 'sm:justify-between',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

FormActions.displayName = 'FormActions'

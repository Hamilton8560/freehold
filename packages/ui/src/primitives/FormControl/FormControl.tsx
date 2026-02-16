import { type ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface FormControlProps {
  label?: string
  error?: string
  hint?: string
  id?: string
  className?: string
  /** For inline controls like Checkbox/Toggle where label sits beside the control */
  inline?: boolean
  /** Click handler for inline label (needed for non-input controls like Toggle) */
  onLabelClick?: () => void
  children: (props: { id: string; descriptionId?: string }) => ReactNode
}

export function FormControl({
  label,
  error,
  hint,
  id,
  className,
  inline = false,
  onLabelClick,
  children,
}: FormControlProps) {
  const controlId = id || label?.toLowerCase().replace(/\s+/g, '-') || ''
  const descriptionId = (error || hint) ? `${controlId}-description` : undefined

  return (
    <div className={cn('w-full', className)}>
      {inline ? (
        <div className="flex items-center gap-2">
          {children({ id: controlId, descriptionId })}
          {label && (
            <label
              htmlFor={controlId}
              className="text-sm font-medium text-[#2C2824] cursor-pointer"
              onClick={onLabelClick}
            >
              {label}
            </label>
          )}
        </div>
      ) : (
        <>
          {label && (
            <label
              htmlFor={controlId}
              className="mb-1.5 block text-sm font-medium text-[#2C2824]"
            >
              {label}
            </label>
          )}
          {children({ id: controlId, descriptionId })}
        </>
      )}
      {(error || hint) && (
        <p
          id={descriptionId}
          className={cn(
            'mt-1.5 text-sm',
            error ? 'text-[#991B1B]' : 'text-[#5C574F]'
          )}
        >
          {error || hint}
        </p>
      )}
    </div>
  )
}

FormControl.displayName = 'FormControl'

'use client'

import {
  useState,
  useEffect,
  useId,
  useCallback,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type ChangeEvent,
  type FocusEvent,
} from 'react'
import { cn } from '../../utils/cn'
import { useFormContext, type ValidationRule } from './Form'

export interface FormFieldProps {
  /** Field name — must match the input's `name` attribute */
  name: string
  /** Label text displayed above/beside the field */
  label?: string
  /** Static hint text shown below the field */
  hint?: string
  /** Override error message (takes priority over validation) */
  error?: string
  /** Mark field as required (shows asterisk, validates on submit) */
  required?: boolean | string
  /** Mark field as optional (shows "Optional" badge) */
  optional?: boolean
  /** Max character count — shows counter below field */
  maxLength?: number
  /** Validation rules for this field */
  rules?: ValidationRule
  /** The form control element (Input, Select, Textarea, Checkbox, Toggle) */
  children: ReactNode
  /** Additional class name */
  className?: string
}

export function FormField({
  name,
  label,
  hint,
  error: errorOverride,
  required,
  optional,
  maxLength,
  rules,
  children,
  className,
}: FormFieldProps) {
  const formCtx = useFormContext()
  const autoId = useId()
  const fieldId = `field-${name}-${autoId}`
  const descriptionId = `${fieldId}-desc`

  // Merge required into rules
  const mergedRules: ValidationRule = {
    ...rules,
    ...(required != null ? { required } : {}),
    ...(maxLength != null && !rules?.maxLength ? { maxLength } : {}),
  }

  // Register/unregister with form context
  useEffect(() => {
    if (formCtx) {
      formCtx.registerField(name, mergedRules)
      return () => formCtx.unregisterField(name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, required, maxLength, rules?.minLength, rules?.maxLength, rules?.pattern, rules?.required])

  // Determine error to display
  const contextError = formCtx?.errors[name]
  const isTouched = formCtx?.touched[name] ?? false
  const displayError =
    errorOverride || (isTouched && contextError ? contextError.message : undefined)

  // Validate on blur
  const handleBlur = useCallback(
    (e: FocusEvent) => {
      if (!formCtx) return
      formCtx.setFieldTouched(name)
      const value =
        (e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value ?? ''
      const errorMsg = formCtx.validateField(name, value)
      formCtx.setFieldError(name, errorMsg ? { message: errorMsg } : null)
    },
    [formCtx, name]
  )

  // Track value for character count
  const handleChange = useCallback(
    (e: ChangeEvent) => {
      if (!formCtx) return
      // Clear error on change if field was touched
      if (isTouched) {
        const value =
          (e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value ?? ''
        const errorMsg = formCtx.validateField(name, value)
        formCtx.setFieldError(name, errorMsg ? { message: errorMsg } : null)
      }
    },
    [formCtx, name, isTouched]
  )

  // Clone child element to inject props
  const child = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        id: fieldId,
        name,
        'aria-invalid': displayError ? true : undefined,
        'aria-describedby': (displayError || hint) ? descriptionId : undefined,
        // Don't override label — FormField handles it
        label: undefined,
        error: undefined,
        hint: undefined,
        onBlur: (e: FocusEvent) => {
          handleBlur(e)
          const childProps = (children as ReactElement<Record<string, unknown>>).props
          if (typeof childProps.onBlur === 'function') {
            ;(childProps.onBlur as (e: FocusEvent) => void)(e)
          }
        },
        onChange: (e: ChangeEvent) => {
          handleChange(e)
          const childProps = (children as ReactElement<Record<string, unknown>>).props
          if (typeof childProps.onChange === 'function') {
            ;(childProps.onChange as (e: ChangeEvent) => void)(e)
          }
        },
      })
    : children

  // Layout from context
  const isHorizontal = formCtx?.layout === 'horizontal'

  // Get current value for character count (read from DOM via name)
  const showCharCount = maxLength != null

  return (
    <div
      className={cn(
        'w-full',
        isHorizontal && 'sm:grid sm:grid-cols-[140px_1fr] sm:gap-4 sm:items-start',
        className
      )}
    >
      {/* Label */}
      {label && (
        <label
          htmlFor={fieldId}
          className={cn(
            'block text-sm font-medium text-[#2C2824]',
            isHorizontal ? 'mb-1.5 sm:mb-0 sm:pt-2.5' : 'mb-1.5'
          )}
        >
          {label}
          {required && (
            <span className="ml-0.5 text-[#F87171]" aria-hidden="true">
              *
            </span>
          )}
          {optional && !required && (
            <span className="ml-1.5 text-xs font-normal text-[#8A847A]">Optional</span>
          )}
        </label>
      )}

      {/* Field + hints */}
      <div className="min-w-0">
        {child}

        {/* Bottom row: error/hint + character count */}
        <div
          className={cn(
            'mt-1.5 flex items-start gap-3',
            !displayError && !hint && !showCharCount && 'hidden'
          )}
        >
          {/* Error or hint */}
          <p
            id={descriptionId}
            className={cn(
              'flex-1 text-sm',
              displayError ? 'text-[#991B1B]' : 'text-[#5C574F]',
              !displayError && !hint && 'invisible'
            )}
          >
            {displayError || hint || '\u00A0'}
          </p>

          {/* Character count */}
          {showCharCount && (
            <CharacterCount name={name} maxLength={maxLength!} hasError={!!displayError} />
          )}
        </div>
      </div>
    </div>
  )
}

FormField.displayName = 'FormField'

// ─── Character count sub-component ──────────────────────────

function CharacterCount({
  name,
  maxLength,
  hasError,
}: {
  name: string
  maxLength: number
  hasError: boolean
}) {
  // Read value from the DOM input by name, re-render on input events
  // We use a lightweight approach: listen to input events on the named field
  const { current, listen } = useCharacterCount(name)

  // Call listen on mount
  useEffect(() => {
    return listen()
  }, [listen])

  const isOver = current > maxLength

  return (
    <span
      className={cn(
        'shrink-0 text-xs tabular-nums',
        isOver || hasError ? 'text-[#991B1B]' : 'text-[#8A847A]'
      )}
    >
      {current}/{maxLength}
    </span>
  )
}

function useCharacterCount(name: string) {
  const [current, setCurrent] = useState(0)

  const listen = useCallback(() => {
    const handler = () => {
      const el = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(
        `[name="${name}"]`
      )
      if (el) setCurrent(el.value.length)
    }

    // Initial read
    handler()

    // Listen for input events on the field
    const el = document.querySelector(`[name="${name}"]`)
    if (el) {
      el.addEventListener('input', handler)
      return () => el.removeEventListener('input', handler)
    }
    return () => {}
  }, [name])

  return { current, listen } as const
}

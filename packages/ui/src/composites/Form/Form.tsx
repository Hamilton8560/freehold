'use client'

import {
  createContext,
  useContext,
  useCallback,
  useState,
  type FormEvent,
  type ReactNode,
  type HTMLAttributes,
} from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

// ─── Validation types ────────────────────────────────────────

export interface ValidationRule {
  required?: boolean | string
  minLength?: number | { value: number; message: string }
  maxLength?: number | { value: number; message: string }
  pattern?: RegExp | { value: RegExp; message: string }
  validate?: (value: string) => string | true
}

export interface FieldError {
  message: string
}

// ─── Form context ────────────────────────────────────────────

interface FormContextValue {
  disabled: boolean
  layout: 'vertical' | 'horizontal'
  errors: Record<string, FieldError>
  setFieldError: (name: string, error: FieldError | null) => void
  registerField: (name: string, rules: ValidationRule) => void
  unregisterField: (name: string) => void
  validateField: (name: string, value: string) => string | null
  validateAll: (formData: FormData) => boolean
  touched: Record<string, boolean>
  setFieldTouched: (name: string) => void
}

const FormContext = createContext<FormContextValue | null>(null)

export function useFormContext() {
  return useContext(FormContext)
}

// ─── Form component ──────────────────────────────────────────

const formVariants = cva('', {
  variants: {
    layout: {
      vertical: 'space-y-5',
      horizontal: 'space-y-5',
    },
  },
  defaultVariants: {
    layout: 'vertical',
  },
})

export interface FormProps
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'>,
    VariantProps<typeof formVariants> {
  onSubmit?: (data: FormData, e: FormEvent<HTMLFormElement>) => void | Promise<void>
  disabled?: boolean
  children: ReactNode
}

export function Form({
  onSubmit,
  disabled = false,
  layout = 'vertical',
  children,
  className,
  ...props
}: FormProps) {
  const [errors, setErrors] = useState<Record<string, FieldError>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [fieldRules, setFieldRules] = useState<Record<string, ValidationRule>>({})

  const setFieldError = useCallback((name: string, error: FieldError | null) => {
    setErrors((prev) => {
      if (error === null) {
        const next = { ...prev }
        delete next[name]
        return next
      }
      return { ...prev, [name]: error }
    })
  }, [])

  const setFieldTouched = useCallback((name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }))
  }, [])

  const registerField = useCallback((name: string, rules: ValidationRule) => {
    setFieldRules((prev) => ({ ...prev, [name]: rules }))
  }, [])

  const unregisterField = useCallback((name: string) => {
    setFieldRules((prev) => {
      const next = { ...prev }
      delete next[name]
      return next
    })
    setErrors((prev) => {
      const next = { ...prev }
      delete next[name]
      return next
    })
  }, [])

  const validateField = useCallback(
    (name: string, value: string): string | null => {
      const rules = fieldRules[name]
      if (!rules) return null

      // Required
      if (rules.required) {
        if (!value || value.trim() === '') {
          return typeof rules.required === 'string'
            ? rules.required
            : 'This field is required'
        }
      }

      // MinLength
      if (rules.minLength != null && value) {
        const min =
          typeof rules.minLength === 'number'
            ? { value: rules.minLength, message: `Must be at least ${rules.minLength} characters` }
            : rules.minLength
        if (value.length < min.value) {
          return min.message
        }
      }

      // MaxLength
      if (rules.maxLength != null && value) {
        const max =
          typeof rules.maxLength === 'number'
            ? { value: rules.maxLength, message: `Must be at most ${rules.maxLength} characters` }
            : rules.maxLength
        if (value.length > max.value) {
          return max.message
        }
      }

      // Pattern
      if (rules.pattern && value) {
        const pat =
          rules.pattern instanceof RegExp
            ? { value: rules.pattern, message: 'Invalid format' }
            : rules.pattern
        if (!pat.value.test(value)) {
          return pat.message
        }
      }

      // Custom
      if (rules.validate && value) {
        const result = rules.validate(value)
        if (result !== true) {
          return result
        }
      }

      return null
    },
    [fieldRules]
  )

  const validateAll = useCallback(
    (formData: FormData): boolean => {
      const newErrors: Record<string, FieldError> = {}
      const allTouched: Record<string, boolean> = {}

      for (const name of Object.keys(fieldRules)) {
        allTouched[name] = true
        const value = formData.get(name)
        const error = validateField(name, typeof value === 'string' ? value : '')
        if (error) {
          newErrors[name] = { message: error }
        }
      }

      setTouched((prev) => ({ ...prev, ...allTouched }))
      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    },
    [fieldRules, validateField]
  )

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const isValid = validateAll(formData)
      if (isValid && onSubmit) {
        await onSubmit(formData, e)
      }
    },
    [onSubmit, validateAll]
  )

  return (
    <FormContext.Provider
      value={{
        disabled,
        layout: layout || 'vertical',
        errors,
        setFieldError,
        registerField,
        unregisterField,
        validateField,
        validateAll,
        touched,
        setFieldTouched,
      }}
    >
      <form
        noValidate
        onSubmit={handleSubmit}
        className={cn(formVariants({ layout }), className)}
        {...props}
      >
        <fieldset disabled={disabled} className="min-w-0 space-y-5">
          {children}
        </fieldset>
      </form>
    </FormContext.Provider>
  )
}

Form.displayName = 'Form'

'use client'

import { forwardRef, useState, type ChangeEvent, type FocusEvent } from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '../../utils/cn'
import { Icon, type IconName } from '../Icon/Icon'

export interface RadioOption {
  value: string
  label: string
  icon?: IconName
  description?: string
  disabled?: boolean
}

export interface RadioGroupProps {
  label?: string
  error?: string
  hint?: string
  options: RadioOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Native onChange handler for FormField compatibility */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  /** Native onBlur handler for FormField compatibility */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  className?: string
  id?: string
  name?: string
  required?: boolean
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      label,
      error,
      hint,
      options,
      value: controlledValue,
      defaultValue,
      onValueChange,
      onChange,
      onBlur,
      disabled,
      orientation = 'vertical',
      id,
      name,
      required,
    },
    ref
  ) => {
    const groupId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const descriptionId = error || hint ? `${groupId}-description` : undefined

    // Track internal value for uncontrolled mode and hidden input
    const [internalValue, setInternalValue] = useState(defaultValue ?? '')
    const currentValue = controlledValue ?? internalValue

    // Bridge onValueChange to also call onChange with synthetic event
    const handleValueChange = (newValue: string) => {
      setInternalValue(newValue)
      onValueChange?.(newValue)

      // Create synthetic event for FormField compatibility
      if (onChange) {
        const syntheticEvent = {
          target: { value: newValue, name: name ?? '' },
          currentTarget: { value: newValue, name: name ?? '' },
        } as ChangeEvent<HTMLInputElement>
        onChange(syntheticEvent)
      }
    }

    // Handle blur when focus leaves the radio group
    const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
      // Only trigger onBlur if focus is leaving the radio group entirely
      if (!event.currentTarget.contains(event.relatedTarget as Node)) {
        if (onBlur) {
          const syntheticEvent = {
            target: { value: currentValue, name: name ?? '' },
            currentTarget: { value: currentValue, name: name ?? '' },
          } as FocusEvent<HTMLInputElement>
          onBlur(syntheticEvent)
        }
      }
    }

    return (
      <div className="w-full">
        {label && (
          <label
            id={`${groupId}-label`}
            className="mb-2 block text-sm font-medium text-[#2C2824]"
          >
            {label}
          </label>
        )}
        {/* Hidden input for native form submission */}
        {name && <input type="hidden" name={name} value={currentValue} />}
        <RadioGroupPrimitive.Root
          ref={ref}
          value={controlledValue}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          orientation={orientation}
          aria-labelledby={label ? `${groupId}-label` : undefined}
          aria-describedby={descriptionId}
          aria-invalid={error ? true : undefined}
          className={cn(
            'flex gap-3',
            orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
            className
          )}
        >
          {options.map((option) => {
            const optionId = `${groupId}-${option.value}`
            return (
              <div key={option.value} className="flex items-start gap-2">
                <div className="relative flex items-center">
                  <RadioGroupPrimitive.Item
                    id={optionId}
                    value={option.value}
                    disabled={option.disabled}
                    className={cn(
                      'peer h-[18px] w-[18px] shrink-0 appearance-none rounded-full border bg-white',
                      'transition-all duration-200 cursor-pointer',
                      'focus:outline-none focus:ring-2 focus:ring-offset-1',
                      error
                        ? 'border-[#F87171] focus:ring-[#F87171]/20'
                        : 'border-[rgba(184,164,142,0.25)] focus:ring-[#B8A48E]/20',
                      'data-[state=checked]:border-[#2C2824]',
                      'disabled:cursor-not-allowed disabled:opacity-50'
                    )}
                  >
                    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                      <span className="h-[10px] w-[10px] rounded-full bg-[#2C2824]" />
                    </RadioGroupPrimitive.Indicator>
                  </RadioGroupPrimitive.Item>
                </div>
                <div className="flex flex-col gap-0.5">
                  <label
                    htmlFor={optionId}
                    className={cn(
                      'flex items-center gap-2 text-sm font-medium text-[#2C2824] cursor-pointer',
                      option.disabled && 'cursor-not-allowed opacity-50'
                    )}
                  >
                    {option.icon && (
                      <Icon name={option.icon} size="sm" color="secondary" />
                    )}
                    {option.label}
                  </label>
                  {option.description && (
                    <p className="text-xs text-[#5C574F]">{option.description}</p>
                  )}
                </div>
              </div>
            )
          })}
        </RadioGroupPrimitive.Root>
        {(error || hint) && (
          <p
            id={descriptionId}
            className={cn(
              'mt-2 text-sm',
              error ? 'text-[#991B1B]' : 'text-[#5C574F]'
            )}
          >
            {error || hint}
          </p>
        )}
      </div>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'

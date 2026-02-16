'use client'

import { forwardRef, useState, type ChangeEvent, type FocusEvent } from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { cn } from '../../utils/cn'
import { Icon, type IconName } from '../Icon/Icon'
import { FormControl } from '../FormControl'

export interface SelectOption {
  value: string
  label: string
  icon?: IconName
  disabled?: boolean
}

export interface SelectProps {
  label?: string
  error?: string
  hint?: string
  options: SelectOption[]
  placeholder?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Native onChange handler for FormField compatibility */
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
  /** Native onBlur handler for FormField compatibility */
  onBlur?: (event: FocusEvent<HTMLSelectElement>) => void
  disabled?: boolean
  className?: string
  id?: string
  name?: string
  required?: boolean
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      hint,
      options,
      placeholder = 'Select an option',
      value: controlledValue,
      defaultValue,
      onValueChange,
      onChange,
      onBlur,
      disabled,
      id,
      name,
      required,
    },
    ref
  ) => {
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
        } as ChangeEvent<HTMLSelectElement>
        onChange(syntheticEvent)
      }
    }

    // Bridge onOpenChange to fire onBlur when dropdown closes
    const handleOpenChange = (open: boolean) => {
      if (!open && onBlur) {
        const syntheticEvent = {
          target: { value: currentValue, name: name ?? '' },
          currentTarget: { value: currentValue, name: name ?? '' },
        } as FocusEvent<HTMLSelectElement>
        onBlur(syntheticEvent)
      }
    }

    return (
      <FormControl label={label} error={error} hint={hint} id={id}>
        {({ id: selectId, descriptionId }) => (
          <>
            {/* Hidden input for native form submission */}
            {name && <input type="hidden" name={name} value={currentValue} />}
            <SelectPrimitive.Root
              value={controlledValue}
              defaultValue={defaultValue}
              onValueChange={handleValueChange}
              onOpenChange={handleOpenChange}
              disabled={disabled}
              required={required}
            >
              <SelectPrimitive.Trigger
                ref={ref}
                id={selectId}
                aria-invalid={error ? true : undefined}
                aria-describedby={descriptionId}
                className={cn(
                  'flex h-10 w-full items-center justify-between rounded-[10px] border bg-white px-3 py-2',
                  'text-sm text-[#2C2824]',
                  'transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-offset-1',
                  'data-[placeholder]:text-[#8A847A]',
                  error
                    ? 'border-[#F87171] focus:ring-[#F87171]/20'
                    : 'border-[rgba(184,164,142,0.25)] focus:border-[#B8A48E] focus:ring-[#B8A48E]/20',
                  'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F5F3EF]',
                  className
                )}
              >
                <SelectPrimitive.Value placeholder={placeholder} />
                <SelectPrimitive.Icon asChild>
                  <svg
                    className="h-4 w-4 text-[#5C574F] transition-transform duration-200 data-[state=open]:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </SelectPrimitive.Icon>
              </SelectPrimitive.Trigger>

              <SelectPrimitive.Portal>
                <SelectPrimitive.Content
                  className={cn(
                    'relative z-50 max-h-[300px] min-w-[8rem] overflow-hidden',
                    'rounded-[10px] border border-[rgba(184,164,142,0.25)] bg-white shadow-lg',
                    'data-[state=open]:animate-in data-[state=closed]:animate-out',
                    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                    'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2'
                  )}
                  position="popper"
                  sideOffset={4}
                >
                  <SelectPrimitive.Viewport className="p-1">
                    {options.map((option) => (
                      <SelectPrimitive.Item
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                        className={cn(
                          'relative flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2',
                          'text-sm text-[#2C2824] outline-none',
                          'transition-colors duration-150',
                          'focus:bg-[#F5F3EF] focus:text-[#2C2824]',
                          'data-[highlighted]:bg-[#F5F3EF]',
                          'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                        )}
                      >
                        {option.icon && (
                          <Icon name={option.icon} size="sm" color="secondary" />
                        )}
                        <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                        <SelectPrimitive.ItemIndicator className="ml-auto">
                          <svg
                            className="h-4 w-4 text-[#B8A48E]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </SelectPrimitive.ItemIndicator>
                      </SelectPrimitive.Item>
                    ))}
                  </SelectPrimitive.Viewport>
                </SelectPrimitive.Content>
              </SelectPrimitive.Portal>
            </SelectPrimitive.Root>
          </>
        )}
      </FormControl>
    )
  }
)

Select.displayName = 'Select'

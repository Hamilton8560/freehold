'use client'

import { forwardRef, useState, type ChangeEvent } from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { cn } from '../../utils/cn'

export interface FilterOption {
  value: string
  label: string
}

export interface FilterSelectProps {
  options: FilterOption[]
  placeholder?: string
  icon?: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Native onChange handler for form compatibility */
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
  disabled?: boolean
  className?: string
  name?: string
}

export const FilterSelect = forwardRef<HTMLButtonElement, FilterSelectProps>(
  (
    {
      className,
      options,
      placeholder = 'Select...',
      icon,
      value: controlledValue,
      defaultValue,
      onValueChange,
      onChange,
      disabled,
      name,
    },
    ref
  ) => {
    // Track internal value for uncontrolled mode
    const [internalValue, setInternalValue] = useState(defaultValue ?? '')
    const currentValue = controlledValue ?? internalValue

    const handleValueChange = (newValue: string) => {
      setInternalValue(newValue)
      onValueChange?.(newValue)

      // Create synthetic event for form compatibility
      if (onChange) {
        const syntheticEvent = {
          target: { value: newValue, name: name ?? '' },
          currentTarget: { value: newValue, name: name ?? '' },
        } as ChangeEvent<HTMLSelectElement>
        onChange(syntheticEvent)
      }
    }

    return (
      <div className="relative inline-block">
        {/* Hidden input for native form submission */}
        {name && <input type="hidden" name={name} value={currentValue} />}
        <SelectPrimitive.Root
          value={controlledValue}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          disabled={disabled}
        >
          <SelectPrimitive.Trigger
            ref={ref}
            className={cn(
              'inline-flex h-10 items-center justify-between gap-2 rounded-[10px] border bg-white py-2 pr-10 text-sm',
              'text-[#2C2824] transition-all duration-200',
              'border-[rgba(184,164,142,0.25)]',
              'focus:outline-none focus:border-[#B8A48E] focus:ring-2 focus:ring-[#B8A48E]/20 focus:ring-offset-1',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F5F3EF]',
              'data-[placeholder]:text-[#8A847A]',
              icon ? 'pl-10' : 'pl-3',
              className
            )}
          >
            {icon && (
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#8A847A]">
                {icon}
              </span>
            )}
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon asChild>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
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
              </span>
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
                    className={cn(
                      'relative flex w-full cursor-pointer select-none items-center rounded-md px-3 py-2',
                      'text-sm text-[#2C2824] outline-none',
                      'transition-colors duration-150',
                      'focus:bg-[#F5F3EF] focus:text-[#2C2824]',
                      'data-[highlighted]:bg-[#F5F3EF]'
                    )}
                  >
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
      </div>
    )
  }
)

FilterSelect.displayName = 'FilterSelect'

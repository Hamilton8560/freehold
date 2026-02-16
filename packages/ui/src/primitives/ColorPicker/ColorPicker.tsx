'use client'

import {
  forwardRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
} from 'react'
import * as Popover from '@radix-ui/react-popover'
import { cn } from '../../utils/cn'

export interface ColorPickerProps {
  label?: string
  error?: string
  hint?: string
  value?: string
  defaultValue?: string
  onValueChange?: (color: string) => void
  /** Native onChange handler for FormField compatibility */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  /** Native onBlur handler for FormField compatibility */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  className?: string
  id?: string
  name?: string
  required?: boolean
  /** Predefined color palette */
  colors?: string[]
  /** Allow custom color input */
  allowCustom?: boolean
}

const DEFAULT_COLORS = [
  '#2C2824', '#5C574F', '#8A847A', '#B8A48E',
  '#EF4444', '#F97316', '#EAB308', '#22C55E',
  '#14B8A6', '#3B82F6', '#8B5CF6', '#EC4899',
  '#F5F3EF', '#E8E4DC', '#D4CFC5', '#FFFFFF',
]

export const ColorPicker = forwardRef<HTMLButtonElement, ColorPickerProps>(
  (
    {
      className,
      label,
      error,
      hint,
      value: controlledValue,
      defaultValue = '#2C2824',
      onValueChange,
      onChange,
      onBlur,
      disabled,
      id,
      name,
      required,
      colors = DEFAULT_COLORS,
      allowCustom = true,
    },
    ref
  ) => {
    const pickerId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const descriptionId = error || hint ? `${pickerId}-description` : undefined

    const [internalValue, setInternalValue] = useState(defaultValue)
    const [open, setOpen] = useState(false)
    const [customColor, setCustomColor] = useState('')

    const currentValue = controlledValue ?? internalValue

    const handleSelect = (color: string) => {
      setInternalValue(color)
      onValueChange?.(color)
      setOpen(false)

      if (onChange) {
        const syntheticEvent = {
          target: { value: color, name: name ?? '' },
          currentTarget: { value: color, name: name ?? '' },
        } as ChangeEvent<HTMLInputElement>
        onChange(syntheticEvent)
      }
    }

    const handleOpenChange = (isOpen: boolean) => {
      setOpen(isOpen)
      if (!isOpen && onBlur) {
        const syntheticEvent = {
          target: { value: currentValue, name: name ?? '' },
          currentTarget: { value: currentValue, name: name ?? '' },
        } as FocusEvent<HTMLInputElement>
        onBlur(syntheticEvent)
      }
    }

    const handleCustomSubmit = () => {
      if (/^#[0-9A-Fa-f]{6}$/.test(customColor)) {
        handleSelect(customColor)
        setCustomColor('')
      }
    }

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={pickerId}
            className="mb-1.5 block text-sm font-medium text-[#2C2824]"
          >
            {label}
          </label>
        )}
        {name && <input type="hidden" name={name} value={currentValue} />}
        <Popover.Root open={open} onOpenChange={handleOpenChange}>
          <Popover.Trigger
            ref={ref}
            id={pickerId}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={descriptionId}
            aria-required={required}
            className={cn(
              'flex h-10 w-full items-center gap-3 rounded-[10px] border bg-white px-3 py-2',
              'text-sm text-[#2C2824]',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
              error
                ? 'border-[#F87171] focus:ring-[#F87171]/20'
                : 'border-[rgba(184,164,142,0.25)] focus:border-[#B8A48E] focus:ring-[#B8A48E]/20',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F5F3EF]',
              className
            )}
          >
            <span
              className="h-5 w-5 shrink-0 rounded border border-[rgba(184,164,142,0.25)]"
              style={{ backgroundColor: currentValue }}
            />
            <span className="flex-1 text-left font-mono text-xs uppercase">
              {currentValue}
            </span>
            <svg
              className="h-4 w-4 text-[#5C574F]"
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
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              className={cn(
                'z-50 w-[240px] rounded-[10px] border border-[rgba(184,164,142,0.25)] bg-white p-3 shadow-lg',
                'data-[state=open]:animate-in data-[state=closed]:animate-out',
                'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
              )}
              sideOffset={4}
              align="start"
            >
              {/* Color grid */}
              <div className="grid grid-cols-4 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleSelect(color)}
                    className={cn(
                      'h-10 w-full rounded-md border-2 transition-all',
                      'focus:outline-none focus:ring-2 focus:ring-[#B8A48E]/20 focus:ring-offset-1',
                      'hover:scale-105',
                      currentValue === color
                        ? 'border-[#2C2824] ring-2 ring-[#2C2824]/20'
                        : 'border-transparent'
                    )}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>

              {/* Custom color input */}
              {allowCustom && (
                <div className="mt-3 border-t border-[rgba(184,164,142,0.25)] pt-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      placeholder="#000000"
                      className={cn(
                        'flex-1 h-8 rounded-md border bg-white px-2 text-xs font-mono uppercase',
                        'border-[rgba(184,164,142,0.25)]',
                        'focus:outline-none focus:border-[#B8A48E] focus:ring-1 focus:ring-[#B8A48E]/20',
                        'placeholder:text-[#8A847A] placeholder:normal-case'
                      )}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleCustomSubmit()
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleCustomSubmit}
                      disabled={!/^#[0-9A-Fa-f]{6}$/.test(customColor)}
                      className={cn(
                        'h-8 px-3 rounded-md text-xs font-medium',
                        'bg-[#2C2824] text-white',
                        'hover:bg-[#3D3830] transition-colors',
                        'disabled:opacity-50 disabled:cursor-not-allowed'
                      )}
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
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
)

ColorPicker.displayName = 'ColorPicker'

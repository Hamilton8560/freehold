'use client'

import { forwardRef, useState, type ChangeEvent, type FocusEvent } from 'react'
import * as Slider from '@radix-ui/react-slider'
import { cn } from '../../utils/cn'

export interface RangeSliderProps {
  label?: string
  error?: string
  hint?: string
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (value: number[]) => void
  /** Native onChange handler for FormField compatibility */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  /** Native onBlur handler for FormField compatibility */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  className?: string
  id?: string
  name?: string
  min?: number
  max?: number
  step?: number
  /** Show value labels */
  showValues?: boolean
  /** Format value for display */
  formatValue?: (value: number) => string
}

export const RangeSlider = forwardRef<HTMLSpanElement, RangeSliderProps>(
  (
    {
      className,
      label,
      error,
      hint,
      value: controlledValue,
      defaultValue = [25, 75],
      onValueChange,
      onChange,
      onBlur,
      disabled,
      id,
      name,
      min = 0,
      max = 100,
      step = 1,
      showValues = true,
      formatValue = (v) => String(v),
    },
    ref
  ) => {
    const sliderId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const descriptionId = error || hint ? `${sliderId}-description` : undefined

    const [internalValue, setInternalValue] = useState(defaultValue)
    const currentValue = controlledValue ?? internalValue

    const handleValueChange = (newValue: number[]) => {
      setInternalValue(newValue)
      onValueChange?.(newValue)

      if (onChange) {
        const syntheticEvent = {
          target: { value: newValue.join(','), name: name ?? '' },
          currentTarget: { value: newValue.join(','), name: name ?? '' },
        } as ChangeEvent<HTMLInputElement>
        onChange(syntheticEvent)
      }
    }

    const handleValueCommit = () => {
      if (onBlur) {
        const syntheticEvent = {
          target: { value: currentValue.join(','), name: name ?? '' },
          currentTarget: { value: currentValue.join(','), name: name ?? '' },
        } as FocusEvent<HTMLInputElement>
        onBlur(syntheticEvent)
      }
    }

    return (
      <div className="w-full">
        {label && (
          <div className="mb-3 flex items-center justify-between">
            <label
              htmlFor={sliderId}
              className="text-sm font-medium text-[#2C2824]"
            >
              {label}
            </label>
            {showValues && (
              <span className="text-sm text-[#5C574F]">
                {formatValue(currentValue[0])} - {formatValue(currentValue[1])}
              </span>
            )}
          </div>
        )}
        {name && <input type="hidden" name={name} value={currentValue.join(',')} />}
        <Slider.Root
          ref={ref}
          id={sliderId}
          value={controlledValue}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          onValueCommit={handleValueCommit}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          aria-describedby={descriptionId}
          aria-invalid={error ? true : undefined}
          className={cn(
            'relative flex w-full touch-none select-none items-center',
            'h-5',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
        >
          <Slider.Track
            className={cn(
              'relative h-1.5 w-full grow rounded-full',
              error ? 'bg-[#FEE2E2]' : 'bg-[#E8E4DC]'
            )}
          >
            <Slider.Range
              className={cn(
                'absolute h-full rounded-full',
                error ? 'bg-[#F87171]' : 'bg-[#2C2824]'
              )}
            />
          </Slider.Track>
          {currentValue.map((_, index) => (
            <Slider.Thumb
              key={index}
              className={cn(
                'block h-4 w-4 rounded-full border-2 bg-white shadow-sm',
                'transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-offset-1',
                error
                  ? 'border-[#F87171] focus:ring-[#F87171]/20'
                  : 'border-[#2C2824] focus:ring-[#B8A48E]/20',
                'hover:scale-110',
                'disabled:pointer-events-none'
              )}
              aria-label={index === 0 ? 'Minimum value' : 'Maximum value'}
            />
          ))}
        </Slider.Root>
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

RangeSlider.displayName = 'RangeSlider'

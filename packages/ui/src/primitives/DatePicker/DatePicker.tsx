'use client'

import {
  forwardRef,
  useState,
  useMemo,
  type ChangeEvent,
  type FocusEvent,
} from 'react'
import * as Popover from '@radix-ui/react-popover'
import { cn } from '../../utils/cn'

export interface DatePickerProps {
  label?: string
  error?: string
  hint?: string
  value?: Date | null
  defaultValue?: Date | null
  onValueChange?: (date: Date | null) => void
  /** Native onChange handler for FormField compatibility */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  /** Native onBlur handler for FormField compatibility */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  className?: string
  id?: string
  name?: string
  required?: boolean
  placeholder?: string
  minDate?: Date
  maxDate?: Date
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function formatDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      className,
      label,
      error,
      hint,
      value: controlledValue,
      defaultValue,
      onValueChange,
      onChange,
      onBlur,
      disabled,
      id,
      name,
      required,
      placeholder = 'Select date',
      minDate,
      maxDate,
    },
    ref
  ) => {
    const pickerId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const descriptionId = error || hint ? `${pickerId}-description` : undefined

    const [internalValue, setInternalValue] = useState<Date | null>(defaultValue ?? null)
    const [open, setOpen] = useState(false)
    const [viewDate, setViewDate] = useState(() => {
      const initial = controlledValue ?? defaultValue ?? new Date()
      return { year: initial.getFullYear(), month: initial.getMonth() }
    })

    const currentValue = controlledValue !== undefined ? controlledValue : internalValue

    const handleSelect = (date: Date) => {
      setInternalValue(date)
      onValueChange?.(date)
      setOpen(false)

      if (onChange) {
        const syntheticEvent = {
          target: { value: formatDate(date), name: name ?? '' },
          currentTarget: { value: formatDate(date), name: name ?? '' },
        } as ChangeEvent<HTMLInputElement>
        onChange(syntheticEvent)
      }
    }

    const handleOpenChange = (isOpen: boolean) => {
      setOpen(isOpen)
      if (!isOpen && onBlur) {
        const syntheticEvent = {
          target: { value: currentValue ? formatDate(currentValue) : '', name: name ?? '' },
          currentTarget: { value: currentValue ? formatDate(currentValue) : '', name: name ?? '' },
        } as FocusEvent<HTMLInputElement>
        onBlur(syntheticEvent)
      }
    }

    const calendarDays = useMemo(() => {
      const daysInMonth = getDaysInMonth(viewDate.year, viewDate.month)
      const firstDay = getFirstDayOfMonth(viewDate.year, viewDate.month)
      const days: (number | null)[] = []

      for (let i = 0; i < firstDay; i++) {
        days.push(null)
      }
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(i)
      }
      return days
    }, [viewDate.year, viewDate.month])

    const isDateDisabled = (day: number): boolean => {
      const date = new Date(viewDate.year, viewDate.month, day)
      if (minDate && date < minDate) return true
      if (maxDate && date > maxDate) return true
      return false
    }

    const isToday = (day: number): boolean => {
      const today = new Date()
      return (
        day === today.getDate() &&
        viewDate.month === today.getMonth() &&
        viewDate.year === today.getFullYear()
      )
    }

    const isSelected = (day: number): boolean => {
      if (!currentValue) return false
      return (
        day === currentValue.getDate() &&
        viewDate.month === currentValue.getMonth() &&
        viewDate.year === currentValue.getFullYear()
      )
    }

    const prevMonth = () => {
      setViewDate((prev) => {
        if (prev.month === 0) {
          return { year: prev.year - 1, month: 11 }
        }
        return { ...prev, month: prev.month - 1 }
      })
    }

    const nextMonth = () => {
      setViewDate((prev) => {
        if (prev.month === 11) {
          return { year: prev.year + 1, month: 0 }
        }
        return { ...prev, month: prev.month + 1 }
      })
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
        {name && (
          <input
            type="hidden"
            name={name}
            value={currentValue ? formatDate(currentValue) : ''}
          />
        )}
        <Popover.Root open={open} onOpenChange={handleOpenChange}>
          <Popover.Trigger
            ref={ref}
            id={pickerId}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={descriptionId}
            aria-required={required}
            className={cn(
              'flex h-10 w-full items-center justify-between rounded-[10px] border bg-white px-3 py-2',
              'text-sm text-[#2C2824]',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
              error
                ? 'border-[#F87171] focus:ring-[#F87171]/20'
                : 'border-[rgba(184,164,142,0.25)] focus:border-[#B8A48E] focus:ring-[#B8A48E]/20',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F5F3EF]',
              !currentValue && 'text-[#8A847A]',
              className
            )}
          >
            <span>{currentValue ? formatDate(currentValue) : placeholder}</span>
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              className={cn(
                'z-50 w-[280px] rounded-[10px] border border-[rgba(184,164,142,0.25)] bg-white p-3 shadow-lg',
                'data-[state=open]:animate-in data-[state=closed]:animate-out',
                'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
              )}
              sideOffset={4}
              align="start"
            >
              {/* Header */}
              <div className="mb-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevMonth}
                  className="rounded p-1 text-[#5C574F] hover:bg-[#F5F3EF] hover:text-[#2C2824] transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-sm font-medium text-[#2C2824]">
                  {MONTHS[viewDate.month]} {viewDate.year}
                </span>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="rounded p-1 text-[#5C574F] hover:bg-[#F5F3EF] hover:text-[#2C2824] transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Day headers */}
              <div className="mb-1 grid grid-cols-7 gap-1">
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="flex h-8 items-center justify-center text-xs font-medium text-[#8A847A]"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <div key={index} className="flex items-center justify-center">
                    {day !== null ? (
                      <button
                        type="button"
                        disabled={isDateDisabled(day)}
                        onClick={() => handleSelect(new Date(viewDate.year, viewDate.month, day))}
                        className={cn(
                          'flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors',
                          'focus:outline-none focus:ring-2 focus:ring-[#B8A48E]/20',
                          isSelected(day)
                            ? 'bg-[#2C2824] text-white'
                            : isToday(day)
                            ? 'bg-[#F5F3EF] text-[#2C2824] font-medium'
                            : 'text-[#2C2824] hover:bg-[#F5F3EF]',
                          isDateDisabled(day) && 'opacity-50 cursor-not-allowed hover:bg-transparent'
                        )}
                      >
                        {day}
                      </button>
                    ) : (
                      <span className="h-8 w-8" />
                    )}
                  </div>
                ))}
              </div>

              {/* Today button */}
              <div className="mt-3 border-t border-[rgba(184,164,142,0.25)] pt-3">
                <button
                  type="button"
                  onClick={() => handleSelect(new Date())}
                  className="w-full rounded-md bg-[#F5F3EF] px-3 py-1.5 text-sm font-medium text-[#2C2824] hover:bg-[#E8E4DC] transition-colors"
                >
                  Today
                </button>
              </div>
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

DatePicker.displayName = 'DatePicker'

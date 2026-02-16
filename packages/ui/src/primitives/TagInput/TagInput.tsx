'use client'

import {
  forwardRef,
  useState,
  useRef,
  type KeyboardEvent,
  type HTMLAttributes,
} from 'react'
import { cn } from '../../utils/cn'
import { FormControl } from '../FormControl'

export interface TagInputProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  disabled?: boolean
  maxTags?: number
  allowDuplicates?: boolean
  label?: string
  error?: string
  hint?: string
  id?: string
}

export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      className,
      value,
      onChange,
      placeholder = 'Add a tag...',
      disabled = false,
      maxTags,
      allowDuplicates = false,
      label,
      error,
      hint,
      id,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const addTag = (tag: string) => {
      const trimmed = tag.trim()
      if (!trimmed) return
      if (!allowDuplicates && value.some((t) => t.toLowerCase() === trimmed.toLowerCase())) return
      if (maxTags && value.length >= maxTags) return
      onChange([...value, trimmed])
      setInputValue('')
    }

    const removeTag = (index: number) => {
      onChange(value.filter((_, i) => i !== index))
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault()
        addTag(inputValue)
      } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
        removeTag(value.length - 1)
      }
    }

    const handleContainerClick = () => {
      if (!disabled) {
        inputRef.current?.focus()
      }
    }

    const atLimit = maxTags !== undefined && value.length >= maxTags

    return (
      <FormControl label={label} error={error} hint={hint} id={id}>
        {({ id: inputId, descriptionId }) => (
          <div
            onClick={handleContainerClick}
            className={cn(
              'flex min-h-[40px] w-full flex-wrap items-center gap-1.5 rounded-[10px] border bg-white px-3 py-1.5',
              'text-sm text-[#2C2824]',
              'transition-all duration-200',
              'focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-1',
              error
                ? 'border-[#F87171] focus-within:ring-[#F87171]/20'
                : 'border-[rgba(184,164,142,0.25)] focus-within:border-[#B8A48E] focus-within:ring-[#B8A48E]/20',
              disabled && 'cursor-not-allowed opacity-50 bg-[#F5F3EF]',
              !disabled && 'cursor-text',
              className
            )}
            aria-invalid={error ? true : undefined}
            aria-describedby={descriptionId}
            {...props}
          >
            {value.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className={cn(
                  'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5',
                  'text-xs font-medium',
                  'bg-[#F5F3EF] text-[#2C2824] border-[rgba(184,164,142,0.25)]'
                )}
              >
                {tag}
                {!disabled && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeTag(index)
                    }}
                    className="ml-0.5 rounded-full p-0.5 text-[#8A847A] hover:bg-[#E8E4DC] hover:text-[#2C2824] transition-colors focus:outline-none"
                    aria-label={`Remove ${tag}`}
                    tabIndex={-1}
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </span>
            ))}

            {!atLimit && (
              <input
                ref={(node) => {
                  if (typeof ref === 'function') {
                    ref(node)
                  } else if (ref) {
                    ref.current = node
                  }
                  (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node
                }}
                id={inputId}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => {
                  if (inputValue.trim()) {
                    addTag(inputValue)
                  }
                }}
                placeholder={value.length === 0 ? placeholder : ''}
                disabled={disabled}
                className={cn(
                  'flex-1 min-w-[80px] bg-transparent py-1 text-sm',
                  'placeholder:text-[#8A847A]',
                  'focus:outline-none',
                  'disabled:cursor-not-allowed'
                )}
                aria-describedby={descriptionId}
              />
            )}
          </div>
        )}
      </FormControl>
    )
  }
)

TagInput.displayName = 'TagInput'

'use client'

import { useRef, useCallback, type KeyboardEvent, type FormEvent } from 'react'
import { cn } from '../../utils/cn'

export interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (e?: FormEvent) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  placeholder = 'Type a message…',
  disabled,
  className,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }, [])

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (value.trim()) {
        onSubmit()
      }
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onSubmit(e)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'flex items-end gap-2 border-t border-[rgba(184,164,142,0.15)] bg-white px-4 py-3',
        className
      )}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          adjustHeight()
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className="min-h-[44px] flex-1 resize-none rounded-[10px] border border-[rgba(184,164,142,0.25)] bg-[#FAF9F6] px-3 py-2.5 text-sm text-[#2C2824] placeholder:text-[#8A847A] focus:border-[#B8A48E] focus:outline-none focus:ring-1 focus:ring-[#B8A48E] disabled:cursor-not-allowed disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2C2824] text-[#FAF9F6] transition-colors hover:bg-[#3D3832] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C2824] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
          <path
            d="M4 10L10 4M10 4L16 10M10 4V17"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  )
}

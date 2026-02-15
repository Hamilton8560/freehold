'use client'

import { forwardRef, useState, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface CopyBlockProps extends HTMLAttributes<HTMLDivElement> {
  value: string
  label?: string
}

export const CopyBlock = forwardRef<HTMLDivElement, CopyBlockProps>(
  ({ value, label, className, ...props }, ref) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
      try {
        await navigator.clipboard?.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      } catch {
        // Fallback for older browsers
        const textarea = document.createElement('textarea')
        textarea.value = value
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }
    }

    return (
      <div
        ref={ref}
        onClick={handleCopy}
        className={cn(
          'inline-flex items-center gap-2 px-3 py-1.5',
          'bg-[#F5F3EF] border border-[rgba(184,164,142,0.25)] rounded-md',
          'cursor-pointer transition-all duration-200',
          'hover:border-[#B8A48E] hover:bg-[#EFECE6]',
          'active:scale-[0.98]',
          className
        )}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleCopy()
          }
        }}
        {...props}
      >
        <code className="font-mono text-xs text-[#2C2824]">
          {label || value}
        </code>
        <span
          className={cn(
            'text-[11px] transition-colors duration-200',
            copied ? 'text-[#8DB580]' : 'text-[#8A847A]'
          )}
        >
          {copied ? '✓' : 'copy'}
        </span>
      </div>
    )
  }
)

CopyBlock.displayName = 'CopyBlock'

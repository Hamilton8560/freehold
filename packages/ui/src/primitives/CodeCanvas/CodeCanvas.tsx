'use client'

import { forwardRef, useState, type HTMLAttributes, useMemo } from 'react'
import { cn } from '../../utils/cn'

export interface CodeCanvasProps extends HTMLAttributes<HTMLDivElement> {
  /** The code to display */
  code: string
  /** Language for syntax hints (visual only) */
  language?: string
  /** Optional header (filename, description) */
  title?: string
  /** Show line numbers (default: true) */
  showLineNumbers?: boolean
  /** Show copy button (default: true) */
  showCopy?: boolean
  /** Max height with scroll (e.g., '300px') */
  maxHeight?: string
}

// Simple token-based syntax highlighting
function highlightCode(code: string, language?: string): React.ReactNode[] {
  const lines = code.split('\n')

  return lines.map((line, lineIndex) => {
    if (!language || !['ts', 'tsx', 'js', 'jsx', 'typescript', 'javascript'].includes(language)) {
      return <span key={lineIndex}>{line || '\u00A0'}</span>
    }

    const tokens: React.ReactNode[] = []
    let remaining = line
    let keyIndex = 0

    // Process line character by character with regex patterns
    while (remaining.length > 0) {
      let matched = false

      // Comments (// style)
      const commentMatch = remaining.match(/^(\/\/.*)/)
      if (commentMatch) {
        tokens.push(
          <span key={keyIndex++} className="text-[#6B6560]">
            {commentMatch[1]}
          </span>
        )
        remaining = remaining.slice(commentMatch[1].length)
        matched = true
        continue
      }

      // Strings (single, double, template)
      const stringMatch = remaining.match(/^("[^"]*"|'[^']*'|`[^`]*`)/)
      if (stringMatch) {
        tokens.push(
          <span key={keyIndex++} className="text-[#8DB580]">
            {stringMatch[1]}
          </span>
        )
        remaining = remaining.slice(stringMatch[1].length)
        matched = true
        continue
      }

      // JSX tags
      const jsxMatch = remaining.match(/^(<\/?[A-Z][a-zA-Z0-9]*|<\/?[a-z][a-zA-Z0-9-]*|>|\/>)/)
      if (jsxMatch) {
        tokens.push(
          <span key={keyIndex++} className="text-[#B8A48E]">
            {jsxMatch[1]}
          </span>
        )
        remaining = remaining.slice(jsxMatch[1].length)
        matched = true
        continue
      }

      // Keywords
      const keywordMatch = remaining.match(
        /^(const|let|var|function|return|import|export|from|default|if|else|for|while|class|interface|type|extends|implements|new|this|async|await|try|catch|throw|typeof|instanceof)\b/
      )
      if (keywordMatch) {
        tokens.push(
          <span key={keyIndex++} className="text-[#D4B86A]">
            {keywordMatch[1]}
          </span>
        )
        remaining = remaining.slice(keywordMatch[1].length)
        matched = true
        continue
      }

      // Numbers
      const numberMatch = remaining.match(/^(\d+\.?\d*)/)
      if (numberMatch) {
        tokens.push(
          <span key={keyIndex++} className="text-[#C4796B]">
            {numberMatch[1]}
          </span>
        )
        remaining = remaining.slice(numberMatch[1].length)
        matched = true
        continue
      }

      // Default: take next character
      if (!matched) {
        tokens.push(remaining[0])
        remaining = remaining.slice(1)
      }
    }

    return (
      <span key={lineIndex}>
        {tokens.length > 0 ? tokens : '\u00A0'}
      </span>
    )
  })
}

export const CodeCanvas = forwardRef<HTMLDivElement, CodeCanvasProps>(
  (
    {
      code,
      language,
      title,
      showLineNumbers = true,
      showCopy = true,
      maxHeight,
      className,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
      try {
        await navigator.clipboard?.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      } catch {
        // Fallback for older browsers
        const textarea = document.createElement('textarea')
        textarea.value = code
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }
    }

    const lines = code.split('\n')
    const highlightedLines = useMemo(
      () => highlightCode(code, language),
      [code, language]
    )

    const hasHeader = title || showCopy

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border border-[rgba(184,164,142,0.15)] overflow-hidden',
          'bg-[#2C2824]',
          className
        )}
        {...props}
      >
        {/* Header */}
        {hasHeader && (
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#3D3832] border-b border-[rgba(184,164,142,0.15)]">
            {title ? (
              <span className="font-mono text-xs text-[#B8A48E]">{title}</span>
            ) : (
              <span />
            )}
            {showCopy && (
              <button
                onClick={handleCopy}
                className={cn(
                  'inline-flex items-center gap-1.5 px-2 py-1',
                  'text-xs font-mono rounded transition-colors duration-200',
                  'hover:bg-[#4A4540]',
                  copied ? 'text-[#8DB580]' : 'text-[#B8A48E]'
                )}
                type="button"
              >
                {copied ? (
                  <>
                    <svg
                      className="w-3.5 h-3.5"
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
                    Copied
                  </>
                ) : (
                  <>
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Code Area */}
        <div
          className="overflow-x-auto"
          style={maxHeight ? { maxHeight, overflowY: 'auto' } : undefined}
        >
          <div className="p-4 font-mono text-sm leading-relaxed">
            <div className="flex">
              {/* Line Numbers */}
              {showLineNumbers && (
                <div
                  className="select-none pr-4 text-right border-r border-[#3D3832] mr-4"
                  aria-hidden="true"
                >
                  {lines.map((_, i) => (
                    <div key={i} className="text-[#6B6560]">
                      {i + 1}
                    </div>
                  ))}
                </div>
              )}

              {/* Code Content */}
              <div className="flex-1 text-[#FAF9F6]">
                {highlightedLines.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

CodeCanvas.displayName = 'CodeCanvas'

'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import { cn } from '../../utils/cn'
import { FormControl } from '../../primitives/FormControl'
import { Toolbar } from './Toolbar'
import './editor-styles.css'

export interface RichTextEditorProps {
  label?: string
  error?: string
  hint?: string
  id?: string
  className?: string
  defaultContent?: string
  content?: string
  onChange?: (html: string) => void
  placeholder?: string
  disabled?: boolean
  minHeight?: number
}

// Check if editor content is effectively empty (no text, just whitespace/br tags)
function isEditorEmpty(element: HTMLElement | null): boolean {
  if (!element) return true
  const text = element.textContent || ''
  return text.trim() === ''
}

export function RichTextEditor({
  label,
  error,
  hint,
  id,
  className,
  defaultContent = '',
  content,
  onChange,
  placeholder,
  disabled = false,
  minHeight = 200,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isEmpty, setIsEmpty] = useState(true)

  // Initialize content
  useEffect(() => {
    if (editorRef.current && defaultContent && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = defaultContent
      setIsEmpty(isEditorEmpty(editorRef.current))
    }
  }, [defaultContent])

  // Sync controlled content
  useEffect(() => {
    if (editorRef.current && content !== undefined) {
      if (editorRef.current.innerHTML !== content) {
        editorRef.current.innerHTML = content
        setIsEmpty(isEditorEmpty(editorRef.current))
      }
    }
  }, [content])

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange?.(editorRef.current.innerHTML)
      setIsEmpty(isEditorEmpty(editorRef.current))
    }
  }, [onChange])

  // Execute formatting command
  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }, [handleInput])

  // Check if format is active
  const isFormatActive = useCallback((command: string, value?: string) => {
    if (command === 'formatBlock' && value) {
      return document.queryCommandValue(command).toLowerCase() === value.toLowerCase()
    }
    return document.queryCommandState(command)
  }, [])

  // Insert code block (execCommand doesn't have a code block command)
  const insertCodeBlock = useCallback(() => {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    const selectedText = range.toString() || 'code'

    // Create the code block element
    const pre = document.createElement('pre')
    const code = document.createElement('code')
    code.textContent = selectedText
    pre.appendChild(code)

    // Delete the selected content and insert the code block
    range.deleteContents()
    range.insertNode(pre)

    // Move cursor after the code block
    range.setStartAfter(pre)
    range.collapse(true)
    selection.removeAllRanges()
    selection.addRange(range)

    editorRef.current?.focus()
    handleInput()
  }, [handleInput])

  // Insert link with URL
  const insertLink = useCallback((url: string) => {
    const selection = window.getSelection()
    if (!selection) return

    // Check if there's selected text
    if (selection.toString()) {
      // Wrap selected text with link
      document.execCommand('createLink', false, url)
    } else {
      // Insert URL as link text
      const link = document.createElement('a')
      link.href = url
      link.textContent = url
      document.execCommand('insertHTML', false, link.outerHTML)
    }

    editorRef.current?.focus()
    handleInput()
  }, [handleInput])

  return (
    <FormControl label={label} error={error} hint={hint} id={id} className={className}>
      {({ id: editorId }) => (
        <div
          className={cn(
            'rounded-[10px] border bg-white overflow-hidden transition-all duration-200',
            'focus-within:ring-2 focus-within:ring-offset-1',
            error
              ? 'border-[#F87171] focus-within:ring-[#F87171]/20'
              : 'border-[rgba(184,164,142,0.25)] focus-within:border-[#B8A48E] focus-within:ring-[#B8A48E]/20',
            disabled && 'opacity-50 cursor-not-allowed bg-[#F5F3EF]'
          )}
        >
          <Toolbar
            execCommand={execCommand}
            isFormatActive={isFormatActive}
            insertCodeBlock={insertCodeBlock}
            insertLink={insertLink}
            disabled={disabled}
          />
          <div className="relative">
            {placeholder && isEmpty && (
              <div
                className="absolute top-2 left-3 text-[#8A847A] pointer-events-none select-none"
                aria-hidden="true"
              >
                {placeholder}
              </div>
            )}
            <div
              ref={editorRef}
              id={editorId}
              contentEditable={!disabled}
              onInput={handleInput}
              className="freehold-rte-content px-3 py-2"
              style={{ minHeight, cursor: disabled ? undefined : 'text' }}
            />
          </div>
        </div>
      )}
    </FormControl>
  )
}

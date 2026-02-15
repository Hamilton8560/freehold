'use client'

import { useEffect } from 'react'
import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { cn } from '../../utils/cn'
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
  onEditor?: (editor: Editor) => void
  placeholder?: string
  disabled?: boolean
  minHeight?: number
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
  onEditor,
  placeholder,
  disabled = false,
  minHeight = 200,
}: RichTextEditorProps) {
  const editorId = id || label?.toLowerCase().replace(/\s+/g, '-')

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer nofollow',
        },
      }),
      Placeholder.configure({
        placeholder: placeholder ?? '',
      }),
    ],
    content: content ?? defaultContent,
    editable: !disabled,
    editorProps: {
      attributes: {
        class: 'freehold-rte-content',
        id: editorId ?? '',
      },
    },
    onUpdate: ({ editor: e }) => {
      onChange?.(e.getHTML())
    },
    onCreate: ({ editor: e }) => {
      onEditor?.(e)
    },
    immediatelyRender: false,
  })

  // Sync controlled content
  useEffect(() => {
    if (editor && content !== undefined && editor.getHTML() !== content) {
      editor.commands.setContent(content, { emitUpdate: false })
    }
  }, [editor, content])

  // Sync disabled state
  useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled)
    }
  }, [editor, disabled])

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label
          htmlFor={editorId}
          className="mb-1.5 block text-sm font-medium text-[#2C2824]"
        >
          {label}
        </label>
      )}
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
        <Toolbar editor={editor} />
        <EditorContent
          editor={editor}
          className="px-3 py-2 freehold-rte-wrapper"
          style={{ minHeight, cursor: disabled ? undefined : 'text' }}
        />
      </div>
      {(error || hint) && (
        <p
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

import { useState } from 'react'
import type { Editor } from '@tiptap/react'
import { cn } from '../../utils/cn'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
} from '../../primitives/Dialog/Dialog'
import { Input } from '../../primitives/Input/Input'
import { Button } from '../../primitives/Button/Button'

interface ToolbarProps {
  editor: Editor | null
}

function ToolbarButton({
  onClick,
  onMouseDown,
  active = false,
  disabled = false,
  title,
  children,
}: {
  onClick: () => void
  onMouseDown?: () => void
  active?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault()
        onMouseDown?.()
      }}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        'w-8 h-8 flex items-center justify-center rounded-md transition-colors',
        active
          ? 'bg-[#F5F3EF] text-[#2C2824]'
          : 'text-[#5C574F] hover:bg-[#F5F3EF] hover:text-[#2C2824]',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="w-px h-5 bg-[rgba(184,164,142,0.25)] mx-0.5" />
}

export function Toolbar({ editor }: ToolbarProps) {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [savedSelection, setSavedSelection] = useState<{ from: number; to: number } | null>(null)

  if (!editor) return null

  // Save selection when any toolbar interaction starts
  const saveSelection = () => {
    const { from, to } = editor.state.selection
    setSavedSelection({ from, to })
  }

  // Execute command with selection restoration for block-level operations
  const executeBlockCommand = (command: () => void) => {
    if (savedSelection) {
      editor.chain().focus().setTextSelection(savedSelection).run()
    } else {
      editor.chain().focus().run()
    }
    command()
    setSavedSelection(null)
  }

  const handleLink = () => {
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run()
      return
    }
    setLinkUrl('')
    setLinkDialogOpen(true)
  }

  const handleLinkSubmit = () => {
    if (linkUrl) {
      // Validate URL - reject javascript: and data: protocols
      const trimmedUrl = linkUrl.trim()
      if (/^(javascript|data):/i.test(trimmedUrl)) {
        return // Silently reject dangerous protocols
      }

      // Check if there's selected text
      const { from, to } = editor.state.selection
      if (from === to) {
        // No selection - insert URL as link text
        editor
          .chain()
          .focus()
          .insertContent(`<a href="${trimmedUrl}">${trimmedUrl}</a>`)
          .run()
      } else {
        // Has selection - wrap selected text with link
        editor.chain().focus().setLink({ href: trimmedUrl }).run()
      }
    }
    setLinkDialogOpen(false)
  }

  return (
    <div className="bg-[#F9F7F4] border-b border-[rgba(184,164,142,0.15)] px-2 py-1.5 flex items-center gap-0.5 flex-wrap">
      {/* Bold / Italic */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
        title="Bold"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 4h5.5a3 3 0 0 1 0 6H6V4z" />
          <path d="M6 10h6.5a3 3 0 0 1 0 6H6v-6z" />
        </svg>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
        title="Italic"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12.5" y1="4" x2="7.5" y2="16" />
          <line x1="9" y1="4" x2="14" y2="4" />
          <line x1="6" y1="16" x2="11" y2="16" />
        </svg>
      </ToolbarButton>

      <Divider />

      {/* Headings */}
      <ToolbarButton
        onMouseDown={saveSelection}
        onClick={() => executeBlockCommand(() => editor.chain().focus().toggleHeading({ level: 1 }).run())}
        active={editor.isActive('heading', { level: 1 })}
        title="Heading 1"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4v12M12 4v12M4 10h8" />
          <path d="M15 8v8" strokeWidth="1.25" />
          <path d="M14 9l1-1" strokeWidth="1.25" />
        </svg>
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={saveSelection}
        onClick={() => executeBlockCommand(() => editor.chain().focus().toggleHeading({ level: 2 }).run())}
        active={editor.isActive('heading', { level: 2 })}
        title="Heading 2"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4v12M12 4v12M4 10h8" />
          <path d="M14.5 8.5a1.5 1.5 0 0 1 2.5 1c0 1.5-3 3-3 3h3" strokeWidth="1.25" />
        </svg>
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={saveSelection}
        onClick={() => executeBlockCommand(() => editor.chain().focus().toggleHeading({ level: 3 }).run())}
        active={editor.isActive('heading', { level: 3 })}
        title="Heading 3"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4v12M12 4v12M4 10h8" />
          <path d="M14 8.5h2.5l-1.5 2a1.5 1.5 0 1 1-1 2.5" strokeWidth="1.25" />
        </svg>
      </ToolbarButton>

      <Divider />

      {/* Lists */}
      <ToolbarButton
        onMouseDown={saveSelection}
        onClick={() => executeBlockCommand(() => editor.chain().focus().toggleBulletList().run())}
        active={editor.isActive('bulletList')}
        title="Bullet List"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="8" y1="10" x2="16" y2="10" />
          <line x1="8" y1="14" x2="16" y2="14" />
          <circle cx="4.5" cy="6" r="0.75" fill="currentColor" stroke="none" />
          <circle cx="4.5" cy="10" r="0.75" fill="currentColor" stroke="none" />
          <circle cx="4.5" cy="14" r="0.75" fill="currentColor" stroke="none" />
        </svg>
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={saveSelection}
        onClick={() => executeBlockCommand(() => editor.chain().focus().toggleOrderedList().run())}
        active={editor.isActive('orderedList')}
        title="Ordered List"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="8" y1="10" x2="16" y2="10" />
          <line x1="8" y1="14" x2="16" y2="14" />
          <text x="3" y="7.5" fontSize="5" fill="currentColor" stroke="none" fontFamily="sans-serif">1</text>
          <text x="3" y="11.5" fontSize="5" fill="currentColor" stroke="none" fontFamily="sans-serif">2</text>
          <text x="3" y="15.5" fontSize="5" fill="currentColor" stroke="none" fontFamily="sans-serif">3</text>
        </svg>
      </ToolbarButton>

      <Divider />

      {/* Blockquote / Code Block */}
      <ToolbarButton
        onMouseDown={saveSelection}
        onClick={() => executeBlockCommand(() => editor.chain().focus().toggleBlockquote().run())}
        active={editor.isActive('blockquote')}
        title="Blockquote"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4v12" strokeWidth="2.5" />
          <line x1="8" y1="7" x2="16" y2="7" />
          <line x1="8" y1="10" x2="14" y2="10" />
          <line x1="8" y1="13" x2="16" y2="13" />
        </svg>
      </ToolbarButton>
      <ToolbarButton
        onMouseDown={saveSelection}
        onClick={() => executeBlockCommand(() => editor.chain().focus().toggleCodeBlock().run())}
        active={editor.isActive('codeBlock')}
        title="Code Block"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="7,5 3,10 7,15" />
          <polyline points="13,5 17,10 13,15" />
          <line x1="11" y1="4" x2="9" y2="16" />
        </svg>
      </ToolbarButton>

      <Divider />

      {/* Link */}
      <ToolbarButton
        onClick={handleLink}
        active={editor.isActive('link')}
        title="Link"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 11.5a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5l-1 1" />
          <path d="M11.5 8.5a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5l1-1" />
        </svg>
      </ToolbarButton>

      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent size="sm" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Input
              label="URL"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLinkSubmit()}
              autoFocus
            />
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button variant="primary" onClick={handleLinkSubmit}>
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

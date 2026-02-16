import { useState } from 'react'
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
  execCommand: (command: string, value?: string) => void
  isFormatActive: (command: string, value?: string) => boolean
  insertCodeBlock: () => void
  insertLink: (url: string) => void
  disabled?: boolean
}

function ToolbarButton({
  onClick,
  active = false,
  disabled = false,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
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

export function Toolbar({
  execCommand,
  isFormatActive,
  insertCodeBlock,
  insertLink,
  disabled = false,
}: ToolbarProps) {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')

  const handleLinkClick = () => {
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
      insertLink(trimmedUrl)
    }
    setLinkDialogOpen(false)
  }

  return (
    <div className="bg-[#F9F7F4] border-b border-[rgba(184,164,142,0.15)] px-2 py-1.5 flex items-center gap-0.5 flex-wrap">
      {/* Bold / Italic */}
      <ToolbarButton
        onClick={() => execCommand('bold')}
        active={isFormatActive('bold')}
        disabled={disabled}
        title="Bold"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 4h5.5a3 3 0 0 1 0 6H6V4z" />
          <path d="M6 10h6.5a3 3 0 0 1 0 6H6v-6z" />
        </svg>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => execCommand('italic')}
        active={isFormatActive('italic')}
        disabled={disabled}
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
        onClick={() => execCommand('formatBlock', 'h1')}
        active={isFormatActive('formatBlock', 'h1')}
        disabled={disabled}
        title="Heading 1"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4v12M12 4v12M4 10h8" />
          <path d="M15 8v8" strokeWidth="1.25" />
          <path d="M14 9l1-1" strokeWidth="1.25" />
        </svg>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => execCommand('formatBlock', 'h2')}
        active={isFormatActive('formatBlock', 'h2')}
        disabled={disabled}
        title="Heading 2"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4v12M12 4v12M4 10h8" />
          <path d="M14.5 8.5a1.5 1.5 0 0 1 2.5 1c0 1.5-3 3-3 3h3" strokeWidth="1.25" />
        </svg>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => execCommand('formatBlock', 'h3')}
        active={isFormatActive('formatBlock', 'h3')}
        disabled={disabled}
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
        onClick={() => execCommand('insertUnorderedList')}
        active={isFormatActive('insertUnorderedList')}
        disabled={disabled}
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
        onClick={() => execCommand('insertOrderedList')}
        active={isFormatActive('insertOrderedList')}
        disabled={disabled}
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
        onClick={() => execCommand('formatBlock', 'blockquote')}
        active={isFormatActive('formatBlock', 'blockquote')}
        disabled={disabled}
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
        onClick={insertCodeBlock}
        disabled={disabled}
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
        onClick={handleLinkClick}
        disabled={disabled}
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

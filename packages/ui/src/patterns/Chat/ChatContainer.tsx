'use client'

import type { FormEvent } from 'react'
import { cn } from '../../utils/cn'
import { ChatHeader } from './ChatHeader'
import { MessageList } from './MessageList'
import { ChatInput } from './ChatInput'
import type { ChatMessageData, ChatUser } from './types'

export interface ChatContainerProps {
  messages: ChatMessageData[]
  input: string
  onInputChange: (value: string) => void
  onSubmit: (e?: FormEvent) => void
  isLoading?: boolean
  error?: string
  onRetry?: () => void
  title?: string
  subtitle?: string
  user?: ChatUser
  assistant?: ChatUser
  emptyStateMessage?: string
  suggestions?: string[]
  onSuggestionClick?: (suggestion: string) => void
  inputPlaceholder?: string
  headerActions?: React.ReactNode
  maxHeight?: string
  className?: string
}

export function ChatContainer({
  messages,
  input,
  onInputChange,
  onSubmit,
  isLoading,
  error,
  onRetry,
  title,
  subtitle,
  user,
  assistant,
  emptyStateMessage,
  suggestions,
  onSuggestionClick,
  inputPlaceholder,
  headerActions,
  maxHeight = '600px',
  className,
}: ChatContainerProps) {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-[14px] border border-[rgba(184,164,142,0.15)] bg-white shadow-[0_1px_3px_rgba(26,26,26,0.04),0_4px_12px_rgba(26,26,26,0.03)]',
        className
      )}
      style={{ maxHeight }}
    >
      <ChatHeader
        title={title}
        subtitle={subtitle}
        assistant={assistant}
        actions={headerActions}
      />
      <MessageList
        messages={messages}
        isLoading={isLoading}
        user={user}
        assistant={assistant}
        emptyStateMessage={emptyStateMessage}
        suggestions={suggestions}
        onSuggestionClick={onSuggestionClick}
      />
      {error && (
        <div className="flex items-center gap-2 border-t border-[rgba(184,164,142,0.15)] bg-[#FEE2E2] px-4 py-2">
          <p className="flex-1 text-xs text-[#991B1B]">{error}</p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="text-xs font-medium text-[#991B1B] underline underline-offset-2 hover:text-[#7F1D1D]"
            >
              Retry
            </button>
          )}
        </div>
      )}
      <ChatInput
        value={input}
        onChange={onInputChange}
        onSubmit={onSubmit}
        placeholder={inputPlaceholder}
        disabled={isLoading}
      />
    </div>
  )
}

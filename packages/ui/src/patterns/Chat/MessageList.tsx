'use client'

import { useRef, useEffect } from 'react'
import { cn } from '../../utils/cn'
import { ChatMessage } from './ChatMessage'
import { TypingIndicator } from './TypingIndicator'
import { EmptyState } from './EmptyState'
import type { ChatMessageData, ChatUser } from './types'

export interface MessageListProps {
  messages: ChatMessageData[]
  isLoading?: boolean
  user?: ChatUser
  assistant?: ChatUser
  emptyStateMessage?: string
  suggestions?: string[]
  onSuggestionClick?: (suggestion: string) => void
  className?: string
}

export function MessageList({
  messages,
  isLoading,
  user,
  assistant,
  emptyStateMessage,
  suggestions,
  onSuggestionClick,
  className,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  if (messages.length === 0) {
    return (
      <EmptyState
        message={emptyStateMessage}
        suggestions={suggestions}
        onSuggestionClick={onSuggestionClick}
        className={cn('flex-1 overflow-y-auto bg-[#FAF9F6]', className)}
      />
    )
  }

  return (
    <div className={cn('flex-1 space-y-3 overflow-y-auto bg-[#FAF9F6] p-4', className)}>
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          user={user}
          assistant={assistant}
        />
      ))}
      {isLoading && !messages[messages.length - 1]?.isStreaming && (
        <TypingIndicator />
      )}
      <div ref={bottomRef} />
    </div>
  )
}

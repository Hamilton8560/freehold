'use client'

import { useChat, type UseChatOptions } from 'ai/react'
import { useMemo } from 'react'

export type ToolCallStatus = 'pending' | 'running' | 'completed' | 'error'

export interface ChatToolCall {
  id: string
  toolName: string
  args: Record<string, unknown>
  result?: unknown
  status: ToolCallStatus
  error?: string
}

export interface ChatMessageData {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt?: Date
  isStreaming?: boolean
  toolCalls?: ChatToolCall[]
}

export interface UseFreeholdChatOptions {
  api?: string
  initialMessages?: UseChatOptions['initialMessages']
  body?: Record<string, unknown>
  headers?: Record<string, string>
  onFinish?: UseChatOptions['onFinish']
  onError?: UseChatOptions['onError']
}

export interface UseFreeholdChatReturn {
  messages: ChatMessageData[]
  input: string
  handleInputChange: (e: { target: { value: string } }) => void
  handleSubmit: (e?: { preventDefault?: () => void }) => void
  setInput: (input: string) => void
  isLoading: boolean
  status: string
  error: Error | undefined
  stop: () => void
  reload: () => void
}

export function useFreeholdChat(options: UseFreeholdChatOptions = {}): UseFreeholdChatReturn {
  const {
    api = '/api/chat',
    initialMessages,
    body,
    headers,
    onFinish,
    onError,
  } = options

  const chat = useChat({
    api,
    initialMessages,
    body,
    headers,
    onFinish,
    onError,
  })

  const messages: ChatMessageData[] = useMemo(() => {
    return chat.messages.map((msg) => {
      const isStreaming =
        chat.status === 'streaming' &&
        msg.id === chat.messages[chat.messages.length - 1]?.id &&
        msg.role === 'assistant'

      const toolCalls: ChatToolCall[] | undefined = msg.parts
        ?.filter(
          (part): part is Extract<typeof part, { type: 'tool-invocation' }> =>
            part.type === 'tool-invocation'
        )
        .map((part) => ({
          id: part.toolInvocation.toolCallId,
          toolName: part.toolInvocation.toolName,
          args: part.toolInvocation.args as Record<string, unknown>,
          result: 'result' in part.toolInvocation ? part.toolInvocation.result : undefined,
          status: (
            part.toolInvocation.state === 'result'
              ? 'completed'
              : part.toolInvocation.state === 'call'
                ? 'running'
                : 'pending'
          ) as ToolCallStatus,
        }))

      return {
        id: msg.id,
        role: msg.role as ChatMessageData['role'],
        content: typeof msg.content === 'string' ? msg.content : '',
        createdAt: msg.createdAt,
        isStreaming,
        toolCalls: toolCalls && toolCalls.length > 0 ? toolCalls : undefined,
      }
    })
  }, [chat.messages, chat.status])

  return {
    messages,
    input: chat.input,
    handleInputChange: chat.handleInputChange as UseFreeholdChatReturn['handleInputChange'],
    handleSubmit: chat.handleSubmit,
    setInput: chat.setInput,
    isLoading: chat.status === 'streaming' || chat.status === 'submitted',
    status: chat.status,
    error: chat.error,
    stop: chat.stop,
    reload: chat.reload,
  }
}

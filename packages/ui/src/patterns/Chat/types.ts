export type ChatRole = 'user' | 'assistant' | 'system'

export type ToolCallStatus = 'pending' | 'running' | 'completed' | 'error'

export interface ToolCallDisplay {
  id: string
  toolName: string
  args: Record<string, unknown>
  result?: unknown
  status: ToolCallStatus
  error?: string
}

export interface ChatMessageData {
  id: string
  role: ChatRole
  content: string
  createdAt?: Date
  isStreaming?: boolean
  toolCalls?: ToolCallDisplay[]
}

export interface ChatUser {
  name: string
  avatar?: string
}

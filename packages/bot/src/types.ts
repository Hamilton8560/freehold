import type { ProviderConfig } from '@freehold/ai'
import type { FreeholdToolDefinition } from '@freehold/ai'

export interface BotConfig {
  provider: ProviderConfig
  tools?: FreeholdToolDefinition[]
  systemPrompt?: string
  maxSteps?: number
}

export interface BotMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface PlatformAdapter {
  start(): Promise<void>
  stop(): void
}

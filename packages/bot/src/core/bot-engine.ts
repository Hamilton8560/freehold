import { generateText } from 'ai'
import { createModel, toAISDKTools } from '@freehold/ai/server'
import type { BotConfig, BotMessage } from '../types'

/**
 * Generate a complete bot response (non-streaming).
 * Suitable for platform adapters that send a single reply message.
 */
export async function generateBotResponse(
  config: BotConfig,
  messages: BotMessage[]
): Promise<string> {
  const model = await createModel(config.provider)
  const tools = config.tools ? toAISDKTools(config.tools) : undefined

  const result = await generateText({
    model,
    messages,
    system: config.systemPrompt,
    tools,
    maxSteps: config.maxSteps ?? 5,
  })

  return result.text
}

export { createModel } from './providers'
export type { ProviderConfig, ProviderName } from './providers'
export { toAISDKTools, toAISDKTool, createToolRegistry } from './tools'

import { streamText } from 'ai'
import { createModel } from './providers'
import { toAISDKTools } from './tools'
import type { ProviderConfig } from './providers'
import type { FreeholdToolDefinition } from './tools'

export interface CreateChatHandlerOptions {
  provider: ProviderConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tools?: FreeholdToolDefinition<any, any>[]
  systemPrompt?: string
  maxSteps?: number
}

/**
 * Create a POST handler for Next.js App Router API routes.
 *
 * Usage:
 * ```ts
 * // app/api/chat/route.ts
 * import { createChatHandler } from '@freehold/ai/server'
 * export const POST = createChatHandler({ provider: { provider: 'openai', model: 'gpt-4o' } })
 * ```
 */
export function createChatHandler(options: CreateChatHandlerOptions) {
  const { provider, tools = [], systemPrompt, maxSteps = 5 } = options

  return async function POST(req: Request) {
    const { messages } = await req.json()
    const model = await createModel(provider)

    const result = streamText({
      model,
      messages,
      system: systemPrompt,
      tools: tools.length > 0 ? toAISDKTools(tools) : undefined,
      maxSteps,
    })

    return result.toDataStreamResponse()
  }
}

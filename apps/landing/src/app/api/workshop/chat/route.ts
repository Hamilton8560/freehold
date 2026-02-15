import { createModel, toAISDKTools } from '@freehold/ai/server'
import type { ProviderName } from '@freehold/ai'
import { streamText, createDataStreamResponse } from 'ai'
import { workshopTools } from '../../../workshop/tools'
import { matchScenario, executeDemoStream } from '../../../workshop/demo-scenarios'

const VALID_PROVIDERS: ProviderName[] = ['openai', 'anthropic', 'google', 'deepseek', 'ollama']

const SYSTEM_PROMPT = `You are a helpful Freehold assistant. You help users learn about the Freehold platform and can calculate payroll estimates. Be friendly, concise, and use the tools available to you when relevant. Keep responses short — 1-3 sentences unless more detail is asked for.`

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { messages, providerConfig } = body

    // Demo mode — return canned streamed responses before any validation
    if (providerConfig?.provider === 'demo') {
      const lastUserMsg = messages?.filter((m: any) => m.role === 'user').pop()
      const scenario = matchScenario(lastUserMsg?.content || '')
      return createDataStreamResponse({
        execute: (writer) => executeDemoStream(scenario, writer),
      })
    }

    if (!providerConfig || !providerConfig.provider || !providerConfig.model) {
      return new Response(
        JSON.stringify({ error: 'Missing provider configuration. Please select a provider and model.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { provider, model, apiKey, baseURL } = providerConfig

    if (!VALID_PROVIDERS.includes(provider)) {
      return new Response(
        JSON.stringify({ error: `Unknown provider: ${provider}. Supported: ${VALID_PROVIDERS.join(', ')}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (provider !== 'ollama' && !apiKey) {
      return new Response(
        JSON.stringify({ error: `API key is required for ${provider}.` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const languageModel = await createModel({
      provider,
      model,
      ...(apiKey && { apiKey }),
      ...(baseURL && { baseURL }),
    })

    const result = streamText({
      model: languageModel,
      messages,
      system: SYSTEM_PROMPT,
      tools: toAISDKTools(workshopTools),
      maxSteps: 5,
    })

    return result.toDataStreamResponse()
  } catch (err) {
    const message = err instanceof Error ? err.message : 'An unexpected error occurred'
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

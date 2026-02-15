import type { ProviderConfig, ProviderName } from './types'

export type { ProviderConfig, ProviderName } from './types'

/** The model type accepted by `streamText` and `generateText` from the AI SDK. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LanguageModel = any

/**
 * Create an AI SDK language model from a provider config.
 * Provider SDKs are dynamically imported so only the installed one is loaded.
 */
export async function createModel(config: ProviderConfig): Promise<LanguageModel> {
  const { provider, model, apiKey, baseURL } = config

  switch (provider) {
    case 'openai': {
      const { createOpenAI } = await import('@ai-sdk/openai')
      const openai = createOpenAI({ ...(apiKey && { apiKey }), ...(baseURL && { baseURL }) })
      return openai(model)
    }
    case 'anthropic': {
      const { createAnthropic } = await import('@ai-sdk/anthropic')
      const anthropic = createAnthropic({ ...(apiKey && { apiKey }), ...(baseURL && { baseURL }) })
      return anthropic(model)
    }
    case 'google': {
      const { createGoogleGenerativeAI } = await import('@ai-sdk/google')
      const google = createGoogleGenerativeAI({ ...(apiKey && { apiKey }), ...(baseURL && { baseURL }) })
      return google(model)
    }
    case 'deepseek': {
      const { createDeepSeek } = await import('@ai-sdk/deepseek')
      const deepseek = createDeepSeek({ ...(apiKey && { apiKey }), ...(baseURL && { baseURL }) })
      return deepseek(model)
    }
    case 'ollama': {
      const { ollama } = await import('ollama-ai-provider')
      return ollama(model)
    }
    default:
      throw new Error(`Unknown AI provider: ${provider as string}`)
  }
}

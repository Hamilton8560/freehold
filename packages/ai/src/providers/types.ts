export type ProviderName = 'openai' | 'anthropic' | 'google' | 'deepseek' | 'ollama'

export interface ProviderConfig {
  provider: ProviderName
  model: string
  apiKey?: string
  /** Base URL override (useful for Ollama custom endpoints) */
  baseURL?: string
}

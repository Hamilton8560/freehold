import type { BotConfig } from '../../types'

export interface DiscordBotConfig extends BotConfig {
  /** Discord bot token from the Developer Portal */
  token: string
  /** Only respond in these channel IDs (optional — responds everywhere if omitted) */
  allowedChannels?: string[]
  /** Ignore messages from other bots (default: true) */
  ignoreBots?: boolean
}

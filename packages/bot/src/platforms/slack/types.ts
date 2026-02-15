import type { BotConfig } from '../../types'

export interface SlackBotConfig extends BotConfig {
  /** Slack bot token (xoxb-...) */
  token: string
  /** Slack app-level token for Socket Mode (xapp-...) */
  appToken: string
  /** Slack signing secret (for verifying requests) */
  signingSecret: string
  /** Respond to @mentions in channels (default: true) */
  respondToMentions?: boolean
  /** Respond to direct messages (default: true) */
  respondToDirectMessages?: boolean
}

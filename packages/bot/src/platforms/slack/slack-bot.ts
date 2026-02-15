import { App } from '@slack/bolt'
import type { SlackBotConfig } from './types'
import type { BotMessage, PlatformAdapter } from '../../types'
import { generateBotResponse } from '../../core/bot-engine'

/**
 * Create a Slack bot using @slack/bolt (Socket Mode).
 *
 * Usage:
 * ```ts
 * import { createSlackBot } from '@freehold/bot/slack'
 * const bot = createSlackBot({
 *   token: process.env.SLACK_BOT_TOKEN!,
 *   appToken: process.env.SLACK_APP_TOKEN!,
 *   signingSecret: process.env.SLACK_SIGNING_SECRET!,
 *   provider: { provider: 'openai', model: 'gpt-4o' },
 *   systemPrompt: 'You are a helpful assistant.',
 * })
 * await bot.start()
 * ```
 */
export function createSlackBot(config: SlackBotConfig): PlatformAdapter {
  const respondToMentions = config.respondToMentions ?? true
  const respondToDMs = config.respondToDirectMessages ?? true

  const app = new App({
    token: config.token,
    appToken: config.appToken,
    signingSecret: config.signingSecret,
    socketMode: true,
  })

  // Per-conversation message history (in-memory, resets on restart)
  const conversationHistory = new Map<string, BotMessage[]>()

  async function handleMessage(
    text: string,
    conversationId: string,
    say: (text: string) => Promise<unknown>,
    threadTs?: string
  ) {
    // Strip @mention from text if present
    const cleanText = text.replace(/<@[A-Z0-9]+>/g, '').trim()
    if (!cleanText) return

    // Get or initialize history
    // Use thread_ts if available to keep thread-specific history
    const historyKey = threadTs ? `${conversationId}:${threadTs}` : conversationId
    const history = conversationHistory.get(historyKey) || []
    history.push({ role: 'user', content: cleanText })

    // Keep last 20 messages to avoid token overflow
    if (history.length > 20) {
      history.splice(0, history.length - 20)
    }

    try {
      const response = await generateBotResponse(config, history)

      history.push({ role: 'assistant', content: response })
      conversationHistory.set(historyKey, history)

      await say(response)
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : 'Unknown error'
      await say(`Sorry, I encountered an error: ${errorMsg}`)
    }
  }

  // Handle @mentions in channels
  if (respondToMentions) {
    app.event('app_mention', async ({ event, say }) => {
      await handleMessage(
        event.text,
        event.channel,
        (text) => say({ text, thread_ts: event.thread_ts || event.ts }),
        event.thread_ts || event.ts
      )
    })
  }

  // Handle direct messages
  if (respondToDMs) {
    app.message(async ({ message, say }) => {
      // Only handle regular user messages (not bot messages, edits, etc.)
      if (
        message.subtype ||
        !('text' in message) ||
        !message.text ||
        ('bot_id' in message && message.bot_id)
      ) {
        return
      }

      // Only respond in DMs (channel type 'im')
      if ('channel_type' in message && message.channel_type !== 'im') return

      await handleMessage(
        message.text,
        message.channel,
        (text) => say({ text, thread_ts: ('thread_ts' in message ? message.thread_ts : undefined) || message.ts }),
        'thread_ts' in message ? message.thread_ts : undefined
      )
    })
  }

  return {
    start: async () => {
      await app.start()
    },
    stop: () => {
      app.stop()
    },
  }
}

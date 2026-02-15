import { Client, Events, GatewayIntentBits } from 'discord.js'
import type { DiscordBotConfig } from './types'
import type { BotMessage, PlatformAdapter } from '../../types'
import { generateBotResponse } from '../../core/bot-engine'

/**
 * Create a Discord bot using discord.js.
 *
 * Usage:
 * ```ts
 * import { createDiscordBot } from '@freehold/bot/discord'
 * const bot = createDiscordBot({
 *   token: process.env.DISCORD_BOT_TOKEN!,
 *   provider: { provider: 'openai', model: 'gpt-4o' },
 *   systemPrompt: 'You are a helpful assistant.',
 * })
 * await bot.start()
 * ```
 */
export function createDiscordBot(config: DiscordBotConfig): PlatformAdapter {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
    ],
  })

  const ignoreBots = config.ignoreBots ?? true

  // Per-channel message history (in-memory, resets on restart)
  const channelHistory = new Map<string, BotMessage[]>()

  client.on(Events.MessageCreate, async (message) => {
    // Ignore own messages
    if (message.author.id === client.user?.id) return

    // Optionally ignore other bots
    if (ignoreBots && message.author.bot) return

    // Optionally restrict to specific channels
    if (
      config.allowedChannels &&
      !config.allowedChannels.includes(message.channelId)
    ) {
      return
    }

    const channelId = message.channelId
    const userText = message.content

    // Get or initialize history
    const history = channelHistory.get(channelId) || []
    history.push({ role: 'user', content: userText })

    // Keep last 20 messages to avoid token overflow
    if (history.length > 20) {
      history.splice(0, history.length - 20)
    }

    try {
      // Show typing indicator
      await message.channel.sendTyping()

      const response = await generateBotResponse(config, history)

      history.push({ role: 'assistant', content: response })
      channelHistory.set(channelId, history)

      // Discord has a 2000 character limit — split long messages
      if (response.length <= 2000) {
        await message.reply(response)
      } else {
        const chunks: string[] = []
        let remaining = response
        while (remaining.length > 0) {
          chunks.push(remaining.slice(0, 2000))
          remaining = remaining.slice(2000)
        }
        for (const chunk of chunks) {
          await message.reply(chunk)
        }
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : 'Unknown error'
      await message.reply(`Sorry, I encountered an error: ${errorMsg}`)
    }
  })

  return {
    start: async () => {
      await client.login(config.token)
    },
    stop: () => {
      client.destroy()
    },
  }
}

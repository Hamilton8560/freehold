import { Bot } from 'grammy'
import type { TelegramBotConfig } from './types'
import type { BotMessage, PlatformAdapter } from '../../types'
import { generateBotResponse } from '../../core/bot-engine'

/**
 * Create a Telegram bot using grammy.
 *
 * Usage:
 * ```ts
 * import { createTelegramBot } from '@freehold/bot/telegram'
 * const bot = createTelegramBot({
 *   token: process.env.TELEGRAM_BOT_TOKEN!,
 *   provider: { provider: 'openai', model: 'gpt-4o' },
 *   systemPrompt: 'You are a helpful assistant.',
 * })
 * await bot.start()
 * ```
 */
export function createTelegramBot(config: TelegramBotConfig): PlatformAdapter {
  const bot = new Bot(config.token)

  // Simple per-chat message history (in-memory, resets on restart)
  const chatHistory = new Map<number, BotMessage[]>()

  bot.on('message:text', async (ctx) => {
    const chatId = ctx.chat.id
    const userText = ctx.message.text

    // Get or initialize history
    const history = chatHistory.get(chatId) || []
    history.push({ role: 'user', content: userText })

    // Keep last 20 messages to avoid token overflow
    if (history.length > 20) {
      history.splice(0, history.length - 20)
    }

    try {
      // Send typing indicator
      await ctx.replyWithChatAction('typing')

      const response = await generateBotResponse(config, history)

      history.push({ role: 'assistant', content: response })
      chatHistory.set(chatId, history)

      await ctx.reply(response, { parse_mode: 'Markdown' })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unknown error'
      await ctx.reply(`Sorry, I encountered an error: ${message}`)
    }
  })

  return {
    start: async () => {
      await bot.start()
    },
    stop: () => {
      bot.stop()
    },
  }
}

# @freehold/bot

Multi-platform bot framework built on [`@freehold/ai`](../ai). Create AI chatbots for Telegram, Discord, Slack, and WhatsApp with a unified interface.

## Installation

```bash
pnpm add @freehold/bot @freehold/ai
# or
npm install @freehold/bot @freehold/ai
```

Install at least one AI provider and one platform SDK:

```bash
# AI provider
pnpm add @ai-sdk/openai

# Platform SDK (pick one or more)
pnpm add grammy          # Telegram
pnpm add discord.js      # Discord
pnpm add @slack/bolt     # Slack
```

## Entry Points

| Import | Purpose |
|--------|---------|
| `@freehold/bot` | Core — `generateBotResponse`, shared types |
| `@freehold/bot/telegram` | Telegram adapter via grammy |
| `@freehold/bot/discord` | Discord adapter via discord.js |
| `@freehold/bot/slack` | Slack adapter via @slack/bolt |
| `@freehold/bot/whatsapp` | WhatsApp adapter |

## Quick Start — Telegram

```ts
import { createTelegramBot } from '@freehold/bot/telegram'
import { defineTool } from '@freehold/ai'
import { z } from 'zod'

const weatherTool = defineTool({
  name: 'getWeather',
  description: 'Get weather for a city',
  parameters: z.object({
    city: z.string().describe('City name'),
  }),
  execute: async ({ city }) => ({ city, temp: 72, condition: 'Sunny' }),
})

const bot = createTelegramBot({
  token: process.env.TELEGRAM_BOT_TOKEN!,
  provider: {
    provider: 'openai',
    model: 'gpt-4o-mini',
    apiKey: process.env.OPENAI_API_KEY,
  },
  tools: [weatherTool],
  systemPrompt: 'You are a helpful weather assistant.',
})

await bot.start()
```

## API Reference

### `generateBotResponse(config, messages)`

Generate a complete (non-streaming) bot response. Used internally by platform adapters, but also available for custom integrations.

```ts
import { generateBotResponse } from '@freehold/bot'

const response = await generateBotResponse(
  {
    provider: { provider: 'openai', model: 'gpt-4o-mini', apiKey: '...' },
    tools: [weatherTool],
    systemPrompt: 'You are helpful.',
  },
  [{ role: 'user', content: 'What is the weather in SF?' }]
)
// response is a string
```

### `createTelegramBot(config)`

Create a Telegram bot. Returns a `PlatformAdapter` with `start()` and `stop()`.

```ts
interface TelegramBotConfig {
  token: string                // Telegram bot token from @BotFather
  provider: ProviderConfig     // AI provider config
  tools?: FreeholdToolDefinition[]
  systemPrompt?: string
  maxSteps?: number            // default: 5
}
```

Features:
- Per-chat message history (in-memory, last 20 messages)
- Typing indicator while generating
- Markdown response formatting

### Types

```ts
interface BotConfig {
  provider: ProviderConfig
  tools?: FreeholdToolDefinition[]
  systemPrompt?: string
  maxSteps?: number
}

interface BotMessage {
  role: 'user' | 'assistant'
  content: string
}

interface PlatformAdapter {
  start(): Promise<void>
  stop(): void
}
```

## License

MIT

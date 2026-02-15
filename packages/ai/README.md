# @freehold/ai

AI tool system, React hooks, and server helpers built on the [Vercel AI SDK](https://sdk.vercel.ai). Define tools with Zod schemas, connect to any supported provider, and wire up a streaming chat UI in minutes.

## Installation

```bash
pnpm add @freehold/ai
# or
npm install @freehold/ai
```

### Peer Dependencies

React is required. Install at least one AI provider:

```bash
pnpm add react @ai-sdk/openai
```

## Entry Points

| Import | Purpose |
|--------|---------|
| `@freehold/ai` | Core — `defineTool`, shared types |
| `@freehold/ai/client` | React — `useFreeholdChat` hook |
| `@freehold/ai/server` | Server — `createModel`, `toAISDKTools`, `createChatHandler` |

## Quick Start

### 1. Define tools

```ts
// tools.ts
import { defineTool } from '@freehold/ai'
import { z } from 'zod'

export const weatherTool = defineTool({
  name: 'getWeather',
  description: 'Get current weather for a city',
  parameters: z.object({
    city: z.string().describe('City name'),
  }),
  execute: async ({ city }) => {
    // call an API, query a DB, etc.
    return { city, temperature: 72, condition: 'Sunny' }
  },
})

export const tools = [weatherTool]
```

### 2. Create an API route (Next.js App Router)

```ts
// app/api/chat/route.ts
import { createChatHandler } from '@freehold/ai/server'
import { tools } from '../../tools'

export const POST = createChatHandler({
  provider: {
    provider: 'openai',
    model: 'gpt-4o-mini',
    apiKey: process.env.OPENAI_API_KEY,
  },
  tools,
  systemPrompt: 'You are a helpful assistant.',
})
```

Or for more control, use `createModel` and `toAISDKTools` directly:

```ts
import { createModel, toAISDKTools } from '@freehold/ai/server'
import { streamText } from 'ai'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const model = await createModel({ provider: 'openai', model: 'gpt-4o-mini' })

  const result = streamText({
    model,
    messages,
    tools: toAISDKTools(tools),
    maxSteps: 5,
  })

  return result.toDataStreamResponse()
}
```

### 3. Connect the client

```tsx
'use client'
import { useFreeholdChat } from '@freehold/ai/client'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useFreeholdChat({ api: '/api/chat' })

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id}>
          <strong>{msg.role}:</strong> {msg.content}
          {msg.toolCalls?.map((tc) => (
            <div key={tc.id}>Tool: {tc.toolName} ({tc.status})</div>
          ))}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button type="submit" disabled={isLoading}>Send</button>
      </form>
    </div>
  )
}
```

## API Reference

### `defineTool(config)`

Define a tool with a Zod schema and an execute function.

```ts
defineTool({
  name: string,
  description: string,
  parameters: ZodSchema,
  execute: (args) => Promise<result>,
})
```

### `useFreeholdChat(options?)`

React hook that wraps `useChat` from the AI SDK with normalized `ChatMessageData` including tool call tracking.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `api` | `string` | `'/api/chat'` | API endpoint URL |
| `body` | `Record<string, unknown>` | — | Extra body fields sent with each request |
| `headers` | `Record<string, string>` | — | Extra headers |
| `onFinish` | `function` | — | Called when the assistant finishes |
| `onError` | `function` | — | Called on error |

Returns: `{ messages, input, handleInputChange, handleSubmit, setInput, isLoading, status, error, stop, reload }`

### `createModel(config)`

Create a Vercel AI SDK language model from a provider config.

```ts
const model = await createModel({
  provider: 'openai',  // 'openai' | 'anthropic' | 'google' | 'deepseek' | 'ollama'
  model: 'gpt-4o-mini',
  apiKey: '...',        // optional for ollama
  baseURL: '...',       // optional override
})
```

### `toAISDKTools(tools)`

Convert an array of `FreeholdToolDefinition` to the format expected by `streamText` / `generateText`.

### `createChatHandler(options)`

Create a complete POST handler for Next.js App Router.

```ts
createChatHandler({
  provider: ProviderConfig,
  tools?: FreeholdToolDefinition[],
  systemPrompt?: string,
  maxSteps?: number,  // default: 5
})
```

## Supported Providers

| Provider | Package | API Key |
|----------|---------|---------|
| OpenAI | `@ai-sdk/openai` | Required |
| Anthropic | `@ai-sdk/anthropic` | Required |
| Google Gemini | `@ai-sdk/google` | Required |
| DeepSeek | `@ai-sdk/deepseek` | Required |
| Ollama | `ollama-ai-provider` | Not required |

## License

MIT

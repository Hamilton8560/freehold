import { createServer, type Server, type IncomingMessage, type ServerResponse } from 'node:http'
import type { WhatsAppBotConfig, WhatsAppWebhookPayload } from './types'
import type { BotMessage, PlatformAdapter } from '../../types'
import { generateBotResponse } from '../../core/bot-engine'

/**
 * Create a WhatsApp bot using the WhatsApp Cloud API (webhook-based).
 *
 * This adapter starts a lightweight HTTP server to receive webhook events
 * from Meta and replies via the WhatsApp Cloud API.
 *
 * Usage:
 * ```ts
 * import { createWhatsAppBot } from '@freehold/bot/whatsapp'
 * const bot = createWhatsAppBot({
 *   accessToken: process.env.WHATSAPP_ACCESS_TOKEN!,
 *   phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID!,
 *   verifyToken: process.env.WHATSAPP_VERIFY_TOKEN!,
 *   provider: { provider: 'openai', model: 'gpt-4o' },
 *   systemPrompt: 'You are a helpful assistant.',
 *   port: 3001,
 * })
 * await bot.start()
 * ```
 */
export function createWhatsAppBot(config: WhatsAppBotConfig): PlatformAdapter {
  const port = config.port ?? 3001
  const host = config.host ?? '0.0.0.0'
  let server: Server | null = null

  // Per-phone-number message history (in-memory, resets on restart)
  const phoneHistory = new Map<string, BotMessage[]>()

  async function sendMessage(to: string, text: string): Promise<void> {
    const url = `https://graph.facebook.com/v21.0/${config.phoneNumberId}/messages`
    await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: text },
      }),
    })
  }

  async function handleIncomingMessage(from: string, text: string): Promise<void> {
    const history = phoneHistory.get(from) || []
    history.push({ role: 'user', content: text })

    // Keep last 20 messages to avoid token overflow
    if (history.length > 20) {
      history.splice(0, history.length - 20)
    }

    try {
      const response = await generateBotResponse(config, history)

      history.push({ role: 'assistant', content: response })
      phoneHistory.set(from, history)

      await sendMessage(from, response)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      await sendMessage(from, `Sorry, I encountered an error: ${errorMsg}`)
    }
  }

  function readBody(req: IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = []
      req.on('data', (chunk: Buffer) => chunks.push(chunk))
      req.on('end', () => resolve(Buffer.concat(chunks).toString()))
      req.on('error', reject)
    })
  }

  async function handleRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)

    // Webhook verification (GET /webhook)
    if (req.method === 'GET' && url.pathname === '/webhook') {
      const mode = url.searchParams.get('hub.mode')
      const token = url.searchParams.get('hub.verify_token')
      const challenge = url.searchParams.get('hub.challenge')

      if (mode === 'subscribe' && token === config.verifyToken) {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end(challenge)
      } else {
        res.writeHead(403)
        res.end('Forbidden')
      }
      return
    }

    // Incoming messages (POST /webhook)
    if (req.method === 'POST' && url.pathname === '/webhook') {
      const body = await readBody(req)
      // Always respond 200 quickly to acknowledge receipt
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ status: 'ok' }))

      try {
        const payload: WhatsAppWebhookPayload = JSON.parse(body)
        if (payload.object !== 'whatsapp_business_account') return

        for (const entry of payload.entry || []) {
          for (const change of entry.changes || []) {
            for (const message of change.value.messages || []) {
              if (message.type === 'text' && message.text?.body) {
                // Process asynchronously (we already sent 200)
                handleIncomingMessage(message.from, message.text.body).catch(() => {
                  // Errors are handled inside handleIncomingMessage
                })
              }
            }
          }
        }
      } catch {
        // Invalid JSON — already responded 200
      }
      return
    }

    // Health check
    if (req.method === 'GET' && url.pathname === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ status: 'healthy', platform: 'whatsapp' }))
      return
    }

    res.writeHead(404)
    res.end('Not Found')
  }

  return {
    start: async () => {
      return new Promise<void>((resolve) => {
        server = createServer((req, res) => {
          handleRequest(req, res).catch(() => {
            if (!res.headersSent) {
              res.writeHead(500)
              res.end('Internal Server Error')
            }
          })
        })
        server.listen(port, host, () => {
          resolve()
        })
      })
    },
    stop: () => {
      if (server) {
        server.close()
        server = null
      }
    },
  }
}

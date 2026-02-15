import type { BotConfig } from '../../types'

export interface WhatsAppBotConfig extends BotConfig {
  /** WhatsApp Cloud API access token */
  accessToken: string
  /** Phone number ID from Meta Business settings */
  phoneNumberId: string
  /** Webhook verify token (you define this — Meta sends it to verify your endpoint) */
  verifyToken: string
  /** Port for the webhook HTTP server (default: 3001) */
  port?: number
  /** Host to bind to (default: '0.0.0.0') */
  host?: string
}

/** Incoming WhatsApp webhook payload (simplified) */
export interface WhatsAppWebhookPayload {
  object: string
  entry?: Array<{
    id: string
    changes?: Array<{
      value: {
        messaging_product: string
        metadata: { phone_number_id: string }
        messages?: Array<{
          from: string
          id: string
          timestamp: string
          type: string
          text?: { body: string }
        }>
      }
      field: string
    }>
  }>
}

import type { ReactNode } from 'react'

export type PaymentProvider = 'stripe' | 'paddle'

export type PaymentStatus = 'idle' | 'processing' | 'succeeded' | 'failed'

export interface PaymentResult {
  status: PaymentStatus
  provider: PaymentProvider
  transactionId?: string
  error?: string
}

export interface OrderLineItem {
  id: string
  name: string
  description?: string
  quantity: number
  unitPrice: number
  currency: string
}

export interface OrderSummaryData {
  items: OrderLineItem[]
  subtotal: number
  tax?: number
  discount?: number
  total: number
  currency: string
}

export interface CheckoutHeaderConfig {
  title: string
  description?: string
  logo?: ReactNode
}

export interface CheckoutFooterConfig {
  termsUrl?: string
  privacyUrl?: string
  showPoweredBy?: boolean
}

export type BillingPeriod = 'monthly' | 'yearly' | 'one-time'

export interface PricingFeature {
  text: string
  included?: boolean
  hint?: string
}

export interface PricingTier {
  id: string
  name: string
  description?: string
  price: number
  currency: string
  billingPeriod: BillingPeriod
  billingLabel?: string
  features: PricingFeature[]
  badge?: string
  ctaLabel: string
  featured?: boolean
  originalPrice?: number
}

import type { Appearance } from '@stripe/stripe-js'
import type { ReactNode } from 'react'

export interface FreeholdStripeProviderProps {
  publishableKey: string
  clientSecret: string
  children: ReactNode
  appearance?: Appearance
  appearanceOverrides?: Partial<Appearance>
}

export interface StripeCheckoutFormProps {
  onSuccess?: (paymentIntent: unknown) => void
  onError?: (error: string) => void
  submitLabel?: string
  className?: string
}

'use client'

import { useMemo } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import type { Appearance } from '@stripe/stripe-js'
import { freeholdStripeAppearance } from './theme'
import type { FreeholdStripeProviderProps } from './types'

const stripeCache = new Map<string, ReturnType<typeof loadStripe>>()

function getStripe(publishableKey: string) {
  if (!stripeCache.has(publishableKey)) {
    stripeCache.set(publishableKey, loadStripe(publishableKey))
  }
  return stripeCache.get(publishableKey)!
}

export function FreeholdStripeProvider({
  publishableKey,
  clientSecret,
  children,
  appearance,
  appearanceOverrides,
}: FreeholdStripeProviderProps) {
  const stripePromise = useMemo(
    () => getStripe(publishableKey),
    [publishableKey]
  )

  const mergedAppearance = useMemo<Appearance>(() => {
    if (appearance) return appearance

    if (!appearanceOverrides) return freeholdStripeAppearance

    return {
      ...freeholdStripeAppearance,
      ...appearanceOverrides,
      variables: {
        ...freeholdStripeAppearance.variables,
        ...appearanceOverrides.variables,
      },
      rules: {
        ...freeholdStripeAppearance.rules,
        ...appearanceOverrides.rules,
      },
    }
  }, [appearance, appearanceOverrides])

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: mergedAppearance,
      }}
    >
      {children}
    </Elements>
  )
}

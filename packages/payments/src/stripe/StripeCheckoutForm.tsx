'use client'

import { useState, type FormEvent } from 'react'
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { cn } from '../utils/cn'
import type { StripeCheckoutFormProps } from './types'

export function StripeCheckoutForm({
  onSuccess,
  onError,
  submitLabel = 'Pay now',
  className,
}: StripeCheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!stripe || !elements) return

    setIsProcessing(true)
    setErrorMessage(null)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: 'if_required',
    })

    if (error) {
      const message = error.message ?? 'An unexpected error occurred.'
      setErrorMessage(message)
      onError?.(message)
    } else if (paymentIntent) {
      onSuccess?.(paymentIntent)
    }

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4', className)}>
      <PaymentElement />

      {errorMessage && (
        <div className="text-sm text-[#991B1B] bg-[#FEE2E2] rounded-lg px-3 py-2">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={cn(
          'w-full h-11 rounded-lg font-medium text-sm',
          'bg-[#2C2824] text-[#FAF9F6]',
          'hover:bg-[#3D3832] hover:-translate-y-0.5',
          'active:scale-[0.98]',
          'transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C2824] focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none'
        )}
      >
        {isProcessing ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  )
}

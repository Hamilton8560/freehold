'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import * as RadixToast from '@radix-ui/react-toast'
import { Toast, ToastViewport, type ToastPosition } from './Toast'

interface ToastItem {
  id: string
  title: string
  description?: string
  variant: 'success' | 'error' | 'warning' | 'info'
  duration: number
  action?: { label: string; onClick: () => void }
}

type ToastOptions = Omit<ToastItem, 'id'> & {
  variant?: ToastItem['variant']
  duration?: number
}

interface ToastContextValue {
  toast: (options: ToastOptions) => string
  dismiss: (id: string) => void
  dismissAll: () => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export interface ToastProviderProps {
  children: ReactNode
  position?: ToastPosition
  maxToasts?: number
}

export function ToastProvider({
  children,
  position = 'bottom-right',
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = Math.random().toString(36).slice(2, 9)
      const newToast: ToastItem = {
        id,
        title: options.title,
        description: options.description,
        variant: options.variant || 'info',
        duration: options.duration ?? 5000,
        action: options.action,
      }

      setToasts((prev) => {
        const newToasts = [...prev, newToast]
        return newToasts.slice(-maxToasts)
      })

      return id
    },
    [maxToasts]
  )

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const dismissAll = useCallback(() => {
    setToasts([])
  }, [])

  return (
    <ToastContext.Provider value={{ toast, dismiss, dismissAll }}>
      <RadixToast.Provider swipeDirection="right">
        {children}
        {toasts.map((t) => (
          <Toast
            key={t.id}
            title={t.title}
            description={t.description}
            variant={t.variant}
            duration={t.duration}
            action={t.action}
            onOpenChange={(open) => {
              if (!open) dismiss(t.id)
            }}
          />
        ))}
        <ToastViewport position={position} />
      </RadixToast.Provider>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

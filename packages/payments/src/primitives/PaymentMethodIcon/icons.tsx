import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export function VisaIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="48" height="32" rx="4" fill="#1A1F71" />
      <path d="M20.3 21.5h-2.9l1.8-11h2.9l-1.8 11zm-4.2-11l-2.7 7.5-.3-1.6-1-5.1s-.1-.8-1.1-.8H7.1l-.1.3s1.2.2 2.5.9l2.1 8h3l4.5-10.2h-3zm22.4 11h2.6l-2.3-11h-2.3c-.8 0-1.1.5-1.1.5l-4.3 10.5h3l.6-1.6h3.7l.3 1.6zm-3.2-3.9l1.5-4.2.9 4.2h-2.4zm-5.3-4.5l.4-2.4s-1.3-.5-2.6-.5c-1.4 0-4.8.6-4.8 3.7 0 2.9 4 2.9 4 4.4s-3.6 1.2-4.8.3l-.4 2.5s1.3.6 3.3.6c2 0 4.9-1 4.9-3.8 0-2.9-4-3.2-4-4.4 0-1.3 2.8-1.1 4-.4z" fill="#fff" />
    </svg>
  )
}

export function MastercardIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="48" height="32" rx="4" fill="#252525" />
      <circle cx="19" cy="16" r="8" fill="#EB001B" />
      <circle cx="29" cy="16" r="8" fill="#F79E1B" />
      <path d="M24 10.3a8 8 0 0 1 0 11.4 8 8 0 0 1 0-11.4z" fill="#FF5F00" />
    </svg>
  )
}

export function AmexIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="48" height="32" rx="4" fill="#2E77BC" />
      <path d="M7 16h34M11 11l-4 5 4 5m26-10l4 5-4 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="24" y="18" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold" fontFamily="sans-serif">AMEX</text>
    </svg>
  )
}

export function ApplePayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="48" height="32" rx="4" fill="#000" />
      <text x="24" y="18.5" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="600" fontFamily="system-ui, sans-serif"> Pay</text>
      <path d="M15.5 10.5c.5-.6.8-1.5.7-2.3-.7 0-1.6.5-2.1 1.1-.4.5-.8 1.4-.7 2.2.8.1 1.6-.4 2.1-1z" fill="#fff" />
      <path d="M16.2 11.6c-1.2-.1-2.2.7-2.7.7s-1.4-.6-2.4-.6c-1.2 0-2.3.7-2.9 1.8-1.3 2.2-.3 5.4.9 7.2.6.9 1.3 1.8 2.3 1.8s1.3-.6 2.4-.6 1.4.6 2.4.6 1.6-.9 2.2-1.8c.7-1 1-2 1-2s-1.9-.7-1.9-2.8c0-1.8 1.5-2.6 1.5-2.6-.8-1.2-2-1.3-2.5-1.4l-.3-.3z" fill="#fff" />
    </svg>
  )
}

export function GooglePayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="48" height="32" rx="4" fill="#fff" stroke="#E5E5E5" strokeWidth="1" />
      <path d="M24.5 17.2v3.1h-1v-7.7h2.6c.6 0 1.2.2 1.7.7.5.4.7 1 .7 1.6 0 .7-.2 1.2-.7 1.6-.4.5-1 .7-1.7.7h-1.6zm0-3.6v2.7h1.7c.4 0 .7-.1 1-.4.3-.3.4-.6.4-1s-.1-.7-.4-1c-.3-.3-.6-.4-1-.4h-1.7z" fill="#3C4043" />
      <path d="M32.1 14.8c.7 0 1.3.2 1.7.6.4.4.6 1 .6 1.7v3.2h-.9v-.7c-.4.6-.9.8-1.6.8-.7 0-1.2-.2-1.6-.5-.4-.4-.6-.8-.6-1.3 0-.5.2-.9.6-1.3.4-.3.9-.5 1.5-.5.6 0 1 .2 1.4.5v-.3c0-.4-.1-.7-.4-1-.3-.3-.6-.4-1-.4-.6 0-1 .2-1.4.7l-.7-.5c.5-.6 1.2-1 2.1-1h.3zm-1.2 4.5c.3.2.6.3 1 .3s.7-.1 1-.3c.3-.2.4-.5.4-.8 0-.3-.1-.6-.4-.8-.3-.2-.6-.3-1-.3s-.7.1-1 .3c-.3.2-.4.5-.4.8 0 .3.1.6.4.8z" fill="#3C4043" />
      <path d="M39 14.9l-3.2 7.3h-1l1.2-2.6-2.1-4.7h1.1l1.5 3.5 1.5-3.5h1z" fill="#3C4043" />
      <path d="M19.7 16.3c0-.3 0-.6-.1-.9h-4.2v1.7h2.4c-.1.6-.4 1-.8 1.4v1.1h1.3c.8-.7 1.3-1.8 1.4-3.3z" fill="#4285F4" />
      <path d="M15.4 20.3c1.1 0 2.1-.4 2.8-1l-1.3-1c-.4.3-.9.4-1.4.4-1.1 0-2-.7-2.3-1.7H11.8v1.1c.7 1.3 2 2.2 3.6 2.2z" fill="#34A853" />
      <path d="M13.1 16.9c-.2-.5-.2-1.1 0-1.6v-1.1h-1.4c-.5 1-.5 2.2 0 3.3l1.4-1.1v.5z" fill="#FBBC04" />
      <path d="M15.4 13.3c.6 0 1.2.2 1.6.6l1.2-1.2c-.8-.7-1.7-1.1-2.8-1.1-1.6 0-2.9.9-3.6 2.2l1.4 1.1c.3-1 1.2-1.6 2.2-1.6z" fill="#EA4335" />
    </svg>
  )
}

export function PayPalIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="48" height="32" rx="4" fill="#fff" stroke="#E5E5E5" strokeWidth="1" />
      <path d="M19.5 8h5.3c2.4 0 4.1 1 3.7 3.5-.5 3.2-2.4 5-5.4 5h-1.4c-.4 0-.7.3-.8.7L20.2 22h-3c-.3 0-.4-.2-.4-.5L19 8.5c0-.3.2-.5.5-.5z" fill="#003087" />
      <path d="M22 8h5.3c2.4 0 4.1 1 3.7 3.5-.5 3.2-2.4 5-5.4 5h-1.4c-.4 0-.7.3-.8.7L22.7 22h-3c-.3 0-.4-.2-.4-.5L21.5 8.5c0-.3.2-.5.5-.5z" fill="#0070E0" />
      <path d="M27.8 13.5c.1-.5 0-.9-.3-1.2-.3-.3-.9-.5-1.7-.5h-2.2l-.6 3.8h1.4c1.5 0 2.9-.8 3.4-2.1z" fill="#fff" />
    </svg>
  )
}

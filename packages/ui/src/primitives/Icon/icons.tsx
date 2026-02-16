import type { SVGProps, ReactElement } from 'react'

export type IconName =
  | 'dashboard'
  | 'clients'
  | 'pipeline'
  | 'billing'
  | 'reports'
  | 'ai'
  | 'settings'
  | 'search'
  | 'check'
  | 'warning'
  | 'arrow'
  | 'shield'
  | 'growth'
  | 'deploy'
  | 'automation'
  | 'home'
  | 'plus'
  | 'minus'
  | 'close'
  | 'chevron-down'
  | 'chevron-up'
  | 'chevron-left'
  | 'chevron-right'
  | 'send'
  | 'bot'
  | 'menu'
  | 'log-out'
  | 'mail'
  | 'lock'
  | 'user'
  | 'eye'
  | 'eye-off'

type IconComponent = (props: SVGProps<SVGSVGElement>) => ReactElement

export const iconPaths: Record<IconName, IconComponent> = {
  dashboard: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),

  clients: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 17C4 13.686 6.686 12 10 12C13.314 12 16 13.686 16 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  pipeline: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M3 6H8L12 10L8 14H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 6H13L17 10L13 14H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  billing: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 8H17" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  reports: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M4 16V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 16V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 16V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 16V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  ai: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M10 2L11.5 7.5L17 6L12.5 10L17 14L11.5 12.5L10 18L8.5 12.5L3 14L7.5 10L3 6L8.5 7.5L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),

  settings: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 2V4M10 16V18M2 10H4M16 10H18M4.93 4.93L6.34 6.34M13.66 13.66L15.07 15.07M15.07 4.93L13.66 6.34M6.34 13.66L4.93 15.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  search: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <circle cx="8.5" cy="8.5" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12.5 12.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  check: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 10L9.5 12.5L13.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  warning: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M10 3L18 17H2L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 9V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="14.5" r="0.5" fill="currentColor" />
    </svg>
  ),

  arrow: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  shield: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M10 2L3 5.5V10C3 14.5 6 17.5 10 18.5C14 17.5 17 14.5 17 10V5.5L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),

  growth: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M3 17L8 11L11 14L17 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 5H17V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  deploy: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M10 17V5M10 5L6 9M10 5L14 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 3H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  automation: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M12 3L8 10H12L8 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  home: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M3 17V8.5L10 3L17 8.5V17H12.5V12H7.5V17H3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),

  plus: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  minus: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  close: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  'chevron-down': (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  'chevron-up': (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M5 12.5L10 7.5L15 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  'chevron-left': (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  'chevron-right': (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  send: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M4 10L10 4M10 4L16 10M10 4V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  bot: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <rect x="4" y="8" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="12.5" r="1" fill="currentColor" />
      <circle cx="12" cy="12.5" r="1" fill="currentColor" />
      <path d="M10 3V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="3" r="1" fill="currentColor" />
      <path d="M2 12H4M16 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  menu: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  'log-out': (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M7 17H4C3.44772 17 3 16.5523 3 16V4C3 3.44772 3.44772 3 4 3H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 14L17 10L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 10H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  mail: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 6L10 11L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  lock: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <rect x="4" y="9" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 9V6C7 4.34315 8.34315 3 10 3C11.6569 3 13 4.34315 13 6V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  user: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 17C4 13.686 6.686 12 10 12C13.314 12 16 13.686 16 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  eye: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M2 10C2 10 5 4 10 4C15 4 18 10 18 10C18 10 15 16 10 16C5 16 2 10 2 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),

  'eye-off': (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M3 3L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8.5 8.5C7.67 9.33 7.67 10.67 8.5 11.5C9.33 12.33 10.67 12.33 11.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5.6 5.6C3.8 7 2 10 2 10C2 10 5 16 10 16C11.7 16 13.2 15.3 14.4 14.4M16.7 12.3C17.6 11.2 18 10 18 10C18 10 15 4 10 4C9.3 4 8.6 4.1 8 4.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

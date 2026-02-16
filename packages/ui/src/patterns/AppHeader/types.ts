import type { ReactNode } from 'react'

export interface Breadcrumb {
  label: string
  href?: string
}

export interface AppHeaderUser {
  name: string
  avatar?: string
}

export interface AppHeaderProps {
  title: string
  breadcrumbs?: Breadcrumb[]
  actions?: ReactNode
  user?: AppHeaderUser
  onMenuClick?: () => void
  className?: string
}

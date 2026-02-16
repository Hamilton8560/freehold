import type { ReactNode } from 'react'
import type { IconName } from '../../primitives/Icon'

export interface SidebarItem {
  icon: IconName
  label: string
  href: string
  badge?: string | number
}

export interface SidebarSection {
  title: string
  items: SidebarItem[]
}

export type SidebarNavItem = SidebarItem | SidebarSection

export interface SidebarUser {
  name: string
  email: string
  avatar?: string
}

export interface SidebarProps {
  logo: ReactNode
  items: SidebarNavItem[]
  user?: SidebarUser
  collapsed: boolean
  onCollapse: (collapsed: boolean) => void
  activeItem?: string
  onNavigate?: (href: string) => void
  className?: string
  /** Whether the sidebar is open as a mobile overlay (< md screens) */
  mobileOpen?: boolean
  /** Called when the mobile drawer should close */
  onMobileClose?: () => void
}

export function isSidebarSection(item: SidebarNavItem): item is SidebarSection {
  return 'items' in item && Array.isArray(item.items)
}

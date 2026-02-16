'use client'

import { useEffect } from 'react'
import { cn } from '../../utils/cn'
import { Icon } from '../../primitives/Icon'
import type { SidebarProps, SidebarItem } from './types'
import { isSidebarSection } from './types'

export function Sidebar({
  logo,
  items,
  user,
  collapsed,
  onCollapse,
  activeItem,
  onNavigate,
  className,
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  // On mobile overlay, always show expanded
  const effectiveCollapsed = mobileOpen ? false : collapsed

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [mobileOpen])

  // Close on Escape key
  useEffect(() => {
    if (!mobileOpen || !onMobileClose) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onMobileClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen, onMobileClose])

  return (
    <>
      {/* Mobile backdrop */}
      {onMobileClose && (
        <div
          className={cn(
            'fixed inset-0 z-40 bg-[#2C2824]/50 md:hidden transition-opacity duration-300',
            mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'flex flex-col h-full bg-[#2C2824] text-[#FAF9F6] transition-all duration-300',
          // Mobile: fixed overlay drawer
          'max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-50 max-md:w-[280px] max-md:shadow-xl',
          mobileOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full',
          // Desktop: static, respects collapsed
          effectiveCollapsed ? 'md:w-16' : 'md:w-[260px]',
          className
        )}
      >
        {/* Logo + toggle/close */}
        <div className="flex items-center justify-between px-4 h-16 shrink-0">
          <div className={cn(
            'transition-opacity duration-200',
            effectiveCollapsed ? 'md:opacity-0 md:w-0 md:overflow-hidden' : 'opacity-100'
          )}>
            {logo}
          </div>

          {/* Desktop: collapse toggle */}
          <button
            onClick={() => onCollapse(!collapsed)}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/10 transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon
              name={collapsed ? 'chevron-right' : 'chevron-left'}
              size="sm"
              color="inherit"
              className="text-[#FAF9F6]/70"
            />
          </button>

          {/* Mobile: close button */}
          {onMobileClose && (
            <button
              onClick={onMobileClose}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Close sidebar"
            >
              <Icon name="close" size="sm" color="inherit" className="text-[#FAF9F6]/70" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {items.map((item, idx) => {
            if (isSidebarSection(item)) {
              return (
                <div key={item.title} className={cn(idx > 0 && 'mt-4')}>
                  {!effectiveCollapsed && (
                    <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#FAF9F6]/40">
                      {item.title}
                    </div>
                  )}
                  {effectiveCollapsed && idx > 0 && (
                    <div className="mx-2 my-2 border-t border-white/10" />
                  )}
                  <div className="space-y-0.5">
                    {item.items.map((subItem) => (
                      <NavItem
                        key={subItem.href}
                        item={subItem}
                        collapsed={effectiveCollapsed}
                        active={activeItem === subItem.href}
                        onNavigate={onNavigate}
                        onMobileClose={onMobileClose}
                      />
                    ))}
                  </div>
                </div>
              )
            }

            return (
              <NavItem
                key={item.href}
                item={item}
                collapsed={effectiveCollapsed}
                active={activeItem === item.href}
                onNavigate={onNavigate}
                onMobileClose={onMobileClose}
              />
            )
          })}
        </nav>

        {/* User section */}
        {user && (
          <div className="shrink-0 border-t border-white/10 px-3 py-3">
            <div className={cn('flex items-center gap-3', effectiveCollapsed && 'justify-center')}>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full shrink-0 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0 text-xs font-medium">
                  {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
              )}
              {!effectiveCollapsed && (
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{user.name}</div>
                  <div className="text-xs text-[#FAF9F6]/50 truncate">{user.email}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </aside>
    </>
  )
}

Sidebar.displayName = 'Sidebar'

function NavItem({
  item,
  collapsed,
  active,
  onNavigate,
  onMobileClose,
}: {
  item: SidebarItem
  collapsed: boolean
  active: boolean
  onNavigate?: (href: string) => void
  onMobileClose?: () => void
}) {
  return (
    <button
      onClick={() => {
        onNavigate?.(item.href)
        onMobileClose?.()
      }}
      className={cn(
        'w-full flex items-center gap-3 rounded-lg transition-colors text-sm',
        collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5',
        active
          ? 'bg-white/10 text-white font-medium'
          : 'text-[#FAF9F6]/70 hover:bg-white/5 hover:text-white'
      )}
      title={collapsed ? item.label : undefined}
    >
      <Icon name={item.icon} size="md" color="inherit" className="shrink-0" />
      {!collapsed && (
        <>
          <span className="flex-1 text-left truncate">{item.label}</span>
          {item.badge != null && (
            <span className="ml-auto inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-white/15 text-[11px] font-medium">
              {item.badge}
            </span>
          )}
        </>
      )}
      {collapsed && item.badge != null && (
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C4796B]" />
      )}
    </button>
  )
}

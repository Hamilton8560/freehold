'use client'

import { cn } from '../../utils/cn'
import { Icon } from '../../primitives/Icon'
import type { AppHeaderProps } from './types'

export function AppHeader({
  title,
  breadcrumbs,
  actions,
  user,
  onMenuClick,
  className,
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        'flex items-center h-16 px-4 sm:px-6 bg-white border-b border-[rgba(184,164,142,0.15)]',
        className
      )}
    >
      {/* Mobile hamburger */}
      {onMenuClick && (
        <button
          onClick={onMenuClick}
          className="md:hidden flex items-center justify-center w-10 h-10 -ml-2 mr-2 rounded-lg hover:bg-[#F5F3EF] transition-colors"
          aria-label="Toggle sidebar"
        >
          <Icon name="menu" size="md" color="primary" />
        </button>
      )}

      {/* Left: Breadcrumbs + Title */}
      <div className="flex-1 min-w-0">
        {/* Breadcrumbs — hidden on mobile */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="hidden md:flex items-center gap-1.5 mb-0.5">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1
              return (
                <span key={idx} className="flex items-center gap-1.5">
                  {idx > 0 && (
                    <Icon name="chevron-right" size="xs" color="muted" />
                  )}
                  {crumb.href && !isLast ? (
                    <a
                      href={crumb.href}
                      className="text-sm text-[#8A847A] hover:text-[#2C2824] transition-colors"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span
                      className={cn(
                        'text-sm',
                        isLast ? 'text-[#2C2824] font-medium' : 'text-[#8A847A]'
                      )}
                    >
                      {crumb.label}
                    </span>
                  )}
                </span>
              )
            })}
          </nav>
        )}
        <h1 className="font-heading text-lg sm:text-xl text-[#2C2824] truncate">{title}</h1>
      </div>

      {/* Right: Actions + User */}
      <div className="flex items-center gap-2 ml-4">
        {actions && (
          <div className="flex items-center gap-2">{actions}</div>
        )}
        {user && (
          <div className="flex items-center gap-2.5 ml-2 pl-2 border-l border-[rgba(184,164,142,0.15)]">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#F5F3EF] flex items-center justify-center text-xs font-medium text-[#2C2824]">
                {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
            )}
            <span className="hidden sm:block text-sm font-medium text-[#2C2824]">
              {user.name}
            </span>
          </div>
        )}
      </div>
    </header>
  )
}

AppHeader.displayName = 'AppHeader'

'use client'

import { useState, useEffect } from 'react'
import { cn } from '../../utils/cn'
import { Icon } from '../../primitives/Icon'
import { Button } from '../../primitives/Button'

export interface NavItem {
  label: string
  href: string
}

export interface NavbarProps {
  items: NavItem[]
  cta?: {
    label: string
    href: string
  }
  className?: string
}

export function Navbar({ items, cta, className }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-8 lg:px-12 h-[72px] flex items-center justify-between transition-all duration-300',
        scrolled
          ? 'bg-[rgba(250,249,246,0.92)] backdrop-blur-md border-b border-[rgba(184,164,142,0.15)] shadow-[0_1px_2px_0_rgba(184,164,142,0.05),0_1px_3px_0_rgba(44,40,36,0.04)]'
          : 'bg-transparent border-b border-transparent',
        className
      )}
    >
      {/* Logo */}
      <a href="/" className="flex items-center gap-2.5 group">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#B8A48E] to-[#D4C8B8] flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 14V6L8 2L14 6V14H10V9H6V14H2Z" fill="#FAF9F6" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="font-heading text-xl text-[#2C2824] tracking-tight">
          Freehold
        </span>
      </a>

      {/* Desktop nav */}
      <div className="hidden xl:flex items-center gap-8">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="relative text-sm text-[#5C574F] hover:text-[#2C2824] transition-colors duration-200 py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#B8A48E] after:rounded-full after:scale-x-0 after:origin-center after:transition-transform after:duration-200 hover:after:scale-x-100"
          >
            {item.label}
          </a>
        ))}
        {cta && (
          <a href={cta.href}>
            <Button variant="secondary" size="sm">
              {cta.label}
            </Button>
          </a>
        )}
      </div>

      {/* Mobile hamburger */}
      <button
        className="xl:hidden p-2 text-[#5C574F] hover:text-[#2C2824] transition-colors duration-200"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      >
        <Icon name={menuOpen ? 'close' : 'dashboard'} size="sm" color="inherit" />
      </button>

      {/* Mobile menu */}
      <div
        className={cn(
          'absolute top-[72px] left-0 right-0 xl:hidden bg-white/95 backdrop-blur-md border-b border-[rgba(184,164,142,0.15)] px-8 py-5 flex flex-col gap-4 transition-all duration-250 origin-top',
          menuOpen
            ? 'opacity-100 scale-y-100 translate-y-0'
            : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
        )}
      >
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className="text-sm text-[#5C574F] hover:text-[#2C2824] transition-colors duration-200"
          >
            {item.label}
          </a>
        ))}
        {cta && (
          <a href={cta.href} onClick={() => setMenuOpen(false)}>
            <Button variant="secondary" size="sm">
              {cta.label}
            </Button>
          </a>
        )}
      </div>
    </nav>
  )
}

Navbar.displayName = 'Navbar'

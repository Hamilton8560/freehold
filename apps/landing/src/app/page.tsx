'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button, Card, CardContent, Badge, Icon } from '@freehold/ui'

// Fade-in animation hook
function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.unobserve(el)
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, visible] as const
}

function FadeIn({
  children,
  delay = 0,
  className = ''
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const [ref, visible] = useFadeIn()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

// Topographic background pattern
function TopoBg() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.018] pointer-events-none"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
    >
      {[...Array(12)].map((_, i) => (
        <ellipse
          key={i}
          cx={400 + Math.sin(i * 0.8) * 120}
          cy={300 + Math.cos(i * 0.6) * 80}
          rx={80 + i * 28}
          ry={50 + i * 18}
          fill="none"
          stroke="#8B7D6B"
          strokeWidth="1.2"
        />
      ))}
    </svg>
  )
}

// Navigation
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 lg:px-10 h-[72px] flex items-center justify-between transition-all duration-400 ${
        scrolled
          ? 'bg-[rgba(250,249,246,0.92)] backdrop-blur-md border-b border-[rgba(184,164,142,0.15)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sand-500 to-sand-300 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 14V6L8 2L14 6V14H10V9H6V14H2Z" fill="#FAF9F6" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="font-heading text-xl text-text-primary tracking-tight">
          Freehold
        </span>
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-9">
        {['Platform', 'Solutions', 'About'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            {item}
          </a>
        ))}
        <Link
          href="/design-system"
          className="text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          Design System
        </Link>
        <Link
          href="/docs"
          className="text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          Docs
        </Link>
        <Link
          href="/chat"
          className="text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          Chat Demo
        </Link>
        <Link
          href="/workshop"
          className="text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          Workshop
        </Link>
        <Link href="/showcase">
          <Button variant="secondary" size="sm">
            View Components
          </Button>
        </Link>
      </div>

      {/* Mobile hamburger button */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <Icon name={isMenuOpen ? 'close' : 'dashboard'} size="sm" />
      </button>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="absolute top-[72px] left-0 right-0 md:hidden bg-white/95 backdrop-blur-md border-b border-[rgba(184,164,142,0.15)] px-6 py-4 flex flex-col gap-4">
          {['Platform', 'Solutions', 'About'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {item}
            </a>
          ))}
          <Link
            href="/design-system"
            onClick={() => setIsMenuOpen(false)}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Design System
          </Link>
          <Link
            href="/docs"
            onClick={() => setIsMenuOpen(false)}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Docs
          </Link>
          <Link
            href="/chat"
            onClick={() => setIsMenuOpen(false)}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Chat Demo
          </Link>
          <Link
            href="/workshop"
            onClick={() => setIsMenuOpen(false)}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Workshop
          </Link>
          <Link href="/showcase" onClick={() => setIsMenuOpen(false)}>
            <Button variant="secondary" size="sm">
              View Components
            </Button>
          </Link>
        </div>
      )}
    </nav>
  )
}

// Hero Section
function Hero() {
  return (
    <section className="relative flex flex-col items-center px-6 pt-36 pb-24 bg-background-primary overflow-hidden">
      <TopoBg />

      {/* Warm radial glow */}
      <div
        className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(184,164,142,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-[1200px] mx-auto w-full flex flex-col items-center text-center">
        <FadeIn>
          <Badge variant="accent" size="lg" className="mb-8">
            Enterprise systems, built for small business
          </Badge>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-text-primary leading-[1.08] tracking-tight max-w-[620px] mb-7">
            From overwhelmed
            <br />
            to <span className="text-sand-500 italic">operational.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-[480px] mb-12">
            We build turnkey software systems that transition your business from
            owner-dependent to scalable — CRM, billing, operations, and AI
            automation, deployed and ready.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Button size="lg">
              See How It Works
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
            <Link href="/showcase">
              <Button variant="ghost" size="lg">
                View Case Studies →
              </Button>
            </Link>
          </div>
        </FadeIn>

        {/* Dashboard preview mock */}
        <FadeIn delay={0.45}>
          <div className="mt-20 w-full max-w-[960px] bg-white border border-[rgba(184,164,142,0.2)] rounded-2xl shadow-warm-lg overflow-hidden">
            <div className="bg-background-secondary rounded-xl m-2 p-6">
              {/* Window chrome dots */}
              <div className="flex gap-1.5 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-[rgba(184,164,142,0.3)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[rgba(184,164,142,0.2)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[rgba(184,164,142,0.15)]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-5">
                {/* Sidebar */}
                <div className="hidden md:flex flex-col gap-1 bg-white rounded-lg p-3 border border-[rgba(184,164,142,0.15)]">
                  {[
                    { label: 'Dashboard', active: true },
                    { label: 'Clients', active: false },
                    { label: 'Pipeline', active: false },
                    { label: 'Billing', active: false },
                    { label: 'Reports', active: false },
                    { label: 'AI Assistant', active: false },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`px-3 py-2 rounded-md text-sm text-left ${
                        item.active
                          ? 'bg-background-secondary font-medium text-text-primary'
                          : 'text-text-secondary'
                      }`}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>

                {/* Main content area */}
                <div className="flex flex-col gap-4">
                  {/* Stat cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { label: 'Active Clients', value: '247', change: '+12%' },
                      { label: 'Monthly Revenue', value: '$84,200', change: '+8.3%' },
                      { label: 'Retention Rate', value: '94.7%', change: '+2.1%' },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-white rounded-lg border border-[rgba(184,164,142,0.15)] p-4 text-left"
                      >
                        <p className="text-xs text-text-secondary mb-1">{stat.label}</p>
                        <p className="font-heading text-xl text-text-primary">{stat.value}</p>
                        <p className="text-xs text-sand-500 mt-1">{stat.change}</p>
                      </div>
                    ))}
                  </div>

                  {/* Bar chart placeholder */}
                  <div className="bg-white rounded-lg border border-[rgba(184,164,142,0.15)] p-4">
                    <p className="text-xs text-text-secondary mb-3 text-left">Revenue — Last 6 Months</p>
                    <div className="flex items-end gap-2 h-[100px]">
                      {[40, 55, 45, 65, 75, 90].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className="w-full rounded-t bg-gradient-to-t from-sand-500 to-sand-300"
                            style={{ height: `${h}%` }}
                          />
                          <span className="text-[10px] text-text-tertiary">
                            {['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// Credentials Section
const credentialData = [
  {
    quote: 'Built on a CS degree and graduate work in IT management — not stitched together from tutorials.',
    attribution: 'Computer Science Foundation',
  },
  {
    quote: 'Oil field services, international logistics, and gym operations — systems tested under real pressure.',
    attribution: '3 Industries. Real Operations.',
  },
  {
    quote: 'Every system we deliver was designed, developed, and customer-tested by our team — not outsourced.',
    attribution: 'Built From Scratch',
  },
]

function Credentials() {
  return (
    <section id="about" className="px-6 py-28 bg-background-primary">
      <div className="max-w-[1080px] mx-auto">
        <FadeIn>
          <p className="text-xs text-sand-500 uppercase tracking-[0.1em] mb-4">
            Why Freehold
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary leading-tight tracking-tight max-w-[520px] mb-12">
            Built by operators,
            <br />
            not just engineers.
          </h2>
        </FadeIn>

        <div className="flex flex-col">
          {credentialData.map((item, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div className="border-t border-[rgba(184,164,142,0.25)] pt-10 pb-10">
                <p className="font-heading text-2xl sm:text-3xl italic text-text-primary leading-snug">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="text-sm text-sand-500 uppercase tracking-wider mt-4">
                  — {item.attribution}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Decorative windmill accent */}
        <FadeIn delay={0.4}>
          <div className="mt-12 flex justify-center">
            <Image
              src="/images/ClassicWindmill.png"
              alt=""
              width={180}
              height={230}
              className="object-contain max-w-[180px] opacity-[0.35]"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// Platform Section
const platformFeatures = [
  {
    tag: 'CRM + Pipeline',
    title: 'Client management that runs itself.',
    desc: 'Enterprise-grade CRM with automated follow-ups, pipeline tracking, and revenue forecasting — configured for your business model from day one.',
  },
  {
    tag: 'Billing + Stripe',
    title: 'Revenue on autopilot.',
    desc: 'Subscription management, invoicing, and payment processing wired directly into your operations. No manual reconciliation.',
  },
  {
    tag: 'AI Operations',
    title: 'Your AI assistant, trained on your business.',
    desc: 'Query your data in natural language. Get operational insights, customer summaries, and performance reports without spreadsheets.',
  },
  {
    tag: 'Admin + Dashboards',
    title: 'Full visibility. Zero guesswork.',
    desc: 'Real-time dashboards, team management, and reporting built on modern frameworks — the same admin tools trusted by enterprise teams.',
  },
]

function Platform() {
  return (
    <section id="platform" className="px-6 py-28 bg-background-secondary">
      <div className="max-w-[1080px] mx-auto">
        <FadeIn>
          <p className="text-xs text-sand-500 uppercase tracking-[0.1em] mb-4">
            Platform
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary leading-tight tracking-tight max-w-[580px] mb-16">
            Everything your business needs.
            <br />
            Nothing it doesn't.
          </h2>
        </FadeIn>

        <div className="flex flex-col">
          {platformFeatures.map((feat, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                className={`grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-10 items-start py-9 border-b border-[rgba(184,164,142,0.25)] ${
                  i === 0 ? 'border-t' : ''
                }`}
              >
                <span className="text-xs text-sand-500 uppercase tracking-[0.08em] pt-1">
                  {feat.tag}
                </span>
                <div>
                  <h3 className="font-heading text-xl text-text-primary mb-2.5 tracking-tight">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-[560px]">
                    {feat.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// Industries Section
const industries = [
  {
    name: 'Fitness & Gyms',
    detail: 'Member management, class scheduling, retention systems, and automated billing for single or multi-location operations.',
  },
  {
    name: 'Logistics & Field Ops',
    detail: 'Route management, fleet tracking, dispatch coordination, and real-time operational dashboards.',
  },
  {
    name: 'Service Businesses',
    detail: 'Client onboarding, project pipelines, automated invoicing, and performance reporting.',
  },
]

function Industries() {
  return (
    <section id="solutions" className="px-6 py-28 bg-background-primary">
      <div className="max-w-[1080px] mx-auto">
        <FadeIn>
          <p className="text-xs text-sand-500 uppercase tracking-[0.1em] mb-4">
            Industries
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary leading-tight tracking-tight max-w-[480px] mb-16">
            Proven across industries
            <br />
            that move fast.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {industries.map((ind, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <Card
                variant="outlined"
                padding="lg"
                className="h-full bg-white hover:border-sand-500 hover:shadow-warm-md transition-all duration-300"
              >
                <CardContent>
                  <div className="text-sm text-text-tertiary mb-2">
                    0{i + 1}
                  </div>
                  <h3 className="font-heading text-xl text-text-primary mb-3.5 tracking-tight">
                    {ind.name}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {ind.detail}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// Process Section
const processSteps = [
  { step: '01', title: 'Discovery', desc: 'We map your operations, pain points, and growth goals in a structured session.' },
  { step: '02', title: 'Configure', desc: 'Your system is built and wired — CRM, billing, dashboards, AI — preconfigured to your model.' },
  { step: '03', title: 'Deploy', desc: 'Production-ready deployment with your domain, branding, and data migrated.' },
  { step: '04', title: 'Scale', desc: 'Ongoing support, system expansion, and AI training as your business grows.' },
]

function Process() {
  return (
    <section className="px-6 py-28 bg-background-secondary">
      <div className="max-w-[1080px] mx-auto">
        <FadeIn>
          <p className="text-xs text-sand-500 uppercase tracking-[0.1em] mb-4">
            Process
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary leading-tight tracking-tight max-w-[440px] mb-16">
            Turnkey means turnkey.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} className="mb-16 flex justify-center">
          <div className="text-center">
            <Image
              src="/images/oil-jack.png"
              alt="Automated workflow systems"
              width={320}
              height={240}
              className="object-contain mx-auto"
              priority={false}
            />
            <p className="text-sm text-text-tertiary mt-6 italic">
              Systems that work while you don't have to.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div>
                <div className="font-heading text-4xl text-sand-300 mb-4">
                  {s.step}
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-2.5">
                  {s.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTA() {
  return (
    <section className="relative px-6 py-36 bg-background-primary text-center overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(184,164,142,0.07) 0%, transparent 65%)' }}
      />

      <FadeIn>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-text-primary leading-[1.12] tracking-tight max-w-[600px] mx-auto mb-6">
          Ready to stop running
          <br />
          everything yourself?
        </h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-base text-text-secondary leading-relaxed max-w-[460px] mx-auto mb-10">
          Let's build the system that gives you your time back.
          One conversation is all it takes to start.
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        <Button size="lg">
          Book a Discovery Call
        </Button>
      </FadeIn>
    </section>
  )
}

// Component Showcase Banner
function ShowcaseBanner() {
  return (
    <section className="px-6 py-20 bg-background-tertiary border-t border-[rgba(184,164,142,0.15)]">
      <div className="max-w-[1080px] mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <Badge variant="default" className="mb-4">Developer Preview</Badge>
              <h3 className="font-heading text-2xl text-text-primary mb-2">
                Explore the Component Library
              </h3>
              <p className="text-text-secondary max-w-md">
                See the PayrollDashboard and all UI primitives in action on our interactive showcase.
              </p>
            </div>
            <Link href="/showcase">
              <Button variant="accent" size="lg">
                View Showcase
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// Vibe Coder AI Instructions
const AI_INSTRUCTIONS = `<freehold-ui-instructions>
You are working with the @freehold/ui component library. Follow these rules:

IMPORTS: Import from '@freehold/ui'. Components: Button, Card, CardContent, Badge, Pill, Icon, Input, Select, StatCard, CopyBlock, DataTable, SearchInput, FilterSelect, FeatureRow, PayrollDashboard.

STYLING PATTERN: Use CVA (class-variance-authority) for all component variants. Use cn() from '../../utils/cn' for class merging. Use forwardRef for DOM components.

COLORS (use hex values in Tailwind):
- Backgrounds: #FAF9F6 (primary), #F5F2ED (warm), #F9F7F3 (card)
- Text: #2C2824 (primary), #5C574F (secondary), #8A847A (muted)
- Accent: #B8A48E (sand), #A08A6E (hover), #D4C8B8 (light)
- Border: #E8E2DA, rgba(184,164,142,0.25) for subtle

STATUS COLORS:
- Pending: bg #FEF3C7, text #92400E
- Approved: bg #D1FAE5, text #065F46
- Paid: bg #DBEAFE, text #1E40AF
- Error: bg #FEE2E2, text #991B1B

TYPOGRAPHY: DM Serif Display (headings, font-heading), DM Sans (body), JetBrains Mono (code).

SPACING: 8px grid (4, 8, 12, 16, 24, 32, 40, 48, 64, 80px).

BORDER RADIUS: sm=8px (buttons), md=10px (inputs), lg=14px (cards), xl=16px (wrappers), full (pills).

SHADOWS: Use warm shadows with sand tones, not pure black.

ICONS: 20x20 viewBox, 1.5px stroke, round caps/joins, #B8A48E default stroke.

STRUCTURE: primitives/ (single-purpose), composites/ (multi-component), patterns/ (full features).

DON'T: Use arbitrary Tailwind colors, skip CVA, forget exports, ignore 8px grid.
</freehold-ui-instructions>`

function VibeCoderSection() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(AI_INSTRUCTIONS)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <section className="px-6 py-28 bg-background-primary">
      <div className="max-w-[1080px] mx-auto">
        <FadeIn>
          <Badge variant="accent" className="mb-4">For Vibe Coders</Badge>
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary leading-tight tracking-tight max-w-[520px] mb-4">
            Build with AI.
            <br />
            Stay on-brand.
          </h2>
          <p className="text-base text-text-secondary leading-relaxed max-w-[560px] mb-10">
            Copy these instructions into Cursor, Claude, Windsurf, or any AI coding tool.
            Your AI will generate components that match our design system perfectly.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card variant="elevated" padding="none" className="overflow-hidden">
            <div className="bg-[#2C2824] p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#4A4540]" />
                  ))}
                </div>
                <span className="text-xs text-[#8A847A] font-mono">freehold-ui-instructions</span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopy}
                className="bg-[#3D3832] border-[#4A4540] text-[#FAF9F6] hover:bg-[#4A4540]"
              >
                {copied ? (
                  <>
                    <Icon name="check" size="xs" color="success" />
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </Button>
            </div>
            <pre className="p-5 text-xs font-mono text-[#D4C8B8] bg-[#1A1816] overflow-x-auto max-h-[320px] overflow-y-auto leading-relaxed">
              {AI_INSTRUCTIONS}
            </pre>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="text-sm text-text-tertiary">Works with:</span>
            {['Cursor', 'Claude', 'Windsurf', 'Copilot', 'Cody'].map((tool) => (
              <span
                key={tool}
                className="px-3 py-1.5 text-xs font-medium text-text-secondary bg-background-secondary rounded-full border border-[rgba(184,164,142,0.2)]"
              >
                {tool}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-[rgba(184,164,142,0.1)] bg-background-primary">
      <div className="max-w-[1080px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-[7px] bg-gradient-to-br from-sand-500 to-sand-300 flex items-center justify-center">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M2 14V6L8 2L14 6V14H10V9H6V14H2Z" fill="#FAF9F6" />
            </svg>
          </div>
          <span className="font-heading text-base text-text-primary">
            Freehold
          </span>
        </div>

        <p className="text-sm text-text-tertiary">
          Enterprise systems for businesses that move. © 2026
        </p>
      </div>
    </footer>
  )
}

// Main Page
export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Credentials />
      <Platform />
      <Industries />
      <Process />
      <ShowcaseBanner />
      <VibeCoderSection />
      <CTA />
      <Footer />
    </main>
  )
}

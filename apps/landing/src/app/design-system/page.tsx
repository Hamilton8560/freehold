'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Button,
  Card,
  CardContent,
  Badge,
  Input,
  Icon,
  CopyBlock,
  Pill,
  FeatureRow,
  Textarea,
  Checkbox,
  Toggle,
  RichTextEditor,
  RichTextDisplay,
  Toast,
  ToastViewport,
  Skeleton,
  SkeletonText,
  StatCardSkeleton,
  ChartSkeleton,
  ChatContainer,
  ChatMessage,
  TypingIndicator,
  ToolCallCard,
  EmptyState,
  type ChatMessageData,
  type IconName,
} from '@freehold/ui'
import * as RadixToast from '@radix-ui/react-toast'

const BRAND = {
  bg: '#FAF9F6',
  bgWarm: '#F5F2ED',
  bgCard: '#F9F7F3',
  white: '#FFFFFF',
  text: '#1A1A1A',
  textSec: '#6B6560',
  textMuted: '#9B9590',
  accent: '#B8A48E',
  accentHover: '#A6927A',
  accentLight: '#D4C8B8',
  border: '#E8E2DA',
  borderLight: '#F0EBE4',
  success: '#8DB580',
  error: '#C4796B',
  warning: '#D4B86A',
}

const shadow = '0 1px 3px rgba(26,26,26,0.04), 0 4px 12px rgba(26,26,26,0.03)'

function Swatch({ name, hex, large = false }: { name: string; hex: string; large?: boolean }) {
  return (
    <div className={`flex flex-col gap-2 ${large ? 'flex-1 min-w-[160px]' : ''}`}>
      <div
        className="rounded-[10px] border border-[rgba(184,164,142,0.25)]"
        style={{
          width: large ? '100%' : 72,
          height: 72,
          background: hex,
        }}
      />
      <div>
        <div className="text-sm font-medium text-text-primary">{name}</div>
        <code className="text-xs text-text-tertiary font-mono">{hex}</code>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-16">
      <h2 className="font-heading text-2xl text-text-primary tracking-tight mb-8 pb-4 border-b border-[rgba(184,164,142,0.25)]">
        {title}
      </h2>
      {children}
    </div>
  )
}

const TABS = [
  { id: 'colors', label: 'Colors' },
  { id: 'type', label: 'Typography' },
  { id: 'components', label: 'Components' },
  { id: 'icons', label: 'Icons' },
  { id: 'shadows', label: 'Shadows & Radius' },
  { id: 'spacing', label: 'Spacing' },
]

const ICON_NAMES: IconName[] = [
  'dashboard', 'clients', 'pipeline', 'billing', 'reports', 'ai',
  'settings', 'search', 'check', 'warning', 'arrow', 'shield',
  'growth', 'deploy', 'automation', 'home', 'plus', 'minus',
  'close', 'chevron-down', 'chevron-up', 'chevron-left', 'chevron-right',
]

export default function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState('colors')
  const [toggleChecked, setToggleChecked] = useState(false)
  const [toggleSmChecked, setToggleSmChecked] = useState(true)

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="border-b border-[rgba(184,164,142,0.15)] bg-white sticky top-0 z-50">
        <div className="max-w-[1080px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sand-500 to-sand-300 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 14V6L8 2L14 6V14H10V9H6V14H2Z" fill="#FAF9F6" />
                </svg>
              </div>
              <span className="font-heading text-xl text-text-primary">Freehold</span>
            </Link>
            <span className="text-text-tertiary">/</span>
            <span className="text-text-secondary">Design System</span>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-[1080px] mx-auto px-6 py-10">
        {/* Title */}
        <div className="mb-12">
          <h1 className="font-heading text-4xl text-text-primary tracking-tight mb-3">
            Design System
          </h1>
          <p className="text-text-secondary text-lg">
            Visual reference for building components, icons, and UI. Build Bible v1.0
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-12 p-1 bg-background-secondary rounded-[10px] border border-[rgba(184,164,142,0.1)] flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-lg text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-text-primary font-medium shadow-warm-sm'
                  : 'text-text-tertiary hover:text-text-secondary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* === COLORS TAB === */}
        {activeTab === 'colors' && (
          <>
            <Section title="Core Palette">
              <div className="flex flex-wrap gap-5 mb-10">
                <Swatch name="bg-primary" hex={BRAND.bg} large />
                <Swatch name="bg-warm" hex={BRAND.bgWarm} large />
                <Swatch name="bg-card" hex={BRAND.bgCard} large />
                <Swatch name="white" hex={BRAND.white} large />
              </div>
              <div className="flex flex-wrap gap-5 mb-10">
                <Swatch name="text-primary" hex="#2C2824" />
                <Swatch name="text-secondary" hex="#5C574F" />
                <Swatch name="text-muted" hex="#8A847A" />
              </div>
              <div className="flex flex-wrap gap-5 mb-10">
                <Swatch name="accent" hex={BRAND.accent} />
                <Swatch name="accent-hover" hex={BRAND.accentHover} />
                <Swatch name="accent-light" hex={BRAND.accentLight} />
              </div>
              <div className="flex flex-wrap gap-5">
                <Swatch name="border" hex={BRAND.border} />
                <Swatch name="success" hex={BRAND.success} />
                <Swatch name="warning" hex={BRAND.warning} />
                <Swatch name="error" hex={BRAND.error} />
              </div>
            </Section>

            <Section title="Gradients">
              <div className="flex gap-5 flex-wrap">
                <div>
                  <div
                    className="w-[200px] h-[72px] rounded-[10px] mb-2"
                    style={{ background: `linear-gradient(135deg, ${BRAND.accent}, ${BRAND.accentLight})` }}
                  />
                  <div className="text-sm text-text-primary">gradient-accent</div>
                </div>
                <div>
                  <div
                    className="w-[200px] h-[72px] rounded-[10px] border border-[rgba(184,164,142,0.25)] mb-2"
                    style={{ background: `radial-gradient(ellipse, rgba(184,164,142,0.15) 0%, ${BRAND.bg} 70%)` }}
                  />
                  <div className="text-sm text-text-primary">warm-glow</div>
                </div>
                <div>
                  <div
                    className="w-[200px] h-[72px] rounded-[10px] mb-2"
                    style={{ background: `linear-gradient(to top, ${BRAND.accentLight}, ${BRAND.border})` }}
                  />
                  <div className="text-sm text-text-primary">gradient-chart</div>
                </div>
              </div>
            </Section>
          </>
        )}

        {/* === TYPOGRAPHY TAB === */}
        {activeTab === 'type' && (
          <>
            <Section title="Type Scale">
              <div className="flex flex-col gap-8">
                {[
                  { label: 'Hero', size: '56px', sample: 'From overwhelmed to operational.', serif: true },
                  { label: 'H1', size: '42px', sample: 'Ready to stop running everything yourself?', serif: true },
                  { label: 'H2', size: '34px', sample: 'Built by operators, not just engineers.', serif: true },
                  { label: 'H3', size: '22px', sample: 'Client management that runs itself.', serif: true },
                  { label: 'H4', size: '17px', sample: 'Computer Science Foundation', weight: 600 },
                  { label: 'Body', size: '17px', sample: 'We build turnkey software systems that transition your business from owner-dependent to scalable.' },
                  { label: 'Body SM', size: '15px', sample: 'Enterprise-grade CRM with automated follow-ups, pipeline tracking, and revenue forecasting.' },
                  { label: 'Caption', size: '14px', sample: 'Platform · Solutions · About' },
                  { label: 'Overline', size: '13px', sample: 'WHY FREEHOLD', upper: true, color: BRAND.accent },
                  { label: 'Stat', size: '24px', sample: '$84,200', serif: true },
                  { label: 'Micro', size: '11px', sample: 'MONTHLY REVENUE', upper: true, color: BRAND.textMuted, weight: 500 },
                ].map((t) => (
                  <div key={t.label} className="grid grid-cols-[100px_1fr] gap-6 items-baseline">
                    <div className="text-xs text-text-tertiary uppercase tracking-wider">
                      {t.label}
                      <br />
                      <span className="text-sand-500">{t.size}</span>
                    </div>
                    <div
                      style={{
                        fontFamily: t.serif ? "'DM Serif Display', Georgia, serif" : "'DM Sans', sans-serif",
                        fontSize: t.size,
                        fontWeight: t.weight || 400,
                        color: t.color || BRAND.text,
                        textTransform: t.upper ? 'uppercase' : 'none',
                        letterSpacing: t.upper ? '0.1em' : t.serif ? '-0.02em' : '0',
                        lineHeight: parseInt(t.size) > 30 ? 1.15 : 1.5,
                      }}
                    >
                      {t.sample}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Italic Accent (Hero Only)">
              <p className="font-heading text-4xl text-text-primary tracking-tight leading-tight">
                From overwhelmed to <span className="text-sand-500 italic">operational.</span>
              </p>
              <p className="text-sm text-text-tertiary mt-3">
                Reserve italic DM Serif Display for one accent word per hero. Never more.
              </p>
            </Section>
          </>
        )}

        {/* === COMPONENTS TAB === */}
        {activeTab === 'components' && (
          <>
            <Section title="Buttons">
              <div className="flex gap-4 items-center flex-wrap mb-6">
                <Button>Primary CTA</Button>
                <Button variant="accent">Accent CTA</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost →</Button>
                <Button variant="danger">Danger</Button>
              </div>
              <div className="flex gap-2 flex-wrap">
                <CopyBlock value="padding: 14px 32px" />
                <CopyBlock value="border-radius: 10px" />
                <CopyBlock value="font-weight: 500" />
              </div>
            </Section>

            <Section title="Cards">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                <Card variant="default" padding="lg">
                  <CardContent>
                    <div className="w-11 h-11 rounded-[10px] bg-white border border-[rgba(184,164,142,0.25)] flex items-center justify-center mb-5">
                      <Icon name="growth" size="md" />
                    </div>
                    <h3 className="text-base font-semibold text-text-primary mb-2">Default Card</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      bg-card background, border-light border, 14px radius.
                    </p>
                  </CardContent>
                </Card>
                <Card variant="outlined" padding="lg" className="bg-white">
                  <CardContent>
                    <div className="text-sm text-text-tertiary mb-2">01</div>
                    <h3 className="font-heading text-xl text-text-primary mb-3">Outlined Card</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      White bg, border only. Used for industry cards.
                    </p>
                  </CardContent>
                </Card>
                <Card variant="elevated" padding="md">
                  <CardContent>
                    <div className="text-[11px] text-text-tertiary uppercase tracking-wider mb-1.5">
                      Active Clients
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading text-2xl text-text-primary">247</span>
                      <span className="text-xs text-[#065F46]">+12%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex gap-2 flex-wrap">
                <CopyBlock value="border-radius: 14px" label="outer radius: 14px" />
                <CopyBlock value="border-radius: 10px" label="inner radius: 10px" />
              </div>
            </Section>

            <Section title="Badges & Pills">
              <div className="flex gap-3 flex-wrap mb-6">
                <Badge variant="default">Default</Badge>
                <Badge variant="pending">Pending</Badge>
                <Badge variant="approved">Approved</Badge>
                <Badge variant="paid">Paid</Badge>
                <Badge variant="error">Error</Badge>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Pill variant="default">Active</Pill>
                <Pill variant="success">Success</Pill>
                <Pill variant="warning">Warning</Pill>
                <Pill variant="error">Error</Pill>
                <Pill variant="accent">Accent</Pill>
              </div>
            </Section>

            <Section title="Input Field">
              <div className="max-w-[360px]">
                <Input placeholder="Enter your email" />
              </div>
            </Section>

            <Section title="Textarea">
              <div className="max-w-[360px] flex flex-col gap-4">
                <Textarea label="Message" placeholder="Write your message..." />
                <Textarea label="With Hint" placeholder="Tell us more..." hint="Max 500 characters" />
                <Textarea label="Error State" placeholder="Required field" error="This field is required" />
                <Textarea label="Disabled" placeholder="Cannot edit" disabled />
              </div>
            </Section>

            <Section title="Checkbox">
              <div className="flex flex-col gap-4">
                <Checkbox label="Accept terms and conditions" />
                <Checkbox label="Subscribe to newsletter" defaultChecked />
                <Checkbox label="With hint text" hint="We'll only send important updates" />
                <Checkbox label="Error state" error="You must accept the terms" />
                <Checkbox label="Disabled checkbox" disabled />
                <Checkbox label="Disabled checked" disabled defaultChecked />
              </div>
            </Section>

            <Section title="Toggle">
              <div className="flex flex-col gap-4">
                <Toggle label="Notifications" checked={toggleChecked} onChange={setToggleChecked} />
                <Toggle label="Small toggle" size="sm" checked={toggleSmChecked} onChange={setToggleSmChecked} />
                <Toggle label="With hint" checked={false} onChange={() => {}} hint="Enable dark mode" />
                <Toggle label="Error state" checked={false} onChange={() => {}} error="Selection required" />
                <Toggle label="Disabled off" disabled />
                <Toggle label="Disabled on" disabled checked />
              </div>
            </Section>

            <Section title="Feature Row">
              <FeatureRow
                tag="CRM + Pipeline"
                title="Client management that runs itself."
                description="Enterprise-grade CRM with automated follow-ups, pipeline tracking, and revenue forecasting — configured for your business model from day one."
                showTopBorder
              />
            </Section>

            <Section title="Rich Text Editor">
              <div className="max-w-[600px] flex flex-col gap-4">
                <RichTextEditor
                  label="Description"
                  placeholder="Start typing here..."
                  hint="Supports bold, italic, headings, lists, blockquotes, code blocks, and links."
                />
                <RichTextEditor
                  label="Error State"
                  placeholder="Required field"
                  error="This field is required"
                />
                <RichTextEditor
                  label="Disabled"
                  placeholder="Cannot edit"
                  disabled
                />
              </div>
            </Section>

            <Section title="Rich Text Display">
              <div className="max-w-[600px] flex flex-col gap-6">
                <p className="text-sm text-text-secondary">Renders saved HTML with the same typography as the editor. No Tiptap dependency.</p>
                <Card variant="outlined" padding="md" className="bg-white">
                  <CardContent>
                    <RichTextDisplay
                      content="<h2>Project Update</h2><p>The new <strong>dashboard</strong> is ready for review. Key changes include:</p><ul><li>Improved <em>performance metrics</em></li><li>New filtering options</li><li>Export to CSV</li></ul><blockquote><p>Ship it when ready — no blockers remaining.</p></blockquote><p>See the <a href='#'>full changelog</a> for details.</p>"
                    />
                  </CardContent>
                </Card>
              </div>
            </Section>

            <Section title="Toast Notifications">
              <p className="text-sm text-text-secondary mb-6">
                Toast notifications with semantic variants for user feedback. Built on Radix UI for accessibility.
              </p>
              <RadixToast.Provider swipeDirection="right">
                <div className="space-y-3 max-w-[400px]">
                  <Toast title="Success" description="Operation completed successfully." variant="success" open onOpenChange={() => {}} />
                  <Toast title="Error" description="Something went wrong. Please try again." variant="error" open onOpenChange={() => {}} />
                  <Toast title="Warning" description="Please review before proceeding." variant="warning" open onOpenChange={() => {}} />
                  <Toast title="Info" description="For your information." variant="info" open onOpenChange={() => {}} />
                </div>
                <ToastViewport className="relative" />
              </RadixToast.Provider>
            </Section>

            <Section title="Skeleton Loaders">
              <p className="text-sm text-text-secondary mb-6">
                Loading placeholders with animated pulse effect. Use to indicate content is loading.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="space-y-3">
                  <p className="text-xs text-text-tertiary uppercase tracking-wider mb-3">Line</p>
                  <Skeleton variant="line" width="100%" height={16} />
                  <Skeleton variant="line" width="80%" height={16} />
                  <Skeleton variant="line" width="60%" height={16} />
                </div>
                <div className="space-y-3">
                  <p className="text-xs text-text-tertiary uppercase tracking-wider mb-3">Circle</p>
                  <div className="flex gap-3">
                    <Skeleton variant="circle" width={32} height={32} />
                    <Skeleton variant="circle" width={48} height={48} />
                    <Skeleton variant="circle" width={64} height={64} />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs text-text-tertiary uppercase tracking-wider mb-3">Rectangle</p>
                  <Skeleton variant="rectangle" width="100%" height={100} />
                </div>
              </div>

              <p className="text-xs text-text-tertiary uppercase tracking-wider mb-3">Composites</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-text-secondary mb-2">StatCardSkeleton</p>
                  <StatCardSkeleton />
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-2">ChartSkeleton (pie)</p>
                  <ChartSkeleton variant="pie" height={150} />
                </div>
              </div>
            </Section>

            <Section title="AI Chat">
              <p className="text-sm text-text-secondary mb-6">
                Full chat interface pattern with message bubbles, streaming text, tool call display, and typing indicator.
                Wire to <code className="rounded bg-background-secondary px-1.5 py-0.5 font-mono text-xs">useFreeholdChat</code> from <code className="rounded bg-background-secondary px-1.5 py-0.5 font-mono text-xs">@freehold/ai/client</code> for a complete AI experience.
              </p>

              <div className="mb-8">
                <p className="text-xs text-text-tertiary uppercase tracking-wider mb-3">ChatContainer</p>
                <ChatContainerDemo />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider mb-3">Message Variants</p>
                  <div className="space-y-3 rounded-lg bg-background-secondary p-4">
                    <ChatMessage message={{ id: '1', role: 'user', content: 'Hello! Can you help me?' }} />
                    <ChatMessage message={{ id: '2', role: 'assistant', content: 'Of course! How can I assist you today?' }} />
                    <ChatMessage message={{ id: '3', role: 'system', content: 'Chat session started' }} />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-text-tertiary uppercase tracking-wider mb-3">Typing Indicator</p>
                    <TypingIndicator />
                  </div>
                  <div>
                    <p className="text-xs text-text-tertiary uppercase tracking-wider mb-3">Tool Call Card</p>
                    <ToolCallCard
                      toolCall={{
                        id: '1',
                        toolName: 'calculatePayroll',
                        args: { annualSalary: 85000 },
                        result: { grossMonthly: 7083.33, taxes: 1770.83, netMonthly: 5312.50 },
                        status: 'completed',
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-text-tertiary uppercase tracking-wider mb-3">Empty State</p>
                    <EmptyState
                      message="Ask me anything!"
                      suggestions={['What is Freehold?', 'Show me stats']}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-background-secondary p-4">
                <p className="font-mono text-sm text-text-secondary">
                  <span className="text-sand-600">import</span> {'{ ChatContainer }'} <span className="text-sand-600">from</span> <span className="text-text-primary">&apos;@freehold/ui&apos;</span>
                </p>
              </div>
            </Section>
          </>
        )}

        {/* === ICONS TAB === */}
        {activeTab === 'icons' && (
          <>
            <Section title="Icon Library — Line Style, 1.5px Stroke">
              <p className="text-text-secondary mb-8 max-w-xl">
                Every icon uses consistent 1.5px stroke weight, rounded caps and joins, 20×20 viewbox.
                Default stroke color is the brand accent (#B8A48E).
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {ICON_NAMES.map((name) => (
                  <div
                    key={name}
                    className="flex flex-col items-center gap-2.5 p-5 rounded-[10px] border border-[rgba(184,164,142,0.15)] bg-white"
                  >
                    <div className="w-11 h-11 rounded-[10px] bg-background-secondary border border-[rgba(184,164,142,0.25)] flex items-center justify-center">
                      <Icon name={name} size="md" />
                    </div>
                    <span className="text-xs text-text-tertiary">{name}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Icon Sizes">
              <div className="flex gap-8 items-end">
                {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                  <div key={size} className="flex flex-col items-center gap-2">
                    <Icon name="dashboard" size={size} />
                    <span className="text-xs text-text-tertiary">{size}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Icon Colors">
              <div className="flex gap-6 items-center flex-wrap">
                {(['default', 'primary', 'secondary', 'muted', 'success', 'warning', 'error'] as const).map((color) => (
                  <div key={color} className="flex flex-col items-center gap-2">
                    <Icon name="check" size="lg" color={color} />
                    <span className="text-xs text-text-tertiary">{color}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Icon Specs">
              <div className="flex gap-2 flex-wrap">
                <CopyBlock value='strokeWidth="1.5"' />
                <CopyBlock value='strokeLinecap="round"' />
                <CopyBlock value='strokeLinejoin="round"' />
                <CopyBlock value='fill="none"' />
                <CopyBlock value='viewBox="0 0 20 20"' />
              </div>
            </Section>
          </>
        )}

        {/* === SHADOWS & RADIUS TAB === */}
        {activeTab === 'shadows' && (
          <>
            <Section title="Shadow Scale">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'shadow (default)', value: shadow },
                  { name: 'shadow-hover', value: '0 2px 8px rgba(26,26,26,0.06), 0 8px 24px rgba(26,26,26,0.05)' },
                  { name: 'shadow-button', value: '0 2px 8px rgba(26,26,26,0.12)' },
                ].map((s) => (
                  <div
                    key={s.name}
                    className="bg-white rounded-[14px] p-8 text-center"
                    style={{ boxShadow: s.value }}
                  >
                    <div className="text-sm font-medium text-text-primary mb-2">{s.name}</div>
                    <code className="text-[10px] text-text-tertiary font-mono break-all">{s.value}</code>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Border Radius Scale">
              <div className="flex gap-6 items-end flex-wrap">
                {[
                  { name: 'sm', value: 8, usage: 'Buttons, sidebar' },
                  { name: 'md', value: 10, usage: 'Inputs, inner cards' },
                  { name: 'lg', value: 14, usage: 'Outer cards' },
                  { name: 'xl', value: 16, usage: 'Dashboard wrapper' },
                  { name: 'full', value: 100, usage: 'Pills, badges' },
                ].map((r) => (
                  <div key={r.name} className="text-center">
                    <div
                      className="w-[72px] h-[72px] border-2 border-sand-500 bg-background-secondary mb-2"
                      style={{ borderRadius: r.value }}
                    />
                    <div className="text-sm font-medium text-text-primary">{r.value}px</div>
                    <div className="text-xs text-text-tertiary">{r.name}</div>
                    <div className="text-[10px] text-sand-500 mt-0.5">{r.usage}</div>
                  </div>
                ))}
              </div>
            </Section>
          </>
        )}

        {/* === SPACING TAB === */}
        {activeTab === 'spacing' && (
          <>
            <Section title="8px Grid Spacing Scale">
              <div className="flex flex-col gap-3">
                {[
                  { token: 'space-1', px: 4 },
                  { token: 'space-2', px: 8 },
                  { token: 'space-3', px: 12 },
                  { token: 'space-4', px: 16 },
                  { token: 'space-6', px: 24 },
                  { token: 'space-8', px: 32 },
                  { token: 'space-10', px: 40 },
                  { token: 'space-12', px: 48 },
                  { token: 'space-16', px: 64 },
                  { token: 'space-20', px: 80 },
                  { token: 'space-28', px: 112 },
                  { token: 'space-36', px: 144 },
                ].map((s) => (
                  <div key={s.token} className="flex items-center gap-4">
                    <code className="w-24 text-xs text-text-tertiary font-mono">{s.token}</code>
                    <div className="w-10 text-sm font-medium text-text-primary text-right">{s.px}px</div>
                    <div
                      className="h-4 rounded bg-gradient-to-r from-sand-500 to-sand-300 opacity-60"
                      style={{ width: Math.min(s.px * 2, 280) }}
                    />
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Layout Constraints">
              <div className="flex flex-col gap-3">
                {[
                  { name: 'max-width (content)', value: '1080px' },
                  { name: 'max-width-wide', value: '960px' },
                  { name: 'max-width-text', value: '560px' },
                  { name: 'page-padding', value: '40px' },
                ].map((l) => (
                  <div key={l.name} className="flex gap-4 items-center">
                    <div className="w-44 text-sm text-text-secondary">{l.name}</div>
                    <CopyBlock value={l.value} />
                  </div>
                ))}
              </div>
            </Section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[rgba(184,164,142,0.1)] px-6 py-8">
        <div className="max-w-[1080px] mx-auto text-center text-sm text-text-tertiary">
          Freehold Design System v1.0
        </div>
      </footer>
    </div>
  )
}

// ── Chat demo helper ──────────────────────────────────

const DESIGN_SYSTEM_CHAT_MESSAGES: ChatMessageData[] = [
  { id: '1', role: 'user', content: 'What is Freehold?' },
  {
    id: '2',
    role: 'assistant',
    content: 'Freehold is a modern business management platform with payroll, CRM, pipeline management, and AI-powered automation.',
    toolCalls: [
      {
        id: 'tc1',
        toolName: 'getCompanyInfo',
        args: { topic: 'overview' },
        result: { info: 'Freehold is a modern business management platform...' },
        status: 'completed',
      },
    ],
  },
  { id: '3', role: 'user', content: 'Calculate payroll for $85k salary' },
  {
    id: '4',
    role: 'assistant',
    content: 'For an $85,000 annual salary with a 25% tax rate: gross monthly is $7,083.33, taxes are $1,770.83, and net monthly pay is $5,312.50.',
  },
]

function ChatContainerDemo() {
  const [input, setInput] = useState('')
  return (
    <ChatContainer
      messages={DESIGN_SYSTEM_CHAT_MESSAGES}
      input={input}
      onInputChange={setInput}
      onSubmit={() => {}}
      title="Freehold Assistant"
      subtitle="AI-powered help"
      assistant={{ name: 'Freehold AI' }}
      maxHeight="420px"
    />
  )
}

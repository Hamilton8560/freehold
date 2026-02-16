'use client'

import { useState, useMemo, type ChangeEvent } from 'react'
import Link from 'next/link'
import {
  SearchInput,
  Card,
  CardContent,
  Badge,
  Icon,
  CodeCanvas,
  Button,
  Input,
  Select,
  StatCard,
  CopyBlock,
  Pill,
  Textarea,
  Checkbox,
  Toggle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
  ConfirmDialog,
  CardFlipLoader,
  DataTable,
  FeatureRow,
  RichTextEditor,
  RichTextDisplay,
  FilterSelect,
  Skeleton,
  StatCardSkeleton,
  DataTableSkeleton,
  ToastProvider,
  useToast,
  ChatContainer,
  ChatMessage,
  ChatInput,
  TypingIndicator,
  ToolCallCard,
  EmptyState,
  Navbar,
  Form,
  FormField,
  FormSection,
  FormActions,
  FormGrid,
  Sidebar,
  AppHeader,
  LoginForm,
  RegisterForm,
  TagInput,
  type ChatMessageData,
  type SidebarNavItem,
} from '@freehold/ui'
import {
  PieChart,
  BarChart,
  LineChart,
  ChartSkeleton,
  PayrollDashboard,
  PayPeriodSelector,
  Dashboard,
  type Employee,
  type PayPeriod,
} from '@freehold/ui/charts'
import { Kanban } from '@freehold/ui/kanban'
import {
  OrderSummary,
  PaymentMethodIcon,
  SecurityBadge,
  CheckoutDivider,
  CheckoutHeader,
  CheckoutFooter,
  CheckoutCard,
  CheckoutFullScreen,
  CheckoutSplitScreen,
  PricingCard,
  PricingGrid,
} from '@freehold/payments'
import {
  componentDocs,
  getComponentsByCategory,
  searchComponents,
  getComponentBySlug,
  type ComponentDoc,
  type VariantDoc,
} from '../../lib/component-docs'

const categories = [
  { id: 'primitives', label: 'Primitives', description: 'Base components' },
  { id: 'composites', label: 'Composites', description: 'Combined patterns' },
  { id: 'patterns', label: 'Patterns', description: 'Full features' },
] as const

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  )
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)

  // Filter components based on search
  const filteredComponents = useMemo(() => {
    if (!searchQuery) return componentDocs
    return searchComponents(searchQuery)
  }, [searchQuery])

  // Group filtered components by category
  const groupedFiltered = useMemo(() => {
    return {
      primitives: filteredComponents.filter((c) => c.category === 'primitives'),
      composites: filteredComponents.filter((c) => c.category === 'composites'),
      patterns: filteredComponents.filter((c) => c.category === 'patterns'),
    }
  }, [filteredComponents])

  // Auto-expand categories with search results
  useMemo(() => {
    if (searchQuery) {
      const categoriesWithResults = new Set<string>()
      filteredComponents.forEach((c) => categoriesWithResults.add(c.category))
      setExpandedCategories(categoriesWithResults)
    }
  }, [searchQuery, filteredComponents])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(categoryId)) {
        next.delete(categoryId)
      } else {
        next.add(categoryId)
      }
      return next
    })
  }

  const selectedComponentData = selectedComponent
    ? getComponentBySlug(selectedComponent)
    : null

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-primary/95 backdrop-blur-sm border-b border-[rgba(184,164,142,0.15)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <Icon name="chevron-left" size="sm" color="inherit" />
              <span className="text-sm">Home</span>
            </Link>
            <span className="text-text-tertiary">/</span>
            <span className="text-sm font-medium text-text-primary">Documentation</span>
          </div>
          <Link
            href="/design-system"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Design System
          </Link>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
              {/* Search */}
              <SearchInput
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClear={() => setSearchQuery('')}
              />

              {/* Category Tree */}
              <nav className="space-y-1">
                {categories.map((category) => {
                  const components = groupedFiltered[category.id as keyof typeof groupedFiltered]
                  const isExpanded = expandedCategories.has(category.id)
                  const hasComponents = components.length > 0

                  return (
                    <div key={category.id}>
                      {/* Category Header */}
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          hasComponents
                            ? 'text-text-primary hover:bg-background-secondary'
                            : 'text-text-tertiary'
                        }`}
                      >
                        <Icon
                          name={isExpanded ? 'chevron-down' : 'chevron-right'}
                          size="sm"
                          color="muted"
                        />
                        <span className="font-medium flex-1 text-left">{category.label}</span>
                        <span className="text-xs text-text-tertiary">{components.length}</span>
                      </button>

                      {/* Component List */}
                      {isExpanded && hasComponents && (
                        <div className="ml-2 pl-4 border-l border-[rgba(184,164,142,0.15)] space-y-0.5 mt-1">
                          {components.map((component) => (
                            <button
                              key={component.slug}
                              onClick={() => setSelectedComponent(component.slug)}
                              className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                                selectedComponent === component.slug
                                  ? 'bg-sand-100 text-sand-700 font-medium'
                                  : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
                              }`}
                            >
                              {component.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </nav>

              {/* Resources */}
              <div className="pt-4 border-t border-[rgba(184,164,142,0.15)]">
                <h3 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3 px-3">
                  Resources
                </h3>
                <div className="space-y-1">
                  <Link
                    href="/docs/getting-started"
                    className="block px-3 py-2 rounded-lg text-sm text-sand-600 font-medium hover:text-sand-700 hover:bg-background-secondary transition-colors"
                  >
                    Getting Started
                  </Link>
                  <Link
                    href="/design-system"
                    className="block px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-background-secondary transition-colors"
                  >
                    Design System
                  </Link>
                  <Link
                    href="/showcase"
                    className="block px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-background-secondary transition-colors"
                  >
                    Component Showcase
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Mobile Search */}
            <div className="lg:hidden mb-6">
              <SearchInput
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClear={() => setSearchQuery('')}
              />
            </div>

            {/* Mobile Component List */}
            <div className="lg:hidden mb-6">
              <MobileComponentList
                components={filteredComponents}
                selectedComponent={selectedComponent}
                onSelect={setSelectedComponent}
              />
            </div>

            {selectedComponentData ? (
              <ComponentDetail component={selectedComponentData} />
            ) : (
              <WelcomeView />
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[rgba(184,164,142,0.15)] mt-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
          <p className="text-sm text-text-tertiary text-center">
            @freehold/ui &middot; Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  )
}

function WelcomeView() {
  return (
    <div>
      {/* Getting Started Banner */}
      <Link href="/docs/getting-started">
        <Card
          variant="elevated"
          padding="md"
          className="mb-8 bg-gradient-to-r from-sand-50 to-background-primary border-sand-200 hover:shadow-warm-md transition-shadow cursor-pointer"
        >
          <CardContent className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-sand-100 flex items-center justify-center shrink-0">
                <Icon name="deploy" size="md" />
              </div>
              <div className="min-w-0">
                <h3 className="font-medium text-text-primary">New to @freehold/ui?</h3>
                <p className="text-sm text-text-secondary truncate sm:overflow-visible sm:whitespace-normal">
                  Check out the Getting Started guide for installation and setup.
                </p>
              </div>
            </div>
            <Icon name="chevron-right" size="md" color="secondary" className="shrink-0" />
          </CardContent>
        </Card>
      </Link>

      {/* Starter Kit Banner */}
      <a href="https://github.com/Hamilton8560/freehold-starter" target="_blank" rel="noopener noreferrer">
        <Card
          variant="elevated"
          padding="md"
          className="mb-8 bg-gradient-to-r from-sand-50 to-background-primary border-sand-200 hover:shadow-warm-md transition-shadow cursor-pointer"
        >
          <CardContent className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-sand-100 flex items-center justify-center shrink-0">
                <Icon name="growth" size="md" />
              </div>
              <div className="min-w-0">
                <h3 className="font-medium text-text-primary">Building with Freehold Starter?</h3>
                <p className="text-sm text-text-secondary truncate sm:overflow-visible sm:whitespace-normal">
                  Check out the Starter Kit documentation for tutorials, authorization guides, and CLI reference.
                </p>
              </div>
            </div>
            <Icon name="chevron-right" size="md" color="secondary" className="shrink-0" />
          </CardContent>
        </Card>
      </a>

      {/* Instructions */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl text-text-primary mb-2">
          Component Documentation
        </h1>
        <p className="text-text-secondary">
          Select a component to view its documentation, props, and examples.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Primitives', count: getComponentsByCategory('primitives').length, desc: 'Base components' },
          { label: 'Composites', count: getComponentsByCategory('composites').length, desc: 'Combined patterns' },
          { label: 'Patterns', count: getComponentsByCategory('patterns').length, desc: 'Full features' },
        ].map((stat) => (
          <Card key={stat.label} variant="outlined" padding="md" className="bg-white">
            <CardContent>
              <div className="text-2xl font-heading text-text-primary mb-1">{stat.count}</div>
              <div className="text-sm font-medium text-text-primary">{stat.label}</div>
              <div className="text-xs text-text-tertiary">{stat.desc}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function MobileComponentList({
  components,
  selectedComponent,
  onSelect,
}: {
  components: ComponentDoc[]
  selectedComponent: string | null
  onSelect: (slug: string) => void
}) {
  const [expanded, setExpanded] = useState(false)

  if (!expanded && !selectedComponent) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="w-full flex items-center justify-between px-4 py-3 bg-background-secondary rounded-lg text-sm"
      >
        <span className="text-text-secondary">Select a component...</span>
        <Icon name="chevron-down" size="sm" color="muted" />
      </button>
    )
  }

  if (!expanded && selectedComponent) {
    const comp = getComponentBySlug(selectedComponent)
    return (
      <button
        onClick={() => setExpanded(true)}
        className="w-full flex items-center justify-between px-4 py-3 bg-sand-50 border border-sand-200 rounded-lg text-sm"
      >
        <span className="font-medium text-text-primary">{comp?.name}</span>
        <Icon name="chevron-down" size="sm" color="muted" />
      </button>
    )
  }

  return (
    <div className="border border-[rgba(184,164,142,0.25)] rounded-lg bg-white overflow-hidden">
      <div className="max-h-64 overflow-y-auto">
        {components.map((component) => (
          <button
            key={component.slug}
            onClick={() => {
              onSelect(component.slug)
              setExpanded(false)
            }}
            className={`w-full text-left px-4 py-2.5 text-sm border-b border-[rgba(184,164,142,0.1)] last:border-b-0 ${
              selectedComponent === component.slug
                ? 'bg-sand-50 text-sand-700 font-medium'
                : 'text-text-secondary hover:bg-background-secondary'
            }`}
          >
            <span>{component.name}</span>
            <span className="text-xs text-text-tertiary ml-2">({component.category})</span>
          </button>
        ))}
      </div>
      <button
        onClick={() => setExpanded(false)}
        className="w-full px-4 py-3 text-sm text-text-tertiary hover:text-text-secondary border-t border-[rgba(184,164,142,0.15)]"
      >
        Close
      </button>
    </div>
  )
}

function ComponentDetail({ component }: { component: ComponentDoc }) {
  return (
    <div>
      {/* Component Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="font-heading text-3xl text-text-primary">{component.name}</h1>
          <Badge variant="default">{component.category}</Badge>
        </div>
        <p className="text-text-secondary text-lg">{component.description}</p>
      </div>

      {/* Import Statement */}
      <section className="mb-10">
        <h2 className="font-heading text-xl text-text-primary mb-4">Import</h2>
        <CodeCanvas
          code={component.importStatement}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      {/* Live Preview */}
      <section className="mb-10">
        <h2 className="font-heading text-xl text-text-primary mb-4">Preview</h2>
        <Card variant="outlined" padding="lg">
          <ComponentPreview component={component} />
        </Card>
      </section>

      {/* Props Table */}
      <section className="mb-10">
        <h2 className="font-heading text-xl text-text-primary mb-4">Props</h2>
        {/* Desktop table */}
        <Card variant="default" padding="none" className="overflow-hidden hidden sm:block">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-background-secondary border-b border-[rgba(184,164,142,0.15)]">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-text-primary">Prop</th>
                  <th className="text-left px-4 py-3 font-medium text-text-primary">Type</th>
                  <th className="text-left px-4 py-3 font-medium text-text-primary">Default</th>
                  <th className="text-left px-4 py-3 font-medium text-text-primary">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(184,164,142,0.1)]">
                {component.props.map((prop) => (
                  <tr key={prop.name} className="hover:bg-background-secondary/50">
                    <td className="px-4 py-3">
                      <code className="text-sm font-mono text-sand-600">{prop.name}</code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-xs font-mono text-text-secondary bg-background-secondary px-1.5 py-0.5 rounded">
                        {prop.type}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-text-tertiary">
                      {prop.default ? (
                        <code className="text-xs font-mono">{prop.default}</code>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        {/* Mobile stacked cards */}
        <div className="sm:hidden space-y-3">
          {component.props.map((prop) => (
            <Card key={prop.name} variant="default" padding="sm" className="overflow-hidden">
              <CardContent>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <code className="text-sm font-mono text-sand-600">{prop.name}</code>
                  <code className="text-xs font-mono text-text-secondary bg-background-secondary px-1.5 py-0.5 rounded shrink-0">
                    {prop.type}
                  </code>
                </div>
                <p className="text-sm text-text-secondary">{prop.description}</p>
                {prop.default && (
                  <p className="text-xs text-text-tertiary mt-1">
                    Default: <code className="font-mono">{prop.default}</code>
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Examples */}
      <section className="mb-10">
        <h2 className="font-heading text-xl text-text-primary mb-4">Examples</h2>
        <div className="space-y-6">
          {component.examples.map((example, index) => (
            <CodeCanvas
              key={index}
              code={example.code}
              title={example.title}
              language="tsx"
            />
          ))}
        </div>
      </section>
    </div>
  )
}

function ComponentPreview({ component }: { component: ComponentDoc }) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {}
    component.variants?.forEach((v) => {
      if (v.options.length > 0) {
        defaults[v.name] = v.options[0].value
      }
    })
    return defaults
  })

  const updateVariant = (name: string, value: string) => {
    setSelectedVariants((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Variant Selectors */}
      {component.variants && component.variants.length > 0 && (
        <div className="flex flex-wrap gap-6 pb-6 border-b border-[rgba(184,164,142,0.15)]">
          {component.variants.map((variant) => (
            <VariantSelector
              key={variant.name}
              variant={variant}
              selected={selectedVariants[variant.name]}
              onChange={(value) => updateVariant(variant.name, value)}
            />
          ))}
        </div>
      )}

      {/* Live Preview */}
      <div className="flex items-center justify-center min-h-[120px] p-4 sm:p-6 bg-background-secondary rounded-lg">
        <LiveComponent component={component} variants={selectedVariants} />
      </div>
    </div>
  )
}

function VariantSelector({
  variant,
  selected,
  onChange,
}: {
  variant: VariantDoc
  selected: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2">
        {variant.name}
      </label>
      <div className="overflow-x-auto">
        <div className="flex gap-1.5 p-1 bg-background-secondary rounded-lg">
          {variant.options.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`px-3 py-2 sm:py-1.5 rounded-md text-sm transition-all ${
                selected === option.value
                  ? 'bg-white text-text-primary font-medium shadow-warm-sm'
                  : 'text-text-tertiary hover:text-text-secondary'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function DialogPreview({ size }: { size: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent size={size as 'sm' | 'md' | 'lg' | 'xl' | 'full'}>
          <DialogHeader>
            <DialogTitle>Example Dialog</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p className="text-text-secondary">This is the dialog content area. You can add any content here.</p>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button variant="primary">Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

function ConfirmDialogPreview({ variant }: { variant: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant={variant === 'danger' ? 'danger' : 'primary'} onClick={() => setOpen(true)}>
        Open Confirm Dialog
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={variant === 'danger' ? 'Delete Item' : 'Confirm Action'}
        description={variant === 'danger' ? 'Are you sure? This action cannot be undone.' : 'Please confirm this action.'}
        confirmLabel={variant === 'danger' ? 'Delete' : 'Confirm'}
        variant={variant as 'default' | 'danger'}
        onConfirm={() => setOpen(false)}
      />
    </>
  )
}

function TogglePreview({ size }: { size: string }) {
  const [checked, setChecked] = useState(false)
  return (
    <Toggle
      label="Enable notifications"
      size={size as 'sm' | 'md'}
      checked={checked}
      onChange={setChecked}
    />
  )
}

function SearchInputPreview() {
  const [value, setValue] = useState('')
  return (
    <div className="w-64">
      <SearchInput
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
    </div>
  )
}

function RichTextEditorPreview() {
  return (
    <div className="w-full max-w-md">
      <RichTextEditor
        label="Description"
        placeholder="Start typing..."
        minHeight={120}
      />
    </div>
  )
}

function ToastTrigger({ variant }: { variant: string }) {
  const { toast } = useToast()

  const handleClick = () => {
    const messages: Record<string, { title: string; description: string }> = {
      success: { title: 'Success!', description: 'Your changes have been saved.' },
      error: { title: 'Error', description: 'Something went wrong. Please try again.' },
      warning: { title: 'Warning', description: 'Please review before continuing.' },
      info: { title: 'Info', description: 'Here is some helpful information.' },
    }
    const msg = messages[variant] || messages.info
    toast({
      title: msg.title,
      description: msg.description,
      variant: variant as 'success' | 'error' | 'warning' | 'info',
      duration: 5000,
    })
  }

  return (
    <Button
      variant={variant === 'error' ? 'danger' : variant === 'success' ? 'primary' : 'secondary'}
      onClick={handleClick}
    >
      Show {variant.charAt(0).toUpperCase() + variant.slice(1)} Toast
    </Button>
  )
}

function ToastPreview({ variant }: { variant: string }) {
  return (
    <ToastProvider position="bottom-right">
      <ToastTrigger variant={variant} />
    </ToastProvider>
  )
}

function CardFlipLoaderPreview() {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="flex flex-col items-center gap-3">
      <Button onClick={() => setPlaying(true)} disabled={playing}>
        {playing ? 'Playing\u2026' : 'Play Animation'}
      </Button>
      {playing && (
        <CardFlipLoader
          frontAlt="Jack of Spades"
          backAlt="Card back"
          onComplete={() => setPlaying(false)}
        />
      )}
    </div>
  )
}

const ALL_ICON_NAMES = [
  'dashboard', 'clients', 'pipeline', 'billing', 'reports',
  'ai', 'settings', 'search', 'check', 'warning',
  'arrow', 'shield', 'growth', 'deploy', 'automation',
  'home', 'plus', 'minus', 'close', 'chevron-down',
  'chevron-up', 'chevron-left', 'chevron-right', 'send', 'bot',
] as const

function IconGalleryPreview({
  size,
  color,
}: {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color: 'default' | 'primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'error'
}) {
  const [iconSearch, setIconSearch] = useState('')
  const filtered = iconSearch
    ? ALL_ICON_NAMES.filter((name) => name.includes(iconSearch.toLowerCase()))
    : ALL_ICON_NAMES

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search icons..."
        value={iconSearch}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setIconSearch(e.target.value)}
        className="w-full mb-3 px-3 py-2 text-sm rounded-lg border border-[rgba(184,164,142,0.25)] bg-white text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-sand-300"
      />
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
        {filtered.map((name) => (
          <div key={name} className="flex flex-col items-center p-3 rounded-lg bg-white border border-[rgba(184,164,142,0.1)]">
            <Icon name={name} size={size} color={color} />
            <span className="mt-1.5 text-[10px] text-text-tertiary text-center leading-tight truncate w-full">
              {name}
            </span>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-sm text-text-tertiary text-center py-4">No icons match &ldquo;{iconSearch}&rdquo;</p>
      )}
    </div>
  )
}

function LiveComponent({
  component,
  variants,
}: {
  component: ComponentDoc
  variants: Record<string, string>
}) {
  switch (component.slug) {
    case 'button':
      return (
        <Button
          variant={variants.variant as 'primary' | 'secondary' | 'ghost' | 'accent' | 'danger'}
          size={variants.size as 'sm' | 'md' | 'lg' | 'icon'}
        >
          {variants.size === 'icon' ? <Icon name="plus" size="md" color="inherit" /> : 'Button'}
        </Button>
      )

    case 'card':
      return (
        <Card
          variant={variants.variant as 'default' | 'elevated' | 'outlined' | 'stat'}
          padding={variants.padding as 'none' | 'sm' | 'md' | 'lg'}
          className="w-64"
        >
          <CardContent>
            <p className="text-sm text-text-secondary">Card content preview</p>
          </CardContent>
        </Card>
      )

    case 'badge':
      return (
        <Badge
          variant={variants.variant as 'default' | 'pending' | 'approved' | 'paid' | 'error' | 'accent'}
        >
          Badge Label
        </Badge>
      )

    case 'input':
      return (
        <div className="w-64">
          <Input label="Label" placeholder="Placeholder text" hint="Helper text" />
        </div>
      )

    case 'tag-input':
      return <TagInputPreview />

    case 'icon':
      return (
        <IconGalleryPreview
          size={variants.size as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}
          color={variants.color as 'default' | 'primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'error'}
        />
      )

    case 'select':
      return (
        <div className="w-64">
          <Select
            label="Country"
            placeholder="Select a country"
            options={[
              { value: 'us', label: 'United States' },
              { value: 'ca', label: 'Canada' },
              { value: 'uk', label: 'United Kingdom' },
            ]}
          />
        </div>
      )

    case 'stat-card':
      return (
        <StatCard
          label="Active Clients"
          value={247}
          trend={{ value: 12, direction: 'up' }}
          format="number"
        />
      )

    case 'copy-block':
      return <CopyBlock value="npm install @freehold/ui" />

    case 'pill':
      return (
        <Pill variant={variants.variant as 'default' | 'success' | 'warning' | 'error' | 'accent'}>
          Status Label
        </Pill>
      )

    case 'textarea':
      return (
        <div className="w-64">
          <Textarea label="Message" placeholder="Write your message..." hint="Max 500 characters" />
        </div>
      )

    case 'checkbox':
      return <Checkbox label="Accept terms and conditions" />

    case 'toggle':
      return <TogglePreview size={variants.size || 'md'} />

    case 'dialog':
      return <DialogPreview size={variants.size || 'md'} />

    case 'code-canvas':
      return (
        <div className="w-full max-w-md">
          <CodeCanvas
            code={`import { Button } from '@freehold/ui'\n\nexport function Example() {\n  return <Button>Click me</Button>\n}`}
            language="tsx"
            title="example.tsx"
          />
        </div>
      )

    case 'confirm-dialog':
      return <ConfirmDialogPreview variant={variants.variant || 'default'} />

    case 'pie-chart':
      return (
        <div className="w-full max-w-sm">
          <PieChart
            data={[
              { name: 'Pending', value: 5, color: '#D4B86A' },
              { name: 'Approved', value: 12, color: '#8DB580' },
              { name: 'Paid', value: 8, color: '#60A5FA' },
            ]}
            variant={variants.variant as 'pie' | 'donut'}
            height={200}
            showLegend
          />
        </div>
      )

    case 'bar-chart':
      return (
        <div className="w-full">
          <BarChart
            data={[
              { department: 'Engineering', value: 50000 },
              { department: 'Design', value: 35000 },
              { department: 'Marketing', value: 30000 },
            ]}
            xAxisKey="department"
            series={[{ name: 'Budget', dataKey: 'value', color: '#B8A48E' }]}
            yAxisFormat="currency"
            height={200}
          />
        </div>
      )

    case 'line-chart':
      return (
        <div className="w-full">
          <LineChart
            data={[
              { month: 'Jan', revenue: 10000 },
              { month: 'Feb', revenue: 12000 },
              { month: 'Mar', revenue: 15000 },
              { month: 'Apr', revenue: 14000 },
              { month: 'May', revenue: 18000 },
            ]}
            xAxisKey="month"
            series={[{ name: 'Revenue', dataKey: 'revenue', color: '#8DB580' }]}
            yAxisFormat="currency"
            showArea
            height={200}
          />
        </div>
      )

    case 'search-input':
      return <SearchInputPreview />

    case 'data-table':
      return (
        <div className="w-full">
          <DataTable
            columns={[
              { key: 'name', header: 'Name' },
              { key: 'email', header: 'Email' },
              { key: 'status', header: 'Status', render: (item) => <Badge variant="approved">{item.status}</Badge> },
            ]}
            data={[
              { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
              { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active' },
              { id: 3, name: 'Bob Wilson', email: 'bob@example.com', status: 'Active' },
            ]}
            keyExtractor={(item) => item.id}
          />
        </div>
      )

    case 'feature-row':
      return (
        <div className="w-full">
          <FeatureRow
            tag="CRM + Pipeline"
            title="Client management that runs itself."
            description="Enterprise-grade CRM with automated follow-ups, pipeline tracking, and revenue forecasting."
            showTopBorder
          />
        </div>
      )

    case 'rich-text-editor':
      return <RichTextEditorPreview />

    case 'rich-text-display':
      return (
        <div className="w-full max-w-md p-4 border border-[rgba(184,164,142,0.25)] rounded-lg">
          <RichTextDisplay content="<p>This is a <strong>rich text</strong> display component. It renders <em>HTML content</em> with consistent typography.</p><ul><li>Supports lists</li><li>And other formatting</li></ul>" />
        </div>
      )

    case 'filter-select':
      return (
        <FilterSelect
          placeholder="Filter by status"
          options={[
            { value: 'pending', label: 'Pending' },
            { value: 'approved', label: 'Approved' },
            { value: 'paid', label: 'Paid' },
          ]}
        />
      )

    case 'toast':
      return <ToastPreview variant={variants.variant || 'info'} />

    case 'skeleton':
      return (
        <div className="w-full max-w-sm space-y-4">
          <Skeleton
            variant={variants.variant as 'line' | 'circle' | 'rectangle'}
            width={variants.variant === 'circle' ? 48 : '100%'}
            height={variants.variant === 'circle' ? 48 : variants.variant === 'rectangle' ? 80 : 16}
          />
          {variants.variant === 'line' && (
            <>
              <Skeleton variant="line" width="80%" height={16} />
              <Skeleton variant="line" width="60%" height={16} />
            </>
          )}
        </div>
      )

    case 'stat-card-skeleton':
      return (
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <StatCardSkeleton />
          <StatCardSkeleton showTrend />
        </div>
      )

    case 'data-table-skeleton':
      return (
        <div className="w-full max-w-2xl">
          <DataTableSkeleton rows={3} columns={4} />
        </div>
      )

    case 'chart-skeleton':
      return (
        <div className="w-full max-w-sm">
          <ChartSkeleton
            variant={variants.variant as 'pie' | 'bar' | 'line'}
            height={200}
            showLegend
          />
        </div>
      )

    case 'chat-container':
      return <ChatContainerPreview />

    case 'chat-message':
      return <ChatMessagePreview role={variants.role || 'assistant'} />

    case 'chat-input':
      return <ChatInputPreview />

    case 'typing-indicator':
      return <TypingIndicator />

    case 'tool-call-card':
      return (
        <ToolCallCard
          toolCall={{
            id: '1',
            toolName: 'getCompanyInfo',
            args: { topic: 'overview' },
            result: { info: 'Freehold is a modern business management platform.' },
            status: 'completed',
          }}
        />
      )

    case 'empty-state':
      return (
        <div className="w-full max-w-md">
          <EmptyState
            message="How can I help you today?"
            suggestions={['What is Freehold?', 'Show me payroll stats']}
          />
        </div>
      )

    case 'payroll-dashboard':
      return <PayrollDashboardPreview />

    case 'pay-period-selector':
      return <PayPeriodSelectorPreview />

    case 'dashboard':
      return <DashboardPreview />

    case 'kanban':
      return <KanbanPreview />

    case 'card-flip-loader':
      return <CardFlipLoaderPreview />

    case 'navbar':
      return (
        <div className="w-full h-[72px] relative overflow-hidden rounded-lg border border-[rgba(184,164,142,0.15)]">
          <Navbar
            items={[
              { label: 'Platform', href: '#' },
              { label: 'Solutions', href: '#' },
              { label: 'About', href: '#' },
            ]}
            cta={{ label: 'Get Started', href: '#' }}
            className="!relative"
          />
        </div>
      )

    case 'form':
      return <FormPreview layout={variants.layout || 'vertical'} />

    case 'form-field':
      return <FormFieldPreview />

    case 'form-section':
      return <FormSectionPreview />

    case 'form-grid':
      return <FormGridPreview />

    case 'form-actions':
      return <FormActionsPreview />

    case 'sidebar':
      return <SidebarPreview />

    case 'app-header':
      return <AppHeaderPreview />

    case 'login-form':
      return <LoginFormPreview variant={variants.variant || 'simple'} />

    case 'register-form':
      return <RegisterFormPreview variant={variants.variant || 'simple'} />

    // ── @freehold/payments previews ──────────────────────────────
    case 'order-summary':
      return <OrderSummaryPreview variant={variants.variant || 'default'} />

    case 'payment-method-icon':
      return (
        <div className="flex gap-3 items-center">
          <PaymentMethodIcon method="visa" size="lg" />
          <PaymentMethodIcon method="mastercard" size="lg" />
          <PaymentMethodIcon method="amex" size="lg" />
          <PaymentMethodIcon method="apple-pay" size="lg" />
          <PaymentMethodIcon method="google-pay" size="lg" />
          <PaymentMethodIcon method="paypal" size="lg" />
        </div>
      )

    case 'security-badge':
      return (
        <SecurityBadge
          variant={variants.variant as 'default' | 'subtle'}
        />
      )

    case 'checkout-divider':
      return (
        <div className="w-full max-w-xs">
          <CheckoutDivider />
        </div>
      )

    case 'checkout-header':
      return (
        <div className="w-full max-w-sm">
          <CheckoutHeader
            title="Complete your order"
            description="Review your items and enter payment details."
          />
        </div>
      )

    case 'checkout-footer':
      return (
        <div className="w-full max-w-sm">
          <CheckoutFooter termsUrl="#" privacyUrl="#" showPoweredBy />
        </div>
      )

    case 'checkout-card':
      return <CheckoutCardPreview />

    case 'checkout-full-screen':
      return <CheckoutFullScreenPreview />

    case 'checkout-split-screen':
      return <CheckoutSplitScreenPreview />

    case 'pricing-card':
      return <PricingCardPreview variant={variants.variant || 'default'} />

    case 'pricing-grid':
      return <PricingGridPreview />

    default:
      return (
        <p className="text-text-tertiary">
          Preview not available for this component.
        </p>
      )
  }
}

// ── Chat preview helpers ──────────────────────────────────

const MOCK_CHAT_MESSAGES: ChatMessageData[] = [
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

function ChatContainerPreview() {
  const [input, setInput] = useState('')
  return (
    <div className="w-full max-w-lg">
      <ChatContainer
        messages={MOCK_CHAT_MESSAGES}
        input={input}
        onInputChange={setInput}
        onSubmit={() => {}}
        title="Freehold Assistant"
        subtitle="AI-powered help"
        assistant={{ name: 'Freehold AI' }}
        maxHeight="400px"
      />
    </div>
  )
}

function ChatMessagePreview({ role }: { role: string }) {
  const messageMap: Record<string, ChatMessageData> = {
    user: { id: '1', role: 'user', content: 'Hello! Can you help me with payroll?' },
    assistant: { id: '2', role: 'assistant', content: 'Of course! I can help you calculate payroll, manage employees, and more.' },
    system: { id: '3', role: 'system', content: 'Chat session started' },
  }
  return (
    <div className="w-full max-w-md space-y-3">
      <ChatMessage message={messageMap[role] || messageMap.assistant} />
    </div>
  )
}

function ChatInputPreview() {
  const [value, setValue] = useState('')
  return (
    <div className="w-full max-w-md rounded-lg border border-[rgba(184,164,142,0.15)] overflow-hidden">
      <ChatInput value={value} onChange={setValue} onSubmit={() => {}} placeholder="Type a message…" />
    </div>
  )
}

// ── Payroll preview helpers ──────────────────────────────────

const MOCK_EMPLOYEES: Employee[] = [
  { id: '1', name: 'Alice Johnson', department: 'Engineering', position: 'Senior Engineer', grossPay: 8500, deductions: 1200, netPay: 7300, status: 'pending', avatar: 'AJ' },
  { id: '2', name: 'Bob Smith', department: 'Design', position: 'Product Designer', grossPay: 6500, deductions: 900, netPay: 5600, status: 'approved', avatar: 'BS' },
  { id: '3', name: 'Carol Davis', department: 'Engineering', position: 'DevOps Engineer', grossPay: 7800, deductions: 1100, netPay: 6700, status: 'paid', avatar: 'CD' },
  { id: '4', name: 'David Lee', department: 'Marketing', position: 'Marketing Manager', grossPay: 7200, deductions: 1000, netPay: 6200, status: 'pending', avatar: 'DL' },
  { id: '5', name: 'Emma Wilson', department: 'HR', position: 'HR Specialist', grossPay: 5800, deductions: 800, netPay: 5000, status: 'approved', avatar: 'EW' },
]

function PayrollDashboardPreview() {
  return (
    <div className="w-full max-h-[500px] overflow-auto">
      <PayrollDashboard
        employees={MOCK_EMPLOYEES}
        showCharts={false}
      />
    </div>
  )
}

function PayPeriodSelectorPreview() {
  const [period, setPeriod] = useState<PayPeriod>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    payDate: '15',
  })
  return <PayPeriodSelector value={period} onChange={setPeriod} />
}

function DashboardPreview() {
  return (
    <div className="w-full max-h-[400px] overflow-auto">
      <Dashboard<Employee>
        data={MOCK_EMPLOYEES}
        keyExtractor={(e) => e.id}
        header={{ title: 'Dashboard', description: 'Generic dashboard pattern.' }}
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'department', header: 'Department' },
          { key: 'status', header: 'Status' },
        ]}
        stats={[
          { key: 'total', label: 'Total', getValue: (data) => data.length },
          { key: 'pending', label: 'Pending', getValue: (data) => data.filter((e) => e.status === 'pending').length },
        ]}
        showCharts={false}
      />
    </div>
  )
}

// ── Kanban preview helpers ──────────────────────────────────

interface KanbanTask {
  id: string
  title: string
  priority: 'low' | 'medium' | 'high'
}

const INITIAL_KANBAN_TASKS: Record<string, KanbanTask[]> = {
  todo: [
    { id: 'k1', title: 'Set up CI pipeline', priority: 'high' },
    { id: 'k2', title: 'Write API docs', priority: 'medium' },
    { id: 'k3', title: 'Add dark mode', priority: 'low' },
  ],
  'in-progress': [
    { id: 'k4', title: 'Build Kanban component', priority: 'high' },
    { id: 'k5', title: 'Design onboarding flow', priority: 'medium' },
  ],
  done: [
    { id: 'k6', title: 'Initialize repo', priority: 'low' },
    { id: 'k7', title: 'Set up linting', priority: 'medium' },
  ],
}

function KanbanPreview() {
  const [tasks, setTasks] = useState<Record<string, KanbanTask[]>>(INITIAL_KANBAN_TASKS)

  const priorityColor: Record<string, string> = {
    high: 'error',
    medium: 'pending',
    low: 'default',
  }

  return (
    <div className="w-full overflow-auto">
      <Kanban<KanbanTask>
        columns={[
          { id: 'todo', title: 'To Do', items: tasks.todo },
          { id: 'in-progress', title: 'In Progress', items: tasks['in-progress'] },
          { id: 'done', title: 'Done', items: tasks.done },
        ]}
        keyExtractor={(t) => t.id}
        renderCard={(t) => (
          <div>
            <p className="text-sm font-medium text-text-primary mb-1.5">{t.title}</p>
            <Badge variant={priorityColor[t.priority] as 'error' | 'pending' | 'default'}>
              {t.priority}
            </Badge>
          </div>
        )}
        onCardMove={(cardId, fromCol, toCol, newIndex) => {
          setTasks((prev) => {
            const next = { ...prev }
            const fromItems = [...(next[fromCol] || [])]
            const cardIndex = fromItems.findIndex((t) => t.id === cardId)
            if (cardIndex === -1) return prev
            const [card] = fromItems.splice(cardIndex, 1)
            next[fromCol] = fromItems

            const toItems = [...(next[toCol] || [])]
            toItems.splice(newIndex, 0, card)
            next[toCol] = toItems

            return next
          })
        }}
      />
    </div>
  )
}

// ── Form preview helpers ──────────────────────────────────

function FormPreview({ layout }: { layout: string }) {
  const [submitted, setSubmitted] = useState<string | null>(null)
  return (
    <div className="w-full max-w-lg">
      {submitted && (
        <div className="mb-4 rounded-lg bg-[#D1FAE5] px-4 py-2 text-sm text-[#065F46]">
          Submitted: {submitted}
        </div>
      )}
      <Form
        layout={layout as 'vertical' | 'horizontal'}
        onSubmit={(data) => {
          setSubmitted(JSON.stringify(Object.fromEntries(data), null, 2))
          setTimeout(() => setSubmitted(null), 3000)
        }}
      >
        <FormField name="name" label="Full Name" required hint="As it appears on your ID">
          <Input placeholder="Jane Doe" />
        </FormField>
        <FormField
          name="email"
          label="Email"
          required
          rules={{
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address',
            },
          }}
        >
          <Input type="email" placeholder="jane@example.com" />
        </FormField>
        <FormField name="bio" label="Bio" optional maxLength={200}>
          <Textarea placeholder="Tell us about yourself..." />
        </FormField>
        <FormActions>
          <Button variant="secondary" type="button">Cancel</Button>
          <Button type="submit">Submit</Button>
        </FormActions>
      </Form>
    </div>
  )
}

function FormFieldPreview() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <Form>
        <FormField name="email" label="Email" required hint="We'll never share your email.">
          <Input type="email" placeholder="you@example.com" />
        </FormField>
        <FormField name="notes" label="Notes" optional maxLength={150}>
          <Textarea placeholder="Optional notes..." />
        </FormField>
      </Form>
    </div>
  )
}

function FormSectionPreview() {
  return (
    <div className="w-full max-w-md">
      <Form>
        <FormSection title="Personal Information" description="Basic contact details for your profile.">
          <FormField name="name" label="Name" required>
            <Input placeholder="Jane Doe" />
          </FormField>
          <FormField name="phone" label="Phone" optional>
            <Input type="tel" placeholder="(555) 123-4567" />
          </FormField>
        </FormSection>
        <FormSection title="Preferences">
          <FormField name="newsletter" label="">
            <Checkbox label="Subscribe to newsletter" />
          </FormField>
        </FormSection>
      </Form>
    </div>
  )
}

function FormGridPreview() {
  return (
    <div className="w-full max-w-lg">
      <Form>
        <FormGrid columns={2}>
          <FormField name="firstName" label="First Name" required>
            <Input placeholder="Jane" />
          </FormField>
          <FormField name="lastName" label="Last Name" required>
            <Input placeholder="Doe" />
          </FormField>
        </FormGrid>
        <FormGrid columns={3}>
          <FormField name="city" label="City">
            <Input placeholder="Austin" />
          </FormField>
          <FormField name="state" label="State">
            <Input placeholder="TX" />
          </FormField>
          <FormField name="zip" label="ZIP">
            <Input placeholder="78701" />
          </FormField>
        </FormGrid>
      </Form>
    </div>
  )
}

function FormActionsPreview() {
  return (
    <div className="w-full max-w-sm">
      <FormActions>
        <Button variant="secondary">Cancel</Button>
        <Button type="submit">Save Changes</Button>
      </FormActions>
    </div>
  )
}

// ── Starter kit preview helpers ──────────────────────────────────

const MOCK_SIDEBAR_ITEMS: SidebarNavItem[] = [
  {
    title: 'Main',
    items: [
      { icon: 'home', label: 'Dashboard', href: '/' },
      { icon: 'clients', label: 'Clients', href: '/clients', badge: 3 },
      { icon: 'pipeline', label: 'Pipeline', href: '/pipeline' },
    ],
  },
  {
    title: 'Settings',
    items: [
      { icon: 'billing', label: 'Billing', href: '/billing' },
      { icon: 'settings', label: 'Settings', href: '/settings' },
    ],
  },
]

function TagInputPreview() {
  const [tags, setTags] = useState<string[]>(['React', 'TypeScript'])
  return (
    <div className="w-full max-w-sm">
      <TagInput
        label="Skills"
        value={tags}
        onChange={setTags}
        placeholder="Add a skill..."
        hint="Press Enter or comma to add"
      />
    </div>
  )
}

function SidebarPreview() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('/')
  return (
    <div className="space-y-3">
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-[#2C2824] text-white"
      >
        Open Mobile Sidebar
      </button>
      <div className="h-[420px] rounded-lg overflow-hidden border border-[rgba(184,164,142,0.15)]">
        <Sidebar
          logo={<span className="text-white font-heading text-lg">Acme</span>}
          items={MOCK_SIDEBAR_ITEMS}
          user={{ name: 'Jane Doe', email: 'jane@example.com' }}
          collapsed={collapsed}
          onCollapse={setCollapsed}
          activeItem={active}
          onNavigate={(href) => { setActive(href) }}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
      </div>
    </div>
  )
}

function AppHeaderPreview() {
  return (
    <div className="w-full rounded-lg overflow-hidden border border-[rgba(184,164,142,0.15)]">
      <AppHeader
        title="Dashboard"
        breadcrumbs={[
          { label: 'Home', href: '#' },
          { label: 'Projects', href: '#' },
          { label: 'Dashboard' },
        ]}
        actions={<Button size="sm">New Project</Button>}
        user={{ name: 'Jane Doe' }}
        onMenuClick={() => {}}
      />
    </div>
  )
}

function LoginFormPreview({ variant }: { variant: string }) {
  return (
    <div className="w-full max-w-2xl max-h-[500px] overflow-auto rounded-lg border border-[rgba(184,164,142,0.15)]">
      <LoginForm
        variant={variant as 'simple' | 'split' | 'card'}
        title="Welcome back"
        description="Sign in to your account"
        onSubmit={(data) => console.log('Login:', data)}
        socialProviders={['google', 'github']}
        onSocialLogin={(p) => console.log('Social:', p)}
        forgotPasswordHref="#"
        registerHref="#"
      />
    </div>
  )
}

function RegisterFormPreview({ variant }: { variant: string }) {
  return (
    <div className="w-full max-w-2xl max-h-[500px] overflow-auto rounded-lg border border-[rgba(184,164,142,0.15)]">
      <RegisterForm
        variant={variant as 'simple' | 'split' | 'card'}
        title="Create your account"
        description="Get started for free"
        onSubmit={(data) => console.log('Register:', data)}
        socialProviders={['google']}
        onSocialLogin={(p) => console.log('Social:', p)}
        loginHref="#"
        termsHref="#"
        privacyHref="#"
      />
    </div>
  )
}

// ── Payments preview helpers ──────────────────────────────────

const MOCK_ORDER_ITEMS = [
  { id: '1', name: 'Pro Plan', description: 'Monthly subscription', quantity: 1, unitPrice: 29, currency: 'USD' },
  { id: '2', name: 'Extra Seats', description: '3 additional seats', quantity: 3, unitPrice: 9, currency: 'USD' },
]

function OrderSummaryPreview({ variant }: { variant: string }) {
  return (
    <div className="w-full max-w-sm">
      <OrderSummary
        items={MOCK_ORDER_ITEMS}
        subtotal={56}
        tax={4.48}
        total={60.48}
        currency="USD"
        variant={variant as 'default' | 'compact'}
      />
    </div>
  )
}

function CheckoutCardPreview() {
  return (
    <div className="w-full">
      <CheckoutCard
        header={{ title: 'Complete your order', description: 'Review your items below.' }}
        footer={{ termsUrl: '#', privacyUrl: '#', showPoweredBy: true }}
      >
        <OrderSummary
          items={MOCK_ORDER_ITEMS}
          subtotal={56}
          tax={4.48}
          total={60.48}
          currency="USD"
          variant="compact"
        />
        <SecurityBadge />
      </CheckoutCard>
    </div>
  )
}

function CheckoutFullScreenPreview() {
  return (
    <div className="w-full max-w-lg rounded-lg border border-[rgba(184,164,142,0.15)] overflow-hidden" style={{ height: 320 }}>
      <div className="scale-[0.6] origin-top-left" style={{ width: '166.67%', height: '166.67%' }}>
        <CheckoutFullScreen
          header={{ title: 'Checkout' }}
          footer={{ showPoweredBy: true }}
        >
          <OrderSummary
            items={[MOCK_ORDER_ITEMS[0]]}
            subtotal={29}
            total={29}
            currency="USD"
            variant="compact"
          />
          <SecurityBadge />
        </CheckoutFullScreen>
      </div>
    </div>
  )
}

function CheckoutSplitScreenPreview() {
  return (
    <div className="w-full max-w-2xl rounded-lg border border-[rgba(184,164,142,0.15)] overflow-hidden" style={{ height: 320 }}>
      <div className="scale-[0.5] origin-top-left" style={{ width: '200%', height: '200%' }}>
        <CheckoutSplitScreen
          left={
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Upgrade to Pro</h2>
              <p className="text-white/70 text-sm">Unlock all premium features and priority support.</p>
            </div>
          }
          header={{ title: 'Checkout' }}
          footer={{ termsUrl: '#', showPoweredBy: true }}
        >
          <OrderSummary
            items={[MOCK_ORDER_ITEMS[0]]}
            subtotal={29}
            total={29}
            currency="USD"
            variant="compact"
          />
          <SecurityBadge />
        </CheckoutSplitScreen>
      </div>
    </div>
  )
}

function PricingCardPreview({ variant }: { variant: string }) {
  return (
    <div className="w-full max-w-sm">
      <PricingCard
        name="Pro"
        description="For growing teams"
        price={29}
        currency="USD"
        billingPeriod="monthly"
        variant={variant as 'default' | 'featured'}
        badge={variant === 'featured' ? 'Most Popular' : undefined}
        features={[
          { text: 'Unlimited projects' },
          { text: '10 team members' },
          { text: 'Priority support' },
          { text: 'Custom domain', included: false },
        ]}
        ctaLabel="Get Started"
      />
    </div>
  )
}

function PricingGridPreview() {
  return (
    <div className="w-full" style={{ transform: 'scale(0.55)', transformOrigin: 'top center' }}>
      <PricingGrid columns={3}>
        <PricingCard
          name="Starter"
          price={0}
          currency="USD"
          billingPeriod="monthly"
          features={[
            { text: '1 project' },
            { text: '1 user' },
            { text: 'Community support' },
          ]}
          ctaLabel="Start Free"
        />
        <PricingCard
          name="Pro"
          price={29}
          currency="USD"
          billingPeriod="monthly"
          badge="Popular"
          featured
          features={[
            { text: 'Unlimited projects' },
            { text: '10 users' },
            { text: 'Priority support' },
          ]}
          ctaLabel="Get Started"
        />
        <PricingCard
          name="Enterprise"
          price={99}
          currency="USD"
          billingPeriod="monthly"
          features={[
            { text: 'Everything in Pro' },
            { text: 'Unlimited users' },
            { text: 'Dedicated support' },
          ]}
          ctaLabel="Contact Sales"
        />
      </PricingGrid>
    </div>
  )
}

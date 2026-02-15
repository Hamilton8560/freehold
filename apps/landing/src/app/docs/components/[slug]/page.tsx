'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Button,
  Card,
  CardContent,
  Badge,
  Input,
  Icon,
  CodeCanvas,
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
  PieChart,
  BarChart,
  LineChart,
  SearchInput,
  DataTable,
  FeatureRow,
  RichTextEditor,
  RichTextDisplay,
  FilterSelect,
  Skeleton,
  SkeletonText,
  StatCardSkeleton,
  DataTableSkeleton,
  ChartSkeleton,
  Toast,
  ToastViewport,
  ToastProvider,
  useToast,
  ChatContainer,
  ChatMessage,
  ChatInput,
  TypingIndicator,
  ToolCallCard,
  EmptyState,
  PayrollDashboard,
  PayPeriodSelector,
  PayrollStatsGrid,
  PayrollCharts,
  EmployeeTable,
  PayrollActions,
  EmployeeDetailModal,
  type ChatMessageData,
  type Employee,
  type PayPeriod,
  type PayrollStats,
} from '@freehold/ui'
import { getComponentBySlug, type ComponentDoc, type VariantDoc } from '../../../../lib/component-docs'

export default function ComponentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const component = getComponentBySlug(slug)

  if (!component) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-primary/95 backdrop-blur-sm border-b border-[rgba(184,164,142,0.15)]">
        <div className="max-w-[1080px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/docs"
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <Icon name="chevron-left" size="sm" color="inherit" />
              <span className="text-sm">Components</span>
            </Link>
            <span className="text-text-tertiary">/</span>
            <span className="text-sm font-medium text-text-primary">{component.name}</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1080px] mx-auto px-6 py-8">
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
          <Card variant="default" padding="none" className="overflow-hidden">
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
      </main>

      {/* Footer */}
      <footer className="border-t border-[rgba(184,164,142,0.15)] mt-16">
        <div className="max-w-[1080px] mx-auto px-6 py-8">
          <p className="text-sm text-text-tertiary text-center">
            @freehold/ui &middot; Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
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
      <div className="flex items-center justify-center min-h-[120px] p-6 bg-background-secondary rounded-lg">
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
      <div className="flex gap-1 p-1 bg-background-secondary rounded-lg">
        {variant.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`px-3 py-1.5 rounded-md text-sm transition-all ${
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

function LiveComponent({
  component,
  variants,
}: {
  component: ComponentDoc
  variants: Record<string, string>
}) {
  // Render live components based on slug
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
          variant={
            variants.variant as 'default' | 'pending' | 'approved' | 'paid' | 'error' | 'accent'
          }
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

    case 'icon':
      return (
        <div className="flex items-center gap-6">
          <Icon
            name="dashboard"
            size={variants.size as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}
            color={
              variants.color as
                | 'default'
                | 'primary'
                | 'secondary'
                | 'muted'
                | 'success'
                | 'warning'
                | 'error'
            }
          />
          <Icon
            name="check"
            size={variants.size as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}
            color={
              variants.color as
                | 'default'
                | 'primary'
                | 'secondary'
                | 'muted'
                | 'success'
                | 'warning'
                | 'error'
            }
          />
          <Icon
            name="settings"
            size={variants.size as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}
            color={
              variants.color as
                | 'default'
                | 'primary'
                | 'secondary'
                | 'muted'
                | 'success'
                | 'warning'
                | 'error'
            }
          />
        </div>
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
        <div className="w-full min-w-0 flex-1 max-w-sm">
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
        <div className="w-full min-w-0 flex-1">
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
        <div className="w-full min-w-0 flex-1">
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

    case 'payroll-stats-grid':
      return <PayrollStatsGridPreview />

    case 'payroll-charts':
      return <PayrollChartsPreview />

    case 'employee-table':
      return <EmployeeTablePreview />

    case 'payroll-actions':
      return <PayrollActionsPreview />

    case 'employee-detail-modal':
      return <EmployeeDetailModalPreview />

    case 'card-flip-loader':
      return <CardFlipLoaderPreview />

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

const MOCK_PAYROLL_STATS: PayrollStats = {
  totalEmployees: 5,
  pendingCount: 2,
  approvedCount: 2,
  paidCount: 1,
  totalGrossPay: 35800,
  totalDeductions: 5000,
  totalNetPay: 30800,
}

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

function PayrollStatsGridPreview() {
  return (
    <div className="w-full">
      <PayrollStatsGrid stats={MOCK_PAYROLL_STATS} />
    </div>
  )
}

function PayrollChartsPreview() {
  return (
    <div className="w-full">
      <PayrollCharts stats={MOCK_PAYROLL_STATS} employees={MOCK_EMPLOYEES} />
    </div>
  )
}

function EmployeeTablePreview() {
  return (
    <div className="w-full">
      <EmployeeTable employees={MOCK_EMPLOYEES} />
    </div>
  )
}

function PayrollActionsPreview() {
  return <PayrollActions pendingCount={2} />
}

function EmployeeDetailModalPreview() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Employee Modal</Button>
      <EmployeeDetailModal
        employee={MOCK_EMPLOYEES[0]}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}

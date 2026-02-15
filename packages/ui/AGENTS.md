# Freehold UI Library

Component library for Freehold applications. Built with React, TypeScript, Tailwind CSS, and class-variance-authority (CVA).

## AI Instructions (Copy-Paste)

Use this condensed block in Cursor rules, Claude projects, or other AI tools:

```
<freehold-ui-instructions>
You are working with the @freehold/ui component library. Follow these rules:

IMPORTS: Import from '@freehold/ui'. Components: Button, Card, CardContent, Badge, Pill, Icon, Input, Select, Textarea, Checkbox, Toggle, StatCard, CopyBlock, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter, DialogClose, Toast, ToastProvider, ToastViewport, useToast, Skeleton, SkeletonText, DataTable, SearchInput, FilterSelect, FeatureRow, ConfirmDialog, PieChart, BarChart, LineChart, StatCardSkeleton, DataTableSkeleton, ChartSkeleton, RichTextEditor, RichTextDisplay, PayrollDashboard, ChatContainer, ChatMessage, ChatHeader, ChatInput, MessageList, EmptyState, ToolCallCard, StreamingText, TypingIndicator.

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
</freehold-ui-instructions>
```

---

## Quick Start

```tsx
import { Button, Card, Badge, Icon } from '@freehold/ui'
import '@freehold/ui/styles.css'
```

## Architecture

```
primitives/     Low-level, single-purpose components (Button, Card, Input)
composites/     Multi-component patterns (DataTable, SearchInput)
patterns/       Full feature implementations (PayrollDashboard)
```

## Design Tokens

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `#FAF9F6` | bg-primary | Page background |
| `#F5F2ED` | bg-warm | Section backgrounds |
| `#F9F7F3` | bg-card | Card backgrounds |
| `#2C2824` | text-primary | Primary text, primary button bg |
| `#5C574F` | text-secondary | Secondary text |
| `#8A847A` | text-muted | Muted text |
| `#B8A48E` | accent | Sand accent color |
| `#A08A6E` | accent-hover | Sand accent hover |
| `#D4C8B8` | accent-light | Light sand |
| `#E8E2DA` | border | Standard borders |

### Status Colors

| Status | Background | Text | Border |
|--------|------------|------|--------|
| Pending | `#FEF3C7` | `#92400E` | `#FCD34D` |
| Approved | `#D1FAE5` | `#065F46` | `#6EE7B7` |
| Paid | `#DBEAFE` | `#1E40AF` | `#93C5FD` |
| Error | `#FEE2E2` | `#991B1B` | `#FCA5A5` |

### Typography

| Family | Usage | CSS Variable |
|--------|-------|--------------|
| DM Serif Display | Headings | `font-heading` |
| DM Sans | Body text | `font-sans` |
| JetBrains Mono | Code | `font-mono` |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| sm | 8px | Buttons, sidebar items |
| md | 10px | Inputs, inner cards |
| lg | 14px | Outer cards |
| xl | 16px | Dashboard wrappers |
| full | 9999px | Pills, badges |

### Shadows (warm sand tones)

```css
shadow-warm-sm: 0 1px 2px rgba(184,164,142,0.08)
shadow-warm:    0 1px 3px rgba(26,26,26,0.04), 0 4px 12px rgba(26,26,26,0.03)
shadow-warm-md: 0 2px 8px rgba(26,26,26,0.06), 0 8px 24px rgba(26,26,26,0.05)
shadow-warm-lg: 0 4px 16px rgba(26,26,26,0.08), 0 16px 48px rgba(26,26,26,0.06)
```

### Spacing

8px grid system: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 112, 144

## Component Inventory

### Primitives

| Component | Import | Variants |
|-----------|--------|----------|
| Button | `Button` | primary, secondary, ghost, accent, danger + sm/md/lg/icon |
| Card | `Card, CardContent` | default, outlined, elevated + sm/md/lg padding |
| Badge | `Badge` | default, pending, approved, paid, error, accent |
| Pill | `Pill` | default, success, warning, error, accent |
| Icon | `Icon` | 23+ icons, xs/sm/md/lg/xl sizes, 7 colors |
| Input | `Input` | Standard input with warm styling |
| Select | `Select` | Dropdown select |
| StatCard | `StatCard` | Metric display card |
| Textarea | `Textarea` | Multi-line text input with label/error/hint |
| Checkbox | `Checkbox` | Labeled checkbox with error/hint |
| Toggle | `Toggle` | Switch toggle, sm/md sizes |
| CopyBlock | `CopyBlock` | Code/value copy button |
| Dialog | `Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter, DialogClose` | Compound modal with sm/md/lg/xl/full sizes |
| Toast | `Toast, ToastProvider, ToastViewport, useToast` | Toast notifications with success/error/warning/info variants |
| Skeleton | `Skeleton, SkeletonText` | Loading placeholder with line/circle/rectangle variants |

### Composites

| Component | Import | Description |
|-----------|--------|-------------|
| DataTable | `DataTable` | Sortable, filterable data grid |
| SearchInput | `SearchInput` | Search field with icon |
| FilterSelect | `FilterSelect` | Dropdown filter control |
| FeatureRow | `FeatureRow` | Feature showcase row |
| RichTextEditor | `RichTextEditor` | Rich text editor powered by Tiptap (optional peer dep) |
| RichTextDisplay | `RichTextDisplay` | Read-only HTML display with editor typography (no Tiptap dep) |
| ConfirmDialog | `ConfirmDialog` | Pre-composed confirmation dialog with icon, default/danger variants |
| PieChart | `PieChart` | Pie/donut distribution chart (recharts optional peer dep) |
| BarChart | `BarChart` | Comparison bar chart with stacked option (recharts optional peer dep) |
| LineChart | `LineChart` | Trend line/area chart (recharts optional peer dep) |
| StatCardSkeleton | `StatCardSkeleton` | Loading skeleton for StatCard |
| DataTableSkeleton | `DataTableSkeleton` | Loading skeleton for DataTable |
| ChartSkeleton | `ChartSkeleton` | Loading skeleton for charts (pie/bar/line variants) |

### Patterns

| Pattern | Import | Subcomponents |
|---------|--------|---------------|
| PayrollDashboard | `PayrollDashboard` | EmployeeTable, PayPeriodSelector, PayrollActions, PayrollStatsGrid, PayrollCharts, EmployeeDetailModal |
| Chat | `ChatContainer` | ChatMessage, ChatHeader, ChatInput, MessageList, EmptyState, ToolCallCard, StreamingText, TypingIndicator |

## Styling Guide

### CVA Pattern

All components use class-variance-authority for variant styling:

```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const componentVariants = cva(
  // Base classes (always applied)
  ['base-class-1', 'base-class-2'],
  {
    variants: {
      variant: {
        primary: ['bg-[#2C2824]', 'text-[#FAF9F6]'],
        secondary: ['bg-[#F5F3EF]', 'text-[#2C2824]'],
      },
      size: {
        sm: 'h-8 px-3',
        md: 'h-10 px-4',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ComponentProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {}
```

### cn() Utility

Always use `cn()` for class merging (combines clsx + tailwind-merge):

```tsx
import { cn } from '../../utils/cn'

<div className={cn(variants({ variant, size }), className)} />
```

### Color Usage

Use hex values directly in Tailwind for brand colors:

```tsx
// Correct
'bg-[#FAF9F6]'
'text-[#2C2824]'
'border-[rgba(184,164,142,0.25)]'

// Avoid arbitrary Tailwind color names for brand colors
```

### Icon Guidelines

- 20x20 viewBox
- 1.5px stroke weight
- `strokeLinecap="round"` and `strokeLinejoin="round"`
- Default stroke: `#B8A48E` (sand accent)

## Code Examples

### Basic Button

```tsx
<Button variant="primary" size="md">
  Get Started
</Button>

<Button variant="accent" isLoading>
  Processing...
</Button>
```

### Card with Content

```tsx
<Card variant="default" padding="lg">
  <CardContent>
    <h3 className="text-base font-semibold text-text-primary mb-2">
      Card Title
    </h3>
    <p className="text-sm text-text-secondary">
      Card content goes here.
    </p>
  </CardContent>
</Card>
```

### Status Badge

```tsx
<Badge variant="approved">Approved</Badge>
<Badge variant="pending">Pending Review</Badge>
<Badge variant="error" size="sm">Error</Badge>
```

### Icon with Size and Color

```tsx
<Icon name="dashboard" size="md" color="default" />
<Icon name="check" size="lg" color="success" />
```

### Feature Row

```tsx
<FeatureRow
  tag="CRM + Pipeline"
  title="Client management that runs itself."
  description="Enterprise-grade CRM with automated follow-ups..."
  showTopBorder
/>
```

### Dialog

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter, DialogClose } from '@freehold/ui'

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent size="md">
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>Make changes to your profile here.</DialogDescription>
    </DialogHeader>
    <DialogBody>
      <Input label="Name" defaultValue="John Doe" />
    </DialogBody>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="secondary">Cancel</Button>
      </DialogClose>
      <Button variant="primary">Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### ConfirmDialog

```tsx
import { ConfirmDialog } from '@freehold/ui'

<ConfirmDialog
  open={showConfirm}
  onOpenChange={setShowConfirm}
  title="Delete Item"
  description="Are you sure you want to delete this item? This cannot be undone."
  confirmLabel="Delete"
  variant="danger"
  onConfirm={handleDelete}
  isConfirming={isDeleting}
/>
```

### Charts (require recharts peer dependency)

```tsx
import { PieChart, BarChart, LineChart } from '@freehold/ui'

// Pie/Donut Chart
<PieChart
  data={[
    { name: 'Pending', value: 5, color: '#D4B86A' },
    { name: 'Approved', value: 12, color: '#8DB580' },
    { name: 'Paid', value: 8, color: '#60A5FA' },
  ]}
  variant="donut"
  centerLabel="Total"
  centerValue={25}
  height={250}
/>

// Bar Chart
<BarChart
  data={departmentData}
  xAxisKey="department"
  series={[
    { name: 'Gross Pay', dataKey: 'grossPay', color: '#B8A48E' },
    { name: 'Net Pay', dataKey: 'netPay', color: '#8DB580' },
  ]}
  yAxisFormat="currency"
  height={300}
/>

// Line Chart
<LineChart
  data={trendData}
  xAxisKey="month"
  series={[{ name: 'Revenue', dataKey: 'revenue' }]}
  yAxisFormat="currency"
  showArea
  height={300}
/>
```

### Chat

```tsx
import { ChatContainer, type ChatMessageData } from '@freehold/ui'

const [messages, setMessages] = useState<ChatMessageData[]>([])
const [input, setInput] = useState('')

<ChatContainer
  messages={messages}
  input={input}
  onInputChange={setInput}
  onSubmit={handleSubmit}
  isLoading={isLoading}
  title="Freehold Assistant"
  subtitle="AI-powered help"
  assistant={{ name: 'Assistant' }}
  emptyStateMessage="How can I help you today?"
  suggestions={['What can you do?', 'Show me payroll stats']}
  onSuggestionClick={(s) => { setInput(s); handleSubmit() }}
  maxHeight="600px"
/>
```

### Toast Notifications

```tsx
import { ToastProvider, useToast } from '@freehold/ui'

// 1. Wrap your app with ToastProvider
<ToastProvider position="bottom-right">
  <App />
</ToastProvider>

// 2. Use the useToast hook in components
function PaymentButton() {
  const { toast, dismiss, dismissAll } = useToast()

  const handlePayment = async () => {
    try {
      await processPayment()
      toast({
        title: 'Payment Successful',
        description: 'Your payment has been processed.',
        variant: 'success',
      })
    } catch (error) {
      toast({
        title: 'Payment Failed',
        description: 'Please try again.',
        variant: 'error',
        action: { label: 'Retry', onClick: handlePayment },
      })
    }
  }

  return <Button onClick={handlePayment}>Pay Now</Button>
}
```

### Skeleton Loading

```tsx
import { Skeleton, SkeletonText, StatCardSkeleton, DataTableSkeleton, ChartSkeleton } from '@freehold/ui'

// Basic shapes
<Skeleton variant="line" width="60%" height={16} />
<Skeleton variant="circle" width={40} height={40} />
<Skeleton variant="rectangle" width="100%" height={200} />

// Multi-line text
<SkeletonText lines={3} spacing="md" lastLineWidth="60%" />

// Pre-composed skeletons
<StatCardSkeleton showTrend />
<DataTableSkeleton rows={5} columns={6} />
<ChartSkeleton variant="pie" height={250} />
```

## Do's and Don'ts

### Do

- Use CVA for all component variants
- Use `cn()` for all class merging
- Follow 8px spacing grid
- Use warm sand palette for accents
- Export both component and variants from each module
- Use forwardRef for all components
- Include proper TypeScript types

### Don't

- Don't use arbitrary Tailwind colors (use hex values for brand colors)
- Don't use shadows outside the warm-shadow scale
- Don't mix spacing values outside the 8px grid
- Don't add new fonts without design approval
- Don't create components without adding to exports
- Don't skip the design system page showcase

## File Structure

```
packages/ui/
├── src/
│   ├── index.ts              # Main exports
│   ├── utils/
│   │   └── cn.ts             # Class merge utility
│   ├── primitives/
│   │   ├── index.ts
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── index.ts
│   │   └── ...
│   ├── composites/
│   │   ├── index.ts
│   │   └── ...
│   └── patterns/
│       ├── index.ts
│       └── PayrollDashboard/
│           ├── PayrollDashboard.tsx
│           ├── EmployeeTable.tsx
│           ├── PayPeriodSelector.tsx
│           ├── PayrollActions.tsx
│           ├── PayrollStatsGrid.tsx
│           ├── types.ts
│           └── index.ts
└── package.json
```

## Adding New Components

See `/packages/ui/CONTRIBUTING.md` for the component checklist.

## Documentation Maintenance

When adding or modifying components, keep documentation in sync:

### Required Updates

| File | When to Update |
|------|----------------|
| **README.md** | Update component reference tables when adding/removing components |
| **AGENTS.md** | Update component inventory, add new patterns, update code examples |
| **CONTRIBUTING.md** | No changes needed (process documentation) |
| **Design System Page** | Add visual showcase for new components (`apps/landing/app/design-system`) |

### Checklist for New Components

1. Add to component reference table in README.md (Primitives/Composites/Patterns)
2. Add to Component Inventory section in AGENTS.md with variants
3. Add code example in AGENTS.md Code Examples section if non-trivial
4. Update main exports if adding new category
5. Add showcase to design system page for visual reference

### Checklist for Modified Components

1. Update variant lists if variants changed
2. Update prop descriptions if interface changed
3. Verify code examples still work
4. Update design system page if visual changes

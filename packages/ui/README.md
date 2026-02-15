# @freehold/ui

Component library for Freehold applications. Built with React, TypeScript, Tailwind CSS, and class-variance-authority (CVA).

## Installation

```bash
pnpm add @freehold/ui
# or
npm install @freehold/ui
```

### Peer Dependencies

This package requires React 18 or 19:

```bash
pnpm add react react-dom
```

## Setup

### Tailwind Configuration

Extend your `tailwind.config.ts` with the Freehold theme:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // Include the ui package
    './node_modules/@freehold/ui/dist/**/*.{js,mjs}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#FAF9F6',
          secondary: '#F5F3EF',
          tertiary: '#EFECE6',
          elevated: '#FFFFFF',
        },
        sand: {
          50: '#F9F7F4',
          100: '#F2EDE6',
          200: '#E5DDD1',
          300: '#D4C8B8',
          400: '#C4B49E',
          500: '#B8A48E',
          600: '#A08A6E',
          700: '#86715A',
          800: '#6B5A48',
          900: '#544737',
        },
        text: {
          primary: '#2C2824',
          secondary: '#5C574F',
          tertiary: '#8A847A',
          inverse: '#FAF9F6',
        },
      },
      fontFamily: {
        heading: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',  // 8px - buttons, sidebar items
        md: '0.625rem',     // 10px - inputs, inner cards
        lg: '0.875rem',     // 14px - outer cards
      },
      boxShadow: {
        'warm-sm': '0 1px 2px 0 rgba(184, 164, 142, 0.05), 0 1px 3px 0 rgba(44, 40, 36, 0.04)',
        warm: '0 2px 4px 0 rgba(184, 164, 142, 0.08), 0 4px 8px 0 rgba(44, 40, 36, 0.04)',
        'warm-md': '0 4px 6px -1px rgba(184, 164, 142, 0.1), 0 6px 12px -2px rgba(44, 40, 36, 0.05)',
        'warm-lg': '0 8px 16px -4px rgba(184, 164, 142, 0.12), 0 12px 24px -6px rgba(44, 40, 36, 0.06)',
        elevated: '0 4px 8px 0 rgba(184, 164, 142, 0.08), 0 8px 16px -4px rgba(44, 40, 36, 0.06)',
      },
    },
  },
  plugins: [],
}

export default config
```

### Import Styles

Import the component styles in your app's entry point:

```tsx
import '@freehold/ui/styles.css'
```

### Load Fonts

Add the required fonts to your HTML or use a font loader:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

## Component Architecture

The library is organized into three tiers based on complexity:

```
primitives/   → Base components (Button, Card, Input, Badge, etc.)
composites/   → Combined components (DataTable, SearchInput, etc.)
patterns/     → Full features (PayrollDashboard)
```

- **Primitives**: Single-purpose, foundational components. Use these as building blocks.
- **Composites**: Components that combine multiple primitives into reusable patterns.
- **Patterns**: Complete feature implementations ready for direct use in applications.

## CVA Pattern Guide

All components use [class-variance-authority (CVA)](https://cva.style/docs) for type-safe variant styling.

### Using Variants

Every component accepts variant props that map to predefined styles:

```tsx
// Variants are type-safe - TypeScript will autocomplete options
<Button variant="primary" size="md">Get Started</Button>
<Card variant="elevated" padding="lg">Content</Card>
<Badge variant="approved">Approved</Badge>
```

### className Overrides

All components support safe `className` overrides via the `cn()` utility (clsx + tailwind-merge):

```tsx
// Add custom padding without breaking existing styles
<Button className="px-8">Custom Padding</Button>

// Override specific properties
<Card className="bg-white border-2">Custom Card</Card>
```

### Using Exported Variants

Components export their variant definitions for use outside the component (e.g., styling links as buttons):

```tsx
import { buttonVariants } from '@freehold/ui'

// Style a link as a button
<Link className={buttonVariants({ variant: 'primary', size: 'md' })}>
  Styled Link
</Link>

// Use in custom components
<a href="/signup" className={buttonVariants({ variant: 'accent' })}>
  Sign Up
</a>
```

## Component Reference

### Primitives

| Component | Description |
|-----------|-------------|
| `Button` | 5 variants (primary/secondary/ghost/accent/danger), 4 sizes (sm/md/lg/icon), loading state |
| `Card`, `CardContent`, `CardHeader`, `CardFooter` | Container with 4 variants (default/outlined/elevated/ghost), 4 padding options |
| `Badge` | Status badges with variants: default, pending, approved, paid, error, accent |
| `Pill` | Rounded status tags: default, success, warning, error, accent |
| `Icon` | 23+ icons, 5 sizes (xs/sm/md/lg/xl), 7 colors |
| `Input` | Text input with label, error, and hint props |
| `Select` | Dropdown select with consistent styling |
| `StatCard` | Metric display with trend indicator |
| `CopyBlock` | Code/value display with copy button |
| `Dialog`, `DialogContent`, `DialogHeader`, etc. | Accessible modal dialog with compound components, 5 sizes (sm/md/lg/xl/full) |
| `Toast`, `ToastProvider`, `ToastViewport` | Toast notification system with 4 variants (success/error/warning/info), actions |
| `Skeleton`, `SkeletonText` | Loading placeholder with variants (line/circle/rectangle), pulse animation |

### Composites

| Component | Description |
|-----------|-------------|
| `DataTable` | Sortable, filterable data grid with column configuration |
| `SearchInput` | Search field with integrated icon |
| `FilterSelect` | Dropdown filter control |
| `FeatureRow` | Feature showcase row with tag, title, description |
| `ConfirmDialog` | Pre-composed confirmation dialog with icon, variant, loading state |
| `PieChart` | Pie/donut chart for distribution visualization (requires recharts) |
| `BarChart` | Bar chart for comparison visualization (requires recharts) |
| `LineChart` | Line/area chart for trend visualization (requires recharts) |
| `StatCardSkeleton` | Loading skeleton for StatCard components |
| `DataTableSkeleton` | Loading skeleton for DataTable components |
| `ChartSkeleton` | Loading skeleton for chart components (pie/bar/line) |

### Patterns

| Component | Description |
|-----------|-------------|
| `PayrollDashboard` | Full payroll UI including EmployeeTable, PayPeriodSelector, PayrollActions, PayrollStatsGrid, PayrollCharts, EmployeeDetailModal |

**See [AGENTS.md](./AGENTS.md) for complete props, variants, and code examples.**

## TypeScript Integration

All components are fully typed and export their prop interfaces:

```tsx
import type { ButtonProps, CardProps, BadgeProps } from '@freehold/ui'
```

### VariantProps Inference

Use CVA's `VariantProps` to infer variant types from any component:

```tsx
import { buttonVariants } from '@freehold/ui'
import type { VariantProps } from 'class-variance-authority'

type ButtonVariants = VariantProps<typeof buttonVariants>
// { variant?: 'primary' | 'secondary' | 'ghost' | 'accent' | 'danger'; size?: 'sm' | 'md' | 'lg' | 'icon' }
```

### Extending Component Types

Create custom components that extend library types:

```tsx
import type { ButtonProps } from '@freehold/ui'

interface SubmitButtonProps extends Omit<ButtonProps, 'type'> {
  submitting?: boolean
}

function SubmitButton({ submitting, children, ...props }: SubmitButtonProps) {
  return (
    <Button type="submit" isLoading={submitting} {...props}>
      {children}
    </Button>
  )
}
```

## Design Tokens Quick Reference

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `background-primary` | `#FAF9F6` | Page background |
| `background-secondary` | `#F5F3EF` | Section backgrounds |
| `background-elevated` | `#FFFFFF` | Elevated surfaces |
| `text-primary` | `#2C2824` | Primary text, button backgrounds |
| `text-secondary` | `#5C574F` | Secondary text |
| `text-tertiary` | `#8A847A` | Muted text |
| `sand-500` | `#B8A48E` | Accent color |
| `sand-600` | `#A08A6E` | Accent hover |

### Status Colors

| Status | Background | Text |
|--------|------------|------|
| Pending | `#FEF3C7` | `#92400E` |
| Approved | `#D1FAE5` | `#065F46` |
| Paid | `#DBEAFE` | `#1E40AF` |
| Error | `#FEE2E2` | `#991B1B` |

### Typography

| Family | CSS Class | Usage |
|--------|-----------|-------|
| DM Serif Display | `font-heading` | Headings, display text |
| DM Sans | `font-body` | Body text, UI elements |
| JetBrains Mono | `font-mono` | Code, monospace content |

### Spacing

8px grid system: `4, 8, 12, 16, 24, 32, 40, 48, 64, 80px`

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `sm` | 8px | Buttons, sidebar items |
| `md` | 10px | Inputs, inner cards |
| `lg` | 14px | Outer cards |
| `xl` | 16px | Dashboard wrappers |
| `full` | 9999px | Pills, badges |

### Shadows

| Token | Usage |
|-------|-------|
| `shadow-warm-sm` | Subtle elevation |
| `shadow-warm` | Default card shadow |
| `shadow-warm-md` | Medium elevation |
| `shadow-warm-lg` | High elevation |

## Links & Resources

- **[AGENTS.md](./AGENTS.md)** - AI instructions and full design system reference
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Component development guide
- **Local Design System**: Run `pnpm dev` in `apps/landing`, then visit `/design-system`
- **Local Showcase**: Visit `/showcase` for live component patterns

# Contributing to Freehold UI

## New Component Checklist

When adding a new component, complete all items:

### 1. Code Structure

- [ ] Create component folder: `src/{primitives|composites|patterns}/ComponentName/`
- [ ] Create main component file: `ComponentName.tsx`
- [ ] Create barrel export: `index.ts`
- [ ] Use CVA for variants (see AGENTS.md for pattern)
- [ ] Use `cn()` for class merging
- [ ] Use `forwardRef` for DOM element components
- [ ] Export component and variants from module

### 2. Exports

- [ ] Add export to category index: `src/{primitives|composites|patterns}/index.ts`
- [ ] Verify export works: `import { ComponentName } from '@freehold/ui'`

### 3. Design System Page

- [ ] Add to design system page: `/apps/landing/src/app/design-system/page.tsx`
- [ ] Show all variants with visual examples
- [ ] Include relevant specs (padding, radius, etc.) using `<CopyBlock>`
- [ ] Match existing section styling

### 4. Documentation

- [ ] Add to AGENTS.md component inventory table
- [ ] Add code example if component has non-obvious usage
- [ ] Update pattern showcase if it's a pattern/composite

### 5. Styling Requirements

- [ ] Use warm sand palette (`#B8A48E` accent, `#FAF9F6` background)
- [ ] Follow 8px spacing grid
- [ ] Use correct border radius (sm: 8px, md: 10px, lg: 14px, xl: 16px)
- [ ] Use warm shadows from shadow scale
- [ ] Use hex values for brand colors, not Tailwind names

## Component Categories

### Primitives (`src/primitives/`)

Single-purpose, low-level components. Examples:
- Button, Card, Badge, Pill, Icon, Input, Select, StatCard, CopyBlock

### Composites (`src/composites/`)

Multi-component patterns combining primitives. Examples:
- DataTable, SearchInput, FilterSelect, FeatureRow

### Patterns (`src/patterns/`)

Full feature implementations with subcomponents. Examples:
- PayrollDashboard (with EmployeeTable, PayPeriodSelector, PayrollActions, PayrollStatsGrid)

## Quick Reference

### Folder Structure

```
src/primitives/NewComponent/
├── NewComponent.tsx    # Main component with CVA variants
└── index.ts           # export * from './NewComponent'
```

### Basic Component Template

```tsx
import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const componentVariants = cva(
  ['base-classes'],
  {
    variants: {
      variant: {
        default: ['styles'],
      },
      size: {
        md: 'h-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface ComponentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

export const Component = forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Component.displayName = 'Component'

export { componentVariants }
```

### Index Export

```ts
export * from './ComponentName'
```

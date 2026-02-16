export interface PropDoc {
  name: string
  type: string
  default?: string
  description: string
}

export interface VariantOption {
  value: string
  label: string
}

export interface VariantDoc {
  name: string
  options: VariantOption[]
}

export interface ExampleDoc {
  title: string
  code: string
}

export interface ComponentDoc {
  slug: string
  name: string
  description: string
  category: 'primitives' | 'composites' | 'patterns'
  importStatement: string
  props: PropDoc[]
  variants?: VariantDoc[]
  examples: ExampleDoc[]
}

export const componentDocs: ComponentDoc[] = [
  {
    slug: 'button',
    name: 'Button',
    description: 'Interactive button component with multiple visual variants, sizes, and loading state support.',
    category: 'primitives',
    importStatement: "import { Button } from '@freehold/ui'",
    props: [
      {
        name: 'variant',
        type: "'primary' | 'secondary' | 'ghost' | 'accent' | 'danger'",
        default: "'primary'",
        description: 'Visual style variant',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'icon'",
        default: "'md'",
        description: 'Button size',
      },
      {
        name: 'isLoading',
        type: 'boolean',
        default: 'false',
        description: 'Shows a loading spinner and disables the button',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables the button',
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        description: 'Button content',
      },
    ],
    variants: [
      {
        name: 'variant',
        options: [
          { value: 'primary', label: 'Primary' },
          { value: 'secondary', label: 'Secondary' },
          { value: 'ghost', label: 'Ghost' },
          { value: 'accent', label: 'Accent' },
          { value: 'danger', label: 'Danger' },
        ],
      },
      {
        name: 'size',
        options: [
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' },
          { value: 'icon', label: 'Icon' },
        ],
      },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<Button variant="primary">Click me</Button>`,
      },
      {
        title: 'With Loading State',
        code: `<Button variant="primary" isLoading>
  Processing...
</Button>`,
      },
      {
        title: 'All Variants',
        code: `<div className="flex gap-4">
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="accent">Accent</Button>
  <Button variant="danger">Danger</Button>
</div>`,
      },
    ],
  },
  {
    slug: 'card',
    name: 'Card',
    description: 'Container component with multiple visual variants and padding options. Includes subcomponents for structured content.',
    category: 'primitives',
    importStatement: "import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@freehold/ui'",
    props: [
      {
        name: 'variant',
        type: "'default' | 'elevated' | 'outlined' | 'stat'",
        default: "'default'",
        description: 'Visual style variant',
      },
      {
        name: 'padding',
        type: "'none' | 'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Internal padding',
      },
    ],
    variants: [
      {
        name: 'variant',
        options: [
          { value: 'default', label: 'Default' },
          { value: 'elevated', label: 'Elevated' },
          { value: 'outlined', label: 'Outlined' },
          { value: 'stat', label: 'Stat' },
        ],
      },
      {
        name: 'padding',
        options: [
          { value: 'none', label: 'None' },
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' },
        ],
      },
    ],
    examples: [
      {
        title: 'Basic Card',
        code: `<Card variant="default" padding="md">
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
</Card>`,
      },
      {
        title: 'Card with Header',
        code: `<Card variant="elevated" padding="lg">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content area.</p>
  </CardContent>
  <CardFooter>
    <Button variant="primary" size="sm">Action</Button>
  </CardFooter>
</Card>`,
      },
    ],
  },
  {
    slug: 'badge',
    name: 'Badge',
    description: 'Status indicator badges with semantic color variants for different states.',
    category: 'primitives',
    importStatement: "import { Badge } from '@freehold/ui'",
    props: [
      {
        name: 'variant',
        type: "'default' | 'pending' | 'approved' | 'paid' | 'error' | 'accent'",
        default: "'default'",
        description: 'Status variant with semantic colors',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Badge size',
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        description: 'Badge content',
      },
    ],
    variants: [
      {
        name: 'variant',
        options: [
          { value: 'default', label: 'Default' },
          { value: 'pending', label: 'Pending' },
          { value: 'approved', label: 'Approved' },
          { value: 'paid', label: 'Paid' },
          { value: 'error', label: 'Error' },
          { value: 'accent', label: 'Accent' },
        ],
      },
    ],
    examples: [
      {
        title: 'Status Badges',
        code: `<div className="flex gap-3">
  <Badge variant="pending">Pending Review</Badge>
  <Badge variant="approved">Approved</Badge>
  <Badge variant="paid">Paid</Badge>
  <Badge variant="error">Error</Badge>
</div>`,
      },
      {
        title: 'Size Variants',
        code: `<div className="flex items-center gap-3">
  <Badge variant="approved" size="sm">Small</Badge>
  <Badge variant="approved" size="md">Medium</Badge>
  <Badge variant="approved" size="lg">Large</Badge>
</div>`,
      },
    ],
  },
  {
    slug: 'input',
    name: 'Input',
    description: 'Text input component with optional label, hint text, and error state support.',
    category: 'primitives',
    importStatement: "import { Input } from '@freehold/ui'",
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Label text displayed above the input',
      },
      {
        name: 'hint',
        type: 'string',
        description: 'Helper text displayed below the input',
      },
      {
        name: 'error',
        type: 'string',
        description: 'Error message (replaces hint when present)',
      },
      {
        name: 'type',
        type: 'string',
        default: "'text'",
        description: 'HTML input type',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder text',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables the input',
      },
    ],
    examples: [
      {
        title: 'Basic Input',
        code: `<Input
  label="Email Address"
  placeholder="you@example.com"
  type="email"
/>`,
      },
      {
        title: 'With Hint',
        code: `<Input
  label="Password"
  type="password"
  placeholder="Enter password"
  hint="Must be at least 8 characters"
/>`,
      },
      {
        title: 'With Error',
        code: `<Input
  label="Email Address"
  type="email"
  defaultValue="invalid-email"
  error="Please enter a valid email address"
/>`,
      },
    ],
  },
  {
    slug: 'tag-input',
    name: 'TagInput',
    description: 'Multi-tag input for adding and removing string tags. Enter/comma to add, Backspace to remove, click X to dismiss.',
    category: 'primitives',
    importStatement: "import { TagInput } from '@freehold/ui'",
    props: [
      { name: 'value', type: 'string[]', description: 'Controlled array of tag strings' },
      { name: 'onChange', type: '(tags: string[]) => void', description: 'Called when tags are added or removed' },
      { name: 'placeholder', type: 'string', default: "'Add a tag...'", description: 'Placeholder when empty' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input' },
      { name: 'maxTags', type: 'number', description: 'Maximum number of tags allowed' },
      { name: 'allowDuplicates', type: 'boolean', default: 'false', description: 'Allow duplicate tags' },
      { name: 'label', type: 'string', description: 'Label text above the input' },
      { name: 'error', type: 'string', description: 'Error message' },
      { name: 'hint', type: 'string', description: 'Helper text below the input' },
    ],
    examples: [
      {
        title: 'Basic TagInput',
        code: `const [tags, setTags] = useState<string[]>([])

<TagInput
  label="Skills"
  value={tags}
  onChange={setTags}
  placeholder="Add a skill..."
  hint="Press Enter or comma to add"
/>`,
      },
      {
        title: 'With Max Tags',
        code: `<TagInput
  label="Categories"
  value={['Design', 'Engineering']}
  onChange={setTags}
  maxTags={5}
  hint="Maximum 5 categories"
/>`,
      },
      {
        title: 'Error State',
        code: `<TagInput
  label="Required Tags"
  value={['only-one']}
  onChange={setTags}
  error="At least 2 tags are required"
/>`,
      },
    ],
  },
  {
    slug: 'icon',
    name: 'Icon',
    description: 'SVG icon component with 23+ icons, multiple sizes, and color variants.',
    category: 'primitives',
    importStatement: "import { Icon } from '@freehold/ui'",
    props: [
      {
        name: 'name',
        type: 'IconName',
        description: 'Icon identifier (dashboard, clients, search, check, etc.)',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Icon size (12px to 32px)',
      },
      {
        name: 'color',
        type: "'default' | 'primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'error' | 'inherit'",
        default: "'default'",
        description: 'Icon color',
      },
    ],
    variants: [
      {
        name: 'size',
        options: [
          { value: 'xs', label: 'XS (12px)' },
          { value: 'sm', label: 'SM (16px)' },
          { value: 'md', label: 'MD (20px)' },
          { value: 'lg', label: 'LG (24px)' },
          { value: 'xl', label: 'XL (32px)' },
        ],
      },
      {
        name: 'color',
        options: [
          { value: 'default', label: 'Default' },
          { value: 'primary', label: 'Primary' },
          { value: 'secondary', label: 'Secondary' },
          { value: 'muted', label: 'Muted' },
          { value: 'success', label: 'Success' },
          { value: 'warning', label: 'Warning' },
          { value: 'error', label: 'Error' },
        ],
      },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<Icon name="dashboard" size="md" color="primary" />`,
      },
      {
        title: 'Multiple Icons',
        code: `<div className="flex gap-4">
  <Icon name="home" size="lg" color="primary" />
  <Icon name="settings" size="lg" color="secondary" />
  <Icon name="check" size="lg" color="success" />
  <Icon name="warning" size="lg" color="warning" />
  <Icon name="close" size="lg" color="error" />
</div>`,
      },
      {
        title: 'Available Icons',
        code: `// Navigation: dashboard, home, clients, pipeline, billing, reports, settings
// Actions: search, plus, minus, close, check, arrow
// Status: warning, shield, growth, deploy, automation, ai
// Chevrons: chevron-up, chevron-down, chevron-left, chevron-right`,
      },
    ],
  },
  {
    slug: 'dialog',
    name: 'Dialog',
    description: 'Accessible modal dialog component with compound components for flexible layouts. Built on Radix UI with focus trap, ESC to close, and ARIA support.',
    category: 'primitives',
    importStatement: "import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter, DialogClose } from '@freehold/ui'",
    props: [
      {
        name: 'open',
        type: 'boolean',
        description: 'Controlled open state',
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        description: 'Callback when open state changes',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
        default: "'md'",
        description: 'Dialog width size (on DialogContent)',
      },
      {
        name: 'showCloseButton',
        type: 'boolean',
        default: 'true',
        description: 'Show close button in top right (on DialogContent)',
      },
    ],
    variants: [
      {
        name: 'size',
        options: [
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' },
          { value: 'xl', label: 'Extra Large' },
          { value: 'full', label: 'Full Width' },
        ],
      },
    ],
    examples: [
      {
        title: 'Basic Dialog',
        code: `<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent size="md">
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>Make changes to your profile.</DialogDescription>
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
</Dialog>`,
      },
    ],
  },
  {
    slug: 'confirm-dialog',
    name: 'ConfirmDialog',
    description: 'Pre-composed confirmation dialog with title, description, icon, and confirm/cancel actions. Supports loading state and danger variant.',
    category: 'composites',
    importStatement: "import { ConfirmDialog } from '@freehold/ui'",
    props: [
      {
        name: 'open',
        type: 'boolean',
        description: 'Controlled open state',
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        description: 'Callback when open state changes',
      },
      {
        name: 'title',
        type: 'string',
        description: 'Dialog title',
      },
      {
        name: 'description',
        type: 'string',
        description: 'Description text below title',
      },
      {
        name: 'onConfirm',
        type: '() => void | Promise<void>',
        description: 'Callback when confirm button is clicked',
      },
      {
        name: 'variant',
        type: "'default' | 'danger'",
        default: "'default'",
        description: 'Visual variant (affects confirm button)',
      },
      {
        name: 'isConfirming',
        type: 'boolean',
        default: 'false',
        description: 'Shows loading spinner on confirm button',
      },
      {
        name: 'icon',
        type: 'ReactNode',
        description: 'Optional icon displayed next to title',
      },
    ],
    variants: [
      {
        name: 'variant',
        options: [
          { value: 'default', label: 'Default' },
          { value: 'danger', label: 'Danger' },
        ],
      },
    ],
    examples: [
      {
        title: 'Confirmation Dialog',
        code: `<ConfirmDialog
  open={showConfirm}
  onOpenChange={setShowConfirm}
  title="Delete Item"
  description="Are you sure? This cannot be undone."
  confirmLabel="Delete"
  variant="danger"
  onConfirm={handleDelete}
  isConfirming={isDeleting}
/>`,
      },
    ],
  },
  {
    slug: 'pie-chart',
    name: 'PieChart',
    description: 'Pie or donut chart for distribution visualization. Requires recharts as optional peer dependency.',
    category: 'composites',
    importStatement: "import { PieChart } from '@freehold/ui/charts'",
    props: [
      {
        name: 'data',
        type: 'DistributionDataPoint[]',
        description: 'Array of { name, value, color? } objects',
      },
      {
        name: 'variant',
        type: "'pie' | 'donut'",
        default: "'pie'",
        description: 'Chart type',
      },
      {
        name: 'height',
        type: 'number',
        default: '300',
        description: 'Chart height in pixels',
      },
      {
        name: 'centerLabel',
        type: 'string',
        description: 'Label in center (donut only)',
      },
      {
        name: 'centerValue',
        type: 'string | number',
        description: 'Value in center (donut only)',
      },
      {
        name: 'showLegend',
        type: 'boolean',
        default: 'true',
        description: 'Show legend below chart',
      },
    ],
    variants: [
      {
        name: 'variant',
        options: [
          { value: 'pie', label: 'Pie' },
          { value: 'donut', label: 'Donut' },
        ],
      },
    ],
    examples: [
      {
        title: 'Status Distribution',
        code: `<PieChart
  data={[
    { name: 'Pending', value: 5, color: '#D4B86A' },
    { name: 'Approved', value: 12, color: '#8DB580' },
    { name: 'Paid', value: 8, color: '#60A5FA' },
  ]}
  variant="donut"
  centerLabel="Total"
  centerValue={25}
  height={250}
/>`,
      },
    ],
  },
  {
    slug: 'bar-chart',
    name: 'BarChart',
    description: 'Bar chart for comparison visualization. Supports multiple series, stacked layout, and currency formatting. Requires recharts.',
    category: 'composites',
    importStatement: "import { BarChart } from '@freehold/ui/charts'",
    props: [
      {
        name: 'data',
        type: 'TimeSeriesDataPoint[]',
        description: 'Array of data points with keys matching xAxisKey and series dataKeys',
      },
      {
        name: 'xAxisKey',
        type: 'string',
        description: 'Key in data for x-axis labels',
      },
      {
        name: 'series',
        type: 'ChartSeries[]',
        description: 'Array of { name, dataKey, color? } for each bar series',
      },
      {
        name: 'yAxisFormat',
        type: "'number' | 'currency' | 'percentage'",
        default: "'number'",
        description: 'Y-axis value formatting',
      },
      {
        name: 'stacked',
        type: 'boolean',
        default: 'false',
        description: 'Stack bars on top of each other',
      },
      {
        name: 'height',
        type: 'number',
        default: '300',
        description: 'Chart height in pixels',
      },
    ],
    examples: [
      {
        title: 'Department Comparison',
        code: `<BarChart
  data={[
    { department: 'Engineering', grossPay: 50000, netPay: 40000 },
    { department: 'Design', grossPay: 35000, netPay: 28000 },
    { department: 'Marketing', grossPay: 30000, netPay: 24000 },
  ]}
  xAxisKey="department"
  series={[
    { name: 'Gross Pay', dataKey: 'grossPay', color: '#B8A48E' },
    { name: 'Net Pay', dataKey: 'netPay', color: '#8DB580' },
  ]}
  yAxisFormat="currency"
  height={300}
/>`,
      },
    ],
  },
  {
    slug: 'line-chart',
    name: 'LineChart',
    description: 'Line or area chart for trend visualization. Supports multiple series, area fill, and various curve types. Requires recharts.',
    category: 'composites',
    importStatement: "import { LineChart } from '@freehold/ui/charts'",
    props: [
      {
        name: 'data',
        type: 'TimeSeriesDataPoint[]',
        description: 'Array of data points with keys matching xAxisKey and series dataKeys',
      },
      {
        name: 'xAxisKey',
        type: 'string',
        description: 'Key in data for x-axis labels',
      },
      {
        name: 'series',
        type: 'ChartSeries[]',
        description: 'Array of { name, dataKey, color? } for each line',
      },
      {
        name: 'yAxisFormat',
        type: "'number' | 'currency' | 'percentage'",
        default: "'number'",
        description: 'Y-axis value formatting',
      },
      {
        name: 'showArea',
        type: 'boolean',
        default: 'false',
        description: 'Fill area under the line',
      },
      {
        name: 'curveType',
        type: "'linear' | 'monotone' | 'step'",
        default: "'monotone'",
        description: 'Line curve interpolation',
      },
      {
        name: 'height',
        type: 'number',
        default: '300',
        description: 'Chart height in pixels',
      },
    ],
    examples: [
      {
        title: 'Revenue Trend',
        code: `<LineChart
  data={[
    { month: 'Jan', revenue: 10000 },
    { month: 'Feb', revenue: 12000 },
    { month: 'Mar', revenue: 15000 },
    { month: 'Apr', revenue: 14000 },
  ]}
  xAxisKey="month"
  series={[{ name: 'Revenue', dataKey: 'revenue', color: '#8DB580' }]}
  yAxisFormat="currency"
  showArea
  height={300}
/>`,
      },
    ],
  },
  {
    slug: 'code-canvas',
    name: 'CodeCanvas',
    description: 'Branded code block component with syntax highlighting, line numbers, and copy functionality. Perfect for displaying code examples.',
    category: 'primitives',
    importStatement: "import { CodeCanvas } from '@freehold/ui'",
    props: [
      {
        name: 'code',
        type: 'string',
        description: 'The code to display',
      },
      {
        name: 'language',
        type: 'string',
        description: "Language for syntax highlighting ('tsx', 'ts', 'jsx', 'js')",
      },
      {
        name: 'title',
        type: 'string',
        description: 'Optional header text (filename, description)',
      },
      {
        name: 'showLineNumbers',
        type: 'boolean',
        default: 'true',
        description: 'Show line numbers',
      },
      {
        name: 'showCopy',
        type: 'boolean',
        default: 'true',
        description: 'Show copy button',
      },
      {
        name: 'maxHeight',
        type: 'string',
        description: "Max height with scroll (e.g., '300px')",
      },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<CodeCanvas
  code={\`const greeting = "Hello, world!"\`}
  language="tsx"
/>`,
      },
      {
        title: 'With Title',
        code: `<CodeCanvas
  code={\`import { Button } from '@freehold/ui'

export function Example() {
  return <Button>Click me</Button>
}\`}
  title="example.tsx"
  language="tsx"
/>`,
      },
      {
        title: 'Terminal Style (No Line Numbers)',
        code: `<CodeCanvas
  code="npm install @freehold/ui"
  title="Terminal"
  showLineNumbers={false}
/>`,
      },
      {
        title: 'With Max Height',
        code: `<CodeCanvas
  code={longCodeExample}
  language="tsx"
  maxHeight="200px"
/>`,
      },
    ],
  },
  {
    slug: 'copy-block',
    name: 'CopyBlock',
    description: 'Inline copyable text block. Click to copy the value to clipboard with visual feedback.',
    category: 'primitives',
    importStatement: "import { CopyBlock } from '@freehold/ui'",
    props: [
      {
        name: 'value',
        type: 'string',
        description: 'The value to copy to clipboard',
      },
      {
        name: 'label',
        type: 'string',
        description: 'Display text (defaults to value if not provided)',
      },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<CopyBlock value="npm install @freehold/ui" />`,
      },
      {
        title: 'With Custom Label',
        code: `<CopyBlock value="border-radius: 14px" label="radius: 14px" />`,
      },
    ],
  },
  {
    slug: 'pill',
    name: 'Pill',
    description: 'Rounded pill component for tags and status indicators. Fully rounded with semantic color variants.',
    category: 'primitives',
    importStatement: "import { Pill } from '@freehold/ui'",
    props: [
      {
        name: 'variant',
        type: "'default' | 'success' | 'warning' | 'error' | 'accent'",
        default: "'default'",
        description: 'Color variant',
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        description: 'Pill content',
      },
    ],
    variants: [
      {
        name: 'variant',
        options: [
          { value: 'default', label: 'Default' },
          { value: 'success', label: 'Success' },
          { value: 'warning', label: 'Warning' },
          { value: 'error', label: 'Error' },
          { value: 'accent', label: 'Accent' },
        ],
      },
    ],
    examples: [
      {
        title: 'All Variants',
        code: `<div className="flex gap-3">
  <Pill variant="default">Active</Pill>
  <Pill variant="success">Success</Pill>
  <Pill variant="warning">Warning</Pill>
  <Pill variant="error">Error</Pill>
  <Pill variant="accent">Accent</Pill>
</div>`,
      },
    ],
  },
  {
    slug: 'textarea',
    name: 'Textarea',
    description: 'Multi-line text input with label, hint, and error states. Auto-grows with content.',
    category: 'primitives',
    importStatement: "import { Textarea } from '@freehold/ui'",
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Label text displayed above the textarea',
      },
      {
        name: 'hint',
        type: 'string',
        description: 'Helper text displayed below the textarea',
      },
      {
        name: 'error',
        type: 'string',
        description: 'Error message (replaces hint when present)',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder text',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables the textarea',
      },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<Textarea
  label="Message"
  placeholder="Write your message..."
/>`,
      },
      {
        title: 'With Hint',
        code: `<Textarea
  label="Description"
  placeholder="Tell us more..."
  hint="Max 500 characters"
/>`,
      },
      {
        title: 'With Error',
        code: `<Textarea
  label="Required Field"
  placeholder="This field is required"
  error="Please enter a value"
/>`,
      },
    ],
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    description: 'Checkbox input with label, hint text, and error state support.',
    category: 'primitives',
    importStatement: "import { Checkbox } from '@freehold/ui'",
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Label text displayed next to checkbox',
      },
      {
        name: 'hint',
        type: 'string',
        description: 'Helper text below the label',
      },
      {
        name: 'error',
        type: 'string',
        description: 'Error message',
      },
      {
        name: 'checked',
        type: 'boolean',
        description: 'Controlled checked state',
      },
      {
        name: 'defaultChecked',
        type: 'boolean',
        description: 'Initial checked state (uncontrolled)',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables the checkbox',
      },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<Checkbox label="Accept terms and conditions" />`,
      },
      {
        title: 'With Hint',
        code: `<Checkbox
  label="Subscribe to newsletter"
  hint="We'll only send important updates"
/>`,
      },
      {
        title: 'With Error',
        code: `<Checkbox
  label="Accept terms"
  error="You must accept the terms"
/>`,
      },
    ],
  },
  {
    slug: 'toggle',
    name: 'Toggle',
    description: 'Toggle switch component with label, hint, and error states. Supports two sizes.',
    category: 'primitives',
    importStatement: "import { Toggle } from '@freehold/ui'",
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Label text displayed next to toggle',
      },
      {
        name: 'hint',
        type: 'string',
        description: 'Helper text below the label',
      },
      {
        name: 'error',
        type: 'string',
        description: 'Error message',
      },
      {
        name: 'size',
        type: "'sm' | 'md'",
        default: "'md'",
        description: 'Toggle size',
      },
      {
        name: 'checked',
        type: 'boolean',
        description: 'Controlled checked state',
      },
      {
        name: 'onChange',
        type: '(checked: boolean) => void',
        description: 'Callback when state changes',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables the toggle',
      },
    ],
    variants: [
      {
        name: 'size',
        options: [
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
        ],
      },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<Toggle
  label="Notifications"
  checked={enabled}
  onChange={setEnabled}
/>`,
      },
      {
        title: 'With Hint',
        code: `<Toggle
  label="Dark mode"
  hint="Enable dark mode for the interface"
  checked={darkMode}
  onChange={setDarkMode}
/>`,
      },
    ],
  },
  {
    slug: 'select',
    name: 'Select',
    description: 'Dropdown select component with label, hint, and error states.',
    category: 'primitives',
    importStatement: "import { Select } from '@freehold/ui'",
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Label text displayed above the select',
      },
      {
        name: 'hint',
        type: 'string',
        description: 'Helper text displayed below the select',
      },
      {
        name: 'error',
        type: 'string',
        description: 'Error message (replaces hint when present)',
      },
      {
        name: 'options',
        type: '{ value: string; label: string }[]',
        description: 'Array of select options',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder text when no option selected',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables the select',
      },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<Select
  label="Country"
  placeholder="Select a country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
/>`,
      },
      {
        title: 'With Error',
        code: `<Select
  label="Department"
  error="Please select a department"
  options={departments}
/>`,
      },
    ],
  },
  {
    slug: 'stat-card',
    name: 'StatCard',
    description: 'Card component for displaying statistics with label, value, and optional change indicator.',
    category: 'primitives',
    importStatement: "import { StatCard } from '@freehold/ui'",
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Stat label (e.g., "Active Clients")',
      },
      {
        name: 'value',
        type: 'string | number',
        description: 'Main stat value',
      },
      {
        name: 'change',
        type: 'string',
        description: 'Change indicator (e.g., "+12%")',
      },
      {
        name: 'changeType',
        type: "'positive' | 'negative' | 'neutral'",
        default: "'neutral'",
        description: 'Color of the change indicator',
      },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<StatCard
  label="Active Clients"
  value="247"
  change="+12%"
  changeType="positive"
/>`,
      },
      {
        title: 'Multiple Stats',
        code: `<div className="grid grid-cols-3 gap-4">
  <StatCard label="Revenue" value="$84,200" change="+8.3%" changeType="positive" />
  <StatCard label="Expenses" value="$32,100" change="+2.1%" changeType="negative" />
  <StatCard label="Retention" value="94.7%" change="0%" changeType="neutral" />
</div>`,
      },
    ],
  },
  {
    slug: 'search-input',
    name: 'SearchInput',
    description: 'Search input with icon and clear button. Extends Input with search-specific styling.',
    category: 'composites',
    importStatement: "import { SearchInput } from '@freehold/ui'",
    props: [
      {
        name: 'value',
        type: 'string',
        description: 'Controlled input value',
      },
      {
        name: 'onChange',
        type: '(e: ChangeEvent<HTMLInputElement>) => void',
        description: 'Change handler',
      },
      {
        name: 'onClear',
        type: '() => void',
        description: 'Callback when clear button is clicked',
      },
      {
        name: 'placeholder',
        type: 'string',
        default: "'Search...'",
        description: 'Placeholder text',
      },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<SearchInput
  placeholder="Search components..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onClear={() => setQuery('')}
/>`,
      },
    ],
  },
  {
    slug: 'data-table',
    name: 'DataTable',
    description: 'Data table with sorting, row selection, and customizable columns. Supports click handlers and loading states.',
    category: 'composites',
    importStatement: "import { DataTable } from '@freehold/ui'",
    props: [
      {
        name: 'columns',
        type: 'Column[]',
        description: 'Array of column definitions with key, header, render, sortable, and width',
      },
      {
        name: 'data',
        type: 'T[]',
        description: 'Array of data rows',
      },
      {
        name: 'onRowClick',
        type: '(row: T) => void',
        description: 'Click handler for rows',
      },
      {
        name: 'selectable',
        type: 'boolean',
        default: 'false',
        description: 'Enable row selection with checkboxes',
      },
      {
        name: 'selectedRows',
        type: 'T[]',
        description: 'Currently selected rows (controlled)',
      },
      {
        name: 'onSelectionChange',
        type: '(rows: T[]) => void',
        description: 'Selection change handler',
      },
    ],
    examples: [
      {
        title: 'Basic Table',
        code: `<DataTable
  columns={[
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' },
    { key: 'status', header: 'Status', render: (row) => <Badge>{row.status}</Badge> },
  ]}
  data={users}
  onRowClick={(user) => navigate(\`/users/\${user.id}\`)}
/>`,
      },
    ],
  },
  {
    slug: 'feature-row',
    name: 'FeatureRow',
    description: 'Feature row component for platform/feature sections. Displays tag, title, and description in a horizontal layout.',
    category: 'composites',
    importStatement: "import { FeatureRow } from '@freehold/ui'",
    props: [
      {
        name: 'tag',
        type: 'string',
        description: 'Category tag (e.g., "CRM + Pipeline")',
      },
      {
        name: 'title',
        type: 'string',
        description: 'Feature title',
      },
      {
        name: 'description',
        type: 'string',
        description: 'Feature description text',
      },
      {
        name: 'showTopBorder',
        type: 'boolean',
        default: 'false',
        description: 'Show border on top (for first item)',
      },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<FeatureRow
  tag="CRM + Pipeline"
  title="Client management that runs itself."
  description="Enterprise-grade CRM with automated follow-ups, pipeline tracking, and revenue forecasting."
  showTopBorder
/>`,
      },
    ],
  },
  {
    slug: 'rich-text-editor',
    name: 'RichTextEditor',
    description: 'Rich text editor with formatting toolbar. Built on Tiptap with support for headings, lists, blockquotes, code blocks, and links.',
    category: 'composites',
    importStatement: "import { RichTextEditor } from '@freehold/ui'",
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Label text displayed above the editor',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder text when editor is empty',
      },
      {
        name: 'hint',
        type: 'string',
        description: 'Helper text displayed below the editor',
      },
      {
        name: 'error',
        type: 'string',
        description: 'Error message (replaces hint when present)',
      },
      {
        name: 'content',
        type: 'string',
        description: 'Controlled HTML content',
      },
      {
        name: 'defaultContent',
        type: 'string',
        default: "''",
        description: 'Initial HTML content (uncontrolled)',
      },
      {
        name: 'onChange',
        type: '(html: string) => void',
        description: 'Called with HTML string on content change',
      },
      {
        name: 'onEditor',
        type: '(editor: Editor) => void',
        description: 'Access the Tiptap editor instance',
      },
      {
        name: 'minHeight',
        type: 'number',
        default: '200',
        description: 'Minimum height in pixels',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disable editing',
      },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<RichTextEditor
  label="Description"
  placeholder="Start typing..."
  onChange={(html) => setContent(html)}
/>`,
      },
      {
        title: 'With Validation',
        code: `<RichTextEditor
  label="Message"
  placeholder="Write your message..."
  hint="Supports bold, italic, headings, lists, and links."
  error={errors.message}
/>`,
      },
      {
        title: 'Controlled Content',
        code: `<RichTextEditor
  label="Notes"
  content={notes}
  onChange={setNotes}
  minHeight={300}
/>`,
      },
    ],
  },
  {
    slug: 'rich-text-display',
    name: 'RichTextDisplay',
    description: 'Renders saved HTML content with consistent typography. Lightweight display component without Tiptap dependency.',
    category: 'composites',
    importStatement: "import { RichTextDisplay } from '@freehold/ui'",
    props: [
      {
        name: 'content',
        type: 'string',
        description: 'HTML string to render. Consumers are responsible for sanitization.',
      },
      {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes',
      },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<RichTextDisplay
  content="<p>Hello <strong>world</strong>!</p>"
/>`,
      },
      {
        title: 'With Saved Content',
        code: `<RichTextDisplay
  content={post.body}
  className="prose-sm"
/>`,
      },
      {
        title: 'In a Card',
        code: `<Card variant="outlined" padding="md">
  <CardContent>
    <RichTextDisplay content={note.content} />
  </CardContent>
</Card>`,
      },
    ],
  },
  {
    slug: 'filter-select',
    name: 'FilterSelect',
    description: 'Compact dropdown select for filtering. Supports optional icon and placeholder.',
    category: 'composites',
    importStatement: "import { FilterSelect } from '@freehold/ui'",
    props: [
      {
        name: 'options',
        type: '{ value: string; label: string }[]',
        description: 'Array of filter options',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder text when no selection',
      },
      {
        name: 'icon',
        type: 'React.ReactNode',
        description: 'Optional icon displayed on the left',
      },
      {
        name: 'value',
        type: 'string',
        description: 'Controlled selected value',
      },
      {
        name: 'onChange',
        type: 'ChangeEventHandler<HTMLSelectElement>',
        description: 'Change handler',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disable the select',
      },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<FilterSelect
  placeholder="Filter by status"
  options={[
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'paid', label: 'Paid' },
  ]}
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
/>`,
      },
      {
        title: 'With Icon',
        code: `<FilterSelect
  icon={<Icon name="clients" size="sm" />}
  placeholder="Select department"
  options={departments}
  onChange={handleDepartmentChange}
/>`,
      },
    ],
  },
  {
    slug: 'toast',
    name: 'Toast',
    description: 'Toast notification system with semantic variants, actions, and auto-dismiss. Built on Radix UI for accessibility.',
    category: 'primitives',
    importStatement: "import { ToastProvider, useToast, Toast, ToastViewport } from '@freehold/ui'",
    props: [
      {
        name: 'title',
        type: 'string',
        description: 'Toast title text',
      },
      {
        name: 'description',
        type: 'string',
        description: 'Optional description text',
      },
      {
        name: 'variant',
        type: "'success' | 'error' | 'warning' | 'info'",
        default: "'info'",
        description: 'Semantic color variant',
      },
      {
        name: 'duration',
        type: 'number',
        default: '5000',
        description: 'Auto-dismiss duration in milliseconds',
      },
      {
        name: 'action',
        type: '{ label: string; onClick: () => void }',
        description: 'Optional action button',
      },
    ],
    variants: [
      {
        name: 'variant',
        options: [
          { value: 'success', label: 'Success' },
          { value: 'error', label: 'Error' },
          { value: 'warning', label: 'Warning' },
          { value: 'info', label: 'Info' },
        ],
      },
    ],
    examples: [
      {
        title: 'Setup Provider',
        code: `// Wrap your app with ToastProvider
<ToastProvider position="bottom-right">
  <App />
</ToastProvider>`,
      },
      {
        title: 'Using useToast Hook',
        code: `function PaymentButton() {
  const { toast } = useToast()

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
}`,
      },
      {
        title: 'All Variants',
        code: `toast({ title: 'Saved', variant: 'success' })
toast({ title: 'Error occurred', variant: 'error' })
toast({ title: 'Warning', variant: 'warning' })
toast({ title: 'Info', variant: 'info' })`,
      },
    ],
  },
  {
    slug: 'skeleton',
    name: 'Skeleton',
    description: 'Loading placeholder component with animated pulse effect. Use to indicate content is loading.',
    category: 'primitives',
    importStatement: "import { Skeleton, SkeletonText } from '@freehold/ui'",
    props: [
      {
        name: 'variant',
        type: "'line' | 'circle' | 'rectangle'",
        default: "'rectangle'",
        description: 'Shape variant',
      },
      {
        name: 'width',
        type: 'string | number',
        description: 'Width (e.g., "100%", 200)',
      },
      {
        name: 'height',
        type: 'string | number',
        description: 'Height (e.g., "100%", 40)',
      },
      {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes',
      },
    ],
    variants: [
      {
        name: 'variant',
        options: [
          { value: 'line', label: 'Line' },
          { value: 'circle', label: 'Circle' },
          { value: 'rectangle', label: 'Rectangle' },
        ],
      },
    ],
    examples: [
      {
        title: 'Basic Shapes',
        code: `<div className="space-y-4">
  <Skeleton variant="line" width="60%" height={16} />
  <Skeleton variant="circle" width={40} height={40} />
  <Skeleton variant="rectangle" width="100%" height={100} />
</div>`,
      },
      {
        title: 'Card Skeleton',
        code: `<Card padding="md">
  <div className="flex items-center gap-4">
    <Skeleton variant="circle" width={48} height={48} />
    <div className="flex-1 space-y-2">
      <Skeleton variant="line" width="70%" height={16} />
      <Skeleton variant="line" width="40%" height={14} />
    </div>
  </div>
</Card>`,
      },
      {
        title: 'SkeletonText for Paragraphs',
        code: `<SkeletonText lines={3} spacing="md" lastLineWidth="60%" />`,
      },
    ],
  },
  {
    slug: 'stat-card-skeleton',
    name: 'StatCardSkeleton',
    description: 'Pre-composed loading skeleton that matches StatCard dimensions and layout.',
    category: 'composites',
    importStatement: "import { StatCardSkeleton } from '@freehold/ui'",
    props: [
      {
        name: 'showTrend',
        type: 'boolean',
        default: 'false',
        description: 'Show skeleton for trend indicator',
      },
      {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes',
      },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<StatCardSkeleton />`,
      },
      {
        title: 'Multiple Cards Loading',
        code: `<div className="grid grid-cols-4 gap-4">
  {Array.from({ length: 4 }).map((_, i) => (
    <StatCardSkeleton key={i} showTrend />
  ))}
</div>`,
      },
    ],
  },
  {
    slug: 'data-table-skeleton',
    name: 'DataTableSkeleton',
    description: 'Pre-composed loading skeleton that matches DataTable structure with rows and columns.',
    category: 'composites',
    importStatement: "import { DataTableSkeleton } from '@freehold/ui'",
    props: [
      {
        name: 'rows',
        type: 'number',
        default: '5',
        description: 'Number of skeleton rows',
      },
      {
        name: 'columns',
        type: 'number',
        default: '6',
        description: 'Number of skeleton columns',
      },
      {
        name: 'showHeader',
        type: 'boolean',
        default: 'true',
        description: 'Show table header row',
      },
      {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes',
      },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<DataTableSkeleton rows={5} columns={6} />`,
      },
      {
        title: 'Custom Dimensions',
        code: `<DataTableSkeleton rows={10} columns={4} showHeader />`,
      },
    ],
  },
  {
    slug: 'chart-skeleton',
    name: 'ChartSkeleton',
    description: 'Pre-composed loading skeleton for chart components with pie, bar, and line variants.',
    category: 'composites',
    importStatement: "import { ChartSkeleton } from '@freehold/ui/charts'",
    props: [
      {
        name: 'variant',
        type: "'pie' | 'bar' | 'line'",
        default: "'bar'",
        description: 'Chart type to match skeleton shape',
      },
      {
        name: 'height',
        type: 'number',
        default: '250',
        description: 'Chart height in pixels',
      },
      {
        name: 'showLegend',
        type: 'boolean',
        default: 'true',
        description: 'Show legend skeleton below chart',
      },
      {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes',
      },
    ],
    variants: [
      {
        name: 'variant',
        options: [
          { value: 'pie', label: 'Pie' },
          { value: 'bar', label: 'Bar' },
          { value: 'line', label: 'Line' },
        ],
      },
    ],
    examples: [
      {
        title: 'Pie Chart Skeleton',
        code: `<ChartSkeleton variant="pie" height={250} />`,
      },
      {
        title: 'Bar Chart Skeleton',
        code: `<ChartSkeleton variant="bar" height={300} showLegend />`,
      },
    ],
  },

  {
    slug: 'card-flip-loader',
    name: 'CardFlipLoader',
    description: 'Full-screen card flip loading overlay with shimmer background, 3D perspective flip animation, and pulse effect. Self-contained — no Tailwind config needed.',
    category: 'composites',
    importStatement: "import { CardFlipLoader } from '@freehold/ui'",
    props: [
      {
        name: 'frontImage',
        type: 'string',
        default: 'Built-in Jack of Spades',
        description: 'URL of the front card image (revealed after flip). Defaults to a built-in Jack of Spades image.',
      },
      {
        name: 'backImage',
        type: 'string',
        default: 'Built-in compass card back',
        description: 'URL of the back card image (shown first). Defaults to a built-in compass card back image.',
      },
      {
        name: 'frontAlt',
        type: 'string',
        default: "'Front'",
        description: 'Alt text for the front image',
      },
      {
        name: 'backAlt',
        type: 'string',
        default: "'Back'",
        description: 'Alt text for the back image',
      },
      {
        name: 'height',
        type: 'string',
        default: "'70vh'",
        description: 'Height of the card (aspect ratio is 2.5:3.5)',
      },
      {
        name: 'maxDuration',
        type: 'number',
        default: '1500',
        description: 'Hard cap in ms — overlay is removed after this time regardless of image loading',
      },
      {
        name: 'onComplete',
        type: '() => void',
        description: 'Called when the overlay unmounts',
      },
    ],
    examples: [
      {
        title: 'Basic Usage (zero-config)',
        code: `<CardFlipLoader />`,
      },
      {
        title: 'With Callback',
        code: `<CardFlipLoader
  onComplete={() => setReady(true)}
/>`,
      },
      {
        title: 'Custom Images and Height',
        code: `<CardFlipLoader
  frontImage="/custom-front.png"
  backImage="/custom-back.png"
  height="50vh"
  maxDuration={1500}
/>`,
      },
    ],
  },

  // ── Patterns: Chat ──────────────────────────────────────
  {
    slug: 'chat-container',
    name: 'ChatContainer',
    description: 'Full chat interface orchestrator with header, message list, error bar, and input. Accepts messages, input state, and callbacks — wire it to useFreeholdChat for a complete AI chat experience.',
    category: 'patterns',
    importStatement: "import { ChatContainer } from '@freehold/ui'",
    props: [
      { name: 'messages', type: 'ChatMessageData[]', description: 'Array of chat messages to display' },
      { name: 'input', type: 'string', description: 'Current input field value' },
      { name: 'onInputChange', type: '(value: string) => void', description: 'Called when input value changes' },
      { name: 'onSubmit', type: '(e?: FormEvent) => void', description: 'Called when user submits a message' },
      { name: 'isLoading', type: 'boolean', default: 'false', description: 'Shows typing indicator when true' },
      { name: 'error', type: 'string', default: 'undefined', description: 'Error message to display' },
      { name: 'onRetry', type: '() => void', default: 'undefined', description: 'Retry callback shown next to error' },
      { name: 'title', type: 'string', default: "'Chat'", description: 'Header title' },
      { name: 'subtitle', type: 'string', default: 'undefined', description: 'Header subtitle' },
      { name: 'assistant', type: 'ChatUser', default: 'undefined', description: 'Assistant name and avatar' },
      { name: 'emptyStateMessage', type: 'string', default: "'How can I help you today?'", description: 'Message shown when no messages exist' },
      { name: 'suggestions', type: 'string[]', default: 'undefined', description: 'Suggestion pills in empty state' },
      { name: 'maxHeight', type: 'string', default: "'600px'", description: 'Maximum container height' },
    ],
    examples: [
      {
        title: 'Basic Chat',
        code: `<ChatContainer
  messages={messages}
  input={input}
  onInputChange={setInput}
  onSubmit={handleSubmit}
  isLoading={isLoading}
  title="Assistant"
  maxHeight="500px"
/>`,
      },
    ],
  },
  {
    slug: 'chat-message',
    name: 'ChatMessage',
    description: 'Single message bubble with CVA variants for user (dark, right-aligned), assistant (light card, left-aligned), and system (centered, muted) roles. Renders tool calls and streaming cursor.',
    category: 'patterns',
    importStatement: "import { ChatMessage } from '@freehold/ui'",
    props: [
      { name: 'message', type: 'ChatMessageData', description: 'Message data including role, content, toolCalls, isStreaming' },
      { name: 'user', type: 'ChatUser', default: 'undefined', description: 'User display info (name, avatar)' },
      { name: 'assistant', type: 'ChatUser', default: 'undefined', description: 'Assistant display info (name, avatar)' },
    ],
    variants: [
      {
        name: 'role',
        options: [
          { value: 'user', label: 'User' },
          { value: 'assistant', label: 'Assistant' },
          { value: 'system', label: 'System' },
        ],
      },
    ],
    examples: [
      {
        title: 'Message Roles',
        code: `<ChatMessage message={{ id: '1', role: 'user', content: 'Hello!' }} />
<ChatMessage message={{ id: '2', role: 'assistant', content: 'Hi there!' }} />
<ChatMessage message={{ id: '3', role: 'system', content: 'Chat started' }} />`,
      },
    ],
  },
  {
    slug: 'chat-input',
    name: 'ChatInput',
    description: 'Auto-growing textarea with send button. Supports Enter to submit and Shift+Enter for newlines.',
    category: 'patterns',
    importStatement: "import { ChatInput } from '@freehold/ui'",
    props: [
      { name: 'value', type: 'string', description: 'Current input value' },
      { name: 'onChange', type: '(value: string) => void', description: 'Called when value changes' },
      { name: 'onSubmit', type: '(e?: FormEvent) => void', description: 'Called on Enter or button click' },
      { name: 'placeholder', type: 'string', default: "'Type a message…'", description: 'Placeholder text' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables input and button' },
    ],
    examples: [
      {
        title: 'Basic Input',
        code: `<ChatInput value={input} onChange={setInput} onSubmit={handleSubmit} />`,
      },
    ],
  },
  {
    slug: 'typing-indicator',
    name: 'TypingIndicator',
    description: 'Three animated bouncing dots displayed while the assistant is generating a response.',
    category: 'patterns',
    importStatement: "import { TypingIndicator } from '@freehold/ui'",
    props: [
      { name: 'className', type: 'string', default: 'undefined', description: 'Additional CSS classes' },
    ],
    examples: [
      {
        title: 'Default',
        code: `<TypingIndicator />`,
      },
    ],
  },
  {
    slug: 'tool-call-card',
    name: 'ToolCallCard',
    description: 'Displays an AI tool invocation with tool name, status badge, and optional result or error.',
    category: 'patterns',
    importStatement: "import { ToolCallCard } from '@freehold/ui'",
    props: [
      { name: 'toolCall', type: 'ToolCallDisplay', description: 'Tool call data (id, toolName, args, result, status, error)' },
    ],
    examples: [
      {
        title: 'Completed Tool Call',
        code: `<ToolCallCard toolCall={{
  id: '1',
  toolName: 'getWeather',
  args: { city: 'New York' },
  result: { temp: 72 },
  status: 'completed',
}} />`,
      },
    ],
  },
  {
    slug: 'empty-state',
    name: 'EmptyState',
    description: 'Centered placeholder shown when the chat has no messages. Displays an icon, message, and optional suggestion pills.',
    category: 'patterns',
    importStatement: "import { EmptyState } from '@freehold/ui'",
    props: [
      { name: 'message', type: 'string', default: "'How can I help you today?'", description: 'Main message text' },
      { name: 'suggestions', type: 'string[]', default: 'undefined', description: 'Clickable suggestion pills' },
      { name: 'onSuggestionClick', type: '(suggestion: string) => void', default: 'undefined', description: 'Called when a suggestion is clicked' },
    ],
    examples: [
      {
        title: 'With Suggestions',
        code: `<EmptyState
  message="Ask me anything!"
  suggestions={['What can you do?', 'Tell me a joke']}
  onSuggestionClick={(s) => console.log(s)}
/>`,
      },
    ],
  },

  // ── Patterns: Payroll Dashboard ──────────────────────────────────
  {
    slug: 'payroll-dashboard',
    name: 'PayrollDashboard',
    description: 'Complete payroll management dashboard with stats grid, charts, employee table, and action buttons. Composes all payroll subcomponents into a full-featured interface.',
    category: 'patterns',
    importStatement: "import { PayrollDashboard, type Employee, type PayPeriod, type PayrollStats } from '@freehold/ui/charts'",
    props: [
      { name: 'employees', type: 'Employee[]', description: 'Array of employee payroll data' },
      { name: 'initialPeriod', type: 'PayPeriod', default: 'undefined', description: 'Initial pay period selection' },
      { name: 'onPeriodChange', type: '(period: PayPeriod) => void', default: 'undefined', description: 'Called when pay period changes' },
      { name: 'onApprove', type: '(employee: Employee) => void', default: 'undefined', description: 'Called when approving individual employee' },
      { name: 'onMarkPaid', type: '(employee: Employee) => void', default: 'undefined', description: 'Called when marking employee as paid' },
      { name: 'onApproveAll', type: '() => void', default: 'undefined', description: 'Called when approving all pending' },
      { name: 'onGenerateAll', type: '() => void', default: 'undefined', description: 'Called when generating all payslips' },
      { name: 'onExport', type: '() => void', default: 'undefined', description: 'Called when exporting payroll data' },
      { name: 'onViewDetails', type: '(employee: Employee) => void', default: 'undefined', description: 'Called when viewing employee details' },
      { name: 'isLoading', type: 'boolean', default: 'false', description: 'Shows loading skeletons' },
      { name: 'showCharts', type: 'boolean', default: 'true', description: 'Show status and department charts' },
      { name: 'className', type: 'string', default: 'undefined', description: 'Additional CSS classes' },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<PayrollDashboard
  employees={employees}
  onApprove={handleApprove}
  onMarkPaid={handleMarkPaid}
  onApproveAll={handleApproveAll}
  onGenerateAll={handleGenerateAll}
  onExport={handleExport}
/>`,
      },
      {
        title: 'With Custom Period',
        code: `<PayrollDashboard
  employees={employees}
  initialPeriod={{ month: 1, year: 2026, payDate: '15' }}
  onPeriodChange={(period) => fetchPayrollData(period)}
  showCharts
/>`,
      },
    ],
  },
  {
    slug: 'pay-period-selector',
    name: 'PayPeriodSelector',
    description: 'Month, year, and pay date selector for payroll periods. Uses three Select dropdowns in a horizontal layout.',
    category: 'patterns',
    importStatement: "import { PayPeriodSelector, type PayPeriod } from '@freehold/ui/charts'",
    props: [
      { name: 'value', type: 'PayPeriod', description: 'Current period value { month: number, year: number, payDate: string }' },
      { name: 'onChange', type: '(period: PayPeriod) => void', description: 'Called when any period value changes' },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `const [period, setPeriod] = useState<PayPeriod>({
  month: 1,
  year: 2026,
  payDate: '15',
})

<PayPeriodSelector value={period} onChange={setPeriod} />`,
      },
    ],
  },
  {
    slug: 'dashboard',
    name: 'Dashboard',
    description: 'Generic, type-safe dashboard pattern with configurable stats, charts, filterable data table, action buttons, and detail modal. Use it to build any domain-specific dashboard (payroll, CRM, invoices, etc.).',
    category: 'patterns',
    importStatement: "import { Dashboard, type DashboardProps, type DashboardStatConfig, type DashboardChartConfig } from '@freehold/ui/charts'",
    props: [
      { name: 'data', type: 'T[]', description: 'Array of data items to display' },
      { name: 'keyExtractor', type: '(item: T) => string | number', description: 'Unique key for each data item' },
      { name: 'header', type: 'DashboardHeaderConfig', description: 'Title, description, and optional header action (ReactNode)' },
      { name: 'columns', type: 'Column<T>[]', description: 'Table column definitions with optional custom renderers' },
      { name: 'stats', type: 'DashboardStatConfig<T>[]', default: 'undefined', description: 'Stat card configs with getValue(data) functions' },
      { name: 'charts', type: 'DashboardChartConfig<T>[]', default: 'undefined', description: 'Chart configs (pie or bar) with getData(data) functions' },
      { name: 'search', type: 'DashboardSearchConfig<T>', default: 'undefined', description: 'Search config with predicate function' },
      { name: 'filters', type: 'DashboardFilterConfig<T>[]', default: 'undefined', description: 'Filter configs with options and predicate functions' },
      { name: 'actions', type: 'DashboardActionConfig[]', default: 'undefined', description: 'Action buttons with optional confirmation dialogs' },
      { name: 'detail', type: 'DashboardDetailConfig<T>', default: 'undefined', description: 'Detail modal with render props for header, content, and footer' },
      { name: 'isLoading', type: 'boolean', default: 'false', description: 'Shows loading skeletons' },
    ],
    examples: [
      {
        title: 'Basic Usage (Payroll Example)',
        code: `<Dashboard<Employee>
  data={employees}
  keyExtractor={(e) => e.id}
  header={{ title: 'Payroll Dashboard', description: 'Manage payroll.' }}
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'department', header: 'Department' },
    { key: 'status', header: 'Status' },
  ]}
  stats={[
    { key: 'total', label: 'Total', getValue: (data) => data.length },
  ]}
/>`,
      },
    ],
  },

  // ── Form ──────────────────────────────────────────────
  {
    slug: 'form',
    name: 'Form',
    description: 'Full-featured form system with validation, layout modes (vertical/horizontal), required/optional indicators, character counting, and mobile-responsive grid support.',
    category: 'composites',
    importStatement: "import { Form, FormField, FormSection, FormActions, FormGrid } from '@freehold/ui'",
    props: [
      {
        name: 'onSubmit',
        type: '(data: FormData, e: FormEvent) => void | Promise<void>',
        description: 'Called with FormData when all validation passes',
      },
      {
        name: 'layout',
        type: "'vertical' | 'horizontal'",
        default: "'vertical'",
        description: 'Label positioning — vertical (above field) or horizontal (beside field, stacks on mobile)',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables all fields in the form',
      },
      {
        name: 'children',
        type: 'ReactNode',
        description: 'FormField, FormSection, FormGrid, and FormActions components',
      },
    ],
    variants: [
      {
        name: 'layout',
        options: [
          { value: 'vertical', label: 'Vertical' },
          { value: 'horizontal', label: 'Horizontal' },
        ],
      },
    ],
    examples: [
      {
        title: 'Basic contact form',
        code: `<Form onSubmit={(data) => console.log(Object.fromEntries(data))}>
  <FormField name="name" label="Full Name" required>
    <Input placeholder="Jane Doe" />
  </FormField>
  <FormField name="email" label="Email" required rules={{ pattern: { value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, message: 'Enter a valid email' } }}>
    <Input type="email" placeholder="jane@example.com" />
  </FormField>
  <FormField name="message" label="Message" optional maxLength={500}>
    <Textarea placeholder="How can we help?" />
  </FormField>
  <FormActions>
    <Button variant="secondary">Cancel</Button>
    <Button type="submit">Send</Button>
  </FormActions>
</Form>`,
      },
      {
        title: 'Multi-column grid layout',
        code: `<Form onSubmit={(data) => console.log(Object.fromEntries(data))}>
  <FormSection title="Personal Information" description="Basic contact details">
    <FormGrid columns={2}>
      <FormField name="firstName" label="First Name" required>
        <Input placeholder="Jane" />
      </FormField>
      <FormField name="lastName" label="Last Name" required>
        <Input placeholder="Doe" />
      </FormField>
    </FormGrid>
    <FormField name="email" label="Email" required>
      <Input type="email" placeholder="jane@example.com" />
    </FormField>
  </FormSection>
  <FormActions>
    <Button type="submit">Save</Button>
  </FormActions>
</Form>`,
      },
      {
        title: 'Horizontal layout',
        code: `<Form layout="horizontal" onSubmit={(data) => console.log(Object.fromEntries(data))}>
  <FormField name="company" label="Company" required>
    <Input placeholder="Acme Inc." />
  </FormField>
  <FormField name="role" label="Role">
    <Select options={[{ value: 'admin', label: 'Admin' }, { value: 'member', label: 'Member' }]} />
  </FormField>
  <FormActions>
    <Button type="submit">Update</Button>
  </FormActions>
</Form>`,
      },
    ],
  },
  {
    slug: 'form-field',
    name: 'FormField',
    description: 'Wraps any form primitive with consistent label, required/optional indicators, validation errors, hints, and character counting.',
    category: 'composites',
    importStatement: "import { FormField } from '@freehold/ui'",
    props: [
      {
        name: 'name',
        type: 'string',
        description: 'Field name — must match the input name attribute. Used for validation and FormData.',
      },
      {
        name: 'label',
        type: 'string',
        description: 'Label text displayed above or beside the field',
      },
      {
        name: 'hint',
        type: 'string',
        description: 'Static hint text shown below the field',
      },
      {
        name: 'error',
        type: 'string',
        description: 'Override error message (takes priority over validation)',
      },
      {
        name: 'required',
        type: 'boolean | string',
        default: 'false',
        description: 'Shows asterisk on label and validates as required. Pass a string for a custom message.',
      },
      {
        name: 'optional',
        type: 'boolean',
        default: 'false',
        description: 'Shows "Optional" badge next to label',
      },
      {
        name: 'maxLength',
        type: 'number',
        description: 'Shows a character count indicator (e.g. 45/200) and validates max length',
      },
      {
        name: 'rules',
        type: 'ValidationRule',
        description: 'Validation rules: required, minLength, maxLength, pattern, validate(value)',
      },
      {
        name: 'children',
        type: 'ReactNode',
        description: 'A single form primitive (Input, Select, Textarea, Checkbox, Toggle)',
      },
    ],
    examples: [
      {
        title: 'Required field with hint',
        code: `<FormField name="email" label="Email" required hint="We'll never share your email.">
  <Input type="email" placeholder="you@example.com" />
</FormField>`,
      },
      {
        title: 'Optional field with character count',
        code: `<FormField name="bio" label="Bio" optional maxLength={200} hint="Tell us about yourself.">
  <Textarea placeholder="A few words about you..." />
</FormField>`,
      },
    ],
  },
  {
    slug: 'form-section',
    name: 'FormSection',
    description: 'Groups related form fields under a heading and description, with a bottom border separator.',
    category: 'composites',
    importStatement: "import { FormSection } from '@freehold/ui'",
    props: [
      {
        name: 'title',
        type: 'string',
        description: 'Section heading text',
      },
      {
        name: 'description',
        type: 'string',
        description: 'Section description text',
      },
      {
        name: 'children',
        type: 'ReactNode',
        description: 'FormField components within this section',
      },
    ],
    examples: [
      {
        title: 'Section with title and description',
        code: `<FormSection title="Payment Details" description="Enter your billing information">
  <FormField name="cardNumber" label="Card Number" required>
    <Input placeholder="4242 4242 4242 4242" />
  </FormField>
  <FormGrid columns={2}>
    <FormField name="expiry" label="Expiry" required>
      <Input placeholder="MM/YY" />
    </FormField>
    <FormField name="cvc" label="CVC" required>
      <Input placeholder="123" />
    </FormField>
  </FormGrid>
</FormSection>`,
      },
    ],
  },
  {
    slug: 'form-grid',
    name: 'FormGrid',
    description: 'Responsive multi-column grid for placing form fields side by side. Stacks to single column on mobile.',
    category: 'composites',
    importStatement: "import { FormGrid } from '@freehold/ui'",
    props: [
      {
        name: 'columns',
        type: '2 | 3 | 4',
        default: '2',
        description: 'Number of columns on desktop. Always stacks to 1 column on mobile.',
      },
      {
        name: 'children',
        type: 'ReactNode',
        description: 'FormField components to arrange in the grid',
      },
    ],
    examples: [
      {
        title: 'Two-column grid',
        code: `<FormGrid columns={2}>
  <FormField name="firstName" label="First Name" required>
    <Input placeholder="Jane" />
  </FormField>
  <FormField name="lastName" label="Last Name" required>
    <Input placeholder="Doe" />
  </FormField>
</FormGrid>`,
      },
    ],
  },
  {
    slug: 'form-actions',
    name: 'FormActions',
    description: 'Footer container for form submit/cancel buttons with responsive layout and alignment options.',
    category: 'composites',
    importStatement: "import { FormActions } from '@freehold/ui'",
    props: [
      {
        name: 'align',
        type: "'left' | 'center' | 'right' | 'between'",
        default: "'right'",
        description: 'Horizontal alignment of buttons on desktop',
      },
      {
        name: 'children',
        type: 'ReactNode',
        description: 'Button components',
      },
    ],
    examples: [
      {
        title: 'Right-aligned actions',
        code: `<FormActions>
  <Button variant="secondary">Cancel</Button>
  <Button type="submit">Save Changes</Button>
</FormActions>`,
      },
      {
        title: 'Space-between alignment',
        code: `<FormActions align="between">
  <Button variant="ghost" type="button">Reset</Button>
  <Button type="submit">Continue</Button>
</FormActions>`,
      },
    ],
  },
  {
    slug: 'navbar',
    name: 'Navbar',
    description: 'Freehold-branded navigation bar with scroll-aware styling, responsive mobile menu, and configurable nav items.',
    category: 'composites',
    importStatement: "import { Navbar } from '@freehold/ui'",
    props: [
      {
        name: 'items',
        type: 'NavItem[]',
        description: 'Navigation links. Each item has label (string) and href (string).',
      },
      {
        name: 'cta',
        type: '{ label: string; href: string }',
        description: 'Optional call-to-action button rendered at the end of the nav.',
      },
      {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes for the nav element.',
      },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<Navbar
  items={[
    { label: 'Platform', href: '#platform' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'About', href: '#about' },
  ]}
  cta={{ label: 'Get Started', href: '/signup' }}
/>`,
      },
      {
        title: 'Without CTA',
        code: `<Navbar
  items={[
    { label: 'Home', href: '/' },
    { label: 'Docs', href: '/docs' },
    { label: 'Blog', href: '/blog' },
  ]}
/>`,
      },
    ],
  },

  // ── Kanban ──────────────────────────────────────────────
  {
    slug: 'kanban',
    name: 'Kanban',
    description: 'Generic, type-safe Kanban board with drag-and-drop. Pass your data + column config, render custom cards, and handle moves. Built on @dnd-kit for accessible, performant drag-and-drop.',
    category: 'patterns',
    importStatement: "import { Kanban, type KanbanProps, type KanbanColumnConfig } from '@freehold/ui/kanban'",
    props: [
      { name: 'columns', type: 'KanbanColumnConfig<T>[]', description: 'Array of column definitions: { id, title, items, limit? }' },
      { name: 'keyExtractor', type: '(item: T) => string', description: 'Unique string key per card item' },
      { name: 'renderCard', type: '(item: T) => ReactNode', description: 'Custom card content renderer' },
      { name: 'onCardMove', type: '(cardId, fromCol, toCol, newIndex) => void', description: 'Called after a card is dragged to a new position' },
      { name: 'columnHeader', type: '(col, count) => ReactNode', default: 'undefined', description: 'Custom column header renderer' },
      { name: 'emptyColumn', type: 'ReactNode', default: '"No items"', description: 'Content shown when a column is empty' },
      { name: 'className', type: 'string', default: 'undefined', description: 'Additional CSS classes on the board container' },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<Kanban<Task>
  columns={[
    { id: 'todo', title: 'To Do', items: todoTasks },
    { id: 'in-progress', title: 'In Progress', items: inProgressTasks },
    { id: 'done', title: 'Done', items: doneTasks },
  ]}
  keyExtractor={(task) => task.id}
  renderCard={(task) => (
    <div>
      <p className="font-medium">{task.title}</p>
      <Badge variant="pending">{task.priority}</Badge>
    </div>
  )}
  onCardMove={(cardId, fromCol, toCol, newIndex) => {
    // update your state
  }}
/>`,
      },
    ],
  },

  // ── Patterns: Sidebar ──────────────────────────────────
  {
    slug: 'sidebar',
    name: 'Sidebar',
    description: 'Collapsible sidebar navigation with icon + label nav items, grouped sections, and user info at bottom. Dark background with cream text.',
    category: 'patterns',
    importStatement: "import { Sidebar, type SidebarProps, type SidebarNavItem } from '@freehold/ui'",
    props: [
      { name: 'logo', type: 'ReactNode', description: 'Logo element displayed at top' },
      { name: 'items', type: 'SidebarNavItem[]', description: 'Navigation items — flat SidebarItem or grouped SidebarSection' },
      { name: 'user', type: '{ name, email, avatar? }', description: 'User info displayed at bottom' },
      { name: 'collapsed', type: 'boolean', description: 'Whether sidebar is collapsed (icon-only mode)' },
      { name: 'onCollapse', type: '(collapsed: boolean) => void', description: 'Toggle collapsed state' },
      { name: 'activeItem', type: 'string', description: 'Currently active item href' },
      { name: 'onNavigate', type: '(href: string) => void', description: 'Called when a nav item is clicked' },
      { name: 'className', type: 'string', description: 'Additional CSS classes' },
      { name: 'mobileOpen', type: 'boolean', default: 'false', description: 'Whether the sidebar is open as a mobile overlay drawer (screens < md)' },
      { name: 'onMobileClose', type: '() => void', description: 'Called when the mobile drawer should close (backdrop click, nav item click, or close button)' },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<Sidebar
  logo={<span className="text-white font-bold text-lg">Acme</span>}
  items={[
    { icon: 'home', label: 'Dashboard', href: '/' },
    { icon: 'clients', label: 'Clients', href: '/clients', badge: 3 },
    { icon: 'billing', label: 'Billing', href: '/billing' },
    { icon: 'settings', label: 'Settings', href: '/settings' },
  ]}
  user={{ name: 'Jane Doe', email: 'jane@example.com' }}
  collapsed={false}
  onCollapse={setCollapsed}
  activeItem="/"
  onNavigate={(href) => router.push(href)}
/>`,
      },
      {
        title: 'With Sections',
        code: `<Sidebar
  logo={<Logo />}
  items={[
    { title: 'Main', items: [
      { icon: 'home', label: 'Dashboard', href: '/' },
      { icon: 'clients', label: 'Clients', href: '/clients' },
    ]},
    { title: 'Settings', items: [
      { icon: 'settings', label: 'General', href: '/settings' },
      { icon: 'billing', label: 'Billing', href: '/billing' },
    ]},
  ]}
  collapsed={collapsed}
  onCollapse={setCollapsed}
/>`,
      },
      {
        title: 'With Mobile Drawer',
        code: `const [mobileOpen, setMobileOpen] = useState(false)

<Sidebar
  logo={<Logo />}
  items={navItems}
  collapsed={collapsed}
  onCollapse={setCollapsed}
  mobileOpen={mobileOpen}
  onMobileClose={() => setMobileOpen(false)}
/>

{/* In your AppHeader: */}
<AppHeader
  title="Dashboard"
  onMenuClick={() => setMobileOpen(true)}
/>`,
      },
    ],
  },

  // ── Patterns: AppHeader ──────────────────────────────────
  {
    slug: 'app-header',
    name: 'AppHeader',
    description: 'Top bar for authenticated pages with page title, breadcrumb trail, action area, and user avatar. Sits to the right of the sidebar.',
    category: 'patterns',
    importStatement: "import { AppHeader, type AppHeaderProps } from '@freehold/ui'",
    props: [
      { name: 'title', type: 'string', description: 'Page title' },
      { name: 'breadcrumbs', type: '{ label, href? }[]', description: 'Breadcrumb trail with chevron separators' },
      { name: 'actions', type: 'ReactNode', description: 'Right-side action area (buttons, etc.)' },
      { name: 'user', type: '{ name, avatar? }', description: 'User avatar + name at far right' },
      { name: 'onMenuClick', type: '() => void', description: 'Mobile hamburger click handler' },
      { name: 'className', type: 'string', description: 'Additional CSS classes' },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<AppHeader
  title="Dashboard"
  breadcrumbs={[
    { label: 'Home', href: '/' },
    { label: 'Dashboard' },
  ]}
  actions={<Button size="sm">New Project</Button>}
  user={{ name: 'Jane Doe' }}
  onMenuClick={() => setSidebarOpen(true)}
/>`,
      },
    ],
  },

  // ── Patterns: LoginForm ──────────────────────────────────
  {
    slug: 'login-form',
    name: 'LoginForm',
    description: 'Complete login form with email/password fields, remember me checkbox, social login buttons, and three layout variants (simple, split, card).',
    category: 'patterns',
    importStatement: "import { LoginForm, type LoginFormProps } from '@freehold/ui'",
    props: [
      { name: 'variant', type: "'simple' | 'split' | 'card'", default: "'simple'", description: 'Layout variant' },
      { name: 'logo', type: 'ReactNode', description: 'Logo above form' },
      { name: 'title', type: 'string', default: "'Sign in'", description: 'Heading text' },
      { name: 'description', type: 'string', description: 'Subheading text' },
      { name: 'onSubmit', type: '(data: { email, password, remember }) => void', description: 'Form submission handler' },
      { name: 'socialProviders', type: "('google' | 'github' | 'apple')[]", description: 'Social login buttons to show' },
      { name: 'onSocialLogin', type: '(provider) => void', description: 'Social login click handler' },
      { name: 'forgotPasswordHref', type: 'string', description: '"Forgot password?" link URL' },
      { name: 'registerHref', type: 'string', description: '"Create account" link URL' },
      { name: 'splitContent', type: 'ReactNode', description: 'Left panel content for split variant' },
      { name: 'isLoading', type: 'boolean', default: 'false', description: 'Disables form and shows spinner' },
      { name: 'error', type: 'string', description: 'Top-level error message' },
    ],
    variants: [
      {
        name: 'variant',
        options: [
          { value: 'simple', label: 'Simple' },
          { value: 'split', label: 'Split' },
          { value: 'card', label: 'Card' },
        ],
      },
    ],
    examples: [
      {
        title: 'Basic Login',
        code: `<LoginForm
  onSubmit={(data) => console.log(data)}
  forgotPasswordHref="/forgot-password"
  registerHref="/register"
/>`,
      },
      {
        title: 'With Social Login',
        code: `<LoginForm
  variant="card"
  title="Welcome back"
  description="Sign in to your account"
  onSubmit={handleLogin}
  socialProviders={['google', 'github']}
  onSocialLogin={handleSocialLogin}
/>`,
      },
    ],
  },

  // ── Patterns: RegisterForm ──────────────────────────────────
  {
    slug: 'register-form',
    name: 'RegisterForm',
    description: 'Complete registration form with name, email, password, confirm password, social signup, and three layout variants (simple, split, card).',
    category: 'patterns',
    importStatement: "import { RegisterForm, type RegisterFormProps } from '@freehold/ui'",
    props: [
      { name: 'variant', type: "'simple' | 'split' | 'card'", default: "'simple'", description: 'Layout variant' },
      { name: 'logo', type: 'ReactNode', description: 'Logo above form' },
      { name: 'title', type: 'string', default: "'Create account'", description: 'Heading text' },
      { name: 'description', type: 'string', description: 'Subheading text' },
      { name: 'onSubmit', type: '(data: { name, email, password }) => void', description: 'Form submission handler' },
      { name: 'socialProviders', type: "('google' | 'github' | 'apple')[]", description: 'Social login buttons to show' },
      { name: 'onSocialLogin', type: '(provider) => void', description: 'Social login click handler' },
      { name: 'loginHref', type: 'string', description: '"Already have an account?" link URL' },
      { name: 'termsHref', type: 'string', description: 'Terms of Service link URL' },
      { name: 'privacyHref', type: 'string', description: 'Privacy Policy link URL' },
      { name: 'splitContent', type: 'ReactNode', description: 'Left panel content for split variant' },
      { name: 'isLoading', type: 'boolean', default: 'false', description: 'Disables form and shows spinner' },
      { name: 'error', type: 'string', description: 'Top-level error message' },
    ],
    variants: [
      {
        name: 'variant',
        options: [
          { value: 'simple', label: 'Simple' },
          { value: 'split', label: 'Split' },
          { value: 'card', label: 'Card' },
        ],
      },
    ],
    examples: [
      {
        title: 'Basic Register',
        code: `<RegisterForm
  onSubmit={(data) => console.log(data)}
  loginHref="/login"
  termsHref="/terms"
/>`,
      },
      {
        title: 'With Social Signup',
        code: `<RegisterForm
  variant="card"
  title="Create your account"
  onSubmit={handleRegister}
  socialProviders={['google']}
  onSocialLogin={handleSocialLogin}
  termsHref="/terms"
  privacyHref="/privacy"
/>`,
      },
    ],
  },

  // ── @freehold/payments: Primitives ──────────────────────────────
  {
    slug: 'order-summary',
    name: 'OrderSummary',
    description: 'Displays line items with subtotal, tax, discount, and total. Part of @freehold/payments.',
    category: 'primitives',
    importStatement: "import { OrderSummary } from '@freehold/payments'",
    props: [
      { name: 'items', type: 'OrderLineItem[]', description: 'Array of { id, name, description?, quantity, unitPrice, currency }' },
      { name: 'subtotal', type: 'number', description: 'Subtotal amount' },
      { name: 'tax', type: 'number', description: 'Tax amount (optional)' },
      { name: 'discount', type: 'number', description: 'Discount amount (optional)' },
      { name: 'total', type: 'number', description: 'Total amount' },
      { name: 'currency', type: 'string', description: 'Currency code (e.g., "USD")' },
      { name: 'variant', type: "'default' | 'compact'", default: "'default'", description: 'Layout variant' },
    ],
    variants: [
      {
        name: 'variant',
        options: [
          { value: 'default', label: 'Default' },
          { value: 'compact', label: 'Compact' },
        ],
      },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<OrderSummary
  items={[
    { id: '1', name: 'Pro Plan', quantity: 1, unitPrice: 29, currency: 'USD' },
    { id: '2', name: 'Extra Seats', description: '3 additional seats', quantity: 3, unitPrice: 9, currency: 'USD' },
  ]}
  subtotal={56}
  tax={4.48}
  total={60.48}
  currency="USD"
/>`,
      },
    ],
  },
  {
    slug: 'payment-method-icon',
    name: 'PaymentMethodIcon',
    description: 'SVG icons for common payment methods: Visa, Mastercard, Amex, Apple Pay, Google Pay, PayPal. Part of @freehold/payments.',
    category: 'primitives',
    importStatement: "import { PaymentMethodIcon } from '@freehold/payments'",
    props: [
      { name: 'method', type: "'visa' | 'mastercard' | 'amex' | 'apple-pay' | 'google-pay' | 'paypal'", description: 'Payment method to display' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Icon size' },
    ],
    examples: [
      {
        title: 'All Methods',
        code: `<div className="flex gap-3">
  <PaymentMethodIcon method="visa" />
  <PaymentMethodIcon method="mastercard" />
  <PaymentMethodIcon method="amex" />
  <PaymentMethodIcon method="apple-pay" />
  <PaymentMethodIcon method="google-pay" />
  <PaymentMethodIcon method="paypal" />
</div>`,
      },
    ],
  },
  {
    slug: 'security-badge',
    name: 'SecurityBadge',
    description: 'Lock icon with "Secure checkout" trust indicator. Part of @freehold/payments.',
    category: 'primitives',
    importStatement: "import { SecurityBadge } from '@freehold/payments'",
    props: [
      { name: 'variant', type: "'default' | 'subtle'", default: "'default'", description: 'Visual variant' },
      { name: 'label', type: 'string', default: "'Secure checkout'", description: 'Badge text' },
    ],
    variants: [
      {
        name: 'variant',
        options: [
          { value: 'default', label: 'Default' },
          { value: 'subtle', label: 'Subtle' },
        ],
      },
    ],
    examples: [
      {
        title: 'Both Variants',
        code: `<div className="space-y-3">
  <SecurityBadge variant="default" />
  <SecurityBadge variant="subtle" />
</div>`,
      },
    ],
  },
  {
    slug: 'checkout-divider',
    name: 'CheckoutDivider',
    description: 'Horizontal "or" separator between payment method sections. Part of @freehold/payments.',
    category: 'primitives',
    importStatement: "import { CheckoutDivider } from '@freehold/payments'",
    props: [
      { name: 'label', type: 'string', default: "'or'", description: 'Divider label text' },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<CheckoutDivider />`,
      },
      {
        title: 'Custom Label',
        code: `<CheckoutDivider label="or pay with" />`,
      },
    ],
  },

  // ── @freehold/payments: Composites ──────────────────────────────
  {
    slug: 'checkout-header',
    name: 'CheckoutHeader',
    description: 'Checkout page header with DM Serif Display title, description, and optional logo. Part of @freehold/payments.',
    category: 'composites',
    importStatement: "import { CheckoutHeader } from '@freehold/payments'",
    props: [
      { name: 'title', type: 'string', description: 'Header title' },
      { name: 'description', type: 'string', description: 'Subtitle text' },
      { name: 'logo', type: 'ReactNode', description: 'Optional logo element' },
    ],
    examples: [
      {
        title: 'Basic Usage',
        code: `<CheckoutHeader
  title="Complete your order"
  description="Review your items and enter payment details."
/>`,
      },
    ],
  },
  {
    slug: 'checkout-footer',
    name: 'CheckoutFooter',
    description: 'Checkout footer with terms/privacy links and optional "Powered by" badge. Part of @freehold/payments.',
    category: 'composites',
    importStatement: "import { CheckoutFooter } from '@freehold/payments'",
    props: [
      { name: 'termsUrl', type: 'string', description: 'URL to terms page' },
      { name: 'privacyUrl', type: 'string', description: 'URL to privacy page' },
      { name: 'showPoweredBy', type: 'boolean', default: 'false', description: 'Show "Powered by Freehold" badge' },
    ],
    examples: [
      {
        title: 'With Links',
        code: `<CheckoutFooter termsUrl="/terms" privacyUrl="/privacy" showPoweredBy />`,
      },
    ],
  },
  {
    slug: 'pricing-card',
    name: 'PricingCard',
    description: 'Data-driven pricing tier card with plan name, price display, feature list, and CTA button. Supports featured variant for recommended plans. Part of @freehold/payments.',
    category: 'composites',
    importStatement: "import { PricingCard } from '@freehold/payments'",
    props: [
      { name: 'name', type: 'string', description: 'Plan name (e.g., "Pro", "Business")' },
      { name: 'description', type: 'string', description: 'Short plan description' },
      { name: 'price', type: 'number', description: 'Price amount' },
      { name: 'currency', type: 'string', description: 'Currency code (e.g., "USD")' },
      { name: 'billingPeriod', type: "'monthly' | 'yearly' | 'one-time'", description: 'Billing frequency' },
      { name: 'billingLabel', type: 'string', description: 'Custom billing label (e.g., "per seat/mo")' },
      { name: 'features', type: 'PricingFeature[]', description: 'Array of { text, included?, hint? }' },
      { name: 'badge', type: 'string', description: 'Badge text (e.g., "Popular")' },
      { name: 'ctaLabel', type: 'string', description: 'CTA button text' },
      { name: 'featured', type: 'boolean', default: 'false', description: 'Whether this is the highlighted tier' },
      { name: 'originalPrice', type: 'number', description: 'Strikethrough original price for discounts' },
      { name: 'variant', type: "'default' | 'featured'", default: "'default'", description: 'Visual variant (auto-set by featured prop)' },
      { name: 'ctaSlot', type: 'ReactNode', description: 'Custom CTA render slot' },
      { name: 'onCtaClick', type: '() => void', description: 'Click handler for default CTA button' },
    ],
    variants: [
      {
        name: 'variant',
        options: [
          { value: 'default', label: 'Default' },
          { value: 'featured', label: 'Featured' },
        ],
      },
    ],
    examples: [
      {
        title: 'Basic Pricing Card',
        code: `<PricingCard
  name="Pro"
  description="For growing teams"
  price={29}
  currency="USD"
  billingPeriod="monthly"
  features={[
    { text: 'Unlimited projects' },
    { text: '10 team members' },
    { text: 'Priority support' },
    { text: 'Custom domain', included: false },
  ]}
  ctaLabel="Get Started"
/>`,
      },
      {
        title: 'Featured Card with Badge',
        code: `<PricingCard
  name="Business"
  description="For scaling companies"
  price={79}
  currency="USD"
  billingPeriod="monthly"
  badge="Most Popular"
  featured
  features={[
    { text: 'Everything in Pro' },
    { text: 'Unlimited team members' },
    { text: 'Priority support' },
    { text: 'Custom domain' },
    { text: 'SSO integration' },
  ]}
  ctaLabel="Start Free Trial"
/>`,
      },
    ],
  },

  // ── @freehold/payments: Patterns ──────────────────────────────
  {
    slug: 'checkout-card',
    name: 'CheckoutCard',
    description: 'Compact checkout card layout (max-w-md) with header, children slot for payment form, and footer. Part of @freehold/payments.',
    category: 'patterns',
    importStatement: "import { CheckoutCard } from '@freehold/payments'",
    props: [
      { name: 'header', type: 'CheckoutHeaderConfig', description: 'Header config: { title, description?, logo? }' },
      { name: 'footer', type: 'CheckoutFooterConfig', description: 'Footer config: { termsUrl?, privacyUrl?, showPoweredBy? }' },
      { name: 'children', type: 'ReactNode', description: 'Payment form content' },
    ],
    examples: [
      {
        title: 'With Stripe',
        code: `<FreeholdStripeProvider publishableKey="pk_..." clientSecret={clientSecret}>
  <CheckoutCard
    header={{ title: 'Complete your order' }}
    footer={{ termsUrl: '/terms' }}
  >
    <OrderSummary items={items} subtotal={29} total={29} currency="USD" />
    <StripeCheckoutForm onSuccess={handleSuccess} submitLabel="Pay $29.00" />
    <SecurityBadge />
  </CheckoutCard>
</FreeholdStripeProvider>`,
      },
    ],
  },
  {
    slug: 'checkout-full-screen',
    name: 'CheckoutFullScreen',
    description: 'Full-screen checkout page layout with centered card on warm background. Part of @freehold/payments.',
    category: 'patterns',
    importStatement: "import { CheckoutFullScreen } from '@freehold/payments'",
    props: [
      { name: 'header', type: 'CheckoutHeaderConfig', description: 'Header config: { title, description?, logo? }' },
      { name: 'footer', type: 'CheckoutFooterConfig', description: 'Footer config: { termsUrl?, privacyUrl?, showPoweredBy? }' },
      { name: 'children', type: 'ReactNode', description: 'Payment form content' },
    ],
    examples: [
      {
        title: 'Full Screen Checkout',
        code: `<FreeholdStripeProvider publishableKey="pk_..." clientSecret={clientSecret}>
  <CheckoutFullScreen
    header={{ title: 'Checkout' }}
    footer={{ termsUrl: '/terms', showPoweredBy: true }}
  >
    <OrderSummary items={items} subtotal={99} total={99} currency="USD" />
    <StripeCheckoutForm onSuccess={handleSuccess} />
  </CheckoutFullScreen>
</FreeholdStripeProvider>`,
      },
    ],
  },
  {
    slug: 'checkout-split-screen',
    name: 'CheckoutSplitScreen',
    description: 'Two-panel checkout layout: dark left panel for branding/info, white right panel for payment form. Stacks on mobile. Part of @freehold/payments.',
    category: 'patterns',
    importStatement: "import { CheckoutSplitScreen } from '@freehold/payments'",
    props: [
      { name: 'left', type: 'ReactNode', description: 'Content for the dark left panel' },
      { name: 'header', type: 'CheckoutHeaderConfig', description: 'Header config for right panel' },
      { name: 'footer', type: 'CheckoutFooterConfig', description: 'Footer config for right panel' },
      { name: 'children', type: 'ReactNode', description: 'Payment form content (right panel)' },
    ],
    examples: [
      {
        title: 'Split Screen Checkout',
        code: `<FreeholdStripeProvider publishableKey="pk_..." clientSecret={clientSecret}>
  <CheckoutSplitScreen
    left={
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-4">Upgrade to Pro</h1>
        <p className="text-white/70">Unlock all premium features.</p>
      </div>
    }
    header={{ title: 'Checkout' }}
  >
    <OrderSummary items={items} subtotal={99} total={99} currency="USD" />
    <StripeCheckoutForm onSuccess={handleSuccess} submitLabel="Subscribe — $99/mo" />
  </CheckoutSplitScreen>
</FreeholdStripeProvider>`,
      },
    ],
  },
  {
    slug: 'pricing-grid',
    name: 'PricingGrid',
    description: 'Responsive grid layout for arranging PricingCard components. Supports 2, 3, or 4 column layouts. Part of @freehold/payments.',
    category: 'patterns',
    importStatement: "import { PricingGrid, PricingCard } from '@freehold/payments'",
    props: [
      { name: 'columns', type: '2 | 3 | 4', default: '3', description: 'Maximum number of grid columns' },
      { name: 'children', type: 'ReactNode', description: 'PricingCard components' },
    ],
    examples: [
      {
        title: 'Three-Tier Pricing',
        code: `<PricingGrid columns={3}>
  <PricingCard name="Starter" price={0} currency="USD" billingPeriod="monthly"
    features={[{ text: '1 project' }, { text: '1 user' }]} ctaLabel="Start Free" />
  <PricingCard name="Pro" price={29} currency="USD" billingPeriod="monthly"
    badge="Popular" featured
    features={[{ text: 'Unlimited projects' }, { text: '10 users' }]} ctaLabel="Get Started" />
  <PricingCard name="Enterprise" price={99} currency="USD" billingPeriod="monthly"
    features={[{ text: 'Everything in Pro' }, { text: 'Unlimited users' }]} ctaLabel="Contact Sales" />
</PricingGrid>`,
      },
    ],
  },
]

export function getComponentBySlug(slug: string): ComponentDoc | undefined {
  return componentDocs.find((c) => c.slug === slug)
}

export function getComponentsByCategory(category: ComponentDoc['category']): ComponentDoc[] {
  return componentDocs.filter((c) => c.category === category)
}

export function searchComponents(query: string): ComponentDoc[] {
  const lowerQuery = query.toLowerCase()
  return componentDocs.filter(
    (c) =>
      c.name.toLowerCase().includes(lowerQuery) ||
      c.description.toLowerCase().includes(lowerQuery)
  )
}

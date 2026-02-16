import type { Meta, StoryObj } from '@storybook/react'
import { Pill } from './Pill'

const meta: Meta<typeof Pill> = {
  title: 'Primitives/Pill',
  component: Pill,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'success', 'warning', 'error', 'accent'], description: 'Visual variant' },
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Pill size' },
    showDot: { control: 'boolean', description: 'Show indicator dot' },
  },
  args: {
    children: 'Status',
    variant: 'default',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Pill>

export const Default: Story = {}

export const Success: Story = { args: { variant: 'success', children: 'Active' } }
export const Warning: Story = { args: { variant: 'warning', children: 'Pending' } }
export const Error: Story = { args: { variant: 'error', children: 'Failed' } }
export const Accent: Story = { args: { variant: 'accent', children: 'New' } }

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Pill variant="default">Default</Pill>
      <Pill variant="success">Success</Pill>
      <Pill variant="warning">Warning</Pill>
      <Pill variant="error">Error</Pill>
      <Pill variant="accent">Accent</Pill>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Pill size="sm">Small</Pill>
      <Pill size="md">Medium</Pill>
      <Pill size="lg">Large</Pill>
    </div>
  ),
}

export const WithoutDot: Story = {
  args: { showDot: false, children: 'No Dot' },
}

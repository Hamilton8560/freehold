import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pending', 'approved', 'paid', 'error', 'accent'],
      description: 'Status variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
    },
  },
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Default',
  },
}

export const Pending: Story = {
  args: {
    variant: 'pending',
    children: 'Pending Review',
  },
}

export const Approved: Story = {
  args: {
    variant: 'approved',
    children: 'Approved',
  },
}

export const Paid: Story = {
  args: {
    variant: 'paid',
    children: 'Paid',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Error',
  },
}

export const Accent: Story = {
  args: {
    variant: 'accent',
    children: 'Featured',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="pending">Pending</Badge>
      <Badge variant="approved">Approved</Badge>
      <Badge variant="paid">Paid</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="accent">Accent</Badge>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge variant="approved" size="sm">Small</Badge>
      <Badge variant="approved" size="md">Medium</Badge>
      <Badge variant="approved" size="lg">Large</Badge>
    </div>
  ),
}

export const StatusWorkflow: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="w-20 text-sm text-[#5C574F]">Step 1:</span>
        <Badge variant="pending">Pending Review</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-20 text-sm text-[#5C574F]">Step 2:</span>
        <Badge variant="approved">Approved</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-20 text-sm text-[#5C574F]">Step 3:</span>
        <Badge variant="paid">Paid</Badge>
      </div>
    </div>
  ),
}

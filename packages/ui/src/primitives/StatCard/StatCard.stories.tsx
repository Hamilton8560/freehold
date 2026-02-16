import type { Meta, StoryObj } from '@storybook/react'
import { StatCard } from './StatCard'

const meta: Meta<typeof StatCard> = {
  title: 'Primitives/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Stat label' },
    value: { control: 'text', description: 'Stat value' },
    format: { control: 'select', options: ['number', 'currency', 'percentage'], description: 'Value format' },
  },
  args: {
    label: 'Active Clients',
    value: 247,
    format: 'number',
  },
}

export default meta
type Story = StoryObj<typeof StatCard>

export const Default: Story = {}

export const WithTrendUp: Story = {
  args: {
    label: 'Revenue',
    value: 52400,
    format: 'currency',
    trend: { value: 12, direction: 'up' },
  },
}

export const WithTrendDown: Story = {
  args: {
    label: 'Churn Rate',
    value: 4.2,
    format: 'percentage',
    trend: { value: 3, direction: 'down' },
  },
}

export const AllFormats: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <StatCard label="Clients" value={247} format="number" trend={{ value: 12, direction: 'up' }} />
      <StatCard label="Revenue" value={52400} format="currency" trend={{ value: 8, direction: 'up' }} />
      <StatCard label="Growth" value={18.5} format="percentage" trend={{ value: 2, direction: 'down' }} />
    </div>
  ),
}

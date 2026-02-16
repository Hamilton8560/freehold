import type { Meta, StoryObj } from '@storybook/react'
import { StatCardSkeleton } from './StatCardSkeleton'

const meta: Meta<typeof StatCardSkeleton> = {
  title: 'Composites/StatCardSkeleton',
  component: StatCardSkeleton,
  tags: ['autodocs'],
  argTypes: {
    showTrend: { control: 'boolean', description: 'Show trend placeholder' },
  },
}

export default meta
type Story = StoryObj<typeof StatCardSkeleton>

export const Default: Story = {}

export const WithTrend: Story = {
  args: { showTrend: true },
}

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCardSkeleton />
      <StatCardSkeleton showTrend />
      <StatCardSkeleton />
      <StatCardSkeleton showTrend />
    </div>
  ),
}

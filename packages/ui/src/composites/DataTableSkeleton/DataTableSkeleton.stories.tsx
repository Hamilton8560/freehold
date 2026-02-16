import type { Meta, StoryObj } from '@storybook/react'
import { DataTableSkeleton } from './DataTableSkeleton'

const meta: Meta<typeof DataTableSkeleton> = {
  title: 'Composites/DataTableSkeleton',
  component: DataTableSkeleton,
  tags: ['autodocs'],
  argTypes: {
    rows: { control: 'number', description: 'Number of rows' },
    columns: { control: 'number', description: 'Number of columns' },
    showHeader: { control: 'boolean', description: 'Show header' },
  },
  args: {
    rows: 5,
    columns: 4,
    showHeader: true,
  },
}

export default meta
type Story = StoryObj<typeof DataTableSkeleton>

export const Default: Story = {}

export const Compact: Story = {
  args: { rows: 3, columns: 3 },
}

export const Wide: Story = {
  args: { rows: 8, columns: 6 },
}

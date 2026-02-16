import type { Meta, StoryObj } from '@storybook/react'
import { ChartSkeleton } from './ChartSkeleton'

const meta: Meta<typeof ChartSkeleton> = {
  title: 'Composites/ChartSkeleton',
  component: ChartSkeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['pie', 'bar', 'line'], description: 'Chart variant' },
    height: { control: 'number', description: 'Chart height' },
    showLegend: { control: 'boolean', description: 'Show legend placeholder' },
  },
  args: {
    variant: 'bar',
    height: 250,
    showLegend: true,
  },
}

export default meta
type Story = StoryObj<typeof ChartSkeleton>

export const Bar: Story = { args: { variant: 'bar' } }
export const Pie: Story = { args: { variant: 'pie' } }
export const Line: Story = { args: { variant: 'line' } }

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      <ChartSkeleton variant="bar" height={200} showLegend />
      <ChartSkeleton variant="pie" height={200} showLegend />
      <ChartSkeleton variant="line" height={200} showLegend />
    </div>
  ),
}

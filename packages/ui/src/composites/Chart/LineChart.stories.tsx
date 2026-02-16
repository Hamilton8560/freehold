import type { Meta, StoryObj } from '@storybook/react'
import { LineChart } from './LineChart'

const meta: Meta<typeof LineChart> = {
  title: 'Composites/LineChart',
  component: LineChart,
  tags: ['autodocs'],
  argTypes: {
    height: { control: 'number', description: 'Chart height' },
    showArea: { control: 'boolean', description: 'Show area fill' },
    showDots: { control: 'boolean', description: 'Show dots' },
    showLegend: { control: 'boolean', description: 'Show legend' },
  },
  args: {
    height: 250,
    showLegend: true,
  },
}

export default meta
type Story = StoryObj<typeof LineChart>

const revenueData = [
  { month: 'Jan', revenue: 10000 },
  { month: 'Feb', revenue: 12000 },
  { month: 'Mar', revenue: 15000 },
  { month: 'Apr', revenue: 14000 },
  { month: 'May', revenue: 18000 },
  { month: 'Jun', revenue: 22000 },
]

export const Default: Story = {
  args: {
    data: revenueData,
    xAxisKey: 'month',
    series: [{ name: 'Revenue', dataKey: 'revenue', color: '#8DB580' }],
    yAxisFormat: 'currency',
  },
}

export const WithArea: Story = {
  args: {
    data: revenueData,
    xAxisKey: 'month',
    series: [{ name: 'Revenue', dataKey: 'revenue', color: '#8DB580' }],
    yAxisFormat: 'currency',
    showArea: true,
  },
}

export const MultipleSeries: Story = {
  args: {
    data: [
      { month: 'Jan', revenue: 10000, expenses: 8000 },
      { month: 'Feb', revenue: 12000, expenses: 9000 },
      { month: 'Mar', revenue: 15000, expenses: 10000 },
      { month: 'Apr', revenue: 14000, expenses: 11000 },
      { month: 'May', revenue: 18000, expenses: 12000 },
    ],
    xAxisKey: 'month',
    series: [
      { name: 'Revenue', dataKey: 'revenue', color: '#8DB580' },
      { name: 'Expenses', dataKey: 'expenses', color: '#D4B86A' },
    ],
    yAxisFormat: 'currency',
    showArea: true,
  },
}

import type { Meta, StoryObj } from '@storybook/react'
import { BarChart } from './BarChart'

const meta: Meta<typeof BarChart> = {
  title: 'Composites/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  argTypes: {
    height: { control: 'number', description: 'Chart height' },
    showLegend: { control: 'boolean', description: 'Show legend' },
  },
  args: {
    height: 250,
    showLegend: true,
  },
}

export default meta
type Story = StoryObj<typeof BarChart>

export const Default: Story = {
  args: {
    data: [
      { department: 'Engineering', value: 50000 },
      { department: 'Design', value: 35000 },
      { department: 'Marketing', value: 30000 },
      { department: 'HR', value: 22000 },
    ],
    xAxisKey: 'department',
    series: [{ name: 'Budget', dataKey: 'value', color: '#B8A48E' }],
    yAxisFormat: 'currency',
  },
}

export const MultipleSeries: Story = {
  args: {
    data: [
      { month: 'Jan', revenue: 40000, expenses: 25000 },
      { month: 'Feb', revenue: 45000, expenses: 28000 },
      { month: 'Mar', revenue: 55000, expenses: 30000 },
    ],
    xAxisKey: 'month',
    series: [
      { name: 'Revenue', dataKey: 'revenue', color: '#8DB580' },
      { name: 'Expenses', dataKey: 'expenses', color: '#D4B86A' },
    ],
    yAxisFormat: 'currency',
  },
}

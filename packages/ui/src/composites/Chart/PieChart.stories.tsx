import type { Meta, StoryObj } from '@storybook/react'
import { PieChart } from './PieChart'

const meta: Meta<typeof PieChart> = {
  title: 'Composites/PieChart',
  component: PieChart,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['pie', 'donut'], description: 'Chart variant' },
    height: { control: 'number', description: 'Chart height' },
    showLegend: { control: 'boolean', description: 'Show legend' },
  },
  args: {
    height: 250,
    showLegend: true,
  },
}

export default meta
type Story = StoryObj<typeof PieChart>

const sampleData = [
  { name: 'Pending', value: 5, color: '#D4B86A' },
  { name: 'Approved', value: 12, color: '#8DB580' },
  { name: 'Paid', value: 8, color: '#60A5FA' },
]

export const Default: Story = {
  args: { data: sampleData, variant: 'pie' },
}

export const Donut: Story = {
  args: { data: sampleData, variant: 'donut' },
}

export const BothVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 max-w-2xl">
      <div>
        <h3 className="text-sm font-medium mb-2 text-[#2C2824]">Pie</h3>
        <PieChart data={sampleData} variant="pie" height={200} showLegend />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-[#2C2824]">Donut</h3>
        <PieChart data={sampleData} variant="donut" height={200} showLegend />
      </div>
    </div>
  ),
}

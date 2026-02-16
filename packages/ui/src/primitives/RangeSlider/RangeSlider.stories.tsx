import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RangeSlider } from './RangeSlider'

const meta: Meta<typeof RangeSlider> = {
  title: 'Primitives/RangeSlider',
  component: RangeSlider,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label text' },
    error: { control: 'text', description: 'Error message' },
    hint: { control: 'text', description: 'Helper text' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    min: { control: 'number', description: 'Minimum value' },
    max: { control: 'number', description: 'Maximum value' },
    step: { control: 'number', description: 'Step increment' },
    showValues: { control: 'boolean', description: 'Show value labels' },
  },
  args: {
    label: 'Price range',
    min: 0,
    max: 100,
  },
}

export default meta
type Story = StoryObj<typeof RangeSlider>

export const Default: Story = {}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: [20, 80],
  },
}

export const WithHint: Story = {
  args: {
    hint: 'Drag the handles to set your range',
  },
}

export const WithError: Story = {
  args: {
    error: 'Range must be at least 10 units wide',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: [30, 70],
  },
}

export const PriceRange: Story = {
  args: {
    label: 'Price range',
    min: 0,
    max: 1000,
    step: 10,
    defaultValue: [100, 500],
    formatValue: (v) => `$${v}`,
    hint: 'Filter products by price',
  },
}

export const PercentageRange: Story = {
  args: {
    label: 'Completion range',
    min: 0,
    max: 100,
    step: 5,
    defaultValue: [25, 75],
    formatValue: (v) => `${v}%`,
  },
}

export const LargeStep: Story = {
  args: {
    label: 'Rating range',
    min: 1,
    max: 5,
    step: 1,
    defaultValue: [2, 4],
    formatValue: (v) => `${v} star${v !== 1 ? 's' : ''}`,
  },
}

export const HiddenValues: Story = {
  args: {
    label: 'Slider without values',
    showValues: false,
    defaultValue: [25, 75],
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState([25, 75])
    return (
      <div className="space-y-4">
        <RangeSlider
          {...args}
          value={value}
          onValueChange={setValue}
        />
        <p className="text-sm text-[#5C574F]">
          Range: {value[0]} - {value[1]}
        </p>
      </div>
    )
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-8 max-w-md">
      <RangeSlider label="Default" />
      <RangeSlider label="With Value" defaultValue={[10, 90]} />
      <RangeSlider label="With Hint" hint="Set your preferred range" />
      <RangeSlider label="With Error" error="Invalid range selection" />
      <RangeSlider label="Disabled" disabled defaultValue={[30, 70]} />
    </div>
  ),
}

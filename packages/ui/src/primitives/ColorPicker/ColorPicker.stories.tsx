import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ColorPicker } from './ColorPicker'

const meta: Meta<typeof ColorPicker> = {
  title: 'Primitives/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label text' },
    error: { control: 'text', description: 'Error message' },
    hint: { control: 'text', description: 'Helper text' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    allowCustom: { control: 'boolean', description: 'Allow custom color input' },
  },
  args: {
    label: 'Select color',
  },
}

export default meta
type Story = StoryObj<typeof ColorPicker>

export const Default: Story = {}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: '#3B82F6',
  },
}

export const WithHint: Story = {
  args: {
    hint: 'Choose your brand color',
  },
}

export const WithError: Story = {
  args: {
    error: 'Please select a color',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: '#22C55E',
  },
}

export const WithoutCustomInput: Story = {
  args: {
    label: 'Preset colors only',
    allowCustom: false,
  },
}

export const CustomPalette: Story = {
  args: {
    label: 'Brand colors',
    colors: [
      '#1E3A8A', '#1E40AF', '#1D4ED8', '#2563EB',
      '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE',
    ],
    defaultValue: '#2563EB',
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [color, setColor] = useState('#2C2824')
    return (
      <div className="space-y-4">
        <ColorPicker
          {...args}
          value={color}
          onValueChange={setColor}
        />
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-md border border-[rgba(184,164,142,0.25)]"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm text-[#5C574F]">Selected: {color}</span>
        </div>
      </div>
    )
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <ColorPicker label="Default" />
      <ColorPicker label="With Value" defaultValue="#EC4899" />
      <ColorPicker label="With Hint" hint="This color will be used for headers" />
      <ColorPicker label="With Error" error="Color selection required" />
      <ColorPicker label="Disabled" disabled defaultValue="#14B8A6" />
    </div>
  ),
}

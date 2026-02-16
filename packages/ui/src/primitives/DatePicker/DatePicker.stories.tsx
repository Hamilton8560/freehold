import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'Primitives/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label text' },
    error: { control: 'text', description: 'Error message' },
    hint: { control: 'text', description: 'Helper text' },
    placeholder: { control: 'text', description: 'Placeholder text' },
    disabled: { control: 'boolean', description: 'Disabled state' },
  },
  args: {
    label: 'Select date',
    placeholder: 'Pick a date',
  },
}

export default meta
type Story = StoryObj<typeof DatePicker>

export const Default: Story = {}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: new Date(),
  },
}

export const WithHint: Story = {
  args: {
    hint: 'Choose your preferred date',
  },
}

export const WithError: Story = {
  args: {
    error: 'Please select a valid date',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: new Date(),
  },
}

export const WithMinMaxDates: Story = {
  args: {
    label: 'Select date (this month only)',
    minDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    hint: 'Only dates in the current month are selectable',
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null)
    return (
      <div className="space-y-4">
        <DatePicker
          {...args}
          value={date}
          onValueChange={setDate}
        />
        <p className="text-sm text-[#5C574F]">
          Selected: {date ? date.toLocaleDateString() : '(none)'}
        </p>
      </div>
    )
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <DatePicker label="Default" />
      <DatePicker label="With Value" defaultValue={new Date()} />
      <DatePicker label="With Hint" hint="Select your birth date" />
      <DatePicker label="With Error" error="Date is required" />
      <DatePicker label="Disabled" disabled defaultValue={new Date()} />
    </div>
  ),
}

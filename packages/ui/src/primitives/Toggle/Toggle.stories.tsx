import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Toggle } from './Toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Primitives/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'], description: 'Toggle size' },
    label: { control: 'text', description: 'Label text' },
    error: { control: 'text', description: 'Error message' },
    hint: { control: 'text', description: 'Helper text' },
    disabled: { control: 'boolean', description: 'Disabled state' },
  },
  args: {
    label: 'Enable notifications',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false)
    return <Toggle {...args} checked={checked} onChange={setChecked} />
  },
}

export const Small: Story = {
  args: { size: 'sm' },
  render: (args) => {
    const [checked, setChecked] = useState(false)
    return <Toggle {...args} checked={checked} onChange={setChecked} />
  },
}

export const WithHint: Story = {
  args: { hint: 'Receive email notifications for updates' },
  render: (args) => {
    const [checked, setChecked] = useState(false)
    return <Toggle {...args} checked={checked} onChange={setChecked} />
  },
}

export const WithError: Story = {
  args: { error: 'This setting is required' },
  render: (args) => {
    const [checked, setChecked] = useState(false)
    return <Toggle {...args} checked={checked} onChange={setChecked} />
  },
}

export const AllSizes: Story = {
  render: () => {
    const [sm, setSm] = useState(true)
    const [md, setMd] = useState(true)
    return (
      <div className="flex flex-col gap-4">
        <Toggle label="Small" size="sm" checked={sm} onChange={setSm} />
        <Toggle label="Medium" size="md" checked={md} onChange={setMd} />
      </div>
    )
  },
}

import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label text' },
    error: { control: 'text', description: 'Error message' },
    hint: { control: 'text', description: 'Helper text' },
    disabled: { control: 'boolean', description: 'Disabled state' },
  },
  args: {
    label: 'Accept terms and conditions',
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {}

export const WithHint: Story = {
  args: {
    hint: 'You must agree to continue',
  },
}

export const WithError: Story = {
  args: {
    error: 'You must accept the terms',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

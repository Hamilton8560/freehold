import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text above the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    hint: {
      control: 'text',
      description: 'Helper text below the input',
    },
    error: {
      control: 'text',
      description: 'Error message (replaces hint when present)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Input type',
    },
  },
  args: {
    placeholder: 'Enter text...',
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Enter your text',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
  },
}

export const WithHint: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    hint: 'Must be at least 8 characters',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@example.com',
    defaultValue: 'invalid-email',
    error: 'Please enter a valid email address',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit',
    disabled: true,
    defaultValue: 'Read only value',
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <Input
        label="Default"
        placeholder="Enter text"
      />
      <Input
        label="With Value"
        defaultValue="Some content"
      />
      <Input
        label="With Hint"
        placeholder="Enter text"
        hint="This is helpful context"
      />
      <Input
        label="With Error"
        defaultValue="Invalid"
        error="This field has an error"
      />
      <Input
        label="Disabled"
        defaultValue="Cannot edit"
        disabled
      />
    </div>
  ),
}

export const InputTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <Input label="Text" type="text" placeholder="Plain text" />
      <Input label="Email" type="email" placeholder="you@example.com" />
      <Input label="Password" type="password" placeholder="Enter password" />
      <Input label="Number" type="number" placeholder="0" />
      <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
    </div>
  ),
}

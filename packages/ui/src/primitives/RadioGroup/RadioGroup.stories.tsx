import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from './RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  title: 'Primitives/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Group label text' },
    error: { control: 'text', description: 'Error message' },
    hint: { control: 'text', description: 'Helper text' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation',
    },
  },
  args: {
    label: 'Select an option',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'option2',
  },
}

export const WithHint: Story = {
  args: {
    hint: 'Please select one of the options above',
  },
}

export const WithError: Story = {
  args: {
    error: 'You must select an option',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'option1',
  },
}

export const DisabledOption: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2 (disabled)', disabled: true },
      { value: 'option3', label: 'Option 3' },
    ],
  },
}

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    label: 'Choose your preference',
  },
}

export const WithIcons: Story = {
  args: {
    label: 'Select feature',
    options: [
      { value: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
      { value: 'reports', label: 'Reports', icon: 'reports' },
      { value: 'settings', label: 'Settings', icon: 'settings' },
    ],
  },
}

export const WithDescriptions: Story = {
  args: {
    label: 'Select a plan',
    options: [
      {
        value: 'starter',
        label: 'Starter',
        description: 'Perfect for individuals and small projects',
      },
      {
        value: 'professional',
        label: 'Professional',
        description: 'Best for growing teams and businesses',
      },
      {
        value: 'enterprise',
        label: 'Enterprise',
        description: 'Custom solutions for large organizations',
      },
    ],
  },
}

export const WithIconsAndDescriptions: Story = {
  args: {
    label: 'Select module',
    options: [
      {
        value: 'clients',
        label: 'Clients',
        icon: 'clients',
        description: 'Manage your client relationships',
      },
      {
        value: 'pipeline',
        label: 'Pipeline',
        icon: 'pipeline',
        description: 'Track deals and opportunities',
      },
      {
        value: 'billing',
        label: 'Billing',
        icon: 'billing',
        description: 'Handle invoices and payments',
      },
    ],
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('option1')
    return (
      <div className="space-y-4">
        <RadioGroup
          {...args}
          value={value}
          onValueChange={setValue}
        />
        <p className="text-sm text-[#5C574F]">Selected: {value}</p>
      </div>
    )
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-8 max-w-md">
      <RadioGroup
        label="Default"
        options={[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
        ]}
      />
      <RadioGroup
        label="With Value"
        defaultValue="b"
        options={[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
        ]}
      />
      <RadioGroup
        label="With Hint"
        hint="Select your preferred option"
        options={[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
        ]}
      />
      <RadioGroup
        label="With Error"
        error="Selection is required"
        options={[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
        ]}
      />
      <RadioGroup
        label="Disabled"
        disabled
        defaultValue="a"
        options={[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
        ]}
      />
      <RadioGroup
        label="Horizontal Layout"
        orientation="horizontal"
        options={[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
          { value: 'c', label: 'Option C' },
        ]}
      />
    </div>
  ),
}

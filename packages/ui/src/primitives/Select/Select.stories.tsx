import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label text' },
    placeholder: { control: 'text', description: 'Placeholder text' },
    error: { control: 'text', description: 'Error message' },
    hint: { control: 'text', description: 'Helper text' },
    disabled: { control: 'boolean', description: 'Disabled state' },
  },
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'au', label: 'Australia' },
    ],
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {}

export const WithHint: Story = {
  args: {
    hint: 'Select your country of residence',
  },
}

export const WithError: Story = {
  args: {
    error: 'Please select a country',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'uk', label: 'United Kingdom', disabled: true },
    ],
  },
}

export const WithIcons: Story = {
  args: {
    label: 'Navigation',
    placeholder: 'Select a page',
    options: [
      { value: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
      { value: 'clients', label: 'Clients', icon: 'clients' },
      { value: 'pipeline', label: 'Pipeline', icon: 'pipeline' },
      { value: 'billing', label: 'Billing', icon: 'billing' },
      { value: 'reports', label: 'Reports', icon: 'reports' },
      { value: 'settings', label: 'Settings', icon: 'settings' },
    ],
  },
}

export const WithMixedIcons: Story = {
  args: {
    label: 'Status',
    placeholder: 'Select status',
    options: [
      { value: 'success', label: 'Success', icon: 'check' },
      { value: 'warning', label: 'Warning', icon: 'warning' },
      { value: 'pending', label: 'Pending' },
      { value: 'archived', label: 'Archived' },
    ],
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <Select
        label="Default"
        placeholder="Select an option"
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />
      <Select
        label="With Icons"
        placeholder="Select a page"
        options={[
          { value: 'home', label: 'Home', icon: 'home' },
          { value: 'settings', label: 'Settings', icon: 'settings' },
        ]}
      />
      <Select
        label="With Hint"
        placeholder="Select an option"
        hint="This is a helpful hint"
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />
      <Select
        label="With Error"
        placeholder="Select an option"
        error="This field is required"
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />
      <Select
        label="Disabled"
        placeholder="Select an option"
        disabled
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />
    </div>
  ),
}

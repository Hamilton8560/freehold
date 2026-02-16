import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FilterSelect } from './FilterSelect'

const meta: Meta<typeof FilterSelect> = {
  title: 'Composites/FilterSelect',
  component: FilterSelect,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text', description: 'Placeholder text' },
    disabled: { control: 'boolean', description: 'Disabled state' },
  },
  args: {
    placeholder: 'Filter by status',
    options: [
      { value: 'pending', label: 'Pending' },
      { value: 'approved', label: 'Approved' },
      { value: 'paid', label: 'Paid' },
    ],
  },
}

export default meta
type Story = StoryObj<typeof FilterSelect>

export const Default: Story = {}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'approved',
  },
}

export const WithMoreOptions: Story = {
  args: {
    placeholder: 'Filter by department',
    options: [
      { value: 'engineering', label: 'Engineering' },
      { value: 'design', label: 'Design' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'hr', label: 'Human Resources' },
      { value: 'finance', label: 'Finance' },
    ],
  },
}

export const WithIcon: Story = {
  args: {
    placeholder: 'Filter',
    icon: (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
        />
      </svg>
    ),
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'pending',
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <div className="space-y-4">
        <FilterSelect
          {...args}
          value={value}
          onValueChange={setValue}
        />
        <p className="text-sm text-[#5C574F]">
          Selected: {value || '(none)'}
        </p>
      </div>
    )
  },
}

export const MultipleFilters: Story = {
  render: () => (
    <div className="flex gap-3">
      <FilterSelect
        placeholder="Status"
        options={[
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ]}
      />
      <FilterSelect
        placeholder="Department"
        options={[
          { value: 'engineering', label: 'Engineering' },
          { value: 'design', label: 'Design' },
          { value: 'marketing', label: 'Marketing' },
        ]}
      />
      <FilterSelect
        placeholder="Role"
        options={[
          { value: 'admin', label: 'Admin' },
          { value: 'member', label: 'Member' },
          { value: 'viewer', label: 'Viewer' },
        ]}
      />
    </div>
  ),
}

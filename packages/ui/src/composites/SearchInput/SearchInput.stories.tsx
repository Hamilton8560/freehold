import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SearchInput } from './SearchInput'

const meta: Meta<typeof SearchInput> = {
  title: 'Composites/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text', description: 'Placeholder text' },
    disabled: { control: 'boolean', description: 'Disabled state' },
  },
  args: {
    placeholder: 'Search...',
  },
}

export default meta
type Story = StoryObj<typeof SearchInput>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return <SearchInput {...args} value={value} onChange={(e) => setValue(e.target.value)} onClear={() => setValue('')} />
  },
}

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState('Components')
    return <SearchInput placeholder="Search components..." value={value} onChange={(e) => setValue(e.target.value)} onClear={() => setValue('')} />
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Search disabled...',
  },
}

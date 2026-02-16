import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ChatInput } from './ChatInput'

const meta: Meta<typeof ChatInput> = {
  title: 'Patterns/ChatInput',
  component: ChatInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text', description: 'Placeholder text' },
    disabled: { control: 'boolean', description: 'Disabled state' },
  },
}

export default meta
type Story = StoryObj<typeof ChatInput>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div className="max-w-md rounded-lg border border-[rgba(184,164,142,0.15)] overflow-hidden">
        <ChatInput value={value} onChange={setValue} onSubmit={() => {}} placeholder="Type a message..." />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="max-w-md rounded-lg border border-[rgba(184,164,142,0.15)] overflow-hidden">
      <ChatInput value="" onChange={() => {}} onSubmit={() => {}} disabled placeholder="Chat disabled..." />
    </div>
  ),
}

import type { Meta, StoryObj } from '@storybook/react'
import { ChatMessage } from './ChatMessage'

const meta: Meta<typeof ChatMessage> = {
  title: 'Patterns/ChatMessage',
  component: ChatMessage,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ChatMessage>

export const UserMessage: Story = {
  args: {
    message: { id: '1', role: 'user', content: 'Hello! Can you help me with payroll?' },
  },
}

export const AssistantMessage: Story = {
  args: {
    message: { id: '2', role: 'assistant', content: 'Of course! I can help you calculate payroll, manage employees, and more.' },
  },
}

export const SystemMessage: Story = {
  args: {
    message: { id: '3', role: 'system', content: 'Chat session started' },
  },
}

export const AllRoles: Story = {
  render: () => (
    <div className="max-w-md space-y-3">
      <ChatMessage message={{ id: '1', role: 'user', content: 'Hello!' }} />
      <ChatMessage message={{ id: '2', role: 'assistant', content: 'Hi there! How can I help?' }} />
      <ChatMessage message={{ id: '3', role: 'system', content: 'Session started' }} />
    </div>
  ),
}

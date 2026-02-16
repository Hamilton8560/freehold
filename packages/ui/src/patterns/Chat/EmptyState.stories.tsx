import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState } from './EmptyState'

const meta: Meta<typeof EmptyState> = {
  title: 'Patterns/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text', description: 'Empty state message' },
  },
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  args: {
    message: 'How can I help you today?',
    suggestions: ['What is Freehold?', 'Show me payroll stats', 'Calculate my salary'],
  },
}

export const WithoutSuggestions: Story = {
  args: {
    message: 'Start a conversation to get help.',
  },
}

export const CustomMessage: Story = {
  args: {
    message: 'Welcome! Ask me anything about your business.',
    suggestions: ['Revenue report', 'Team overview'],
  },
}

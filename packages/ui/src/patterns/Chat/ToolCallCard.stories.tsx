import type { Meta, StoryObj } from '@storybook/react'
import { ToolCallCard } from './ToolCallCard'

const meta: Meta<typeof ToolCallCard> = {
  title: 'Patterns/ToolCallCard',
  component: ToolCallCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ToolCallCard>

export const Completed: Story = {
  args: {
    toolCall: {
      id: '1',
      toolName: 'getCompanyInfo',
      args: { topic: 'overview' },
      result: { info: 'Freehold is a modern business management platform.' },
      status: 'completed',
    },
  },
}

export const Pending: Story = {
  args: {
    toolCall: {
      id: '2',
      toolName: 'calculatePayroll',
      args: { salary: 85000, taxRate: 0.25 },
      status: 'pending',
    },
  },
}

export const Running: Story = {
  args: {
    toolCall: {
      id: '3',
      toolName: 'fetchEmployees',
      args: { department: 'Engineering' },
      status: 'running',
    },
  },
}

export const Error: Story = {
  args: {
    toolCall: {
      id: '4',
      toolName: 'sendEmail',
      args: { to: 'user@example.com' },
      status: 'error',
      error: 'Failed to connect to email service',
    },
  },
}

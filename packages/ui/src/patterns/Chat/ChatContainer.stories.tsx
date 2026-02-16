import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ChatContainer } from './ChatContainer'
import type { ChatMessageData } from './types'

const MOCK_MESSAGES: ChatMessageData[] = [
  { id: '1', role: 'user', content: 'What is Freehold?' },
  { id: '2', role: 'assistant', content: 'Freehold is a modern business management platform with payroll, CRM, pipeline management, and AI-powered automation.' },
  { id: '3', role: 'user', content: 'How does payroll work?' },
  { id: '4', role: 'assistant', content: 'Payroll is processed automatically each pay period. You can review, approve, and manage deductions all from the dashboard.' },
]

const meta: Meta<typeof ChatContainer> = {
  title: 'Patterns/ChatContainer',
  component: ChatContainer,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ChatContainer>

export const Default: Story = {
  render: () => {
    const [input, setInput] = useState('')
    return (
      <div className="max-w-lg">
        <ChatContainer
          messages={MOCK_MESSAGES}
          input={input}
          onInputChange={setInput}
          onSubmit={() => {}}
          title="Freehold Assistant"
          subtitle="AI-powered help"
          assistant={{ name: 'Freehold AI' }}
          maxHeight="400px"
        />
      </div>
    )
  },
}

export const Empty: Story = {
  render: () => {
    const [input, setInput] = useState('')
    return (
      <div className="max-w-lg">
        <ChatContainer
          messages={[]}
          input={input}
          onInputChange={setInput}
          onSubmit={() => {}}
          title="Freehold Assistant"
          emptyStateMessage="How can I help you today?"
          suggestions={['What is Freehold?', 'Show me payroll stats']}
          maxHeight="400px"
        />
      </div>
    )
  },
}

import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider, useToast } from './ToastContext'
import { Button } from '../Button'

const meta: Meta<typeof ToastProvider> = {
  title: 'Primitives/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider position="bottom-right">
        <Story />
      </ToastProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ToastProvider>

function ToastTrigger({ variant }: { variant: 'success' | 'error' | 'warning' | 'info' }) {
  const { toast } = useToast()
  const messages: Record<string, { title: string; description: string }> = {
    success: { title: 'Success!', description: 'Your changes have been saved.' },
    error: { title: 'Error', description: 'Something went wrong. Please try again.' },
    warning: { title: 'Warning', description: 'Please review before continuing.' },
    info: { title: 'Info', description: 'Here is some helpful information.' },
  }
  const msg = messages[variant]
  return (
    <Button
      variant={variant === 'error' ? 'danger' : variant === 'success' ? 'primary' : 'secondary'}
      onClick={() => toast({ title: msg.title, description: msg.description, variant, duration: 5000 })}
    >
      Show {variant.charAt(0).toUpperCase() + variant.slice(1)} Toast
    </Button>
  )
}

export const Success: Story = {
  render: () => <ToastTrigger variant="success" />,
}

export const Error: Story = {
  render: () => <ToastTrigger variant="error" />,
}

export const Warning: Story = {
  render: () => <ToastTrigger variant="warning" />,
}

export const Info: Story = {
  render: () => <ToastTrigger variant="info" />,
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ToastTrigger variant="success" />
      <ToastTrigger variant="error" />
      <ToastTrigger variant="warning" />
      <ToastTrigger variant="info" />
    </div>
  ),
}

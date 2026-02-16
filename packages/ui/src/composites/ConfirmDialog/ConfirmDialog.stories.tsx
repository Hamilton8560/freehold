import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ConfirmDialog } from './ConfirmDialog'
import { Button } from '../../primitives/Button'

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Composites/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'danger'], description: 'Dialog variant' },
    title: { control: 'text', description: 'Dialog title' },
    description: { control: 'text', description: 'Dialog description' },
    confirmLabel: { control: 'text', description: 'Confirm button label' },
    cancelLabel: { control: 'text', description: 'Cancel button label' },
  },
}

export default meta
type Story = StoryObj<typeof ConfirmDialog>

function ConfirmDemo({ variant = 'default' }: { variant?: 'default' | 'danger' }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant={variant === 'danger' ? 'danger' : 'primary'} onClick={() => setOpen(true)}>
        Open {variant === 'danger' ? 'Danger' : 'Confirm'} Dialog
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={variant === 'danger' ? 'Delete Item' : 'Confirm Action'}
        description={variant === 'danger' ? 'Are you sure? This action cannot be undone.' : 'Please confirm this action.'}
        confirmLabel={variant === 'danger' ? 'Delete' : 'Confirm'}
        variant={variant}
        onConfirm={() => setOpen(false)}
      />
    </>
  )
}

export const Default: Story = {
  render: () => <ConfirmDemo />,
}

export const Danger: Story = {
  render: () => <ConfirmDemo variant="danger" />,
}

export const BothVariants: Story = {
  render: () => (
    <div className="flex gap-3">
      <ConfirmDemo variant="default" />
      <ConfirmDemo variant="danger" />
    </div>
  ),
}

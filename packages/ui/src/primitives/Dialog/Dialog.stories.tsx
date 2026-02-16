import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogClose } from './Dialog'
import { Button } from '../Button'

const meta: Meta<typeof DialogContent> = {
  title: 'Primitives/Dialog',
  component: DialogContent,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'], description: 'Dialog size' },
    showCloseButton: { control: 'boolean', description: 'Show close button' },
  },
}

export default meta
type Story = StoryObj<typeof DialogContent>

function DialogDemo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent size={size}>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p className="text-[#5C574F]">This is the dialog body content. You can add any content here.</p>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button variant="primary">Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export const Default: Story = {
  render: () => <DialogDemo />,
}

export const Small: Story = {
  render: () => <DialogDemo size="sm" />,
}

export const Large: Story = {
  render: () => <DialogDemo size="lg" />,
}

export const ExtraLarge: Story = {
  render: () => <DialogDemo size="xl" />,
}

export const Fullscreen: Story = {
  render: () => <DialogDemo size="full" />,
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <DialogDemo size="sm" />
      <DialogDemo size="md" />
      <DialogDemo size="lg" />
      <DialogDemo size="xl" />
    </div>
  ),
}

import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Primitives/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['line', 'circle', 'rectangle'], description: 'Skeleton variant' },
    width: { control: 'text', description: 'Width' },
    height: { control: 'text', description: 'Height' },
  },
  args: {
    variant: 'rectangle',
    width: '100%',
    height: 80,
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Rectangle: Story = {
  args: { variant: 'rectangle', width: '100%', height: 80 },
}

export const Line: Story = {
  args: { variant: 'line', width: '100%', height: 16 },
}

export const Circle: Story = {
  args: { variant: 'circle', width: 48, height: 48 },
}

export const TextBlock: Story = {
  render: () => (
    <div className="max-w-sm space-y-3">
      <Skeleton variant="line" width="100%" height={16} />
      <Skeleton variant="line" width="80%" height={16} />
      <Skeleton variant="line" width="60%" height={16} />
    </div>
  ),
}

export const CardSkeleton: Story = {
  render: () => (
    <div className="max-w-sm p-4 rounded-lg border border-[rgba(184,164,142,0.15)] space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="line" width="60%" height={14} />
          <Skeleton variant="line" width="40%" height={12} />
        </div>
      </div>
      <Skeleton variant="rectangle" width="100%" height={120} />
      <Skeleton variant="line" width="100%" height={14} />
      <Skeleton variant="line" width="75%" height={14} />
    </div>
  ),
}

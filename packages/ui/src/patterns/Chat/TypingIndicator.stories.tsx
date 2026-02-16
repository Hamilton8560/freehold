import type { Meta, StoryObj } from '@storybook/react'
import { TypingIndicator } from './TypingIndicator'

const meta: Meta<typeof TypingIndicator> = {
  title: 'Patterns/TypingIndicator',
  component: TypingIndicator,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['dots', 'wagon-wheel'], description: 'Indicator variant' },
  },
}

export default meta
type Story = StoryObj<typeof TypingIndicator>

export const Default: Story = {}

export const Dots: Story = {
  args: { variant: 'dots' },
}

export const WagonWheel: Story = {
  args: { variant: 'wagon-wheel' },
}

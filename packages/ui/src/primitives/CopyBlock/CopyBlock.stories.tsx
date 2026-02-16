import type { Meta, StoryObj } from '@storybook/react'
import { CopyBlock } from './CopyBlock'

const meta: Meta<typeof CopyBlock> = {
  title: 'Primitives/CopyBlock',
  component: CopyBlock,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: 'Text to copy' },
    label: { control: 'text', description: 'Display text' },
  },
  args: {
    value: 'npm install @freehold/ui',
  },
}

export default meta
type Story = StoryObj<typeof CopyBlock>

export const Default: Story = {}

export const WithLabel: Story = {
  args: {
    value: 'sk_live_abc123def456',
    label: 'API Key',
  },
}

export const LongValue: Story = {
  args: {
    value: 'npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir',
  },
}

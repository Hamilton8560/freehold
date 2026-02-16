import type { Meta, StoryObj } from '@storybook/react'
import { Navbar } from './Navbar'

const meta: Meta<typeof Navbar> = {
  title: 'Composites/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Navbar>

export const Default: Story = {
  args: {
    items: [
      { label: 'Platform', href: '#' },
      { label: 'Solutions', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'About', href: '#' },
    ],
    cta: { label: 'Get Started', href: '#' },
  },
}

export const WithoutCTA: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Docs', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
}

export const MinimalItems: Story = {
  args: {
    items: [
      { label: 'Docs', href: '#' },
      { label: 'Support', href: '#' },
    ],
    cta: { label: 'Sign Up', href: '#' },
  },
}

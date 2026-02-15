import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { Icon } from '../Icon'

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'accent', 'danger'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
      description: 'Button size',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
}

export const Accent: Story = {
  args: {
    variant: 'accent',
    children: 'Accent Button',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
}

export const Loading: Story = {
  args: {
    variant: 'primary',
    isLoading: true,
    children: 'Loading...',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
      <Button variant="primary" size="icon">
        <Icon name="plus" size="md" color="inherit" />
      </Button>
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="primary">
        <Icon name="plus" size="sm" color="inherit" />
        Add Item
      </Button>
      <Button variant="secondary">
        <Icon name="settings" size="sm" color="inherit" />
        Settings
      </Button>
    </div>
  ),
}

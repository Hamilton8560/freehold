import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './Icon'
import type { IconName } from './icons'

const allIcons: IconName[] = [
  'dashboard', 'clients', 'pipeline', 'billing', 'reports', 'ai', 'settings',
  'search', 'check', 'warning', 'arrow', 'shield', 'growth', 'deploy',
  'automation', 'home', 'plus', 'minus', 'close', 'chevron-down',
  'chevron-up', 'chevron-left', 'chevron-right',
]

const meta: Meta<typeof Icon> = {
  title: 'Primitives/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: allIcons,
      description: 'Icon name',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Icon size',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'muted', 'success', 'warning', 'error', 'inherit'],
      description: 'Icon color',
    },
  },
  args: {
    name: 'dashboard',
    size: 'md',
    color: 'default',
  },
}

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {
  args: {
    name: 'dashboard',
  },
}

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-6">
      {allIcons.map((name) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <Icon name={name} size="lg" color="primary" />
          <span className="text-xs text-[#5C574F]">{name}</span>
        </div>
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <Icon name="dashboard" size="xs" />
        <span className="text-xs text-[#5C574F]">xs (12px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="dashboard" size="sm" />
        <span className="text-xs text-[#5C574F]">sm (16px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="dashboard" size="md" />
        <span className="text-xs text-[#5C574F]">md (20px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="dashboard" size="lg" />
        <span className="text-xs text-[#5C574F]">lg (24px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="dashboard" size="xl" />
        <span className="text-xs text-[#5C574F]">xl (32px)</span>
      </div>
    </div>
  ),
}

export const AllColors: Story = {
  render: () => (
    <div className="flex gap-6">
      <div className="flex flex-col items-center gap-2">
        <Icon name="check" size="lg" color="default" />
        <span className="text-xs text-[#5C574F]">default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="check" size="lg" color="primary" />
        <span className="text-xs text-[#5C574F]">primary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="check" size="lg" color="secondary" />
        <span className="text-xs text-[#5C574F]">secondary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="check" size="lg" color="muted" />
        <span className="text-xs text-[#5C574F]">muted</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="check" size="lg" color="success" />
        <span className="text-xs text-[#5C574F]">success</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="warning" size="lg" color="warning" />
        <span className="text-xs text-[#5C574F]">warning</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="close" size="lg" color="error" />
        <span className="text-xs text-[#5C574F]">error</span>
      </div>
    </div>
  ),
}

export const NavigationIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Icon name="home" size="md" color="primary" />
      <Icon name="dashboard" size="md" color="primary" />
      <Icon name="clients" size="md" color="primary" />
      <Icon name="pipeline" size="md" color="primary" />
      <Icon name="billing" size="md" color="primary" />
      <Icon name="reports" size="md" color="primary" />
      <Icon name="settings" size="md" color="primary" />
    </div>
  ),
}

export const ActionIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Icon name="plus" size="md" color="primary" />
      <Icon name="minus" size="md" color="primary" />
      <Icon name="close" size="md" color="primary" />
      <Icon name="check" size="md" color="success" />
      <Icon name="search" size="md" color="primary" />
      <Icon name="arrow" size="md" color="primary" />
    </div>
  ),
}

export const ChevronIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Icon name="chevron-up" size="md" color="primary" />
      <Icon name="chevron-down" size="md" color="primary" />
      <Icon name="chevron-left" size="md" color="primary" />
      <Icon name="chevron-right" size="md" color="primary" />
    </div>
  ),
}

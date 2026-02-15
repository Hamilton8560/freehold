import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card'
import { Button } from '../Button'

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'stat'],
      description: 'Visual style variant',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Internal padding',
    },
  },
  args: {
    variant: 'default',
    padding: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <p className="text-sm text-[#5C574F]">This is a default card with some content.</p>
      </CardContent>
    </Card>
  ),
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
  },
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <p className="text-sm text-[#5C574F]">This card has a shadow and hover effect.</p>
      </CardContent>
    </Card>
  ),
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <p className="text-sm text-[#5C574F]">This card has a thicker border.</p>
      </CardContent>
    </Card>
  ),
}

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Card variant="default" padding="lg">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a description of the card content.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[#5C574F]">
          Main content goes here. This could be any kind of information or interactive elements.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="primary" size="sm">Action</Button>
        <Button variant="ghost" size="sm" className="ml-2">Cancel</Button>
      </CardFooter>
    </Card>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-2xl">
      <Card variant="default" padding="md">
        <CardContent>
          <p className="font-medium text-[#2C2824]">Default</p>
          <p className="text-sm text-[#5C574F]">Subtle border</p>
        </CardContent>
      </Card>
      <Card variant="elevated" padding="md">
        <CardContent>
          <p className="font-medium text-[#2C2824]">Elevated</p>
          <p className="text-sm text-[#5C574F]">With shadow</p>
        </CardContent>
      </Card>
      <Card variant="outlined" padding="md">
        <CardContent>
          <p className="font-medium text-[#2C2824]">Outlined</p>
          <p className="text-sm text-[#5C574F]">Thick border</p>
        </CardContent>
      </Card>
      <Card variant="stat" padding="md">
        <CardContent>
          <p className="font-medium text-[#2C2824]">Stat</p>
          <p className="text-sm text-[#5C574F]">For metrics</p>
        </CardContent>
      </Card>
    </div>
  ),
}

export const PaddingSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Card variant="outlined" padding="sm">
        <CardContent>
          <p className="text-sm">Small padding (p-4)</p>
        </CardContent>
      </Card>
      <Card variant="outlined" padding="md">
        <CardContent>
          <p className="text-sm">Medium padding (p-6)</p>
        </CardContent>
      </Card>
      <Card variant="outlined" padding="lg">
        <CardContent>
          <p className="text-sm">Large padding (p-8)</p>
        </CardContent>
      </Card>
    </div>
  ),
}

import type { Meta, StoryObj } from '@storybook/react'
import { RichTextDisplay } from './RichTextDisplay'

const meta: Meta<typeof RichTextDisplay> = {
  title: 'Composites/RichTextDisplay',
  component: RichTextDisplay,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text', description: 'HTML content to render' },
  },
  args: {
    content: '<p>This is <strong>rich text</strong> content with <em>formatting</em>.</p>',
  },
}

export default meta
type Story = StoryObj<typeof RichTextDisplay>

export const Default: Story = {}

export const WithLists: Story = {
  args: {
    content: '<h2>Features</h2><ul><li>Automated payroll</li><li>CRM integration</li><li>AI-powered insights</li></ul>',
  },
}

export const FullContent: Story = {
  args: {
    content: '<h1>Welcome</h1><p>This is a <strong>rich text</strong> display component. It renders <em>HTML content</em> with consistent typography.</p><h2>Features</h2><ul><li>Supports lists</li><li>And other formatting</li></ul><blockquote>This is a blockquote</blockquote><p>And a <a href="#">link example</a>.</p>',
  },
}

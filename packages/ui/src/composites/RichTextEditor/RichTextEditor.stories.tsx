import type { Meta, StoryObj } from '@storybook/react'
import { RichTextEditor } from './RichTextEditor'

const meta: Meta<typeof RichTextEditor> = {
  title: 'Composites/RichTextEditor',
  component: RichTextEditor,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text above the editor',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when empty',
    },
    hint: {
      control: 'text',
      description: 'Helper text below the editor',
    },
    error: {
      control: 'text',
      description: 'Error message (replaces hint when present)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the editor',
    },
    minHeight: {
      control: 'number',
      description: 'Minimum height in pixels',
    },
  },
  args: {
    placeholder: 'Start typing...',
    minHeight: 200,
  },
}

export default meta
type Story = StoryObj<typeof RichTextEditor>

export const Default: Story = {
  args: {
    placeholder: 'Write something...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a description...',
  },
}

export const WithHint: Story = {
  args: {
    label: 'Content',
    placeholder: 'Write your content...',
    hint: 'Use the toolbar to format your text',
  },
}

export const WithError: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    error: 'Please enter some content',
  },
}

export const WithDefaultContent: Story = {
  args: {
    label: 'Article',
    defaultContent: '<h1>Welcome</h1><p>This is some <strong>bold</strong> and <em>italic</em> text.</p><ul><li>First item</li><li>Second item</li></ul>',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Read Only',
    defaultContent: '<p>This content cannot be edited.</p>',
    disabled: true,
  },
}

export const Playground: Story = {
  render: () => (
    <div className="max-w-2xl">
      <RichTextEditor
        label="Rich Text Editor"
        placeholder="Try all the formatting options..."
        hint="Bold, Italic, Headings (H1-H3), Lists, Blockquote, Code Block, Links"
        minHeight={300}
        onChange={(html) => console.log('Content:', html)}
      />
    </div>
  ),
}

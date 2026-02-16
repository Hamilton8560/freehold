import type { Meta, StoryObj } from '@storybook/react'
import { CodeCanvas } from './CodeCanvas'

const meta: Meta<typeof CodeCanvas> = {
  title: 'Primitives/CodeCanvas',
  component: CodeCanvas,
  tags: ['autodocs'],
  argTypes: {
    language: { control: 'select', options: ['tsx', 'ts', 'jsx', 'js', 'typescript', 'javascript'], description: 'Language' },
    title: { control: 'text', description: 'Header title' },
    showLineNumbers: { control: 'boolean', description: 'Show line numbers' },
    showCopy: { control: 'boolean', description: 'Show copy button' },
    maxHeight: { control: 'text', description: 'Max height with scroll' },
  },
  args: {
    code: `import { Button } from '@freehold/ui'\n\nexport function Example() {\n  return <Button>Click me</Button>\n}`,
    language: 'tsx',
    showLineNumbers: true,
    showCopy: true,
  },
}

export default meta
type Story = StoryObj<typeof CodeCanvas>

export const Default: Story = {}

export const WithTitle: Story = {
  args: {
    title: 'example.tsx',
  },
}

export const NoLineNumbers: Story = {
  args: {
    showLineNumbers: false,
    title: 'Inline snippet',
  },
}

export const WithMaxHeight: Story = {
  args: {
    title: 'long-file.tsx',
    maxHeight: '200px',
    code: Array.from({ length: 30 }, (_, i) => `const line${i + 1} = 'value ${i + 1}'`).join('\n'),
  },
}

export const JavaScriptCode: Story = {
  args: {
    language: 'js',
    title: 'config.js',
    code: `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n        sand: '#B8A48E',\n      },\n    },\n  },\n}`,
  },
}

import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FileInput } from './FileInput'

const meta: Meta<typeof FileInput> = {
  title: 'Primitives/FileInput',
  component: FileInput,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label text' },
    error: { control: 'text', description: 'Error message' },
    hint: { control: 'text', description: 'Helper text' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    multiple: { control: 'boolean', description: 'Allow multiple files' },
    accept: { control: 'text', description: 'Accepted file types' },
  },
  args: {
    label: 'Upload file',
  },
}

export default meta
type Story = StoryObj<typeof FileInput>

export const Default: Story = {}

export const WithHint: Story = {
  args: {
    hint: 'Upload your documents here',
  },
}

export const WithError: Story = {
  args: {
    error: 'Please upload a valid file',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const ImagesOnly: Story = {
  args: {
    label: 'Upload image',
    accept: 'image/*',
    hint: 'PNG, JPG, GIF up to 5MB',
    maxSize: 5 * 1024 * 1024,
  },
}

export const PDFOnly: Story = {
  args: {
    label: 'Upload PDF',
    accept: '.pdf',
    hint: 'PDF files only',
  },
}

export const MultipleFiles: Story = {
  args: {
    label: 'Upload files',
    multiple: true,
    maxFiles: 5,
    hint: 'You can upload up to 5 files',
  },
}

export const WithSizeLimit: Story = {
  args: {
    label: 'Upload (max 1MB)',
    maxSize: 1024 * 1024,
    hint: 'Files larger than 1MB will be rejected',
  },
}

export const DocumentUpload: Story = {
  args: {
    label: 'Upload documents',
    accept: '.pdf,.doc,.docx,.txt',
    multiple: true,
    maxFiles: 10,
    maxSize: 10 * 1024 * 1024,
    hint: 'PDF, Word, or text files up to 10MB each',
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [files, setFiles] = useState<File[]>([])
    return (
      <div className="space-y-4">
        <FileInput
          {...args}
          multiple
          value={files}
          onValueChange={setFiles}
        />
        <div className="text-sm text-[#5C574F]">
          <p>Files selected: {files.length}</p>
          {files.length > 0 && (
            <ul className="mt-1 list-disc list-inside">
              {files.map((f, i) => (
                <li key={i}>{f.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <FileInput label="Default" />
      <FileInput label="With Hint" hint="Drag and drop or click to upload" />
      <FileInput label="With Error" error="File upload failed" />
      <FileInput label="Disabled" disabled />
      <FileInput label="Images Only" accept="image/*" />
    </div>
  ),
}

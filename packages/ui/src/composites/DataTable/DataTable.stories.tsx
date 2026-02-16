import type { Meta, StoryObj } from '@storybook/react'
import { DataTable, type DataTableProps } from './DataTable'
import { Badge } from '../../primitives/Badge'

interface SampleRow {
  id: number
  name: string
  email: string
  status: string
  role: string
}

const sampleData: SampleRow[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'Active', role: 'Engineer' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'Active', role: 'Designer' },
  { id: 3, name: 'Carol Davis', email: 'carol@example.com', status: 'Inactive', role: 'Manager' },
  { id: 4, name: 'David Lee', email: 'david@example.com', status: 'Active', role: 'Engineer' },
  { id: 5, name: 'Emma Wilson', email: 'emma@example.com', status: 'Active', role: 'HR' },
]

const meta: Meta<DataTableProps<SampleRow>> = {
  title: 'Composites/DataTable',
  component: DataTable,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<DataTableProps<SampleRow>>

export const Default: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'role', header: 'Role' },
      { key: 'status', header: 'Status' },
    ],
    data: sampleData,
    keyExtractor: (item) => item.id,
  },
}

export const WithCustomRender: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'status', header: 'Status', render: (item) => <Badge variant={item.status === 'Active' ? 'approved' : 'error'}>{item.status}</Badge> },
    ],
    data: sampleData,
    keyExtractor: (item) => item.id,
  },
}

export const Empty: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
    ],
    data: [],
    keyExtractor: (item) => item.id,
    emptyMessage: 'No employees found',
  },
}

export const Loading: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
    ],
    data: [],
    keyExtractor: (item) => item.id,
    isLoading: true,
  },
}

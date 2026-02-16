import type { Meta, StoryObj } from '@storybook/react'
import { Dashboard } from './Dashboard'
import { Badge } from '../../primitives/Badge'

interface SampleItem {
  id: string
  name: string
  department: string
  status: string
  amount: number
}

const sampleData: SampleItem[] = [
  { id: '1', name: 'Alice Johnson', department: 'Engineering', status: 'Active', amount: 8500 },
  { id: '2', name: 'Bob Smith', department: 'Design', status: 'Active', amount: 6500 },
  { id: '3', name: 'Carol Davis', department: 'Engineering', status: 'Inactive', amount: 7800 },
  { id: '4', name: 'David Lee', department: 'Marketing', status: 'Active', amount: 7200 },
  { id: '5', name: 'Emma Wilson', department: 'HR', status: 'Active', amount: 5800 },
]

const meta: Meta<typeof Dashboard<SampleItem>> = {
  title: 'Patterns/Dashboard',
  component: Dashboard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Dashboard<SampleItem>>

export const Default: Story = {
  render: () => (
    <Dashboard<SampleItem>
      data={sampleData}
      keyExtractor={(item) => item.id}
      header={{ title: 'Team Dashboard', description: 'Overview of team members and stats.' }}
      columns={[
        { key: 'name', header: 'Name' },
        { key: 'department', header: 'Department' },
        { key: 'status', header: 'Status', render: (item) => <Badge variant={item.status === 'Active' ? 'approved' : 'error'}>{item.status}</Badge> },
      ]}
      stats={[
        { key: 'total', label: 'Total Members', getValue: (data) => data.length },
        { key: 'active', label: 'Active', getValue: (data) => data.filter((d) => d.status === 'Active').length },
        { key: 'budget', label: 'Total Budget', getValue: (data) => data.reduce((sum, d) => sum + d.amount, 0), format: 'currency' },
      ]}
      showCharts={false}
    />
  ),
}

export const WithSearch: Story = {
  render: () => (
    <Dashboard<SampleItem>
      data={sampleData}
      keyExtractor={(item) => item.id}
      header={{ title: 'Team Dashboard' }}
      columns={[
        { key: 'name', header: 'Name' },
        { key: 'department', header: 'Department' },
        { key: 'status', header: 'Status' },
      ]}
      stats={[
        { key: 'total', label: 'Total', getValue: (data) => data.length },
      ]}
      search={{ placeholder: 'Search members...', predicate: (item, term) => item.name.toLowerCase().includes(term.toLowerCase()) }}
      showCharts={false}
    />
  ),
}

export const Loading: Story = {
  render: () => (
    <Dashboard<SampleItem>
      data={[]}
      keyExtractor={(item) => item.id}
      header={{ title: 'Team Dashboard' }}
      columns={[
        { key: 'name', header: 'Name' },
        { key: 'department', header: 'Department' },
      ]}
      isLoading
    />
  ),
}

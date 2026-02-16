import type { Meta, StoryObj } from '@storybook/react'
import { FeatureRow } from './FeatureRow'

const meta: Meta<typeof FeatureRow> = {
  title: 'Composites/FeatureRow',
  component: FeatureRow,
  tags: ['autodocs'],
  argTypes: {
    tag: { control: 'text', description: 'Feature tag' },
    title: { control: 'text', description: 'Feature title' },
    description: { control: 'text', description: 'Feature description' },
    showTopBorder: { control: 'boolean', description: 'Show top border' },
    showBottomBorder: { control: 'boolean', description: 'Show bottom border' },
  },
  args: {
    tag: 'CRM + Pipeline',
    title: 'Client management that runs itself.',
    description: 'Enterprise-grade CRM with automated follow-ups, pipeline tracking, and revenue forecasting.',
  },
}

export default meta
type Story = StoryObj<typeof FeatureRow>

export const Default: Story = {}

export const WithTopBorder: Story = {
  args: {
    showTopBorder: true,
  },
}

export const MultipleRows: Story = {
  render: () => (
    <div>
      <FeatureRow
        tag="CRM + Pipeline"
        title="Client management that runs itself."
        description="Enterprise-grade CRM with automated follow-ups, pipeline tracking, and revenue forecasting."
        showTopBorder
      />
      <FeatureRow
        tag="Payroll"
        title="Pay your team in minutes, not hours."
        description="Automated payroll processing with tax calculations, deductions, and compliance built in."
      />
      <FeatureRow
        tag="AI Assistant"
        title="Your business co-pilot."
        description="Natural language interface to query data, generate reports, and automate workflows."
      />
    </div>
  ),
}

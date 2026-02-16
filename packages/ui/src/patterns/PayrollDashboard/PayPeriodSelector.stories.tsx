import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { PayPeriodSelector } from './PayPeriodSelector'
import type { PayPeriod } from './types'

const meta: Meta<typeof PayPeriodSelector> = {
  title: 'Patterns/PayPeriodSelector',
  component: PayPeriodSelector,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PayPeriodSelector>

export const Default: Story = {
  render: () => {
    const [period, setPeriod] = useState<PayPeriod>({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      payDate: '15',
    })
    return <PayPeriodSelector value={period} onChange={setPeriod} />
  },
}

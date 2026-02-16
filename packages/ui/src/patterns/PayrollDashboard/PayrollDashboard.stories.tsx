import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { PayrollDashboard } from './PayrollDashboard'
import { PayPeriodSelector } from './PayPeriodSelector'
import type { Employee, PayPeriod } from './types'

const MOCK_EMPLOYEES: Employee[] = [
  { id: '1', name: 'Alice Johnson', department: 'Engineering', position: 'Senior Engineer', grossPay: 8500, deductions: 1200, netPay: 7300, status: 'pending', avatar: 'AJ' },
  { id: '2', name: 'Bob Smith', department: 'Design', position: 'Product Designer', grossPay: 6500, deductions: 900, netPay: 5600, status: 'approved', avatar: 'BS' },
  { id: '3', name: 'Carol Davis', department: 'Engineering', position: 'DevOps Engineer', grossPay: 7800, deductions: 1100, netPay: 6700, status: 'paid', avatar: 'CD' },
  { id: '4', name: 'David Lee', department: 'Marketing', position: 'Marketing Manager', grossPay: 7200, deductions: 1000, netPay: 6200, status: 'pending', avatar: 'DL' },
  { id: '5', name: 'Emma Wilson', department: 'HR', position: 'HR Specialist', grossPay: 5800, deductions: 800, netPay: 5000, status: 'approved', avatar: 'EW' },
]

const meta: Meta<typeof PayrollDashboard> = {
  title: 'Patterns/PayrollDashboard',
  component: PayrollDashboard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof PayrollDashboard>

export const Default: Story = {
  args: {
    employees: MOCK_EMPLOYEES,
  },
}

export const WithoutCharts: Story = {
  args: {
    employees: MOCK_EMPLOYEES,
    showCharts: false,
  },
}

export const Loading: Story = {
  args: {
    employees: [],
    isLoading: true,
  },
}

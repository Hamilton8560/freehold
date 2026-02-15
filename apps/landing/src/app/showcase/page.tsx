'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  PayrollDashboard,
  Button,
  type Employee,
  type PayrollStatus,
} from '@freehold/ui'

// Sample employee data
const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    grossPay: 12500,
    deductions: 3125,
    netPay: 9375,
    status: 'paid',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    department: 'Design',
    position: 'Lead Product Designer',
    grossPay: 11000,
    deductions: 2750,
    netPay: 8250,
    status: 'approved',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    department: 'Marketing',
    position: 'Marketing Manager',
    grossPay: 9500,
    deductions: 2375,
    netPay: 7125,
    status: 'pending',
  },
  {
    id: '4',
    name: 'James Wilson',
    department: 'Sales',
    position: 'Account Executive',
    grossPay: 8000,
    deductions: 2000,
    netPay: 6000,
    status: 'pending',
  },
  {
    id: '5',
    name: 'Aisha Patel',
    department: 'Engineering',
    position: 'DevOps Engineer',
    grossPay: 11500,
    deductions: 2875,
    netPay: 8625,
    status: 'approved',
  },
  {
    id: '6',
    name: 'David Kim',
    department: 'Finance',
    position: 'Financial Analyst',
    grossPay: 8500,
    deductions: 2125,
    netPay: 6375,
    status: 'paid',
  },
  {
    id: '7',
    name: 'Rachel Thompson',
    department: 'HR',
    position: 'HR Business Partner',
    grossPay: 9000,
    deductions: 2250,
    netPay: 6750,
    status: 'pending',
  },
  {
    id: '8',
    name: 'Michael Brown',
    department: 'Engineering',
    position: 'Frontend Developer',
    grossPay: 10000,
    deductions: 2500,
    netPay: 7500,
    status: 'approved',
  },
  {
    id: '9',
    name: 'Lisa Wang',
    department: 'Design',
    position: 'UX Researcher',
    grossPay: 9200,
    deductions: 2300,
    netPay: 6900,
    status: 'paid',
  },
  {
    id: '10',
    name: 'Christopher Lee',
    department: 'Sales',
    position: 'Sales Director',
    grossPay: 14000,
    deductions: 3500,
    netPay: 10500,
    status: 'pending',
  },
]

export default function ShowcasePage() {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES)

  const updateEmployeeStatus = (id: string, status: PayrollStatus) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, status } : emp))
    )
  }

  const handleApprove = (employee: Employee) => {
    updateEmployeeStatus(employee.id, 'approved')
  }

  const handleMarkPaid = (employee: Employee) => {
    updateEmployeeStatus(employee.id, 'paid')
  }

  const handleApproveAll = () => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.status === 'pending' ? { ...emp, status: 'approved' } : emp
      )
    )
  }

  const handleGenerateAll = () => {
    alert('Generating payslips for all employees...')
  }

  const handleExport = () => {
    alert('Exporting payroll data...')
  }

  const handleViewDetails = (employee: Employee) => {
    alert(`Viewing details for ${employee.name}`)
  }

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="border-b border-[rgba(184,164,142,0.15)] bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 gap-4">
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <Link href="/" className="font-heading text-xl text-text-primary shrink-0">
              Freehold
            </Link>
            <span className="text-text-tertiary hidden sm:inline">/</span>
            <span className="text-text-secondary hidden sm:inline truncate">Component Showcase</span>
          </div>
          <Link href="/" className="shrink-0">
            <Button variant="ghost" size="sm">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
        <PayrollDashboard
          employees={employees}
          onApprove={handleApprove}
          onMarkPaid={handleMarkPaid}
          onApproveAll={handleApproveAll}
          onGenerateAll={handleGenerateAll}
          onExport={handleExport}
          onViewDetails={handleViewDetails}
        />

        {/* Component Info */}
        <div className="mt-12 rounded-lg border border-[rgba(184,164,142,0.15)] bg-white p-6">
          <h2 className="font-heading text-xl text-text-primary">About This Demo</h2>
          <p className="mt-2 text-text-secondary">
            This is the <code className="rounded bg-background-secondary px-1.5 py-0.5 font-mono text-sm">PayrollDashboard</code> pattern
            from <code className="rounded bg-background-secondary px-1.5 py-0.5 font-mono text-sm">@freehold/ui</code>.
            It demonstrates the composition of multiple primitives and composites:
          </p>
          <ul className="mt-4 space-y-2 text-text-secondary">
            <li className="flex items-start gap-2">
              <span className="text-sand-500">•</span>
              <span><strong>StatCard</strong> - For displaying key metrics with optional trends</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sand-500">•</span>
              <span><strong>DataTable</strong> - A flexible table with sorting and rendering customization</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sand-500">•</span>
              <span><strong>SearchInput</strong> - Search field with clear button</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sand-500">•</span>
              <span><strong>FilterSelect</strong> - Dropdown for filtering data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sand-500">•</span>
              <span><strong>Badge</strong> - Status indicators with semantic colors</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sand-500">•</span>
              <span><strong>Button</strong> - Multiple variants for different actions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sand-500">•</span>
              <span><strong>Card</strong> - Container with elevated and bordered variants</span>
            </li>
          </ul>
          <div className="mt-6 rounded-lg bg-background-secondary p-4">
            <p className="font-mono text-sm text-text-secondary">
              <span className="text-sand-600">import</span> {'{ PayrollDashboard }'} <span className="text-sand-600">from</span> <span className="text-text-primary">&apos;@freehold/ui&apos;</span>
            </p>
          </div>
        </div>

        {/* Chat Demo Link */}
        <div className="mt-8 rounded-lg border border-[rgba(184,164,142,0.15)] bg-white p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-xl text-text-primary">AI Chat Demo</h2>
              <p className="mt-1 text-text-secondary">
                Try the interactive AI chat pattern — streaming responses, tool calling, and the full Freehold design system.
              </p>
            </div>
            <Link href="/chat">
              <Button variant="accent" size="md">
                Try Chat Demo
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Dashboard } from '../Dashboard'
import { PayPeriodSelector } from './PayPeriodSelector'
import {
  getPayrollStats,
  getPayrollColumns,
  payrollSearch,
  payrollFilters,
  payrollCharts,
  getPayrollDetail,
} from './payrollConfig'
import type { Employee, PayPeriod } from './types'

export interface PayrollDashboardProps {
  employees: Employee[]
  initialPeriod?: PayPeriod
  onPeriodChange?: (period: PayPeriod) => void
  onApprove?: (employee: Employee) => void
  onMarkPaid?: (employee: Employee) => void
  onApproveAll?: () => void
  onGenerateAll?: () => void
  onExport?: () => void
  onViewDetails?: (employee: Employee) => void
  isLoading?: boolean
  showCharts?: boolean
  className?: string
}

export function PayrollDashboard({
  employees,
  initialPeriod,
  onPeriodChange,
  onApprove,
  onMarkPaid,
  onApproveAll,
  onGenerateAll,
  onExport,
  onViewDetails,
  isLoading,
  showCharts = true,
  className,
}: PayrollDashboardProps) {
  const [period, setPeriod] = useState<PayPeriod>(
    initialPeriod || {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      payDate: '15',
    }
  )

  const handlePeriodChange = (newPeriod: PayPeriod) => {
    setPeriod(newPeriod)
    onPeriodChange?.(newPeriod)
  }

  const pendingCount = employees.filter((e) => e.status === 'pending').length

  return (
    <Dashboard<Employee>
      data={employees}
      keyExtractor={(e) => e.id}
      header={{
        title: 'Payroll Dashboard',
        description: 'Manage employee payroll, approve payments, and track disbursements.',
        headerAction: (
          <PayPeriodSelector value={period} onChange={handlePeriodChange} />
        ),
      }}
      stats={getPayrollStats()}
      statsColumns={7}
      charts={payrollCharts}
      showCharts={showCharts}
      columns={getPayrollColumns({ onApprove, onMarkPaid, onViewDetails })}
      tableTitle="Employee Payroll"
      search={payrollSearch}
      filters={payrollFilters}
      actions={[
        {
          key: 'generate',
          label: 'Generate All Payslips',
          variant: 'primary',
          icon: (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          onClick: onGenerateAll,
        },
        {
          key: 'approveAll',
          label: `Approve All (${pendingCount})`,
          variant: 'accent',
          visible: pendingCount > 0,
          onClick: onApproveAll,
          confirm: {
            title: 'Approve All Payslips',
            description: `Are you sure you want to approve ${pendingCount} pending payslip${pendingCount !== 1 ? 's' : ''}? This action cannot be undone.`,
            confirmLabel: 'Approve All',
            icon: (
              <svg className="h-5 w-5 text-[#8DB580]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ),
          },
        },
        {
          key: 'export',
          label: 'Export',
          variant: 'secondary',
          icon: (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          ),
          onClick: onExport,
        },
      ]}
      detail={getPayrollDetail({ onApprove, onMarkPaid })}
      onRowClick={onViewDetails}
      isLoading={isLoading}
      emptyMessage="No employees found matching your filters."
      className={className}
    />
  )
}

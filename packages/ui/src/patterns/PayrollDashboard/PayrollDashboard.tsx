'use client'

import { useState, useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../../primitives/Card'
import { PayPeriodSelector } from './PayPeriodSelector'
import { PayrollStatsGrid } from './PayrollStatsGrid'
import { PayrollCharts } from './PayrollCharts'
import { EmployeeTable } from './EmployeeTable'
import { PayrollActions } from './PayrollActions'
import { EmployeeDetailModal } from './EmployeeDetailModal'
import type { Employee, PayPeriod, PayrollStats } from './types'

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
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const handlePeriodChange = (newPeriod: PayPeriod) => {
    setPeriod(newPeriod)
    onPeriodChange?.(newPeriod)
  }

  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee)
    setShowDetailModal(true)
    onViewDetails?.(employee)
  }

  const stats: PayrollStats = useMemo(() => {
    return {
      totalEmployees: employees.length,
      pendingCount: employees.filter((e) => e.status === 'pending').length,
      approvedCount: employees.filter((e) => e.status === 'approved').length,
      paidCount: employees.filter((e) => e.status === 'paid').length,
      totalGrossPay: employees.reduce((sum, e) => sum + e.grossPay, 0),
      totalDeductions: employees.reduce((sum, e) => sum + e.deductions, 0),
      totalNetPay: employees.reduce((sum, e) => sum + e.netPay, 0),
    }
  }, [employees])

  return (
    <div className={className}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-medium text-[#2C2824]">
              Payroll Dashboard
            </h1>
            <p className="mt-1 text-[#5C574F]">
              Manage employee payroll, approve payments, and track disbursements.
            </p>
          </div>
          <PayPeriodSelector value={period} onChange={handlePeriodChange} />
        </div>

        {/* Stats Grid */}
        <PayrollStatsGrid stats={stats} isLoading={isLoading} />

        {/* Charts */}
        {showCharts && <PayrollCharts stats={stats} employees={employees} isLoading={isLoading} />}

        {/* Employee Table Card */}
        <Card variant="default" padding="none">
          <CardHeader className="border-b border-[rgba(184,164,142,0.15)] px-6 py-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Employee Payroll</CardTitle>
              <PayrollActions
                onGenerateAll={onGenerateAll}
                onApproveAll={onApproveAll}
                onExport={onExport}
                pendingCount={stats.pendingCount}
              />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <EmployeeTable
              employees={employees}
              onApprove={onApprove}
              onMarkPaid={onMarkPaid}
              onViewDetails={handleViewDetails}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>

      {/* Employee Detail Modal */}
      <EmployeeDetailModal
        employee={selectedEmployee}
        open={showDetailModal}
        onOpenChange={setShowDetailModal}
        onApprove={onApprove}
        onMarkPaid={onMarkPaid}
      />
    </div>
  )
}

'use client'

import { useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../../primitives/Card'
import { PieChart } from '../../composites/Chart'
import { BarChart } from '../../composites/Chart'
import { ChartSkeleton } from '../../composites/ChartSkeleton'
import type { Employee, PayrollStats } from './types'

interface PayrollChartsProps {
  stats: PayrollStats
  employees: Employee[]
  isLoading?: boolean
}

export function PayrollCharts({ stats, employees, isLoading }: PayrollChartsProps) {
  const statusData = useMemo(
    () => [
      { name: 'Pending', value: stats.pendingCount, color: '#D4B86A' },
      { name: 'Approved', value: stats.approvedCount, color: '#8DB580' },
      { name: 'Paid', value: stats.paidCount, color: '#60A5FA' },
    ],
    [stats]
  )

  const departmentData = useMemo(() => {
    const grouped = employees.reduce(
      (acc, emp) => {
        if (!acc[emp.department]) {
          acc[emp.department] = { department: emp.department, grossPay: 0, netPay: 0 }
        }
        acc[emp.department].grossPay += emp.grossPay
        acc[emp.department].netPay += emp.netPay
        return acc
      },
      {} as Record<string, { department: string; grossPay: number; netPay: number }>
    )

    return Object.values(grouped)
  }, [employees])

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="default" padding="md">
          <CardHeader>
            <CardTitle>Payroll Status</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ChartSkeleton variant="pie" height={250} showLegend />
          </CardContent>
        </Card>

        <Card variant="default" padding="md">
          <CardHeader>
            <CardTitle>Payroll by Department</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ChartSkeleton variant="bar" height={250} showLegend />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card variant="default" padding="md">
        <CardHeader>
          <CardTitle>Payroll Status</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <PieChart
            data={statusData}
            variant="donut"
            height={250}
            centerLabel="Employees"
            centerValue={stats.totalEmployees}
            showLegend
          />
        </CardContent>
      </Card>

      <Card variant="default" padding="md">
        <CardHeader>
          <CardTitle>Payroll by Department</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <BarChart
            data={departmentData}
            xAxisKey="department"
            series={[
              { name: 'Gross Pay', dataKey: 'grossPay', color: '#B8A48E' },
              { name: 'Net Pay', dataKey: 'netPay', color: '#8DB580' },
            ]}
            yAxisFormat="currency"
            height={250}
            stacked={false}
          />
        </CardContent>
      </Card>
    </div>
  )
}

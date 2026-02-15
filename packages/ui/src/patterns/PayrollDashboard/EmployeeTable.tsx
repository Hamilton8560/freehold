'use client'

import { useState } from 'react'
import { DataTable, type Column } from '../../composites/DataTable'
import { SearchInput } from '../../composites/SearchInput'
import { FilterSelect } from '../../composites/FilterSelect'
import { Badge } from '../../primitives/Badge'
import { Button } from '../../primitives/Button'
import type { Employee, PayrollStatus } from './types'

interface EmployeeTableProps {
  employees: Employee[]
  onApprove?: (employee: Employee) => void
  onMarkPaid?: (employee: Employee) => void
  onViewDetails?: (employee: Employee) => void
  isLoading?: boolean
}

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'paid', label: 'Paid' },
]

const DEPARTMENT_OPTIONS = [
  { value: '', label: 'All Departments' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'finance', label: 'Finance' },
]

export function EmployeeTable({
  employees,
  onApprove,
  onMarkPaid,
  onViewDetails,
  isLoading,
}: EmployeeTableProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      search === '' ||
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.position.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === '' || employee.status === statusFilter

    const matchesDepartment =
      departmentFilter === '' ||
      employee.department.toLowerCase() === departmentFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesDepartment
  })

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value)

  const columns: Column<Employee>[] = [
    {
      key: 'name',
      header: 'Employee',
      render: (employee) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F3EF] text-sm font-medium text-[#5C574F]">
            {employee.avatar || employee.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="font-medium text-[#2C2824]">{employee.name}</p>
            <p className="text-xs text-[#8A847A]">{employee.position}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'department',
      header: 'Department',
    },
    {
      key: 'grossPay',
      header: 'Gross Pay',
      align: 'right',
      render: (employee) => formatCurrency(employee.grossPay),
    },
    {
      key: 'deductions',
      header: 'Deductions',
      align: 'right',
      render: (employee) => (
        <span className="text-[#991B1B]">-{formatCurrency(employee.deductions)}</span>
      ),
    },
    {
      key: 'netPay',
      header: 'Net Pay',
      align: 'right',
      render: (employee) => (
        <span className="font-medium">{formatCurrency(employee.netPay)}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (employee) => (
        <Badge variant={employee.status as PayrollStatus}>
          {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (employee) => (
        <div className="flex items-center justify-end gap-2">
          {employee.status === 'pending' && onApprove && (
            <Button
              size="sm"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation()
                onApprove(employee)
              }}
            >
              Approve
            </Button>
          )}
          {employee.status === 'approved' && onMarkPaid && (
            <Button
              size="sm"
              variant="accent"
              onClick={(e) => {
                e.stopPropagation()
                onMarkPaid(employee)
              }}
            >
              Mark Paid
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              onViewDetails?.(employee)
            }}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[240px]">
          <SearchInput
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
          />
        </div>
        <FilterSelect
          options={STATUS_OPTIONS}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          placeholder="Status"
        />
        <FilterSelect
          options={DEPARTMENT_OPTIONS}
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          placeholder="Department"
        />
      </div>
      <DataTable
        data={filteredEmployees}
        columns={columns}
        keyExtractor={(employee) => employee.id}
        emptyMessage="No employees found matching your filters."
        onRowClick={onViewDetails}
        isLoading={isLoading}
      />
    </div>
  )
}

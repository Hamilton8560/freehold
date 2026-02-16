import { Badge } from '../../primitives/Badge'
import { Button } from '../../primitives/Button'
import type { Column } from '../../composites/DataTable'
import type {
  DashboardStatConfig,
  DashboardSearchConfig,
  DashboardFilterConfig,
  DashboardChartConfig,
  DashboardDetailConfig,
} from '../Dashboard/types'
import type { Employee, PayrollStatus } from './types'

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value)

// --- Stats ---

export function getPayrollStats(): DashboardStatConfig<Employee>[] {
  return [
    {
      key: 'totalEmployees',
      label: 'Total Employees',
      getValue: (data) => data.length,
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      key: 'pending',
      label: 'Pending',
      getValue: (data) => data.filter((e) => e.status === 'pending').length,
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      key: 'approved',
      label: 'Approved',
      getValue: (data) => data.filter((e) => e.status === 'approved').length,
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      key: 'paid',
      label: 'Paid',
      getValue: (data) => data.filter((e) => e.status === 'paid').length,
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    {
      key: 'grossPay',
      label: 'Gross Pay',
      getValue: (data) => data.reduce((sum, e) => sum + e.grossPay, 0),
      format: 'currency',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      key: 'deductions',
      label: 'Deductions',
      getValue: (data) => data.reduce((sum, e) => sum + e.deductions, 0),
      format: 'currency',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      key: 'netPay',
      label: 'Net Pay',
      getValue: (data) => data.reduce((sum, e) => sum + e.netPay, 0),
      format: 'currency',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ]
}

// --- Columns ---

export function getPayrollColumns(callbacks: {
  onApprove?: (employee: Employee) => void
  onMarkPaid?: (employee: Employee) => void
  onViewDetails?: (employee: Employee) => void
}): Column<Employee>[] {
  return [
    {
      key: 'name',
      header: 'Employee',
      render: (employee) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F3EF] text-sm font-medium text-[#5C574F]">
            {employee.avatar || employee.name.split(' ').map((n) => n[0]).join('')}
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
          {employee.status === 'pending' && callbacks.onApprove && (
            <Button
              size="sm"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation()
                callbacks.onApprove!(employee)
              }}
            >
              Approve
            </Button>
          )}
          {employee.status === 'approved' && callbacks.onMarkPaid && (
            <Button
              size="sm"
              variant="accent"
              onClick={(e) => {
                e.stopPropagation()
                callbacks.onMarkPaid!(employee)
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
              callbacks.onViewDetails?.(employee)
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
}

// --- Search ---

export const payrollSearch: DashboardSearchConfig<Employee> = {
  placeholder: 'Search employees...',
  predicate: (employee, term) =>
    employee.name.toLowerCase().includes(term.toLowerCase()) ||
    employee.position.toLowerCase().includes(term.toLowerCase()),
}

// --- Filters ---

export const payrollFilters: DashboardFilterConfig<Employee>[] = [
  {
    key: 'status',
    label: 'Status',
    options: [
      { value: '__all__', label: 'All Statuses' },
      { value: 'pending', label: 'Pending' },
      { value: 'approved', label: 'Approved' },
      { value: 'paid', label: 'Paid' },
    ],
    predicate: (employee, value) => employee.status === value,
  },
  {
    key: 'department',
    label: 'Department',
    options: [
      { value: '__all__', label: 'All Departments' },
      { value: 'engineering', label: 'Engineering' },
      { value: 'design', label: 'Design' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'sales', label: 'Sales' },
      { value: 'hr', label: 'Human Resources' },
      { value: 'finance', label: 'Finance' },
    ],
    predicate: (employee, value) =>
      employee.department.toLowerCase() === value.toLowerCase(),
  },
]

// --- Charts ---

export const payrollCharts: DashboardChartConfig<Employee>[] = [
  {
    type: 'pie',
    key: 'payrollStatus',
    title: 'Payroll Status',
    variant: 'donut',
    centerLabel: 'Employees',
    getCenterValue: (data) => data.length,
    getData: (data) => [
      { name: 'Pending', value: data.filter((e) => e.status === 'pending').length, color: '#D4B86A' },
      { name: 'Approved', value: data.filter((e) => e.status === 'approved').length, color: '#8DB580' },
      { name: 'Paid', value: data.filter((e) => e.status === 'paid').length, color: '#60A5FA' },
    ],
  },
  {
    type: 'bar',
    key: 'byDepartment',
    title: 'Payroll by Department',
    xAxisKey: 'department',
    series: [
      { name: 'Gross Pay', dataKey: 'grossPay', color: '#B8A48E' },
      { name: 'Net Pay', dataKey: 'netPay', color: '#8DB580' },
    ],
    yAxisFormat: 'currency',
    stacked: false,
    getData: (data) => {
      const grouped = data.reduce(
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
    },
  },
]

// --- Detail Modal ---

export function getPayrollDetail(callbacks: {
  onApprove?: (employee: Employee) => void
  onMarkPaid?: (employee: Employee) => void
}): DashboardDetailConfig<Employee> {
  return {
    size: 'md',
    renderHeader: (employee) => (
      <div className="flex items-center gap-3 sm:gap-4 pr-8">
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-[#F5F3EF] text-base sm:text-lg font-medium text-[#5C574F]">
          {employee.avatar || employee.name.split(' ').map((n) => n[0]).join('')}
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-lg font-medium text-[#2C2824]">{employee.name}</h2>
          <p className="truncate text-sm text-[#5C574F]">{employee.position}</p>
        </div>
      </div>
    ),
    renderContent: (employee) => (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#5C574F]">Department</span>
          <span className="font-medium text-[#2C2824]">{employee.department}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#5C574F]">Status</span>
          <Badge variant={employee.status as PayrollStatus}>
            {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
          </Badge>
        </div>
        <div className="border-t border-[rgba(184,164,142,0.15)] pt-4">
          <h4 className="mb-3 text-sm font-medium text-[#2C2824]">Payment Details</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#5C574F]">Gross Pay</span>
              <span className="font-medium text-[#2C2824]">
                {formatCurrency(employee.grossPay)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#5C574F]">Deductions</span>
              <span className="font-medium text-[#991B1B]">
                -{formatCurrency(employee.deductions)}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-[rgba(184,164,142,0.15)] pt-3">
              <span className="text-sm font-medium text-[#2C2824]">Net Pay</span>
              <span className="text-lg font-medium text-[#2C2824]">
                {formatCurrency(employee.netPay)}
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    renderFooter: (employee, close) => (
      <>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        {employee.status === 'pending' && callbacks.onApprove && (
          <Button
            variant="primary"
            onClick={() => {
              callbacks.onApprove!(employee)
              close()
            }}
          >
            Approve
          </Button>
        )}
        {employee.status === 'approved' && callbacks.onMarkPaid && (
          <Button
            variant="accent"
            onClick={() => {
              callbacks.onMarkPaid!(employee)
              close()
            }}
          >
            Mark Paid
          </Button>
        )}
      </>
    ),
  }
}

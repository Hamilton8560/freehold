export type PayrollStatus = 'pending' | 'approved' | 'paid'

export interface Employee {
  id: string
  name: string
  department: string
  position: string
  grossPay: number
  deductions: number
  netPay: number
  status: PayrollStatus
  avatar?: string
}

export interface PayrollStats {
  totalEmployees: number
  pendingCount: number
  approvedCount: number
  paidCount: number
  totalGrossPay: number
  totalDeductions: number
  totalNetPay: number
}

export interface PayPeriod {
  month: number
  year: number
  payDate: string
}

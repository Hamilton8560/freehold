'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
} from '../../primitives/Dialog'
import { Button } from '../../primitives/Button'
import { Badge } from '../../primitives/Badge'
import type { Employee, PayrollStatus } from './types'

interface EmployeeDetailModalProps {
  employee: Employee | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onApprove?: (employee: Employee) => void
  onMarkPaid?: (employee: Employee) => void
}

export function EmployeeDetailModal({
  employee,
  open,
  onOpenChange,
  onApprove,
  onMarkPaid,
}: EmployeeDetailModalProps) {
  if (!employee) return null

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="md">
        <DialogHeader>
          <div className="flex items-center gap-3 sm:gap-4 pr-8">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-[#F5F3EF] text-base sm:text-lg font-medium text-[#5C574F]">
              {employee.avatar || employee.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="min-w-0">
              <DialogTitle className="truncate">{employee.name}</DialogTitle>
              <DialogDescription className="truncate">{employee.position}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogBody>
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
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
          {employee.status === 'pending' && onApprove && (
            <Button
              variant="primary"
              onClick={() => {
                onApprove(employee)
                onOpenChange(false)
              }}
            >
              Approve
            </Button>
          )}
          {employee.status === 'approved' && onMarkPaid && (
            <Button
              variant="accent"
              onClick={() => {
                onMarkPaid(employee)
                onOpenChange(false)
              }}
            >
              Mark Paid
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

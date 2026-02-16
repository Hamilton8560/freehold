'use client'

import { Select } from '../../primitives/Select'
import type { PayPeriod } from './types'

interface PayPeriodSelectorProps {
  value: PayPeriod
  onChange: (period: PayPeriod) => void
}

const MONTHS = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
]

const YEARS = Array.from({ length: 5 }, (_, i) => {
  const year = new Date().getFullYear() - i
  return { value: String(year), label: String(year) }
})

const PAY_DATES = [
  { value: '1', label: '1st' },
  { value: '15', label: '15th' },
  { value: 'last', label: 'Last day' },
]

export function PayPeriodSelector({ value, onChange }: PayPeriodSelectorProps) {
  return (
    <div className="flex flex-wrap items-end gap-3 sm:gap-4">
      <div className="min-w-[120px] sm:min-w-[140px]">
        <Select
          label="Month"
          options={MONTHS}
          value={String(value.month)}
          onValueChange={(v) => onChange({ ...value, month: Number(v) })}
        />
      </div>
      <div className="min-w-[100px]">
        <Select
          label="Year"
          options={YEARS}
          value={String(value.year)}
          onValueChange={(v) => onChange({ ...value, year: Number(v) })}
        />
      </div>
      <div className="min-w-[120px]">
        <Select
          label="Pay Date"
          options={PAY_DATES}
          value={value.payDate}
          onValueChange={(v) => onChange({ ...value, payDate: v })}
        />
      </div>
    </div>
  )
}

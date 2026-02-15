import type { ValueFormat } from './types'
import { useChartColors } from './useChartColors'

export interface ChartTooltipProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    color?: string
    dataKey?: string
  }>
  label?: string
  format?: ValueFormat
}

function formatValue(value: number, format: ValueFormat = 'number'): string {
  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value)
    case 'percentage':
      return `${value.toFixed(1)}%`
    default:
      return new Intl.NumberFormat('en-US').format(value)
  }
}

export function ChartTooltip({
  active,
  payload,
  label,
  format = 'number',
}: ChartTooltipProps) {
  const colors = useChartColors()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <div
      className="rounded-lg border bg-white px-3 py-2 shadow-lg"
      style={{
        borderColor: colors.tooltip.border,
        color: colors.tooltip.text,
      }}
    >
      {label && (
        <p className="mb-1 text-xs font-medium text-[#5C574F]">{label}</p>
      )}
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-[#5C574F]">{entry.name}:</span>
            <span className="font-medium text-[#2C2824]">
              {formatValue(entry.value, format)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export { formatValue }

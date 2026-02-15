import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'
import type { BaseChartProps, DistributionDataPoint } from './types'
import { ChartContainer } from './ChartContainer'
import { ChartTooltip } from './ChartTooltip'
import { useChartColors } from './useChartColors'
import { cn } from '../../utils/cn'

export interface PieChartProps extends BaseChartProps {
  data: DistributionDataPoint[]
  variant?: 'pie' | 'donut'
  innerRadius?: number | string
  outerRadius?: number | string
  labelType?: 'none' | 'value' | 'percentage' | 'name'
  centerLabel?: string
  centerValue?: string | number
}

export function PieChart({
  data,
  variant = 'pie',
  innerRadius,
  outerRadius = '80%',
  labelType = 'none',
  centerLabel,
  centerValue,
  height = 300,
  isLoading = false,
  showTooltip = true,
  showLegend = true,
  animate = true,
  className,
  ...props
}: PieChartProps) {
  const colors = useChartColors()
  const isEmpty = !data || data.length === 0

  const computedInnerRadius =
    innerRadius ?? (variant === 'donut' ? '60%' : 0)

  const renderLabel = labelType !== 'none' ? (entry: DistributionDataPoint) => {
    const total = data.reduce((sum, d) => sum + d.value, 0)
    const percent = ((entry.value / total) * 100).toFixed(0)

    switch (labelType) {
      case 'value':
        return entry.value.toLocaleString()
      case 'percentage':
        return `${percent}%`
      case 'name':
        return entry.name
      default:
        return ''
    }
  } : undefined

  return (
    <ChartContainer
      height={height}
      isLoading={isLoading}
      isEmpty={isEmpty}
      className={className}
      {...props}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={computedInnerRadius}
            outerRadius={outerRadius}
            dataKey="value"
            nameKey="name"
            label={renderLabel}
            labelLine={labelType !== 'none'}
            isAnimationActive={animate}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || colors.primary[index % colors.primary.length]}
              />
            ))}
          </Pie>
          {showTooltip && (
            <Tooltip
              content={<ChartTooltip format="number" />}
            />
          )}
          {showLegend && (
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-[#5C574F]">{value}</span>
              )}
            />
          )}
          {variant === 'donut' && (centerLabel || centerValue) && (
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {centerValue && (
                <tspan
                  x="50%"
                  dy={centerLabel ? '-0.5em' : '0'}
                  className="fill-[#2C2824] text-2xl font-medium"
                >
                  {centerValue}
                </tspan>
              )}
              {centerLabel && (
                <tspan
                  x="50%"
                  dy={centerValue ? '1.5em' : '0'}
                  className="fill-[#8A847A] text-sm"
                >
                  {centerLabel}
                </tspan>
              )}
            </text>
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

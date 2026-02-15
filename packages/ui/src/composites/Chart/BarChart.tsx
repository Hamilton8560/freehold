import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'
import type { BaseChartProps, TimeSeriesDataPoint, ChartSeries, ValueFormat } from './types'
import { ChartContainer } from './ChartContainer'
import { ChartTooltip, formatValue } from './ChartTooltip'
import { useChartColors } from './useChartColors'

export interface BarChartProps extends BaseChartProps {
  data: TimeSeriesDataPoint[]
  xAxisKey: string
  series: ChartSeries[]
  xAxisLabel?: string
  yAxisLabel?: string
  yAxisFormat?: ValueFormat
  layout?: 'vertical' | 'horizontal'
  stacked?: boolean
  barSize?: number
}

export function BarChart({
  data,
  xAxisKey,
  series,
  xAxisLabel,
  yAxisLabel,
  yAxisFormat = 'number',
  layout = 'horizontal',
  stacked = false,
  barSize,
  height = 300,
  margin = { top: 20, right: 30, bottom: 20, left: 40 },
  isLoading = false,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  animate = true,
  className,
  ...props
}: BarChartProps) {
  const colors = useChartColors()
  const isEmpty = !data || data.length === 0

  const formatYAxis = (value: number) => {
    if (yAxisFormat === 'currency') {
      if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
      if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
      return `$${value}`
    }
    if (yAxisFormat === 'percentage') return `${value}%`
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
    return value.toString()
  }

  return (
    <ChartContainer
      height={height}
      isLoading={isLoading}
      isEmpty={isEmpty}
      className={className}
      {...props}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          layout={layout === 'vertical' ? 'vertical' : 'horizontal'}
          margin={margin}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={colors.grid}
              vertical={false}
            />
          )}
          <XAxis
            dataKey={layout === 'horizontal' ? xAxisKey : undefined}
            type={layout === 'horizontal' ? 'category' : 'number'}
            stroke={colors.axis}
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: colors.grid }}
            tickFormatter={layout === 'vertical' ? formatYAxis : undefined}
            label={
              xAxisLabel
                ? {
                    value: xAxisLabel,
                    position: 'insideBottom',
                    offset: -10,
                    fill: colors.axis,
                    fontSize: 12,
                  }
                : undefined
            }
          />
          <YAxis
            dataKey={layout === 'vertical' ? xAxisKey : undefined}
            type={layout === 'vertical' ? 'category' : 'number'}
            stroke={colors.axis}
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: colors.grid }}
            tickFormatter={layout === 'horizontal' ? formatYAxis : undefined}
            label={
              yAxisLabel
                ? {
                    value: yAxisLabel,
                    angle: -90,
                    position: 'insideLeft',
                    fill: colors.axis,
                    fontSize: 12,
                  }
                : undefined
            }
          />
          {showTooltip && (
            <Tooltip content={<ChartTooltip format={yAxisFormat} />} />
          )}
          {showLegend && series.length > 1 && (
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-[#5C574F]">{value}</span>
              )}
            />
          )}
          {series.map((s, index) => (
            <Bar
              key={s.dataKey}
              dataKey={s.dataKey}
              name={s.name}
              fill={s.color || colors.primary[index % colors.primary.length]}
              stackId={stacked ? 'stack' : undefined}
              barSize={barSize}
              radius={[4, 4, 0, 0]}
              isAnimationActive={animate}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

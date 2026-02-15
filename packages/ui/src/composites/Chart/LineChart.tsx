import {
  LineChart as RechartsLineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'
import type { BaseChartProps, TimeSeriesDataPoint, ChartSeries, ValueFormat } from './types'
import { ChartContainer } from './ChartContainer'
import { ChartTooltip } from './ChartTooltip'
import { useChartColors } from './useChartColors'

export interface LineChartProps extends BaseChartProps {
  data: TimeSeriesDataPoint[]
  xAxisKey: string
  series: ChartSeries[]
  xAxisLabel?: string
  yAxisLabel?: string
  yAxisFormat?: ValueFormat
  curveType?: 'linear' | 'monotone' | 'step'
  showArea?: boolean
  showDots?: boolean
}

export function LineChart({
  data,
  xAxisKey,
  series,
  xAxisLabel,
  yAxisLabel,
  yAxisFormat = 'number',
  curveType = 'monotone',
  showArea = false,
  showDots = true,
  height = 300,
  margin = { top: 20, right: 30, bottom: 20, left: 40 },
  isLoading = false,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  animate = true,
  className,
  ...props
}: LineChartProps) {
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
        <RechartsLineChart data={data} margin={margin}>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={colors.grid}
              vertical={false}
            />
          )}
          <XAxis
            dataKey={xAxisKey}
            stroke={colors.axis}
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: colors.grid }}
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
            stroke={colors.axis}
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: colors.grid }}
            tickFormatter={formatYAxis}
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
          {series.map((s, index) => {
            const color = s.color || colors.primary[index % colors.primary.length]

            if (showArea) {
              return (
                <Area
                  key={s.dataKey}
                  type={curveType}
                  dataKey={s.dataKey}
                  name={s.name}
                  stroke={color}
                  fill={color}
                  fillOpacity={0.1}
                  strokeWidth={2}
                  dot={showDots ? { fill: color, strokeWidth: 2, r: 4 } : false}
                  activeDot={showDots ? { r: 6, strokeWidth: 2 } : false}
                  isAnimationActive={animate}
                />
              )
            }

            return (
              <Line
                key={s.dataKey}
                type={curveType}
                dataKey={s.dataKey}
                name={s.name}
                stroke={color}
                strokeWidth={2}
                dot={showDots ? { fill: color, strokeWidth: 2, r: 4 } : false}
                activeDot={showDots ? { r: 6, strokeWidth: 2 } : false}
                isAnimationActive={animate}
              />
            )
          })}
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

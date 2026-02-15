import type { HTMLAttributes } from 'react'

export interface ChartDataPoint {
  label: string
  value: number
  color?: string
}

export interface ChartSeries {
  name: string
  dataKey: string
  color?: string
  type?: 'line' | 'area' | 'bar'
}

export interface ChartMargin {
  top?: number
  right?: number
  bottom?: number
  left?: number
}

export interface BaseChartProps extends HTMLAttributes<HTMLDivElement> {
  height?: number
  margin?: ChartMargin
  isLoading?: boolean
  emptyMessage?: string
  showGrid?: boolean
  showTooltip?: boolean
  showLegend?: boolean
  animate?: boolean
}

export interface TimeSeriesDataPoint {
  [key: string]: string | number
}

export interface DistributionDataPoint {
  name: string
  value: number
  color?: string
}

export type ValueFormat = 'number' | 'currency' | 'percentage'

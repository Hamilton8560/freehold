import type { ReactNode } from 'react'
import type { Column } from '../../composites/DataTable'
import type { FilterOption } from '../../composites/FilterSelect'
import type {
  DistributionDataPoint,
  TimeSeriesDataPoint,
  ChartSeries,
  ValueFormat,
} from '../../composites/Chart'

// --- Stat Configuration ---
export interface DashboardStatConfig<T> {
  key: string
  label: string
  getValue: (data: T[]) => string | number
  format?: 'number' | 'currency' | 'percentage'
  icon?: ReactNode
  getTrend?: (data: T[]) => { value: number; direction: 'up' | 'down' | 'neutral' } | undefined
}

// --- Search Configuration ---
export interface DashboardSearchConfig<T> {
  placeholder: string
  predicate: (item: T, searchTerm: string) => boolean
}

// --- Filter Configuration ---
export interface DashboardFilterConfig<T> {
  key: string
  label: string
  options: FilterOption[]
  predicate: (item: T, filterValue: string) => boolean
}

// --- Chart Configuration ---
export interface DashboardPieChartConfig<T> {
  key: string
  title: string
  getData: (data: T[]) => DistributionDataPoint[]
  variant?: 'pie' | 'donut'
  centerLabel?: string
  getCenterValue?: (data: T[]) => string | number
}

export interface DashboardBarChartConfig<T> {
  key: string
  title: string
  getData: (data: T[]) => TimeSeriesDataPoint[]
  xAxisKey: string
  series: ChartSeries[]
  yAxisFormat?: ValueFormat
  stacked?: boolean
}

export type DashboardChartConfig<T> =
  | ({ type: 'pie' } & DashboardPieChartConfig<T>)
  | ({ type: 'bar' } & DashboardBarChartConfig<T>)

// --- Action Configuration ---
export interface DashboardActionConfig {
  key: string
  label: string
  variant: 'primary' | 'secondary' | 'accent' | 'ghost'
  icon?: ReactNode
  onClick?: () => void
  isLoading?: boolean
  visible?: boolean
  confirm?: {
    title: string
    description: string
    confirmLabel: string
    icon?: ReactNode
  }
}

// --- Detail Modal Configuration ---
export interface DashboardDetailConfig<T> {
  renderHeader: (item: T) => ReactNode
  renderContent: (item: T) => ReactNode
  renderFooter?: (item: T, close: () => void) => ReactNode
  size?: 'sm' | 'md' | 'lg'
}

// --- Header Configuration ---
export interface DashboardHeaderConfig {
  title: string
  description?: string
  headerAction?: ReactNode
}

// --- Main Dashboard Props ---
export interface DashboardProps<T> {
  data: T[]
  keyExtractor: (item: T) => string | number

  header: DashboardHeaderConfig

  stats?: DashboardStatConfig<T>[]
  statsColumns?: number

  charts?: DashboardChartConfig<T>[]
  showCharts?: boolean

  columns: Column<T>[]
  tableTitle?: string

  search?: DashboardSearchConfig<T>
  filters?: DashboardFilterConfig<T>[]

  actions?: DashboardActionConfig[]

  detail?: DashboardDetailConfig<T>
  onRowClick?: (item: T) => void

  isLoading?: boolean
  emptyMessage?: string
  className?: string
}

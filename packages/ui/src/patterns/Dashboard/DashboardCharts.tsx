'use client'

import { useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../../primitives/Card'
import { PieChart } from '../../composites/Chart'
import { BarChart } from '../../composites/Chart'
import { ChartSkeleton } from '../../composites/ChartSkeleton'
import type { DashboardChartConfig } from './types'

interface DashboardChartsProps<T> {
  data: T[]
  charts: DashboardChartConfig<T>[]
  isLoading?: boolean
}

export function DashboardCharts<T>({
  data,
  charts,
  isLoading,
}: DashboardChartsProps<T>) {
  const gridClass =
    charts.length === 1 ? 'grid gap-6 grid-cols-1' : 'grid gap-6 md:grid-cols-2'

  if (isLoading) {
    return (
      <div className={gridClass}>
        {charts.map((chart) => (
          <Card key={chart.key} variant="default" padding="md">
            <CardHeader>
              <CardTitle>{chart.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ChartSkeleton
                variant={chart.type === 'pie' ? 'pie' : 'bar'}
                height={250}
                showLegend
              />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className={gridClass}>
      {charts.map((chart) => (
        <DashboardChartCard key={chart.key} chart={chart} data={data} />
      ))}
    </div>
  )
}

function DashboardChartCard<T>({
  chart,
  data,
}: {
  chart: DashboardChartConfig<T>
  data: T[]
}) {
  const chartData = useMemo(() => chart.getData(data), [data, chart])

  return (
    <Card variant="default" padding="md">
      <CardHeader>
        <CardTitle>{chart.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {chart.type === 'pie' && (
          <PieChart
            data={chartData}
            variant={chart.variant ?? 'donut'}
            height={250}
            centerLabel={chart.centerLabel}
            centerValue={chart.getCenterValue?.(data)}
            showLegend
          />
        )}
        {chart.type === 'bar' && (
          <BarChart
            data={chartData}
            xAxisKey={chart.xAxisKey}
            series={chart.series}
            yAxisFormat={chart.yAxisFormat}
            height={250}
            stacked={chart.stacked ?? false}
          />
        )}
      </CardContent>
    </Card>
  )
}

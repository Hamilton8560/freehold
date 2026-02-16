'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../../primitives/Card'
import { DashboardStatsGrid } from './DashboardStatsGrid'
import { DashboardCharts } from './DashboardCharts'
import { DashboardTable } from './DashboardTable'
import { DashboardActions } from './DashboardActions'
import { DashboardDetailModal } from './DashboardDetailModal'
import type { DashboardProps } from './types'

export function Dashboard<T>({
  data,
  keyExtractor,
  header,
  stats,
  statsColumns,
  charts,
  showCharts = true,
  columns,
  tableTitle = 'Data',
  search,
  filters,
  actions,
  detail,
  onRowClick,
  isLoading,
  emptyMessage,
  className,
}: DashboardProps<T>) {
  const [selectedItem, setSelectedItem] = useState<T | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const handleRowClick = (item: T) => {
    if (detail) {
      setSelectedItem(item)
      setShowDetailModal(true)
    }
    onRowClick?.(item)
  }

  return (
    <div className={className}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-medium text-[#2C2824]">
              {header.title}
            </h1>
            {header.description && (
              <p className="mt-1 text-sm sm:text-base text-[#5C574F]">
                {header.description}
              </p>
            )}
          </div>
          {header.headerAction}
        </div>

        {/* Stats Grid */}
        {stats && stats.length > 0 && (
          <DashboardStatsGrid
            data={data}
            stats={stats}
            columns={statsColumns}
            isLoading={isLoading}
          />
        )}

        {/* Charts */}
        {showCharts && charts && charts.length > 0 && (
          <DashboardCharts data={data} charts={charts} isLoading={isLoading} />
        )}

        {/* Table Card */}
        <Card variant="default" padding="none">
          <CardHeader className="border-b border-[rgba(184,164,142,0.15)] px-4 sm:px-6 py-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>{tableTitle}</CardTitle>
              {actions && <DashboardActions actions={actions} />}
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <DashboardTable
              data={data}
              columns={columns}
              keyExtractor={keyExtractor}
              search={search}
              filters={filters}
              onRowClick={handleRowClick}
              isLoading={isLoading}
              emptyMessage={emptyMessage}
            />
          </CardContent>
        </Card>
      </div>

      {/* Detail Modal */}
      {detail && (
        <DashboardDetailModal
          item={selectedItem}
          open={showDetailModal}
          onOpenChange={setShowDetailModal}
          detail={detail}
        />
      )}
    </div>
  )
}

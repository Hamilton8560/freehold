'use client'

import { useState, useMemo } from 'react'
import { DataTable, type Column } from '../../composites/DataTable'
import { SearchInput } from '../../composites/SearchInput'
import { FilterSelect } from '../../composites/FilterSelect'
import type { DashboardSearchConfig, DashboardFilterConfig } from './types'

interface DashboardTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyExtractor: (item: T) => string | number
  search?: DashboardSearchConfig<T>
  filters?: DashboardFilterConfig<T>[]
  onRowClick?: (item: T) => void
  isLoading?: boolean
  emptyMessage?: string
}

export function DashboardTable<T>({
  data,
  columns,
  keyExtractor,
  search,
  filters = [],
  onRowClick,
  isLoading,
  emptyMessage = 'No data found matching your filters.',
}: DashboardTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterValues, setFilterValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(filters.map((f) => [f.key, '__all__']))
  )

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (search && searchTerm) {
        if (!search.predicate(item, searchTerm)) return false
      }
      for (const filter of filters) {
        const value = filterValues[filter.key]
        if (value && value !== '__all__' && !filter.predicate(item, value)) return false
      }
      return true
    })
  }, [data, searchTerm, filterValues, search, filters])

  return (
    <div className="space-y-4">
      {(search || filters.length > 0) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          {search && (
            <div className="w-full sm:flex-1 sm:min-w-[240px]">
              <SearchInput
                placeholder={search.placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClear={() => setSearchTerm('')}
              />
            </div>
          )}
          {filters.length > 0 && (
            <div className="flex gap-3 sm:gap-4">
              {filters.map((filter) => (
                <FilterSelect
                  key={filter.key}
                  options={filter.options}
                  value={filterValues[filter.key]}
                  onChange={(e) =>
                    setFilterValues((prev) => ({
                      ...prev,
                      [filter.key]: e.target.value,
                    }))
                  }
                  placeholder={filter.label}
                />
              ))}
            </div>
          )}
        </div>
      )}
      <DataTable
        data={filteredData}
        columns={columns}
        keyExtractor={keyExtractor}
        emptyMessage={emptyMessage}
        onRowClick={onRowClick}
        isLoading={isLoading}
      />
    </div>
  )
}

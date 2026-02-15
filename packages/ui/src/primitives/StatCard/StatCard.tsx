import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import { Card } from '../Card'

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  value: string | number
  trend?: {
    value: number
    direction: 'up' | 'down' | 'neutral'
  }
  icon?: React.ReactNode
  format?: 'number' | 'currency' | 'percentage'
}

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, label, value, trend, icon, format = 'number', ...props }, ref) => {
    const formatValue = (val: string | number) => {
      if (typeof val === 'string') return val
      switch (format) {
        case 'currency':
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(val)
        case 'percentage':
          return `${val}%`
        default:
          return new Intl.NumberFormat('en-US').format(val)
      }
    }

    const getTrendColor = (direction: 'up' | 'down' | 'neutral') => {
      switch (direction) {
        case 'up':
          return 'text-[#065F46]'
        case 'down':
          return 'text-[#991B1B]'
        default:
          return 'text-[#5C574F]'
      }
    }

    const getTrendIcon = (direction: 'up' | 'down' | 'neutral') => {
      switch (direction) {
        case 'up':
          return (
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          )
        case 'down':
          return (
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          )
        default:
          return (
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          )
      }
    }

    return (
      <Card
        ref={ref}
        variant="stat"
        padding="md"
        className={cn('', className)}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-[#5C574F]">{label}</p>
            <p className="mt-2 font-heading text-2xl font-medium text-[#2C2824]">
              {formatValue(value)}
            </p>
            {trend && (
              <div className={cn('mt-2 flex items-center gap-1 text-xs', getTrendColor(trend.direction))}>
                {getTrendIcon(trend.direction)}
                <span>{Math.abs(trend.value)}%</span>
                <span className="text-[#8A847A]">vs last period</span>
              </div>
            )}
          </div>
          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#F5F3EF] text-[#5C574F]">
              {icon}
            </div>
          )}
        </div>
      </Card>
    )
  }
)

StatCard.displayName = 'StatCard'

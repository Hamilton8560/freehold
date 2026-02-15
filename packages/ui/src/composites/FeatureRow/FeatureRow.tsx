import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface FeatureRowProps extends HTMLAttributes<HTMLDivElement> {
  tag: string
  title: string
  description: string
  showTopBorder?: boolean
  showBottomBorder?: boolean
}

export const FeatureRow = forwardRef<HTMLDivElement, FeatureRowProps>(
  (
    {
      tag,
      title,
      description,
      showTopBorder = false,
      showBottomBorder = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-10 items-start py-9',
          showTopBorder && 'border-t border-[rgba(184,164,142,0.25)]',
          showBottomBorder && 'border-b border-[rgba(184,164,142,0.25)]',
          className
        )}
        {...props}
      >
        <span className="text-xs text-[#B8A48E] uppercase tracking-[0.08em] pt-1">
          {tag}
        </span>
        <div>
          <h3 className="font-heading text-xl text-[#2C2824] mb-2.5 tracking-tight font-normal">
            {title}
          </h3>
          <p className="text-sm text-[#5C574F] leading-relaxed max-w-[560px]">
            {description}
          </p>
        </div>
      </div>
    )
  }
)

FeatureRow.displayName = 'FeatureRow'

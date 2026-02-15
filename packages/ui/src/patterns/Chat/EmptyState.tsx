import { cn } from '../../utils/cn'
import { Icon } from '../../primitives/Icon'

export interface EmptyStateProps {
  message?: string
  suggestions?: string[]
  onSuggestionClick?: (suggestion: string) => void
  className?: string
}

export function EmptyState({
  message = 'How can I help you today?',
  suggestions,
  onSuggestionClick,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-1 flex-col items-center justify-center gap-4 p-8', className)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F3EF]">
        <Icon name="ai" size="lg" color="default" />
      </div>
      <p className="text-center text-sm text-[#5C574F]">{message}</p>
      {suggestions && suggestions.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onSuggestionClick?.(suggestion)}
              className="rounded-full border border-[rgba(184,164,142,0.25)] bg-white px-3 py-1.5 text-sm text-[#5C574F] transition-colors hover:border-[#B8A48E] hover:text-[#2C2824]"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

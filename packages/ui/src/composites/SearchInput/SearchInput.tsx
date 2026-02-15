import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onClear?: () => void
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onClear, ...props }, ref) => {
    return (
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-4 w-4 text-[#8A847A]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          ref={ref}
          type="search"
          value={value}
          className={cn(
            'flex h-10 w-full rounded-[10px] border bg-white pl-10 pr-10 py-2',
            'text-sm text-[#2C2824] placeholder:text-[#8A847A]',
            'transition-all duration-200',
            'border-[rgba(184,164,142,0.25)]',
            'focus:outline-none focus:border-[#B8A48E] focus:ring-2 focus:ring-[#B8A48E]/20 focus:ring-offset-1',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F5F3EF]',
            className
          )}
          {...props}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#8A847A] hover:text-[#2C2824] transition-colors"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    )
  }
)

SearchInput.displayName = 'SearchInput'

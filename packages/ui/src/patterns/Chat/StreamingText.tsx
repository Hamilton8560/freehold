import { cn } from '../../utils/cn'

export interface StreamingTextProps {
  content: string
  isStreaming?: boolean
  className?: string
}

export function StreamingText({ content, isStreaming, className }: StreamingTextProps) {
  return (
    <span className={className}>
      {content}
      {isStreaming && (
        <span className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-[#B8A48E] align-text-bottom" />
      )}
    </span>
  )
}

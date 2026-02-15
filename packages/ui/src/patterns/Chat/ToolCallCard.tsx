import { cn } from '../../utils/cn'
import { Badge } from '../../primitives/Badge'
import type { ToolCallDisplay } from './types'

const statusVariantMap = {
  pending: 'pending',
  running: 'pending',
  completed: 'approved',
  error: 'error',
} as const

const statusLabelMap = {
  pending: 'Pending',
  running: 'Running…',
  completed: 'Done',
  error: 'Error',
} as const

export interface ToolCallCardProps {
  toolCall: ToolCallDisplay
  className?: string
}

export function ToolCallCard({ toolCall, className }: ToolCallCardProps) {
  return (
    <div
      className={cn(
        'max-w-[85%] rounded-[10px] border border-[rgba(184,164,142,0.15)] bg-[#F9F7F3] p-3',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="truncate font-mono text-xs text-[#B8A48E]">
          {toolCall.toolName}
        </span>
        <Badge variant={statusVariantMap[toolCall.status]} size="sm">
          {statusLabelMap[toolCall.status]}
        </Badge>
      </div>
      {toolCall.error && (
        <p className="mt-1.5 text-xs text-[#991B1B]">{toolCall.error}</p>
      )}
      {toolCall.status === 'completed' && toolCall.result != null && (
        <pre className="mt-1.5 max-h-24 overflow-auto rounded-md bg-white p-2 font-mono text-xs text-[#5C574F]">
          {typeof toolCall.result === 'string'
            ? toolCall.result
            : JSON.stringify(toolCall.result, null, 2)}
        </pre>
      )}
    </div>
  )
}

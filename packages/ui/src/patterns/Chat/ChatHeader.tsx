import { cn } from '../../utils/cn'
import { Icon } from '../../primitives/Icon'
import type { ChatUser } from './types'

export interface ChatHeaderProps {
  title?: string
  subtitle?: string
  assistant?: ChatUser
  actions?: React.ReactNode
  className?: string
}

export function ChatHeader({
  title = 'Chat',
  subtitle,
  assistant,
  actions,
  className,
}: ChatHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 border-b border-[rgba(184,164,142,0.15)] bg-white px-4 py-3',
        className
      )}
    >
      {assistant?.avatar ? (
        <img
          src={assistant.avatar}
          alt={assistant.name}
          className="h-8 w-8 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F3EF]">
          <Icon name="ai" size="sm" color="default" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-sm font-semibold text-[#2C2824]">{title}</h2>
        {subtitle && (
          <p className="truncate text-xs text-[#8A847A]">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-1">{actions}</div>}
    </div>
  )
}

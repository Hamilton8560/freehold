import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'
import { StreamingText } from './StreamingText'
import { ToolCallCard } from './ToolCallCard'
import type { ChatMessageData, ChatUser } from './types'

const messageBubbleVariants = cva(
  ['max-w-[85%] whitespace-pre-wrap break-words text-sm leading-relaxed'],
  {
    variants: {
      role: {
        user: [
          'ml-auto rounded-[14px] rounded-br-[4px]',
          'bg-[#2C2824] text-[#FAF9F6]',
          'px-4 py-3',
        ],
        assistant: [
          'mr-auto rounded-[14px] rounded-bl-[4px]',
          'border border-[rgba(184,164,142,0.15)] bg-white text-[#2C2824]',
          'shadow-[0_1px_2px_rgba(184,164,142,0.08)]',
          'px-4 py-3',
        ],
        system: [
          'mx-auto rounded-full',
          'bg-[#F5F3EF] text-[#5C574F]',
          'px-4 py-1.5 text-center text-xs',
        ],
      },
    },
    defaultVariants: {
      role: 'user',
    },
  }
)

export interface ChatMessageProps extends VariantProps<typeof messageBubbleVariants> {
  message: ChatMessageData
  user?: ChatUser
  assistant?: ChatUser
  className?: string
}

export function ChatMessage({ message, user, assistant, className }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant'
  const isUser = message.role === 'user'
  const actor = isAssistant ? assistant : isUser ? user : undefined

  return (
    <div
      className={cn(
        'flex gap-2',
        isUser && 'justify-end',
        message.role === 'system' && 'justify-center',
        className
      )}
    >
      {isAssistant && actor?.avatar && (
        <img
          src={actor.avatar}
          alt={actor.name}
          className="h-7 w-7 shrink-0 rounded-full object-cover"
        />
      )}
      <div className="flex min-w-0 flex-col gap-2">
        <div className={messageBubbleVariants({ role: message.role })}>
          {message.content && (
            <StreamingText content={message.content} isStreaming={message.isStreaming} />
          )}
        </div>
        {message.toolCalls && message.toolCalls.length > 0 && (
          <div className="mr-auto flex flex-col gap-1.5">
            {message.toolCalls.map((toolCall) => (
              <ToolCallCard key={toolCall.id} toolCall={toolCall} />
            ))}
          </div>
        )}
      </div>
      {isUser && actor?.avatar && (
        <img
          src={actor.avatar}
          alt={actor.name}
          className="h-7 w-7 shrink-0 rounded-full object-cover"
        />
      )}
    </div>
  )
}

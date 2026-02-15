import { cn } from '../../utils/cn'
import wagonWheelImg from './assets/wagon-wheel.png'

export type TypingIndicatorVariant = 'dots' | 'wagon-wheel'

export interface TypingIndicatorProps {
  className?: string
  variant?: TypingIndicatorVariant
}

export function TypingIndicator({
  className,
  variant = 'wagon-wheel',
}: TypingIndicatorProps) {
  return (
    <div
      className={cn(
        'mr-auto flex max-w-[85%] items-center gap-1.5 rounded-[14px] rounded-bl-[4px] border border-[rgba(184,164,142,0.15)] bg-white px-4 py-3',
        className
      )}
    >
      {variant === 'dots' && <DotsIndicator />}
      {variant === 'wagon-wheel' && <WagonWheelIndicator />}
    </div>
  )
}

function DotsIndicator() {
  return (
    <>
      <span className="h-2 w-2 animate-bounce rounded-full bg-[#B8A48E]" style={{ animationDelay: '0ms' }} />
      <span className="h-2 w-2 animate-bounce rounded-full bg-[#B8A48E]" style={{ animationDelay: '150ms' }} />
      <span className="h-2 w-2 animate-bounce rounded-full bg-[#B8A48E]" style={{ animationDelay: '300ms' }} />
    </>
  )
}

function WagonWheelIndicator() {
  return (
    <img
      src={wagonWheelImg}
      alt="Loading"
      className="h-9 w-9 animate-spin"
      style={{ animationDuration: '2s' }}
    />
  )
}

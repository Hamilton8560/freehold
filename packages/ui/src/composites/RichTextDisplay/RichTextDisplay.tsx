import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import '../RichTextEditor/editor-styles.css'

export interface RichTextDisplayProps extends HTMLAttributes<HTMLDivElement> {
  /** HTML string to render. Consumers are responsible for sanitization. */
  content: string
}

export const RichTextDisplay = forwardRef<HTMLDivElement, RichTextDisplayProps>(
  ({ className, content, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('freehold-rte-content', className)}
        dangerouslySetInnerHTML={{ __html: content }}
        {...props}
      />
    )
  }
)

RichTextDisplay.displayName = 'RichTextDisplay'

import { cn } from '../../utils/cn'
import type { AuthLayoutProps } from './types'

export function AuthLayout({
  variant = 'simple',
  logo,
  title,
  description,
  splitContent,
  children,
  className,
}: AuthLayoutProps) {
  if (variant === 'split') {
    return (
      <div className={cn('flex min-h-screen', className)}>
        {/* Left panel */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#2C2824] text-[#FAF9F6] items-center justify-center p-12">
          {splitContent || (
            <div className="text-center">
              <div className="text-3xl font-heading mb-4">Welcome</div>
              <p className="text-[#FAF9F6]/60 max-w-sm">
                Sign in to access your dashboard and manage your account.
              </p>
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-[#FAF9F6]">
          <div className="w-full max-w-md">
            {logo && <div className="mb-8">{logo}</div>}
            <h1 className="font-heading text-2xl text-[#2C2824] mb-1">{title}</h1>
            {description && (
              <p className="text-sm text-[#5C574F] mb-8">{description}</p>
            )}
            {!description && <div className="mb-8" />}
            {children}
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className={cn('flex min-h-screen items-center justify-center bg-[#EFECE6] p-4 sm:p-6', className)}>
        <div className="w-full max-w-md rounded-2xl bg-white p-8 sm:p-10 shadow-lg">
          {logo && <div className="mb-8 flex justify-center">{logo}</div>}
          <h1 className="font-heading text-2xl text-[#2C2824] text-center mb-1">{title}</h1>
          {description && (
            <p className="text-sm text-[#5C574F] text-center mb-8">{description}</p>
          )}
          {!description && <div className="mb-8" />}
          {children}
        </div>
      </div>
    )
  }

  // simple (default)
  return (
    <div className={cn('flex min-h-screen items-center justify-center bg-[#F5F3EF] p-4 sm:p-6', className)}>
      <div className="w-full max-w-md">
        {logo && <div className="mb-8 flex justify-center">{logo}</div>}
        <h1 className="font-heading text-2xl text-[#2C2824] text-center mb-1">{title}</h1>
        {description && (
          <p className="text-sm text-[#5C574F] text-center mb-8">{description}</p>
        )}
        {!description && <div className="mb-8" />}
        {children}
      </div>
    </div>
  )
}

AuthLayout.displayName = 'AuthLayout'

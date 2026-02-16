import type { ReactNode } from 'react'

export type AuthLayoutVariant = 'simple' | 'split' | 'card'

export type SocialProvider = 'google' | 'github' | 'apple'

export interface AuthLayoutProps {
  variant: AuthLayoutVariant
  logo?: ReactNode
  title: string
  description?: string
  splitContent?: ReactNode
  children: ReactNode
  className?: string
}

export interface SocialProvidersProps {
  providers: SocialProvider[]
  onProviderClick: (provider: SocialProvider) => void
  dividerText?: string
  disabled?: boolean
}

export interface LoginFormData {
  email: string
  password: string
  remember: boolean
}

export interface LoginFormProps {
  variant?: AuthLayoutVariant
  logo?: ReactNode
  title?: string
  description?: string
  onSubmit: (data: LoginFormData) => void
  socialProviders?: SocialProvider[]
  onSocialLogin?: (provider: SocialProvider) => void
  forgotPasswordHref?: string
  registerHref?: string
  splitContent?: ReactNode
  isLoading?: boolean
  error?: string
  className?: string
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
}

export interface RegisterFormProps {
  variant?: AuthLayoutVariant
  logo?: ReactNode
  title?: string
  description?: string
  onSubmit: (data: RegisterFormData) => void
  socialProviders?: SocialProvider[]
  onSocialLogin?: (provider: SocialProvider) => void
  loginHref?: string
  termsHref?: string
  privacyHref?: string
  splitContent?: ReactNode
  isLoading?: boolean
  error?: string
  className?: string
}

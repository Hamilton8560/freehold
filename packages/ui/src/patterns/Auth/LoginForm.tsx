'use client'

import { type FormEvent } from 'react'
import { Form } from '../../composites/Form/Form'
import { FormField } from '../../composites/Form/FormField'
import { FormActions } from '../../composites/Form/FormActions'
import { Input } from '../../primitives/Input'
import { Checkbox } from '../../primitives/Checkbox'
import { Button } from '../../primitives/Button'
import { AuthLayout } from './AuthLayout'
import { SocialProviders } from './SocialProviders'
import type { LoginFormProps } from './types'

export function LoginForm({
  variant = 'simple',
  logo,
  title = 'Sign in',
  description,
  onSubmit,
  socialProviders,
  onSocialLogin,
  forgotPasswordHref,
  registerHref,
  splitContent,
  isLoading,
  error,
  className,
}: LoginFormProps) {
  const handleSubmit = (data: FormData, _e: FormEvent<HTMLFormElement>) => {
    onSubmit({
      email: data.get('email') as string,
      password: data.get('password') as string,
      remember: data.get('remember') === 'on',
    })
  }

  return (
    <AuthLayout
      variant={variant}
      logo={logo}
      title={title}
      description={description}
      splitContent={splitContent}
      className={className}
    >
      {/* Error message */}
      {error && (
        <div className="mb-6 rounded-lg bg-[#FEE2E2] px-4 py-3 text-sm text-[#991B1B]">
          {error}
        </div>
      )}

      <Form onSubmit={handleSubmit} disabled={isLoading}>
        <FormField
          name="email"
          label="Email"
          required
          rules={{
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address',
            },
          }}
        >
          <Input type="email" placeholder="you@example.com" autoComplete="email" />
        </FormField>

        <FormField name="password" label="Password" required>
          <Input type="password" placeholder="Enter your password" autoComplete="current-password" />
        </FormField>

        <div className="flex items-center justify-between">
          <FormField name="remember" label="">
            <Checkbox label="Remember me" name="remember" />
          </FormField>
          {forgotPasswordHref && (
            <a
              href={forgotPasswordHref}
              className="text-sm text-[#5C574F] hover:text-[#2C2824] transition-colors"
            >
              Forgot password?
            </a>
          )}
        </div>

        <FormActions align="left">
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Sign in
          </Button>
        </FormActions>
      </Form>

      {/* Social providers */}
      {socialProviders && socialProviders.length > 0 && onSocialLogin && (
        <SocialProviders
          providers={socialProviders}
          onProviderClick={onSocialLogin}
          disabled={isLoading}
        />
      )}

      {/* Register link */}
      {registerHref && (
        <p className="mt-6 text-center text-sm text-[#5C574F]">
          Don&apos;t have an account?{' '}
          <a
            href={registerHref}
            className="font-medium text-[#2C2824] hover:underline"
          >
            Create account
          </a>
        </p>
      )}
    </AuthLayout>
  )
}

LoginForm.displayName = 'LoginForm'

'use client'

import { type FormEvent } from 'react'
import { Form } from '../../composites/Form/Form'
import { FormField } from '../../composites/Form/FormField'
import { FormActions } from '../../composites/Form/FormActions'
import { Input } from '../../primitives/Input'
import { Button } from '../../primitives/Button'
import { AuthLayout } from './AuthLayout'
import { SocialProviders } from './SocialProviders'
import type { RegisterFormProps } from './types'

export function RegisterForm({
  variant = 'simple',
  logo,
  title = 'Create account',
  description,
  onSubmit,
  socialProviders,
  onSocialLogin,
  loginHref,
  termsHref,
  privacyHref,
  splitContent,
  isLoading,
  error,
  className,
}: RegisterFormProps) {
  const handleSubmit = (data: FormData, _e: FormEvent<HTMLFormElement>) => {
    onSubmit({
      name: data.get('name') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
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
        <FormField name="name" label="Full name" required>
          <Input placeholder="Jane Doe" autoComplete="name" />
        </FormField>

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

        <FormField
          name="password"
          label="Password"
          required
          rules={{
            minLength: { value: 8, message: 'Password must be at least 8 characters' },
          }}
        >
          <Input type="password" placeholder="Create a password" autoComplete="new-password" />
        </FormField>

        <FormField
          name="confirmPassword"
          label="Confirm password"
          required
          rules={{
            validate: (value: string) => {
              const passwordEl = document.querySelector<HTMLInputElement>('[name="password"]')
              if (passwordEl && value !== passwordEl.value) {
                return 'Passwords do not match'
              }
              return true
            },
          }}
        >
          <Input type="password" placeholder="Confirm your password" autoComplete="new-password" />
        </FormField>

        <FormActions align="left">
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Create account
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

      {/* Footer links */}
      <div className="mt-6 space-y-3 text-center text-sm text-[#5C574F]">
        {loginHref && (
          <p>
            Already have an account?{' '}
            <a href={loginHref} className="font-medium text-[#2C2824] hover:underline">
              Sign in
            </a>
          </p>
        )}
        {(termsHref || privacyHref) && (
          <p className="text-xs text-[#8A847A]">
            By creating an account, you agree to our{' '}
            {termsHref && (
              <a href={termsHref} className="underline hover:text-[#2C2824]">
                Terms of Service
              </a>
            )}
            {termsHref && privacyHref && ' and '}
            {privacyHref && (
              <a href={privacyHref} className="underline hover:text-[#2C2824]">
                Privacy Policy
              </a>
            )}
            .
          </p>
        )}
      </div>
    </AuthLayout>
  )
}

RegisterForm.displayName = 'RegisterForm'

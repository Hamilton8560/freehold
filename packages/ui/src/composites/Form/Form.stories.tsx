import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Form } from './Form'
import { FormField } from './FormField'
import { FormSection } from './FormSection'
import { FormActions } from './FormActions'
import { FormGrid } from './FormGrid'
import { Input } from '../../primitives/Input'
import { Textarea } from '../../primitives/Textarea'
import { Select } from '../../primitives/Select'
import { Checkbox } from '../../primitives/Checkbox'
import { Button } from '../../primitives/Button'

const meta: Meta<typeof Form> = {
  title: 'Composites/Form',
  component: Form,
  tags: ['autodocs'],
  argTypes: {
    layout: { control: 'select', options: ['vertical', 'horizontal'], description: 'Form layout' },
    disabled: { control: 'boolean', description: 'Disable all fields' },
  },
  args: {
    layout: 'vertical',
  },
}

export default meta
type Story = StoryObj<typeof Form>

export const Default: Story = {
  render: (args) => {
    const [submitted, setSubmitted] = useState<string | null>(null)
    return (
      <div className="max-w-lg">
        {submitted && (
          <div className="mb-4 rounded-lg bg-[#D1FAE5] px-4 py-2 text-sm text-[#065F46]">
            Submitted: {submitted}
          </div>
        )}
        <Form
          {...args}
          onSubmit={(data) => {
            setSubmitted(JSON.stringify(Object.fromEntries(data), null, 2))
            setTimeout(() => setSubmitted(null), 3000)
          }}
        >
          <FormField name="name" label="Full Name" required hint="As it appears on your ID">
            <Input placeholder="Jane Doe" />
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
            <Input type="email" placeholder="jane@example.com" />
          </FormField>
          <FormField name="bio" label="Bio" optional maxLength={200}>
            <Textarea placeholder="Tell us about yourself..." />
          </FormField>
          <FormActions>
            <Button variant="secondary" type="button">Cancel</Button>
            <Button type="submit">Submit</Button>
          </FormActions>
        </Form>
      </div>
    )
  },
}

export const HorizontalLayout: Story = {
  render: () => (
    <div className="max-w-lg">
      <Form layout="horizontal">
        <FormField name="name" label="Name" required>
          <Input placeholder="Jane Doe" />
        </FormField>
        <FormField name="email" label="Email" required>
          <Input type="email" placeholder="jane@example.com" />
        </FormField>
        <FormActions>
          <Button type="submit">Save</Button>
        </FormActions>
      </Form>
    </div>
  ),
}

export const WithSections: Story = {
  render: () => (
    <div className="max-w-md">
      <Form>
        <FormSection title="Personal Information" description="Basic contact details.">
          <FormField name="name" label="Name" required>
            <Input placeholder="Jane Doe" />
          </FormField>
          <FormField name="phone" label="Phone" optional>
            <Input type="tel" placeholder="(555) 123-4567" />
          </FormField>
        </FormSection>
        <FormSection title="Preferences">
          <FormField name="newsletter" label="">
            <Checkbox label="Subscribe to newsletter" />
          </FormField>
        </FormSection>
        <FormActions>
          <Button variant="secondary" type="button">Cancel</Button>
          <Button type="submit">Save</Button>
        </FormActions>
      </Form>
    </div>
  ),
}

export const WithGrid: Story = {
  render: () => (
    <div className="max-w-lg">
      <Form>
        <FormGrid columns={2}>
          <FormField name="firstName" label="First Name" required>
            <Input placeholder="Jane" />
          </FormField>
          <FormField name="lastName" label="Last Name" required>
            <Input placeholder="Doe" />
          </FormField>
        </FormGrid>
        <FormGrid columns={3}>
          <FormField name="city" label="City">
            <Input placeholder="Austin" />
          </FormField>
          <FormField name="state" label="State">
            <Input placeholder="TX" />
          </FormField>
          <FormField name="zip" label="ZIP">
            <Input placeholder="78701" />
          </FormField>
        </FormGrid>
        <FormActions>
          <Button type="submit">Save Address</Button>
        </FormActions>
      </Form>
    </div>
  ),
}

export const WithValidation: Story = {
  render: () => (
    <div className="max-w-lg">
      <Form onSubmit={() => alert('Form is valid!')}>
        <FormField name="email" label="Email" required rules={{ pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } }}>
          <Input type="email" placeholder="you@example.com" />
        </FormField>
        <FormField name="password" label="Password" required rules={{ minLength: { value: 8, message: 'Minimum 8 characters' } }}>
          <Input type="password" placeholder="Min 8 characters" />
        </FormField>
        <FormField name="terms" label="" required="You must accept the terms">
          <Checkbox label="I accept the terms and conditions" />
        </FormField>
        <FormActions>
          <Button type="submit">Register</Button>
        </FormActions>
      </Form>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="max-w-lg">
      <Form disabled>
        <FormField name="name" label="Name">
          <Input placeholder="Jane Doe" defaultValue="Jane Doe" />
        </FormField>
        <FormField name="email" label="Email">
          <Input type="email" defaultValue="jane@example.com" />
        </FormField>
        <FormActions>
          <Button type="submit">Submit</Button>
        </FormActions>
      </Form>
    </div>
  ),
}

export const WithSelect: Story = {
  render: () => (
    <div className="max-w-lg">
      <Form>
        <FormField name="name" label="Name" required>
          <Input placeholder="Jane Doe" />
        </FormField>
        <FormField name="department" label="Department" required>
          <Select
            placeholder="Select department"
            options={[
              { value: 'engineering', label: 'Engineering' },
              { value: 'design', label: 'Design' },
              { value: 'marketing', label: 'Marketing' },
            ]}
          />
        </FormField>
        <FormActions>
          <Button type="submit">Save</Button>
        </FormActions>
      </Form>
    </div>
  ),
}

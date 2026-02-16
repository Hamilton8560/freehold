import { defineTool } from '@freehold/ai'
import { z } from 'zod'
import { neon } from '@neondatabase/serverless'

// --- Company knowledge base ---

const companyInfoTool = defineTool({
  name: 'getCompanyInfo',
  description:
    'Get detailed information about Freehold. Use this when the visitor asks about what Freehold does, features, pricing, tech stack, industries served, delivery process, or who built it.',
  parameters: z.object({
    topic: z
      .enum(['overview', 'features', 'pricing', 'stack', 'industries', 'process', 'credentials'])
      .describe('The topic to get info about'),
  }),
  execute: async ({ topic }) => {
    const info: Record<string, string> = {
      overview:
        'Freehold builds turnkey software systems that transition small businesses from owner-dependent to scalable. We deliver CRM, billing, operations, and AI automation — deployed and ready. Enterprise-grade systems, built for small business.',
      features:
        'Platform modules include: (1) CRM + Pipeline — client management with automated follow-ups, pipeline tracking, and revenue forecasting. (2) Billing + Stripe — subscription management, invoicing, and payment processing. (3) AI Operations — natural language data queries, operational insights, and automated reports. (4) Admin Dashboards — real-time dashboards, team management, and reporting.',
      pricing:
        'Freehold offers flexible pricing starting from $29/month for small teams. Enterprise plans include custom integrations and dedicated support. Pricing is tailored to your business size and needs — we recommend booking a discovery call to get a precise quote.',
      stack:
        'Built with Next.js 15, React 19, TypeScript, Tailwind CSS, Vercel AI SDK, and a warm sand-toned design system. Modern frameworks trusted by enterprise teams.',
      industries:
        'We serve three primary industries: (1) Fitness & Gyms — member management, class scheduling, retention systems, automated billing. (2) Logistics & Field Ops — route management, fleet tracking, dispatch coordination, real-time dashboards. (3) Service Businesses — client onboarding, project pipelines, automated invoicing, performance reporting.',
      process:
        'Our delivery process has 4 stages: (1) Discovery — we map your operations, pain points, and growth goals. (2) Configure — your system is built and wired with CRM, billing, dashboards, AI. (3) Deploy — production-ready with your domain, branding, and data migrated. (4) Scale — ongoing support, system expansion, and AI training as you grow.',
      credentials:
        'Freehold is built by operators, not just engineers. Founded on a CS degree and graduate work in IT management. Real experience across oil field services, international logistics, and gym operations. Every system is designed, developed, and customer-tested in-house — not outsourced.',
    }
    return { info: info[topic] || 'Topic not found.' }
  },
})

// --- Lead capture (Neon Postgres) ---

const captureLeadTool = defineTool({
  name: 'captureLead',
  description:
    "Save a visitor's contact information. Call this ONLY when you have collected both a name and email from the visitor during the conversation.",
  parameters: z.object({
    name: z.string().describe("The visitor's name"),
    email: z.string().email().describe("The visitor's email address"),
    interest: z.string().optional().describe('Brief note about what they are interested in'),
  }),
  execute: async ({ name, email, interest }) => {
    const databaseUrl = process.env.DATABASE_URL
    if (!databaseUrl) {
      console.error('DATABASE_URL not configured — lead not saved')
      return { success: false, message: 'Lead capture is temporarily unavailable.' }
    }

    const sql = neon(databaseUrl)

    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        interest TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `

    await sql`
      INSERT INTO leads (name, email, interest)
      VALUES (${name}, ${email}, ${interest || null})
    `

    return { success: true, message: `Got it — we'll be in touch, ${name}!` }
  },
})

// --- Scheduling ---

const scheduleMeetingTool = defineTool({
  name: 'scheduleMeeting',
  description:
    'Provide a link to schedule a discovery call or product demo. Use this when the visitor wants to book time or learn more in a live conversation.',
  parameters: z.object({
    type: z.enum(['discovery', 'demo']).describe('Type of meeting to schedule'),
  }),
  execute: async ({ type }) => {
    const url =
      process.env.CALENDLY_URL || 'https://calendly.com/davidhamilton473/el-salvador-consultation'
    const label = type === 'discovery' ? 'Discovery Call' : 'Product Demo'
    return {
      meetingType: label,
      url,
      message: `Here's the link to book a ${label}: ${url}`,
    }
  },
})

// --- Payroll calculator (capability demo) ---

const payrollCalculatorTool = defineTool({
  name: 'calculatePayroll',
  description: 'Calculate estimated monthly payroll for an employee given an annual salary and optional tax rate.',
  parameters: z.object({
    annualSalary: z.number().describe('Annual salary in USD'),
    taxRate: z.number().min(0).max(1).optional().describe('Tax rate (0-1), defaults to 0.25'),
  }),
  execute: async ({ annualSalary, taxRate = 0.25 }) => {
    const monthly = annualSalary / 12
    const taxes = monthly * taxRate
    const netPay = monthly - taxes
    return {
      grossMonthly: Math.round(monthly * 100) / 100,
      taxes: Math.round(taxes * 100) / 100,
      netMonthly: Math.round(netPay * 100) / 100,
    }
  },
})

export const salesTools = [companyInfoTool, captureLeadTool, scheduleMeetingTool, payrollCalculatorTool]

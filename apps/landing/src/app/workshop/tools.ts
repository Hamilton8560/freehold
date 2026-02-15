import { defineTool } from '@freehold/ai'
import { z } from 'zod'

// --- Tool definitions (shared with API route) ---

export const companyInfoTool = defineTool({
  name: 'getCompanyInfo',
  description: 'Get information about Freehold',
  parameters: z.object({
    topic: z.enum(['overview', 'features', 'pricing', 'stack']).describe('The topic to get info about'),
  }),
  execute: async ({ topic }) => {
    const info: Record<string, string> = {
      overview: 'Freehold is a modern business management platform with payroll, CRM, pipeline management, and AI-powered automation.',
      features: 'Key features include: Payroll Dashboard, Client Management (CRM), Pipeline Tracking, AI Chat Assistants, Rich Text Editing, Data Visualization (charts), and Billing.',
      pricing: 'Freehold offers flexible pricing starting from $29/month for small teams. Enterprise plans include custom integrations and dedicated support.',
      stack: 'Built with Next.js 15, React 19, TypeScript, Tailwind CSS, Vercel AI SDK, and a warm sand-toned design system.',
    }
    return { info: info[topic] || 'Topic not found.' }
  },
})

export const payrollCalculatorTool = defineTool({
  name: 'calculatePayroll',
  description: 'Calculate estimated payroll for an employee',
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

export const workshopTools = [companyInfoTool, payrollCalculatorTool]

// --- Serializable documentation metadata for the UI ---

export interface ToolParamDoc {
  name: string
  type: string
  required: boolean
  description: string
}

export interface ToolDoc {
  name: string
  description: string
  parameters: ToolParamDoc[]
  exampleCall: string
  exampleResult: string
}

export const TOOL_DOCS: ToolDoc[] = [
  {
    name: 'getCompanyInfo',
    description:
      'Retrieves information about the Freehold platform. The model calls this tool when the user asks about what Freehold is, what it offers, pricing, or the tech stack.',
    parameters: [
      {
        name: 'topic',
        type: 'enum: overview | features | pricing | stack',
        required: true,
        description: 'The topic to get info about',
      },
    ],
    exampleCall: JSON.stringify({ topic: 'features' }, null, 2),
    exampleResult: JSON.stringify(
      {
        info: 'Key features include: Payroll Dashboard, Client Management (CRM), Pipeline Tracking, AI Chat Assistants, Rich Text Editing, Data Visualization (charts), and Billing.',
      },
      null,
      2
    ),
  },
  {
    name: 'calculatePayroll',
    description:
      'Calculates estimated monthly payroll for an employee given an annual salary and optional tax rate. The model calls this when the user asks about payroll or salary calculations.',
    parameters: [
      {
        name: 'annualSalary',
        type: 'number',
        required: true,
        description: 'Annual salary in USD',
      },
      {
        name: 'taxRate',
        type: 'number (0-1)',
        required: false,
        description: 'Tax rate (0-1), defaults to 0.25',
      },
    ],
    exampleCall: JSON.stringify({ annualSalary: 120000, taxRate: 0.3 }, null, 2),
    exampleResult: JSON.stringify(
      {
        grossMonthly: 10000,
        taxes: 3000,
        netMonthly: 7000,
      },
      null,
      2
    ),
  },
]

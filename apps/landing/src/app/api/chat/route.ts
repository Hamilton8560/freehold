import { createChatHandler } from '@freehold/ai/server'
import { defineTool } from '@freehold/ai'
import { z } from 'zod'

const companyInfoTool = defineTool({
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

const payrollCalculatorTool = defineTool({
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

export const POST = createChatHandler({
  provider: {
    provider: 'openai',
    model: 'gpt-4o-mini',
  },
  tools: [companyInfoTool, payrollCalculatorTool],
  systemPrompt: `You are a helpful Freehold assistant. You help users learn about the Freehold platform and can calculate payroll estimates. Be friendly, concise, and use the tools available to you when relevant. Keep responses short — 1-3 sentences unless more detail is asked for.`,
})

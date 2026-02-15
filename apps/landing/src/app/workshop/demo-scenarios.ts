import { formatDataStreamPart, generateId } from 'ai'
import type { DataStreamWriter } from 'ai'
import { companyInfoTool, payrollCalculatorTool } from './tools'

// --- Types ---

interface DemoScenario {
  keywords: string[]
  toolCall?: { toolName: string; args: Record<string, unknown> }
  response: string
}

// --- Canned scenarios (aligned with SUGGESTIONS in page.tsx) ---

const SCENARIOS: DemoScenario[] = [
  {
    keywords: ['feature', 'offer', 'what does', 'what can'],
    toolCall: { toolName: 'getCompanyInfo', args: { topic: 'features' } },
    response:
      'Freehold offers a comprehensive suite of business tools including a Payroll Dashboard for managing employee compensation, Client Management (CRM), Pipeline Tracking for deals, AI Chat Assistants like this one, Rich Text Editing, Data Visualization with charts, and Billing. Everything is designed to work together seamlessly.',
  },
  {
    keywords: ['payroll', 'salary', 'calculate', '120k'],
    toolCall: { toolName: 'calculatePayroll', args: { annualSalary: 120000, taxRate: 0.3 } },
    response:
      'For a $120,000 annual salary with a 30% tax rate, the monthly breakdown is: **$10,000 gross**, **$3,000 in taxes**, and **$7,000 net take-home pay**. You can adjust the salary and tax rate to model different scenarios.',
  },
  {
    keywords: ['tech', 'stack', 'built with'],
    toolCall: { toolName: 'getCompanyInfo', args: { topic: 'stack' } },
    response:
      'Freehold is built with a modern stack: **Next.js 15** and **React 19** on the frontend, **TypeScript** throughout, **Tailwind CSS** for styling with a warm sand-toned design system, and the **Vercel AI SDK** powering the AI features you\'re using right now.',
  },
  {
    keywords: ['what is freehold', 'overview', 'about', 'tell me'],
    toolCall: { toolName: 'getCompanyInfo', args: { topic: 'overview' } },
    response:
      'Freehold is a modern business management platform that brings together payroll, CRM, pipeline management, and AI-powered automation in one place. It\'s designed for teams that want powerful tools without the complexity.',
  },
]

const FALLBACK_RESPONSE =
  "I'm running in demo mode with preprogrammed responses. Try one of these prompts to see tool calling in action:\n\n- **\"What features does Freehold offer?\"** — triggers the getCompanyInfo tool\n- **\"Calculate payroll for a $120k salary with 30% tax\"** — triggers the calculatePayroll tool\n- **\"Tell me about the tech stack\"** — triggers getCompanyInfo with a different topic\n\nOr switch to a real provider in the config panel to chat freely!"

// --- Matching ---

export function matchScenario(userMessage: string): DemoScenario {
  const lower = userMessage.toLowerCase()
  const match = SCENARIOS.find((s) => s.keywords.some((kw) => lower.includes(kw)))
  return match || { keywords: [], response: FALLBACK_RESPONSE }
}

// --- Stream execution ---

const TOOL_EXECUTORS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  getCompanyInfo: (args) => companyInfoTool.execute(args as { topic: 'overview' | 'features' | 'pricing' | 'stack' }),
  calculatePayroll: (args) => payrollCalculatorTool.execute(args as { annualSalary: number; taxRate?: number }),
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function executeDemoStream(
  scenario: DemoScenario,
  writer: DataStreamWriter,
): Promise<void> {
  // Tool call step
  if (scenario.toolCall) {
    const toolCallId = generateId()
    const { toolName, args } = scenario.toolCall

    // 1. Emit tool call
    writer.write(formatDataStreamPart('tool_call', { toolCallId, toolName, args }))

    // 2. Execute real tool function with a small delay for visual effect
    await delay(500)
    const executor = TOOL_EXECUTORS[toolName]
    const result = executor ? await executor(args) : { error: 'Unknown tool' }

    // 3. Emit tool result
    writer.write(formatDataStreamPart('tool_result', { toolCallId, result }))

    // 4. Finish the tool-calls step
    writer.write(formatDataStreamPart('finish_step', { finishReason: 'tool-calls', isContinued: true }))
  }

  // Text response step — stream word by word
  const words = scenario.response.split(' ')
  for (let i = 0; i < words.length; i++) {
    const chunk = i === 0 ? words[i] : ' ' + words[i]
    writer.write(formatDataStreamPart('text', chunk))
    await delay(30)
  }

  // Finish
  writer.write(formatDataStreamPart('finish_step', { finishReason: 'stop', isContinued: false }))
  writer.write(formatDataStreamPart('finish_message', { finishReason: 'stop' }))
}

'use client'

import { useState } from 'react'
import { Badge } from '@freehold/ui'
import { TOOL_DOCS, type ToolDoc } from '../tools'

// --- How Tool Calling Works ---

const STEPS = [
  {
    title: 'User sends a message',
    description: 'The user types a question or request in the chat input.',
  },
  {
    title: 'Model decides to call a tool',
    description: 'Instead of replying directly, the model recognizes it needs external data and emits a structured tool call.',
  },
  {
    title: 'Tool call with typed arguments',
    description: 'The model outputs a JSON object with the tool name and strongly-typed arguments matching the tool schema.',
  },
  {
    title: 'Server executes the tool',
    description: 'The server runs the tool function with the provided arguments and returns the structured result.',
  },
  {
    title: 'Model formulates a response',
    description: 'The model receives the tool result and uses it to compose a natural-language answer for the user.',
  },
]

function HowItWorks() {
  return (
    <div>
      <h3 className="font-heading text-xl text-[#2C2824] mb-6">How Tool Calling Works</h3>
      <div className="space-y-3">
        {STEPS.map((step, i) => (
          <div
            key={i}
            className="flex gap-4 rounded-[10px] border border-[rgba(184,164,142,0.15)] bg-[#F9F7F3] p-4"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#B8A48E] text-xs font-semibold text-white">
              {i + 1}
            </div>
            <div>
              <p className="text-sm font-semibold text-[#2C2824]">{step.title}</p>
              <p className="mt-0.5 text-sm text-[#5C574F] leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// --- Tool Card ---

function ToolCard({ doc, defaultOpen }: { doc: ToolDoc; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="rounded-[14px] border border-[rgba(184,164,142,0.15)] bg-white shadow-[0_1px_3px_rgba(26,26,26,0.04),0_4px_12px_rgba(26,26,26,0.03)]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-semibold text-[#2C2824]">{doc.name}</span>
          <Badge variant="default" size="sm">Tool</Badge>
        </div>
        <svg
          className={`h-4 w-4 text-[#5C574F] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-[rgba(184,164,142,0.15)] px-5 pb-5 pt-4 space-y-5">
          <p className="text-sm text-[#5C574F] leading-relaxed">{doc.description}</p>

          {/* Parameters table */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8A847A] mb-2">Parameters</h4>
            <div className="overflow-x-auto rounded-[10px] border border-[rgba(184,164,142,0.15)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(184,164,142,0.15)] bg-[#F9F7F3]">
                    <th className="px-3 py-2 text-left text-xs font-semibold text-[#5C574F]">Name</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-[#5C574F]">Type</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-[#5C574F]">Required</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-[#5C574F]">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {doc.parameters.map((param) => (
                    <tr key={param.name} className="border-b border-[rgba(184,164,142,0.08)] last:border-0">
                      <td className="px-3 py-2 font-mono text-xs text-[#2C2824]">{param.name}</td>
                      <td className="px-3 py-2 font-mono text-xs text-[#B8A48E]">{param.type}</td>
                      <td className="px-3 py-2 text-xs text-[#5C574F]">{param.required ? 'Yes' : 'No'}</td>
                      <td className="px-3 py-2 text-xs text-[#5C574F]">{param.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Example call + result side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8A847A] mb-2">Example Call</h4>
              <pre className="rounded-[10px] bg-[#1A1816] p-4 font-mono text-xs text-[#D4C8B8] overflow-x-auto leading-relaxed">
                {doc.exampleCall}
              </pre>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8A847A] mb-2">Example Result</h4>
              <pre className="rounded-[10px] bg-[#1A1816] p-4 font-mono text-xs text-[#D4C8B8] overflow-x-auto leading-relaxed">
                {doc.exampleResult}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// --- Adding Your Own Tools ---

const DEFINE_TOOL_EXAMPLE = `import { defineTool } from '@freehold/ai'
import { z } from 'zod'

export const weatherTool = defineTool({
  name: 'getWeather',
  description: 'Get current weather for a city',
  parameters: z.object({
    city: z.string().describe('City name, e.g. "San Francisco"'),
    units: z.enum(['celsius', 'fahrenheit'])
      .optional()
      .describe('Temperature units, defaults to fahrenheit'),
  }),
  execute: async ({ city, units = 'fahrenheit' }) => {
    // Your implementation here — call an API, query a DB, etc.
    const temp = units === 'celsius' ? 18 : 64
    return { city, temperature: temp, units, condition: 'Partly cloudy' }
  },
})`

const REGISTER_TOOL_EXAMPLE = `// tools.ts
import { weatherTool } from './weather-tool'
import { companyInfoTool, payrollCalculatorTool } from './tools'

export const workshopTools = [
  companyInfoTool,
  payrollCalculatorTool,
  weatherTool,  // ← add your new tool here
]`

const ROUTE_EXAMPLE = `// api/workshop/chat/route.ts
import { toAISDKTools } from '@freehold/ai/server'
import { workshopTools } from '../../../workshop/tools'

// In your POST handler:
const result = streamText({
  model: languageModel,
  messages,
  tools: toAISDKTools(workshopTools),  // ← tools auto-converted
  maxSteps: 5,
})`

function AddingTools() {
  return (
    <div>
      <h3 className="font-heading text-xl text-[#2C2824] mb-3">Adding Your Own Tools</h3>
      <p className="text-sm text-[#5C574F] leading-relaxed mb-6">
        Tools let the AI model call functions during a conversation. Here&apos;s how to create and register a new tool.
      </p>

      <div className="space-y-6">
        {/* Step 1 */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8A847A] mb-2">
            1. Define the tool
          </h4>
          <pre className="rounded-[10px] bg-[#1A1816] p-4 font-mono text-xs text-[#D4C8B8] overflow-x-auto leading-relaxed">
            {DEFINE_TOOL_EXAMPLE}
          </pre>
        </div>

        {/* Step 2 */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8A847A] mb-2">
            2. Register the tool
          </h4>
          <pre className="rounded-[10px] bg-[#1A1816] p-4 font-mono text-xs text-[#D4C8B8] overflow-x-auto leading-relaxed">
            {REGISTER_TOOL_EXAMPLE}
          </pre>
        </div>

        {/* Step 3 */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8A847A] mb-2">
            3. Pass to the API route
          </h4>
          <pre className="rounded-[10px] bg-[#1A1816] p-4 font-mono text-xs text-[#D4C8B8] overflow-x-auto leading-relaxed">
            {ROUTE_EXAMPLE}
          </pre>
        </div>

        {/* Best practices */}
        <div className="rounded-[10px] border border-[rgba(184,164,142,0.15)] bg-[#F9F7F3] p-4">
          <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8A847A] mb-2">
            Best practices
          </h4>
          <ul className="space-y-1.5 text-sm text-[#5C574F] leading-relaxed">
            <li className="flex gap-2"><span className="text-[#B8A48E] shrink-0">-</span>Write clear, specific <code className="text-xs bg-[#F0EDE8] px-1 py-0.5 rounded">description</code> strings — the model uses them to decide when to call the tool</li>
            <li className="flex gap-2"><span className="text-[#B8A48E] shrink-0">-</span>Use <code className="text-xs bg-[#F0EDE8] px-1 py-0.5 rounded">.describe()</code> on every Zod parameter so the model knows what values to pass</li>
            <li className="flex gap-2"><span className="text-[#B8A48E] shrink-0">-</span>Return structured data (objects) rather than plain strings for richer model responses</li>
            <li className="flex gap-2"><span className="text-[#B8A48E] shrink-0">-</span>Keep tool execution fast — long-running tools delay the user experience</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// --- Main Export ---

export function ToolDocumentation() {
  return (
    <div className="space-y-10">
      <HowItWorks />

      <div>
        <h3 className="font-heading text-xl text-[#2C2824] mb-6">Available Tools</h3>
        <div className="space-y-4">
          {TOOL_DOCS.map((doc, i) => (
            <ToolCard key={doc.name} doc={doc} defaultOpen={i === 0} />
          ))}
        </div>
      </div>

      <AddingTools />
    </div>
  )
}

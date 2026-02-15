import { tool, type CoreTool } from 'ai'
import type { FreeholdToolDefinition } from './types'

export { defineTool } from './define-tool'
export type { FreeholdToolDefinition } from './types'

/**
 * Convert a single FreeholdToolDefinition into an AI SDK CoreTool.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toAISDKTool(def: FreeholdToolDefinition<any, any>): CoreTool {
  return tool({
    description: def.description,
    parameters: def.parameters,
    execute: def.execute,
  })
}

/**
 * Convert an array of FreeholdToolDefinitions into the AI SDK tools record.
 */
export function toAISDKTools(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tools: FreeholdToolDefinition<any, any>[]
): Record<string, CoreTool> {
  const record: Record<string, CoreTool> = {}
  for (const t of tools) {
    record[t.name] = toAISDKTool(t)
  }
  return record
}

/**
 * Create a named registry of tools for easy reuse.
 */
export function createToolRegistry(tools: FreeholdToolDefinition[]) {
  const map = new Map<string, FreeholdToolDefinition>()
  for (const t of tools) {
    map.set(t.name, t)
  }

  return {
    get: (name: string) => map.get(name),
    getAll: () => [...map.values()],
    toAISDKTools: () => toAISDKTools([...map.values()]),
    names: () => [...map.keys()],
  }
}

import type { z } from 'zod'
import type { FreeholdToolDefinition } from './types'

export function defineTool<TParams extends z.ZodType, TResult>(
  config: FreeholdToolDefinition<TParams, TResult>
): FreeholdToolDefinition<TParams, TResult> {
  return config
}

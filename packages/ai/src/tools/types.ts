import type { z } from 'zod'

export interface FreeholdToolDefinition<
  TParams extends z.ZodType = z.ZodType,
  TResult = unknown,
> {
  name: string
  description: string
  parameters: TParams
  execute: (params: z.infer<TParams>) => Promise<TResult>
}

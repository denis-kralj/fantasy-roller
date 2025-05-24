import type { InterpretationResult } from './roller/roller'

export type Outcome = {
    Title: string
    Timestamp: number
    Data: Record<string, InterpretationResult>
}

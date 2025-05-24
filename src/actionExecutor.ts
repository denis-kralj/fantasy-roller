import type { Action } from './action'
import type { Outcome } from './outcome'
import { interpret, type InterpretationResult } from './roller/roller'

export function actionToOutcome(action: Action): Outcome {
    const result = executeAction(action)
    return {
        Title: action.Label,
        Timestamp: Date.now(),
        Data: result,
    }
}

export function executeAction(action: Action): Record<string, InterpretationResult> {
    const result: Record<string, InterpretationResult> = {}
    for (const element of action.Elements) {
        result[element.Label] = interpret(element.Value)
    }
    return result
}

import type { Action } from './action'
import type { Outcome } from './outcome'

export function actionToOutcome(action: Action): Outcome {
    const result = executeAction(action)
    return {
        Title: action.Label,
        Timestamp: Date.now(),
        Data: result,
    }
}

export function executeAction(action: Action): Record<string, string> {
    const result: Record<string, string> = {}
    for (const element of action.Elements) {
        result[element.Label] = resolveValue(element.Value)
    }
    return result
}

function resolveValue(value: string): string {
    return value
}

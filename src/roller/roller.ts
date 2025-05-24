import { parse } from '../generated/roll-parser'

export type RollResult = {
    result: number
    rolls: { dice: string; result: number }[]
}

export type InterpretationResult = SuccessfulInterpretation | FailedInterpretation

export interface SuccessfulInterpretation {
    success: true
    expression: string
    rollResult: RollResult
}

export interface FailedInterpretation {
    success: false
    expression: string
    error: string
}

export function isSuccessful(result: InterpretationResult): result is SuccessfulInterpretation {
    return result.success === true
}

export function interpret(expression: string): InterpretationResult {
    try {
        const result: RollResult = parse(expression, {})

        return {
            success: true,
            expression,
            rollResult: result,
        }
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            return {
                success: false,
                expression,
                error: error.message,
            }
        } else {
            return {
                success: false,
                expression,
                error: 'Unknown error',
            }
        }
    }
}

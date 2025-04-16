import { parse } from '../generated/roll-parser'

type RollResult = {
    result: number
    rolls: { dice: string; result: number }[]
}

export type InterpretationResult = SuccessfulInterpretation | FailedInterpretation

export interface SuccessfulInterpretation {
    success: true
    rollResult: RollResult
}

export interface FailedInterpretation {
    success: false
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
            rollResult: result,
        }
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            return {
                success: false,
                error: error.message,
            }
        } else {
            return {
                success: false,
                error: 'Unknown error',
            }
        }
    }
}

import { expect, suite, test } from 'vitest'
import {
    interpret,
    isSuccessful,
    type FailedInterpretation,
    type InterpretationResult,
    type SuccessfulInterpretation,
} from './roller'

function expectSuccessful(
    result: InterpretationResult,
): asserts result is SuccessfulInterpretation {
    expect(result.success).toBe(true)
    if (!isSuccessful(result)) {
        throw new Error('Expected a successful interpretation')
    }
}

suite(`testing simple numbers`, () => {
    for (let i = 1; i < 1000; i++) {
        const expression = `${i}`
        test(`for expression '${expression}' return number ${i}`, () => {
            const result = interpret(expression)
            expectSuccessful(result)
            expect(result.rollResult.result).toBe(i)
        })
    }
})

suite(`testing simple addition math`, () => {
    for (let i = 1; i < 1000; i++) {
        const expression = `${i}+${i}`
        test(`for expression '${expression}' return number ${i + i}`, () => {
            const result = interpret(expression)
            expectSuccessful(result)
            expect(result.rollResult.result).toBe(i + i)
        })
    }
})

suite(`testing more addition math`, () => {
    for (let i = 1; i < 1000; i++) {
        const first = Math.floor(Math.random() * 1000) + 1
        const second = Math.floor(Math.random() * 1000) + 1
        const expression = `${first}+${second}`
        test(`for expression '${expression}' return number ${first + second}`, () => {
            const result = interpret(expression)
            expectSuccessful(result)
            expect(result.rollResult.result).toBe(first + second)
        })
    }
})

suite(`testing simple substration math`, () => {
    for (let i = 1; i < 1000; i++) {
        const expression = `${i}-${i}`
        test(`for expression '${expression}' return number ${i + i}`, () => {
            const result = interpret(expression)
            expectSuccessful(result)
            expect(result.rollResult.result).toBe(i - i)
        })
    }
})

suite(`testing more substration math`, () => {
    for (let i = 1; i < 1000; i++) {
        const first = Math.floor(Math.random() * 1000) + 1
        const second = Math.floor(Math.random() * 1000) + 1
        const expression = `${first}-${second}`
        test(`for expression '${expression}' return number ${first - second}`, () => {
            const result = interpret(expression)
            expectSuccessful(result)
            expect(result.rollResult.result).toBe(first - second)
        })
    }
})

suite(`testing standard dice rolls`, () => {
    const cases = [
        { exp: 'd4', min: 1, max: 4 },
        { exp: 'd6', min: 1, max: 6 },
        { exp: 'd8', min: 1, max: 8 },
        { exp: 'd10', min: 1, max: 10 },
        { exp: 'd12', min: 1, max: 12 },
        { exp: 'd20', min: 1, max: 20 },
        { exp: 'd100', min: 1, max: 100 },
    ]
    cases.forEach(({ exp, min, max }) => {
        test(`for expression '${exp}' return number between ${min} and ${max}`, () => {
            const result = interpret(exp)
            expectSuccessful(result)
            expect(result.rollResult.result).toBeGreaterThanOrEqual(min)
            expect(result.rollResult.result).toBeLessThanOrEqual(max)
        })
    })
})

suite(`testing standard dice rolls with prefix`, () => {
    const cases = [
        { exp: '1d4', min: 1, max: 4 },
        { exp: '1d6', min: 1, max: 6 },
        { exp: '1d8', min: 1, max: 8 },
        { exp: '1d10', min: 1, max: 10 },
        { exp: '1d12', min: 1, max: 12 },
        { exp: '1d20', min: 1, max: 20 },
        { exp: '1d100', min: 1, max: 100 },
    ]
    cases.forEach(({ exp, min, max }) => {
        test(`for expression '${exp}' return number between ${min} and ${max}`, () => {
            const result = interpret(exp)
            expectSuccessful(result)
            expect(result.rollResult.result).toBeGreaterThanOrEqual(min)
            expect(result.rollResult.result).toBeLessThanOrEqual(max)
        })
    })
})

// Further tests use d1 in order to avoid randomness, the tests above are good enough to test it by themselves
suite(`basic tests for 1 sided dice`, () => {
    test(`for expression 'd1' return number 1`, () => {
        const result = interpret('d1')
        expectSuccessful(result)
        expect(result.rollResult.result).toBe(1)
        expect(result.rollResult.rolls[0].result).toBe(1)
        expect(result.rollResult.rolls[0].dice).toBe('d1')
    })

    test(`for expression '1d1' return number 1`, () => {
        const result = interpret('1d1')
        expectSuccessful(result)
        expect(result.rollResult.result).toBe(1)
        expect(result.rollResult.rolls[0].result).toBe(1)
        expect(result.rollResult.rolls[0].dice).toBe('d1')
    })

    test(`for expression '2d1' return number 2`, () => {
        const result = interpret('2d1')
        expectSuccessful(result)
        expect(result.rollResult.result).toBe(2)
        expect(result.rollResult.rolls[0].result).toBe(1)
        expect(result.rollResult.rolls[0].dice).toBe('d1')
        expect(result.rollResult.rolls[1].result).toBe(1)
        expect(result.rollResult.rolls[1].dice).toBe('d1')
        expect(result.rollResult.rolls.length).toBe(2)
    })
})

suite(`testing expressions containing dice and constants`, () => {
    for (let i = 1; i < 1000; i++) {
        const diceCount = Math.floor(Math.random() * 1000) + 1
        const constant = Math.floor(Math.random() * 1000) + 1
        const expression = `${constant}+${diceCount}d1`
        test(`for expression '${expression}' return ${diceCount + constant}`, () => {
            const result = interpret(expression)
            expectSuccessful(result)
            expect(result.rollResult.result).toBe(diceCount + constant)
        })
    }

    for (let i = 1; i < 1000; i++) {
        const diceCount = Math.floor(Math.random() * 1000) + 1
        const constant = Math.floor(Math.random() * 1000) + 1
        const expression = `${diceCount}d1+${constant}`
        test(`for expression '${expression}' return ${diceCount + constant}`, () => {
            const result = interpret(expression)
            expectSuccessful(result)
            expect(result.rollResult.result).toBe(diceCount + constant)
        })
    }

    for (let i = 1; i < 1000; i++) {
        const diceCount = Math.floor(Math.random() * 1000) + 1
        const constant = Math.floor(Math.random() * 1000) + 1
        const expression = `${diceCount}d1-${constant}`
        test(`for expression '${expression}' return ${diceCount - constant}`, () => {
            const result = interpret(expression)
            expectSuccessful(result)
            expect(result.rollResult.result).toBe(diceCount - constant)
        })
    }

    for (let i = 1; i < 1000; i++) {
        const diceCount = Math.floor(Math.random() * 1000) + 1
        const constant = Math.floor(Math.random() * 1000) + 1
        const expression = `${constant}-${diceCount}d1`
        test(`for expression '${expression}' return ${constant - diceCount}`, () => {
            const result = interpret(expression)
            expectSuccessful(result)
            expect(result.rollResult.result).toBe(constant - diceCount)
        })
    }

    // TODO: Add tests for 3 and four elements in an expression
    //       - test for 3 elements in an expression
    //       - test for 4 elements in an expression
    //       - test for different whitespace combinations
    //       - test for individual roll counts etc
})

// TODO: write more negative tests
//       - test for invalid expressions
//       - test for invalid dice rolls
//       - test for invalid dice counts
//       - test for invalid operations
//       - test for invalid characters

test(`for expression 'foo' return error`, () => {
    const result = interpret('foo')
    expect(result.success).toBe(false)
    expect((result as FailedInterpretation).error).toBe('Expected "d" or [0-9] but "f" found.')
})

test(`for expression ' d' return error`, () => {
    const result = interpret('1d')
    expect(result.success).toBe(false)
    expect((result as FailedInterpretation).error).toBe('Expected [0-9] but end of input found.')
})

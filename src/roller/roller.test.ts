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

suite(`testing dice sequence in rolls collection`, () => {
    test.each([
        ['1d2+1d3+1d4', 'd2', 'd3', 'd4'],
        ['1d2-1d3+1d4', 'd2', 'd3', 'd4'],
        ['1d2-1d2-1d3', 'd2', 'd2', 'd3'],
        ['1d2+1d2-1d3', 'd2', 'd2', 'd3'],
        ['1d2+1d3-1d4', 'd2', 'd3', 'd4'],
        ['1d2+1d3-1d4+1d5', 'd2', 'd3', 'd4', 'd5'],
        ['2d2+2d4', 'd2', 'd2', 'd4', 'd4'],
        ['2d2-2d4', 'd2', 'd2', 'd4', 'd4'],
        ['2d2+2d4-2d6', 'd2', 'd2', 'd4', 'd4', 'd6', 'd6'],
        ['2d2-2d4+2d6', 'd2', 'd2', 'd4', 'd4', 'd6', 'd6'],
    ])('for expression %s return correct dice sequence', (...args) => {
        const expression = args[0]
        const dice = args.slice(1)
        const result = interpret(expression)
        expectSuccessful(result)
        expect(result.rollResult.rolls.length).toBe(dice.length)
        for (let i = 0; i < dice.length; i++) {
            expect(result.rollResult.rolls[i]!.dice).toBe(dice[i])
        }
    })
})

// Further tests use d1 in order to avoid randomness, the tests above are good enough to test it by themselves
suite(`basic tests for 1 sided dice`, () => {
    test(`for expression 'd1' return number 1`, () => {
        const result = interpret('d1')
        expectSuccessful(result)
        expect(result.rollResult.result).toBe(1)
        expect(result.rollResult.rolls[0]!.result).toBe(1)
        expect(result.rollResult.rolls[0]!.dice).toBe('d1')
    })

    test(`for expression '1d1' return number 1`, () => {
        const result = interpret('1d1')
        expectSuccessful(result)
        expect(result.rollResult.result).toBe(1)
        expect(result.rollResult.rolls[0]!.result).toBe(1)
        expect(result.rollResult.rolls[0]!.dice).toBe('d1')
    })

    test(`for expression '2d1' return number 2`, () => {
        const result = interpret('2d1')
        expectSuccessful(result)
        expect(result.rollResult.result).toBe(2)
        expect(result.rollResult.rolls[0]!.result).toBe(1)
        expect(result.rollResult.rolls[0]!.dice).toBe('d1')
        expect(result.rollResult.rolls[1]!.result).toBe(1)
        expect(result.rollResult.rolls[1]!.dice).toBe('d1')
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

    for (let i = 1; i < 1000; i++) {
        const diceCount = Math.floor(Math.random() * 1000) + 1
        const constant = Math.floor(Math.random() * 1000) + 1
        const expression = `${diceCount}d1 + ${constant} - ${constant}d1`
        test(`for expression '${expression}' return ${diceCount + constant - constant}`, () => {
            const result = interpret(expression)
            expectSuccessful(result)
            expect(result.rollResult.result).toBe(diceCount + constant - constant)
        })
    }

    for (let i = 1; i < 1000; i++) {
        const diceCount = Math.floor(Math.random() * 1000) + 1
        const constant = Math.floor(Math.random() * 1000) + 1
        const expression = `${diceCount}d1 + ${diceCount}d1 + ${constant}d1 - ${constant}d1`
        test(`for expression '${expression}' return ${diceCount + diceCount + constant - constant}`, () => {
            const result = interpret(expression)
            expectSuccessful(result)
            expect(result.rollResult.result).toBe(diceCount + diceCount + constant - constant)
        })
    }

    for (let i = 1; i < 1000; i++) {
        const diceCount = Math.floor(Math.random() * 1000) + 1
        const constant = Math.floor(Math.random() * 1000) + 1
        const expression = `${diceCount}d1+ ${diceCount}d1 +                 ${constant}d1     - ${constant}d1`
        test(`for expression with whitespace '${expression}' return ${diceCount + diceCount + constant - constant}`, () => {
            const result = interpret(expression)
            expectSuccessful(result)
            expect(result.rollResult.result).toBe(diceCount + diceCount + constant - constant)
        })
    }

    for (let i = 1; i < 1000; i++) {
        const diceCount = Math.floor(Math.random() * 1000) + 1
        const expression = `${diceCount}d1`
        test(`for expression '${expression}' will have correct count of dice`, () => {
            const result = interpret(expression)
            expectSuccessful(result)
            expect(result.rollResult.rolls.length).toBe(diceCount)
            expect(result.rollResult.rolls.every((roll) => roll.dice === 'd1')).toBe(true)
        })
    }
})

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

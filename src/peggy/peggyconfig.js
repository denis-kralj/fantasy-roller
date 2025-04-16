export default {
    input: 'src/peggy/grammar.peggy',
    output: 'src/generated/roll-parser.js',
    dts: true,
    format: 'es',
    returnTypes: {
        start: '{ result: number, rolls: { dice: string; result: number }[]}',
    },
}

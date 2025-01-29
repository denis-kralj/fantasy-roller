// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cloneDeep(obj: any): any {
    return JSON.parse(JSON.stringify(obj))
}

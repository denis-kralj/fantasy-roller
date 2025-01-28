export type Action = {
    Id: string
    Label: string
    Elements: ActionElement[]
}

export type ActionElement = {
    Id: string
    Label: string
    Value: string
}

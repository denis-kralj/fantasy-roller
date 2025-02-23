export function stringMinLength(subject: string, minLength: number): boolean {
    return !!subject && subject.length >= minLength
}

export function stringMaxLength(subject: string, maxLength: number): boolean {
    return !!subject && subject.length <= maxLength
}

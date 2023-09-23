function removeMask(cpf: string): string {
    return cpf
        .replace('.', '')
        .replace('.', '')
        .replace('-', '')
        .replace(' ', '')
}

function hasSameDigit(cpf: string): boolean {
    return cpf.split("").every((c: string) : boolean => c === cpf[0])
}

function calculateDigits(cpf: string): string {
    const firstDigit: string = calculateFirstDigit(cpf)
    const secondDigit: string = calculateSecondDigit(cpf, firstDigit)
    return `${firstDigit}${secondDigit}`
}

function calculateFirstDigit(cpf: string): string {
    let sum : number = 0
    for (let position: number = 0; position < 9; position++) {
        const digit: number = parseInt(cpf.charAt(position))
        sum += (10 - position) * digit
    }
    const remainder: number = sum % 11
    return remainder < 2 ? '0' : String(11 - remainder)
}

function calculateSecondDigit(cpf: string, firstDigit: string): string {
    let sum: number = 0
    for (let position: number = 0; position < 10; position++) {
        const digit: number = parseInt(cpf.charAt(position))
        sum += (11 - position) * digit
    }
    sum += 2 * parseInt(firstDigit)
    const remainder: number = sum % 11
    return remainder < 2 ? '0' : String(11 - remainder)
}

export function isValidCPF(cpf: string): boolean {
    const cpfWithoutMask: string = removeMask(cpf)
    if (cpf.length < 11 || cpf.length > 14) return false
    if (hasSameDigit(cpfWithoutMask)) return false
    const calculatedDigits: string = calculateDigits(cpfWithoutMask)
    const verificationDigits: string = cpfWithoutMask.substring(9, 11)
    return calculatedDigits === verificationDigits
}
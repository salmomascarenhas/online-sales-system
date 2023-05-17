export class CPFValidate {
    public isValid(cpf: string): boolean {
        if (!cpf || cpf.length < 11 || cpf.length > 14) return false
        const cpfWithoutMask = this.removeMask(cpf)
        if (this.hasSameDigit(cpfWithoutMask)) return false
        const calculatedDigits = this.calculateDigits(cpfWithoutMask)
        const verificationDigits = cpfWithoutMask.substring(9, 11)
        return calculatedDigits === verificationDigits
    }

    private removeMask(cpf: string): string {
        return cpf
            .replace('.', '')
            .replace('.', '')
            .replace('-', '')
            .replace(' ', '')
    }

    private hasSameDigit(cpf: string): boolean {
        return cpf.split("").every(c => c === cpf[0])
    }

    private calculateDigits(cpf: string): string {
        const firstDigit = this.calculateFirstDigit(cpf)
        const secondDigit = this.calculateSecondDigit(cpf, firstDigit)
        return `${firstDigit}${secondDigit}`
    }

    private calculateFirstDigit(cpf: string): string {
        let sum = 0
        for (let position = 0; position < 9; position++) {
            const digit = parseInt(cpf.charAt(position))
            sum += (10 - position) * digit
        }
        const remainder = sum % 11
        return remainder < 2 ? '0' : String(11 - remainder)
    }

    private calculateSecondDigit(cpf: string, firstDigit: string): string {
        let sum = 0
        for (let position = 0; position < 10; position++) {
            const digit = parseInt(cpf.charAt(position))
            sum += (11 - position) * digit
        }
        sum += 2 * parseInt(firstDigit)
        const remainder = sum % 11
        return remainder < 2 ? '0' : String(11 - remainder)
    }
}
import ValueObject from "./value-objects";

export class InvalidCPFError extends Error {
  constructor() {
    super("Invalid CPF");
    this.name = "InvalidCPFError";
  }
}

export class CPF extends ValueObject<string> {
  constructor(CPF: string) {
    super(CPF);
    this.validate();
  }

  private validateCPFString(cpfWithoutMask: string): void {
    if (!/^\d{11}$/.test(cpfWithoutMask) || this.hasSameDigit(cpfWithoutMask))
      throw new InvalidCPFError();
    if (cpfWithoutMask.length !== 11) throw new InvalidCPFError();
  }

  private validate(): void {
    const cpfWithoutMask: string = this.removeMask(this.value);
    this.validateCPFString(cpfWithoutMask);
    const calculatedDigits: string = this.calculateDigits(cpfWithoutMask);
    const verificationDigits: string = cpfWithoutMask.substring(9, 11);
    const isValid: boolean = calculatedDigits === verificationDigits;
    if (!isValid) {
      throw new InvalidCPFError();
    }
  }

  private hasSameDigit(cpf: string): boolean {
    const firstDigit = cpf[0];
    return cpf.split("").every((digit) => digit === firstDigit);
  }

  private removeMask(cpf: string): string {
    return cpf.replace(/[.-\s]/g, "");
  }

  private calculateDigits(cpf: string): string {
    const firstDigit: string = this.calculateFirstDigit(cpf);
    const secondDigit: string = this.calculateSecondDigit(cpf, firstDigit);
    return `${firstDigit}${secondDigit}`;
  }

  private calculateFirstDigit(cpf: string): string {
    let sum: number = 0;
    for (let position: number = 0; position < 9; position++) {
      const digit: number = parseInt(cpf.charAt(position));
      sum += (10 - position) * digit;
    }
    const remainder: number = sum % 11;
    return remainder < 2 ? "0" : String(11 - remainder);
  }

  private calculateSecondDigit(cpf: string, firstDigit: string): string {
    let sum: number = 0;
    for (let position: number = 0; position < 10; position++) {
      const digit: number = parseInt(cpf.charAt(position));
      sum += (11 - position) * digit;
    }
    sum += 2 * parseInt(firstDigit);
    const remainder: number = sum % 11;
    return remainder < 2 ? "0" : String(11 - remainder);
  }
}

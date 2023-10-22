import ValueObject from './value-objects';

export class InvalidCPFError extends Error {
  constructor() {
    super('Invalid CPF');
    this.name = 'InvalidCPFError';
  }
}

class CPFValidator {
  private static readonly CPF_LENGTH = 11;

  private static sanitizeCpf(cpf: string): string {
    return cpf.replace(/\D/g, '');
  }

  private static areAllDigitsEqual(cpf: string): boolean {
    return /^(\d)\1{10}$/.test(cpf);
  }

  private static calculateVerifierDigit(cpf: string, position: number): number {
    let sum = 0;

    for (let i = 0; i < position; i++) {
      sum += parseInt(cpf[i]) * (position + 1 - i);
    }

    const remainder = (sum * 10) % 11;

    return remainder === 10 ? 0 : remainder;
  }

  static isValid(cpf: string): boolean {
    cpf = this.sanitizeCpf(cpf);

    if (cpf.length !== this.CPF_LENGTH) {
      return false;
    }

    if (this.areAllDigitsEqual(cpf)) {
      return false;
    }

    const firstVerifierDigit = this.calculateVerifierDigit(cpf, 9);
    const secondVerifierDigit = this.calculateVerifierDigit(cpf, 10);

    return (
      parseInt(cpf[9]) === firstVerifierDigit && parseInt(cpf[10]) === secondVerifierDigit
    );
  }
}

export class CPF extends ValueObject<string> {
  constructor(cpf: string) {
    super(cpf);
    if (!CPFValidator.isValid(this.value)) {
      throw new InvalidCPFError();
    }
  }
}

import { CPF, InvalidCPFError } from "../cpf.vo";

describe("CPF Value Object", () => {
  it("should be able to create a valid CPF", () => {
    const cpf = new CPF("855.914.770-54");
    expect(cpf.value).toBe("855.914.770-54");
  });

  it.each([
    '',
    '00000000000',
    '123.456.789-00',
    '855.914.770-53', // CPF válido exceto pelo último dígito
    'abc.def.ghi-jk'  // CPF com caracteres não numéricos
  ])("should not be able to create CPF with invalid value: %s", (cpf: string) => {
    expect(() => {
      new CPF(cpf);
    }).toThrow(InvalidCPFError);
  });
});

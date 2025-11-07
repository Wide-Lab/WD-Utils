import {
  validateBirthDate,
  validateCNPJ,
  validateCPF,
  validateEmail,
} from '../Validators';

describe('utils/Validators', () => {
  describe('validateCPF', () => {
    it('deve retornar verdadeiro para um CPF correto #1', () =>
      expect(validateCPF('39633061067')).toBeTruthy());
    it('deve retornar verdadeiro para um CPF correto #2', () =>
      expect(validateCPF('292.792.320-53')).toBeTruthy());
    it('deve retornar verdadeiro para um CPF correto #3', () =>
      expect(validateCPF('68262086953')).toBeTruthy());

    it('deve retornar falso para um CPF com número sequencial (123...)', () =>
      expect(validateCPF('12345678900')).toBeFalsy());
    it('deve retornar falso para um CPF com todos os zeros (000...)', () =>
      expect(validateCPF('00000000000')).toBeFalsy());
    it('deve retornar falso para um CPF com todos os uns (111...)', () =>
      expect(validateCPF('11111111111')).toBeFalsy());
    it('deve retornar falso para um CPF com todos os dois (222...)', () =>
      expect(validateCPF('22222222222')).toBeFalsy());
    it('deve retornar falso para um CPF com todos os três (333...)', () =>
      expect(validateCPF('33333333333')).toBeFalsy());
    it('deve retornar falso para um CPF com todos os quatro (444...)', () =>
      expect(validateCPF('44444444444')).toBeFalsy());
    it('deve retornar falso para um CPF com todos os cincos (555...)', () =>
      expect(validateCPF('55555555555')).toBeFalsy());
    it('deve retornar falso para um CPF com todos os seis (666...)', () =>
      expect(validateCPF('66666666666')).toBeFalsy());
    it('deve retornar falso para um CPF com todos os setes (777...)', () =>
      expect(validateCPF('77777777777')).toBeFalsy());
    it('deve retornar falso para um CPF com todos os oitos (888...)', () =>
      expect(validateCPF('88888888888')).toBeFalsy());
    it('deve retornar falso para um CPF com todos os noves (999...)', () =>
      expect(validateCPF('99999999999')).toBeFalsy());

    it('deve retornar falso para um CPF incompleto #1', () =>
      expect(validateCPF('3963306106')).toBeFalsy());
    it('deve retornar falso para um CPF incompleto #2', () =>
      expect(validateCPF('396330610')).toBeFalsy());
    it('deve retornar falso para um CPF incompleto #3', () =>
      expect(validateCPF('39633061')).toBeFalsy());

    it('deve retornar falso para uma entrada vazia', () => {
      expect(validateCPF('')).toBe(false);
    });

    it('deve retornar falso para um CPF inválido com letras', () => {
      expect(validateCPF('123.456.abc-09')).toBe(false);
    });

    it('deve retornar falso para um CPF inválido com menos de 11 dígitos', () => {
      expect(validateCPF('1234567890')).toBe(false);
    });

    it('deve retornar falso para um CPF com todos os dígitos repetidos (ex: 111.111.111-11)', () => {
      expect(validateCPF('111.111.111-11')).toBe(false);
    });

    it('deve retornar falso para um CPF inválido com primeiro dígito verificador incorreto', () => {
      expect(validateCPF('123.456.789-01')).toBe(false);
    });

    it('deve retornar falso para um CPF inválido com segundo dígito verificador incorreto', () => {
      expect(validateCPF('123.456.789-08')).toBe(false);
    });

    it('deve retornar verdadeiro para um CPF válido (ex: 123.456.789-09)', () => {
      expect(validateCPF('123.456.789-09')).toBe(true);
    });

    it('deve retornar verdadeiro para um CPF válido sem caracteres especiais (ex: 12345678909)', () => {
      expect(validateCPF('12345678909')).toBe(true);
    });

    it('deve retornar falso para um CPF inválido com zeros à esquerda (ex: 001.234.567-89)', () => {
      expect(validateCPF('001.234.567-89')).toBe(false);
    });

    it('deve retornar verdadeiro para um CPF válido com zeros à esquerda (ex: 001.234.567-89)', () => {
      expect(validateCPF('001.234.567-97')).toBe(true);
    });
  });

  describe('validadeCNPJ', () => {
    it('deve retornar verdadeiro para um CNPJ válido #1', () => {
      expect(validateCNPJ('11444777000161')).toBe(true);
    });
    it('deve retornar verdadeiro para um CNPJ válido #2', () => {
      expect(validateCNPJ('29.924.928/0001-44')).toBe(true);
    });
    it('deve retornar verdadeiro para um CNPJ válido #3', () => {
      expect(validateCNPJ('18249472000148')).toBe(true);
    });

    it('deve retornar falso para um CNPJ inválido', () => {
      expect(validateCNPJ('11444777000162')).toBe(false);
    });

    it('deve retornar falso para um CNPJ com menos de 14 dígitos', () => {
      expect(validateCNPJ('1144477700016')).toBe(false);
    });

    it('deve retornar falso para um CNPJ com número sequencial (123...)', () =>
      expect(validateCNPJ('12345678901234')).toBeFalsy());
    it('deve retornar falso para um CNPJ com todos os zeros (000...)', () =>
      expect(validateCNPJ('00000000000000')).toBeFalsy());
    it('deve retornar falso para um CNPJ com todos os uns (111...)', () =>
      expect(validateCNPJ('11111111111111')).toBeFalsy());
    it('deve retornar falso para um CNPJ com todos os dois (222...)', () =>
      expect(validateCNPJ('22222222222222')).toBeFalsy());
    it('deve retornar falso para um CNPJ com todos os três (333...)', () =>
      expect(validateCNPJ('33333333333333')).toBeFalsy());
    it('deve retornar falso para um CNPJ com todos os quatro (444...)', () =>
      expect(validateCNPJ('44444444444444')).toBeFalsy());
    it('deve retornar falso para um CNPJ com todos os cincos (555...)', () =>
      expect(validateCNPJ('55555555555555')).toBeFalsy());
    it('deve retornar falso para um CNPJ com todos os seis (666...)', () =>
      expect(validateCNPJ('66666666666666')).toBeFalsy());
    it('deve retornar falso para um CNPJ com todos os setes (777...)', () =>
      expect(validateCNPJ('77777777777777')).toBeFalsy());
    it('deve retornar falso para um CNPJ com todos os oitos (888...)', () =>
      expect(validateCNPJ('88888888888888')).toBeFalsy());
    it('deve retornar falso para um CNPJ com todos os noves (999...)', () =>
      expect(validateCNPJ('99999999999999')).toBeFalsy());

    it('deve retornar falso para uma entrada vazia', () => {
      expect(validateCNPJ('')).toBe(false);
    });

    it('deve retornar falso para um CNPJ inválido com letras', () => {
      expect(validateCNPJ('29.924.928/O001-A4')).toBe(false);
    });
  });

  describe('validateEmail', () => {
    it('deve retornar verdadeiro para um e-mail válido #1', () =>
      expect(
        validateEmail('anthonypietronogueira@powerblade.com.br'),
      ).toBeTruthy());
    it('deve retornar verdadeiro para um e-mail válido #2', () =>
      expect(validateEmail('rafael_eduardo_rezende@slb.com.br')).toBeTruthy());
    it('deve retornar verdadeiro para um e-mail válido #3', () =>
      expect(validateEmail('jucelino.cub_tch3k@gmail.com')).toBeTruthy());
    it('deve retornar verdadeiro para um e-mail com domínio longo', () =>
      expect(validateEmail('teste@um.dominio.muito.longo.com')).toBeTruthy());

    it('deve retornar falso para um e-mail sem "@"', () =>
      expect(validateEmail('pessoa123gmail.com')).toBeFalsy());
    it('deve retornar falso para um e-mail sem ".com"', () =>
      expect(validateEmail('pessoaabc@gmail')).toBeFalsy());
    it('deve retornar falso para um e-mail sem domínio válido', () =>
      expect(validateEmail('pessoa_teste@.com')).toBeFalsy());
  });

  describe('validateBirthDate', () => {
    it('deve retornar verdadeiro para uma data de nascimento válida', () => {
      expect(validateBirthDate('12/05/1990')).toBe(true);
    });

    it('deve retornar falso para uma data de nascimento inválida (dia fora do intervalo)', () => {
      expect(validateBirthDate('30/02/1990')).toBe(false);
    });

    it('deve retornar falso para uma data de nascimento inválida (mês fora do intervalo)', () => {
      expect(validateBirthDate('12/13/1990')).toBe(false);
    });

    it('deve retornar falso para uma data de nascimento inválida (ano fora do intervalo)', () => {
      expect(validateBirthDate('12/05/0999')).toBe(false);
    });

    it('deve retornar falso para uma data de nascimento inválida (formato inválido)', () => {
      expect(validateBirthDate('abc/def/ghi')).toBe(false);
    });

    it('deve retornar falso para uma data de nascimento inválida (dia ausente)', () => {
      expect(validateBirthDate('/05/1990')).toBe(false);
    });

    it('deve retornar falso para uma data de nascimento inválida (mês ausente)', () => {
      expect(validateBirthDate('12//1990')).toBe(false);
    });

    it('deve retornar falso para uma data de nascimento inválida (ano ausente)', () => {
      expect(validateBirthDate('12/05/')).toBe(false);
    });

    it('deve retornar verdadeiro para um ano bissexto (29 de fevereiro)', () => {
      expect(validateBirthDate('29/02/2000')).toBe(true);
    });

    it('deve retornar falso para um ano não bissexto (29 de fevereiro)', () => {
      expect(validateBirthDate('29/02/1999')).toBe(false);
    });
  });
});

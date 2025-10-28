import {
  validateBirthDate,
  validateCNPJ,
  validateCPF,
  validateEmail,
} from '../Validators';

describe('utils/Validators', () => {
  describe('validateCPF', () => {
    it('should return true for a correct CPF #1', () =>
      expect(validateCPF('39633061067')).toBeTruthy());
    it('should return true for a correct CPF #2', () =>
      expect(validateCPF('292.792.320-53')).toBeTruthy());
    it('should return true for a correct CPF #3', () =>
      expect(validateCPF('68262086953')).toBeTruthy());

    it('should return false for a CPF with a sequential number (123...)', () =>
      expect(validateCPF('12345678900')).toBeFalsy());
    it('should return false for a CPF with all zeros (000...)', () =>
      expect(validateCPF('00000000000')).toBeFalsy());
    it('should return false for a CPF with all ones (111...)', () =>
      expect(validateCPF('11111111111')).toBeFalsy());
    it('should return false for a CPF with all twos (222...)', () =>
      expect(validateCPF('22222222222')).toBeFalsy());
    it('should return false for a CPF with all threes (333...)', () =>
      expect(validateCPF('33333333333')).toBeFalsy());
    it('should return false for a CPF with all fours (444...)', () =>
      expect(validateCPF('44444444444')).toBeFalsy());
    it('should return false for a CPF with all fives (555...)', () =>
      expect(validateCPF('55555555555')).toBeFalsy());
    it('should return false for a CPF with all sixes (666...)', () =>
      expect(validateCPF('66666666666')).toBeFalsy());
    it('should return false for a CPF with all sevens (777...)', () =>
      expect(validateCPF('77777777777')).toBeFalsy());
    it('should return false for a CPF with all eights (888...)', () =>
      expect(validateCPF('88888888888')).toBeFalsy());
    it('should return false for a CPF with all nines (999...)', () =>
      expect(validateCPF('99999999999')).toBeFalsy());

    it('should return false for an incomplete CPF #1', () =>
      expect(validateCPF('3963306106')).toBeFalsy());
    it('should return false for an incomplete CPF #2', () =>
      expect(validateCPF('396330610')).toBeFalsy());
    it('should return false for an incomplete CPF #3', () =>
      expect(validateCPF('39633061')).toBeFalsy());

    it('should return false for an empty input', () => {
      expect(validateCPF('')).toBe(false);
    });

    it('should return false for an invalid CPF with letters', () => {
      expect(validateCPF('123.456.abc-09')).toBe(false);
    });

    it('should return false for an invalid CPF with less than 11 digits', () => {
      expect(validateCPF('1234567890')).toBe(false);
    });

    it('should return false for a CPF with all repeated digits (e.g., 111.111.111-11)', () => {
      expect(validateCPF('111.111.111-11')).toBe(false);
    });

    it('should return false for an invalid CPF with incorrect first verification digit', () => {
      expect(validateCPF('123.456.789-01')).toBe(false);
    });

    it('should return false for an invalid CPF with incorrect second verification digit', () => {
      expect(validateCPF('123.456.789-08')).toBe(false);
    });

    it('should return true for a valid CPF (e.g., 123.456.789-09)', () => {
      expect(validateCPF('123.456.789-09')).toBe(true);
    });

    it('should return true for a valid CPF without special characters (e.g., 12345678909)', () => {
      expect(validateCPF('12345678909')).toBe(true);
    });

    it('should return false for a invalid CPF with leading zeros (e.g., 001.234.567-89)', () => {
      expect(validateCPF('001.234.567-89')).toBe(false);
    });

    it('should return true for a valid CPF with leading zeros (e.g., 001.234.567-89)', () => {
      expect(validateCPF('001.234.567-97')).toBe(true);
    });
  });

  describe('validadeCNPJ', () => {
    it('should return true for a valid CNPJ #1', () => {
      expect(validateCNPJ('11444777000161')).toBe(true);
    });
    it('should return true for a valid CNPJ #2', () => {
      expect(validateCNPJ('29.924.928/0001-44')).toBe(true);
    });
    it('should return true for a valid CNPJ #3', () => {
      expect(validateCNPJ('18249472000148')).toBe(true);
    });

    it('should return false for a invalid CNPJ', () => {
      expect(validateCNPJ('11444777000162')).toBe(false);
    });

    it('should return false for a CNPJ with less than  14 digits', () => {
      expect(validateCNPJ('1144477700016')).toBe(false);
    });

    it('should return false for a CNPJ with a sequential number (123...)', () =>
      expect(validateCNPJ('12345678901234')).toBeFalsy());
    it('should return false for a CNPJ with all zeros (000...)', () =>
      expect(validateCNPJ('00000000000000')).toBeFalsy());
    it('should return false for a CNPJ with all ones (111...)', () =>
      expect(validateCNPJ('11111111111111')).toBeFalsy());
    it('should return false for a CNPJ with all twos (222...)', () =>
      expect(validateCNPJ('22222222222222')).toBeFalsy());
    it('should return false for a CNPJ with all threes (333...)', () =>
      expect(validateCNPJ('33333333333333')).toBeFalsy());
    it('should return false for a CNPJ with all fours (444...)', () =>
      expect(validateCNPJ('44444444444444')).toBeFalsy());
    it('should return false for a CNPJ with all fives (555...)', () =>
      expect(validateCNPJ('55555555555555')).toBeFalsy());
    it('should return false for a CNPJ with all sixes (666...)', () =>
      expect(validateCNPJ('66666666666666')).toBeFalsy());
    it('should return false for a CNPJ with all sevens (777...)', () =>
      expect(validateCNPJ('77777777777777')).toBeFalsy());
    it('should return false for a CNPJ with all eights (888...)', () =>
      expect(validateCNPJ('88888888888888')).toBeFalsy());
    it('should return false for a CNPJ with all nines (999...)', () =>
      expect(validateCNPJ('99999999999999')).toBeFalsy());

    it('should return false for an empty input', () => {
      expect(validateCNPJ('')).toBe(false);
    });

    it('should return false for an invalid CNPJ with letters', () => {
      expect(validateCNPJ('29.924.928/O001-A4')).toBe(false);
    });
  });

  describe('validateEmail', () => {
    it('should return true for a valid email address #1', () =>
      expect(
        validateEmail('anthonypietronogueira@powerblade.com.br'),
      ).toBeTruthy());
    it('should return true for a valid email address #2', () =>
      expect(validateEmail('rafael_eduardo_rezende@slb.com.br')).toBeTruthy());
    it('should return true for a valid email address #3', () =>
      expect(validateEmail('jucelino.cub_tch3k@gmail.com')).toBeTruthy());
    it('should return true for a valid email with a long domain', () =>
      expect(validateEmail('teste@um.dominio.muito.longo.com')).toBeTruthy());

    it('should return false for an email address without "@"', () =>
      expect(validateEmail('pessoa123gmail.com')).toBeFalsy());
    it('should return false for an email address without ".com"', () =>
      expect(validateEmail('pessoaabc@gmail')).toBeFalsy());
    it('should return false for an email address without a valid domain', () =>
      expect(validateEmail('pessoa_teste@.com')).toBeFalsy());
  });

  describe('validateBirthDate', () => {
    it('returns true for a valid birth date', () => {
      expect(validateBirthDate('12/05/1990')).toBe(true);
    });

    it('returns false for an invalid birth date (day out of range)', () => {
      expect(validateBirthDate('30/02/1990')).toBe(false);
    });

    it('returns false for an invalid birth date (month out of range)', () => {
      expect(validateBirthDate('12/13/1990')).toBe(false);
    });

    it('returns false for an invalid birth date (year out of range)', () => {
      expect(validateBirthDate('12/05/0999')).toBe(false);
    });

    it('returns false for an invalid birth date (invalid format)', () => {
      expect(validateBirthDate('abc/def/ghi')).toBe(false);
    });

    it('returns false for an invalid birth date (missing day)', () => {
      expect(validateBirthDate('/05/1990')).toBe(false);
    });

    it('returns false for an invalid birth date (missing month)', () => {
      expect(validateBirthDate('12//1990')).toBe(false);
    });

    it('returns false for an invalid birth date (missing year)', () => {
      expect(validateBirthDate('12/05/')).toBe(false);
    });

    it('returns true for a leap year (February 29)', () => {
      expect(validateBirthDate('29/02/2000')).toBe(true);
    });

    it('returns false for a non-leap year (February 29)', () => {
      expect(validateBirthDate('29/02/1999')).toBe(false);
    });
  });
});

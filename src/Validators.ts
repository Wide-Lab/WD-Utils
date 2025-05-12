const verifierDigitCPF = (digits: string) => {
  const numbers = digits.split("").map((number) => {
    return parseInt(number, 10);
  });

  const modulus = numbers.length + 1;
  const multiplied = numbers.map((number, index) => number * (modulus - index));
  const sum = multiplied.reduce((previous, value) => previous + value);
  const mod = sum % 11;

  if (mod < 2) {
    return 0;
  }

  return 11 - mod;
};

/**
 * Validates a CPF number
 * @param  cpf - The CPF number to validate
 * @returns - Returns true if the CPF is valid, false otherwise
 */
export const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) {
    return false;
  }

  // Verifica se o CPF não é composto apenas por dígitos repetidos
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let numbers = cpf.substring(0, 9);
  numbers += verifierDigitCPF(numbers);
  numbers += verifierDigitCPF(numbers);

  return numbers.slice(-2) === cpf.slice(-2);
};

const verifierDigitCNPJ = (digits: string) => {
  let index = 2;
  const reverse = digits
    .split("")
    .reduce(
      (previous, value) => [parseInt(value, 10)].concat(previous),
      [] as number[],
    );

  const sum = reverse.reduce((previous, value) => {
    previous += value * index;
    index = index === 9 ? 2 : index + 1;
    return previous;
  }, 0);
  const mod = sum % 11;
  return mod < 2 ? 0 : 11 - mod;
};

/**
 * Validates a CNPJ number
 * @param  cnpj - The CNPJ number to validate
 * @returns - Returns true if the CNPJ is valid, false otherwise
 */
export const validateCNPJ = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/\D/g, "");

  if (cnpj.length !== 14) {
    return false;
  }

  if (/^(\d)\1{13}$/.test(cnpj)) {
    return false;
  }

  let numbers = cnpj.substring(0, 12);
  numbers += verifierDigitCNPJ(numbers);
  numbers += verifierDigitCNPJ(numbers);
  return numbers.slice(-2) === cnpj.slice(-2);
};

/**
 * Validates if the given email string is in a proper email format.
 *
 * The email format is checked against a regular expression pattern that ensures
 * the email contains valid characters, an '@' symbol, and a domain.
 *
 * @param email - The email string to validate.
 * @returns `true` if the email is in a valid format, `false` otherwise.
 */
export const validateEmail = (email: string) =>
  !!email.match(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
  );

/**
 * Validates a birth date string in the format "dd/mm/yyyy".
 *
 * @param {string} dateString - The birth date string to validate.
 * @returns {boolean} True if the date string is valid, false otherwise.
 *
 * @example
 * validateBirthDate("12/05/1990"); // returns true
 * validateBirthDate("30/02/1990"); // returns false (February only has 28 or 29 days)
 * validateBirthDate("abc/def/ghi"); // returns false (invalid format)
 */
export const validateBirthDate = (dateString: string) => {
  // Verifica se o padrão bate com dd/mm/aaaa
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
    return false;
  }

  // Pega cada parte da data
  const parts = dateString.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  // Verifica o ano e os meses
  if (year < 1000 || year > 3000 || month === 0 || month > 12) {
    return false;
  }

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Ajusta ano bissexto
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    monthLength[1] = 29;
  }

  // Valida se o dia está certo
  return day > 0 && day <= monthLength[month - 1];
};

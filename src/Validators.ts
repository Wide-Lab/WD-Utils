const verifierDigitCPF = (digits: string) => {
  const numbers = digits.split('').map((number) => {
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
 * Valida um número de CPF.
 *
 * Esta função verifica se o CPF fornecido é válido, incluindo verificação de dígitos verificadores e rejeição de CPFs com todos os dígitos iguais.
 *
 * @param cpf - O número do CPF a ser validado.
 * @returns Retorna true se o CPF for válido, false caso contrário.
 *
 * @example
 * validateCPF('12345678901'); // retorna false (CPF inválido)
 * validateCPF('11111111111'); // retorna false (todos dígitos iguais)
 */
export const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/\D/g, '');

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
    .split('')
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
 * Valida um número de CNPJ.
 *
 * Esta função verifica se o CNPJ fornecido é válido, incluindo verificação de dígitos verificadores e rejeição de CNPJs com todos os dígitos iguais.
 *
 * @param cnpj - O número do CNPJ a ser validado.
 * @returns Retorna true se o CNPJ for válido, false caso contrário.
 *
 * @example
 * validateCNPJ('12345678000123'); // retorna false (CNPJ inválido)
 * validateCNPJ('11111111111111'); // retorna false (todos dígitos iguais)
 */
export const validateCNPJ = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/\D/g, '');

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
 * Valida se a string de email fornecida está em um formato de email adequado.
 *
 * O formato do email é verificado contra um padrão de expressão regular que garante
 * que o email contenha caracteres válidos, um símbolo '@', e um domínio.
 *
 * @param email - A string de email a ser validada.
 * @returns `true` se o email estiver em um formato válido, `false` caso contrário.
 *
 * @example
 * validateEmail('user@example.com'); // retorna true
 * validateEmail('invalid-email'); // retorna false
 */
export const validateEmail = (email: string) =>
  !!email.match(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
  );

/**
 * Valida uma string de data de nascimento no formato "dd/mm/yyyy".
 *
 * Esta função verifica se a string de data está no formato correto e se representa uma data válida,
 * incluindo verificação de anos bissextos.
 *
 * @param dateString - A string de data de nascimento a ser validada.
 * @returns True se a string de data for válida, false caso contrário.
 *
 * @example
 * validateBirthDate("12/05/1990"); // retorna true
 * validateBirthDate("30/02/1990"); // retorna false (fevereiro só tem 28 ou 29 dias)
 * validateBirthDate("abc/def/ghi"); // retorna false (formato inválido)
 */
export const validateBirthDate = (dateString: string) => {
  // Verifica se o padrão bate com dd/mm/aaaa
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
    return false;
  }

  // Pega cada parte da data
  const parts = dateString.split('/');
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

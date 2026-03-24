import { padTo2Digits } from './Numbers';

///-----------------------///
/// CURRENT DATE AND TIME ///
///-----------------------///

/**
 * @deprecated Use `toString(new Date())` instead
 */
export const getToday = () => toString(new Date());

/**
 * Retorna uma string representando a data de ontem no formato YYYY-MM-DD.
 *
 * Esta função cria um novo objeto Date, subtrai 1 do dia atual para obter ontem,
 * e então formata a data em uma string com zeros à esquerda para o mês e dia se necessário.
 *
 * @returns Uma string representando a data de ontem no formato YYYY-MM-DD.
 *
 * @example
 * getYesterday(); // retorna "2023-10-15" se hoje for 2023-10-16
 */
export const getYesterday = () => {
  const today = new Date();
  const beforeToday = today.getDate() - 1;

  const yesterdayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    beforeToday,
    12,
  );

  const year = yesterdayDate.getFullYear();
  const month = padTo2Digits(yesterdayDate.getMonth() + 1);
  const day = padTo2Digits(yesterdayDate.getDate());

  return `${year}-${month}-${day}`;
};

/**
 * Retorna uma string representando o primeiro dia do mês atual no formato 'YYYY-MM-DD'.
 *
 * Esta função usa o objeto Date para obter o ano e mês atuais, e formata o mês como uma string de 2 dígitos com zero à esquerda se necessário.
 *
 * @returns Uma string representando o primeiro dia do mês atual no formato 'YYYY-MM-DD'.
 *
 * @example
 * getFirstDayOfMonth(); // retorna "2023-10-01" se for outubro de 2023
 */
export const getFirstDayOfMonth = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}-${padTo2Digits(month)}-01`;
};

/**
 * Obtém o último dia do mês anterior no formato YYYY-MM-DD.
 *
 * Esta função cria um novo objeto `Date` representando a data atual,
 * então define a data como o 1º do mês atual e ajusta as horas para a última hora do dia anterior,
 * movendo efetivamente a data para o último dia do mês anterior. Em seguida, formata a data como uma string no
 * formato YYYY-MM-DD.
 *
 * @returns O último dia do mês anterior no formato YYYY-MM-DD.
 *
 * @example
 * getLastDayPreviousMonth(); // retorna "2023-09-30" se for outubro de 2023
 */
export const getLastDayPreviousMonth = () => {
  const now = new Date();
  // Get the last day of the previous month
  const date = new Date(now.getFullYear(), now.getMonth(), 0);

  const year = date.getFullYear();
  const month = padTo2Digits(date.getMonth() + 1);
  const day = padTo2Digits(date.getDate());

  return `${year}-${month}-${day}`;
};

/**
 * Retorna o último número do dia de um mês e ano dados como uma string de dois dígitos preenchida com zeros à esquerda.
 *
 * @param year - O ano como um número.
 * @param month - O mês como um número (1-12).
 * @returns Uma string representando o último número do dia do mês preenchido com zeros à esquerda (ex: "31").
 *
 * @example
 * getLastDayNumberOfMonth(2023, 12); // retorna "31"
 * getLastDayNumberOfMonth(2024, 2); // retorna "29" (ano bissexto)
 */
export const getLastDayNumberOfMonth = (year: number, month: number) => {
  const isDecember = month >= 12;

  const date = new Date(
    isDecember ? year + 1 : year,
    isDecember ? 0 : month,
    0,
  );

  return padTo2Digits(date.getDate());
};

/**
 * @deprecated Use `toDate(getToday(), 'BR')` instead
 */
export const getTodayBR = () => toString(new Date(), 'BR');

/**
 * @deprecated Use `toTime(new Date(), true)` instead
 */
export const getNowTime = () => toTime(new Date(), true);

/**
 * Verifica se um ano é bissexto.
 *
 * Um ano é bissexto se for divisível por 4, mas não por 100, a menos que também seja divisível por 400.
 *
 * @param year - O ano a ser verificado como um número inteiro.
 * @returns `true` se o ano for bissexto, `false` caso contrário.
 *
 * @example
 * isLeapYear(2024); // retorna true
 * isLeapYear(2023); // retorna false
 */
export const isLeapYear = (year: number) => {
  if (!Number.isInteger(year) || year < 1) {
    return false;
  }

  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

/**
 * Retorna o número de dias em um mês específico de um ano.
 *
 * Esta função considera anos bissextos para fevereiro.
 *
 * @param month - O mês como um número (1-12).
 * @param year - O ano como um número.
 * @returns O número de dias no mês.
 *
 * @example
 * daysInMonth(2, 2024); // retorna 29 (ano bissexto)
 * daysInMonth(2, 2023); // retorna 28
 * daysInMonth(4, 2023); // retorna 30
 */
export const daysInMonth = (month: number, year: number) => {
  switch (month) {
    case 2:
      return isLeapYear(year) ? 29 : 28;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    default:
      return 31;
  }
};

///-----------------------///
///    DATE CONVERTERS    ///
///-----------------------///

/**
 * @deprecated Use `toString` instead
 */
export const formatDate = toString;

/**
 * Converte um objeto Date em uma string de data formatada.
 *
 * Esta função formata um objeto Date em uma string de data, com opções para diferentes formatos e inclusão de tempo.
 *
 * @param date - O objeto Date a ser convertido. Deve ser uma instância válida de Date.
 * @param format - O formato de data a ser usado. Padrão é 'JS'.
 *   - 'JS': Formato ISO 8601 (YYYY-MM-DD)
 *   - 'USA': Formato americano (MM/DD/YYYY)
 *   - 'BR': Formato brasileiro (DD/MM/YYYY)
 * @param withTime - Se deve incluir tempo na saída. Padrão é false.
 *   - false: Apenas data
 *   - true: Data com tempo (HH:MM:SS)
 *   - 'andSeconds': Data com tempo incluindo segundos
 * @returns Uma string de data formatada de acordo com o formato e configurações de tempo especificadas.
 * @throws {Error} Se a data fornecida for inválida, não for uma instância de Date, ou for NaN.
 *
 * @example
 * toString(new Date('2023-10-15')); // retorna "2023-10-15"
 * toString(new Date('2023-10-15'), 'BR', true); // retorna "15/10/2023 00:00:00"
 */
export function toString(
  date: Date,
  format: 'JS' | 'USA' | 'BR' = 'JS',
  withTime: boolean | 'andSeconds' = false,
) {
  if (!date || !(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new Error('Data inválida');
  }

  const year = date.getFullYear();
  const month = padTo2Digits(date.getMonth() + 1);
  const day = padTo2Digits(date.getDate());

  const time = !withTime ? '' : ' ' + toTime(date, withTime !== 'andSeconds');

  if (format === 'USA') {
    return `${month}/${day}/${year}${time}`;
  }

  if (format === 'BR') {
    return `${day}/${month}/${year}${time}`;
  }

  return `${year}-${month}-${day}${time}`;
}

/**
 * @deprecated Use `toString(toDate(date, 'USA'), 'BR')` instead
 */
export const dateUSAtoBR = (date: string) =>
  toString(toDate(date, 'USA'), 'BR');

/**
 * @deprecated Use `toString(toDate(date), 'BR')` instead
 */
export const dateToBR = (date: string) => toString(toDate(date), 'BR');

/**
 * Converte uma string de data em um objeto Date, validando formato, valores
 * de dia/mês/ano e regras de ano bissexto.
 *
 * Formatos suportados:
 * - 'JS'  → YYYY-MM-DD (Padrão)
 * - 'BR'  → DD/MM/YYYY
 * - 'USA' → MM/DD/YYYY
 *
 * Lança erro caso a data seja inválida ou não respeite o formato informado.
 *
 * @param value String representando a data.
 * @param inputFormat Formato da data de entrada.
 * @returns Objeto Date correspondente à data informada.
 *
 * @throws Error Quando a data é inválida.
 *
 * @example
 * toDate('2024-02-29'); // JS (ano bissexto)
 *
 * @example
 * toDate('31/12/2023', 'BR');
 *
 * @example
 * toDate('12/31/2023', 'USA');
 */
export function toDate(value: string, inputFormat: 'JS' | 'BR' | 'USA' = 'JS') {
  let day: number;
  let month: number;
  let year: number;

  if (typeof value !== 'string' || !value.trim()) {
    throw new Error('Data inválida');
  }

  if (inputFormat === 'BR') {
    const parts = value.slice(0, 10).split('/');
    if (parts.length !== 3) throw new Error('Data inválida');
    const [_day, _month, _year] = parts;
    day = Number(_day);
    month = Number(_month);
    year = Number(_year);
  } else if (inputFormat === 'USA') {
    const parts = value.slice(0, 10).split('/');
    if (parts.length !== 3) throw new Error('Data inválida');
    const [_month, _day, _year] = parts;
    day = Number(_day);
    month = Number(_month);
    year = Number(_year);
  } else {
    const parts = value.slice(0, 10).split('-');
    if (parts.length !== 3) throw new Error('Data inválida');
    const [_year, _month, _day] = parts;
    day = Number(_day);
    month = Number(_month);
    year = Number(_year);
  }

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    year < 1 ||
    month < 1 ||
    month > 12 ||
    day < 1
  ) {
    throw new Error('Data inválida');
  }

  if (day > daysInMonth(month, year)) {
    throw new Error('Data inválida');
  }

  return new Date(year, month - 1, day);
}

/**
 * Converte uma string de data em um formato de data brasileiro (DD/MM/YYYY) com tempo opcional.
 *
 * Esta função converte uma string de data em um formato brasileiro, com opções para incluir segundos no tempo.
 *
 * @param date - A string de data a ser convertida.
 * @param showSeconds - Opcional. Se deve incluir segundos no tempo. Padrão é true.
 * @param showTime - Opcional. Se deve incluir tempo na saída. Padrão é true.
 * @returns A string de data e tempo formatada no formato brasileiro.
 *
 * @example
 * dateToBRDate("2023-10-15T10:30:00"); // retorna "15/10/2023 10:30:00"
 * dateToBRDate("2023-10-15", false, false); // retorna "15/10/2023"
 */
export const dateToBRDate = (
  date: string,
  showSeconds = true,
  showTime: boolean = true,
) => {
  if (!date) {
    return '';
  }

  const dateTime = new Date(date);

  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, '0');
  const day = String(dateTime.getDate()).padStart(2, '0');

  const time = toTime(dateTime, !showSeconds);

  if (!showTime) {
    return `${day}/${month}/${year}`;
  }

  return `${day}/${month}/${year}  ${time}`;
};

/**
 * @deprecated Use `toString(toDate(date, 'BR'))` instead
 */
export const dateBRToJS = (date: string) => toString(toDate(date, 'BR'));

/**
 * Formata um objeto Date fornecido em uma string de tempo.
 *
 * Esta função extrai as horas, minutos e segundos de um objeto Date e os formata em uma string.
 *
 * @param date - O objeto Date a ser formatado.
 * @param hideSecond - Opcional. Booleano para ocultar os segundos na string formatada. Padrão é false.
 * @returns Uma string representando o tempo formatado em "HH:MM:SS" ou "HH:MM".
 *
 * @example
 * toTime(new Date('2023-10-15T10:30:45')); // retorna "10:30:45"
 * toTime(new Date('2023-10-15T10:30:45'), true); // retorna "10:30"
 */
export const toTime = (date: Date, hideSecond = false) => {
  const dateArray = [
    padTo2Digits(date.getHours()),
    padTo2Digits(date.getMinutes()),
    padTo2Digits(date.getSeconds()),
  ];

  if (hideSecond) {
    dateArray.pop();
  }

  return dateArray.join(':');
};

/**
 * Converte uma data no formato C# /Date(1731320280000-0300)/ para um objeto JavaScript Date.
 *
 * Esta função analisa uma string no padrão /Date(<timestamp><offset>)/ usado pelo C#,
 * converte o timestamp para UTC e ajusta pelo offset de fuso horário.
 *
 * @param csharpDate String no padrão /Date(<timestamp><offset>)/
 * @returns Instância de Date correspondente
 *
 * @example
 * parseCSharpDate("/Date(1731320280000-0300)/"); // retorna Date object
 */
export const parseCSharpDate = (csharpDate: string): Date => {
  const match = csharpDate?.match(/\((\d+)([+-]\d{4})\)/);

  if (!match) {
    throw new Error(`Formato de data inválido: ${csharpDate}`);
  }

  const [, timestampStr, offsetStr] = match;

  const timestamp = Number(timestampStr);
  const offset = Number(offsetStr);

  const offsetHours = Math.trunc(offset / 100);
  const offsetMinutes = offset % 100;

  const utcTimestamp =
    timestamp - offsetHours * ONE_HOUR - offsetMinutes * ONE_MINUTE;

  return new Date(utcTimestamp);
};

///-----------------------///
///     STATIC VALUES     ///
///-----------------------///

export const ONE_SECOND = 1000;
export const ONE_MINUTE = ONE_SECOND * 60;
export const ONE_HOUR = ONE_MINUTE * 60;
export const ONE_DAY = ONE_HOUR * 24;

export const monthNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
] as const;

export const monthNamesShort = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dec',
];

export const dayNames = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];

export const dayNamesShort = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

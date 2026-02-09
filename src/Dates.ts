import { padTo2Digits } from './Numbers';

///-----------------------///
/// CURRENT DATE AND TIME ///
///-----------------------///

/**
 * @deprecated use `toString(new Date())` instead
 */
export const getToday = () => toString(new Date());

/**
 * Returns a string representing yesterday's date in the format YYYY-MM-DD.
 *
 * This function creates a new Date object, subtracts 1 from the current day to get yesterday's date,
 * and then formats the date into a string with leading zeros for the month and day if necessary.
 *
 * @returns A string representing yesterday's date in the format YYYY-MM-DD.
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
 * getFirstDayOfMonth
 *
 * This function returns a string representing the first day of the current month in the format 'YYYY-MM-DD'.
 * It uses the Date object to get the current year and month, and then formats the month as a 2-digit string with a leading zero if necessary.
 *
 * @returns A string representing the first day of the current month in the format 'YYYY-MM-DD'.
 */
export const getFirstDayOfMonth = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}-${padTo2Digits(month)}-01`;
};

/**
 * Gets the last day of the previous month in the format YYYY-MM-DD.
 *
 * This function creates a new `Date` object representing the current date,
 * then sets the date to the 1st of the current month and adjusts the hours
 * to the last hour of the previous day, effectively moving the date to the
 * last day of the previous month. It then formats the date as a string in
 * the format YYYY-MM-DD.
 *
 * @returns The last day of the previous month in the format YYYY-MM-DD.
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
 * Returns the last day number of a given month and year as a padded two-digit string.
 * @param year - The year as a number
 * @param month - The month as a number (1-12)
 * @returns A string representing the last day number of the month padded with leading zeros (e.g., "31")
 * @example
 * ```typescript
 * getLastDayNumberOfMonth(2023, 12) // returns "31"
 * getLastDayNumberOfMonth(2024, 2)  // returns "29"
 * ```
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
 * @deprecated use `toDate(getToday(), 'BR')` instead
 */
export const getTodayBR = () => toString(new Date(), 'BR');

/**
 * @deprecated use `toTime(new Date(), true)` instead
 */
export const getNowTime = () => toTime(new Date(), true);

export const isLeapYear = (year: number) => {
  if (!Number.isInteger(year) || year < 1) {
    return false;
  }

  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

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
 * @deprecated use `toString` instead
 */
export const formatDate = toString;

/**
 * Converts a Date object to a formatted string representation.
 * @param date - The Date object to convert. Must be a valid Date instance.
 * @param format - The date format to use. Defaults to 'JS'.
 *   - 'JS': ISO 8601 format (YYYY-MM-DD)
 *   - 'USA': US format (MM/DD/YYYY)
 *   - 'BR': Brazilian format (DD/MM/YYYY)
 * @param withTime - Whether to include time in the output. Defaults to false.
 *   - false: Date only
 *   - true: Date with time (HH:MM:SS)
 *   - 'andSeconds': Date with time including seconds
 * @returns A formatted date string according to the specified format and time settings.
 * @throws {Error} If the provided date is invalid, not a Date instance, or NaN.
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
 * @deprecated ao invés desse utilize:
 * ```js
 * toString(toDate(date, 'USA'), 'BR')
 * ```
 */
export const dateUSAtoBR = (date: string) =>
  toString(toDate(date, 'USA'), 'BR');

/**
 * @deprecated ao invés desse utilize:
 * ```js
 * toString(toDate(date), 'BR')
 * ```
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
 * stringToDate('2024-02-29'); // JS (ano bissexto)
 *
 * @example
 * stringToDate('31/12/2023', 'BR');
 *
 * @example
 * stringToDate('12/31/2023', 'USA');
 */
export function toDate(value: string, inputFormat: 'JS' | 'BR' | 'USA' = 'JS') {
  let day: number;
  let month: number;
  let year: number;

  if (typeof value !== 'string' || !value.trim()) {
    throw new Error('Data inválida');
  }

  if (inputFormat === 'BR') {
    const parts = value.split('/');
    if (parts.length !== 3) throw new Error('Data inválida');
    const [_day, _month, _year] = parts;
    day = Number(_day);
    month = Number(_month);
    year = Number(_year);
  } else if (inputFormat === 'USA') {
    const parts = value.split('/');
    if (parts.length !== 3) throw new Error('Data inválida');
    const [_month, _day, _year] = parts;
    day = Number(_day);
    month = Number(_month);
    year = Number(_year);
  } else {
    const parts = value.split('-');
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
 * Converts a date string to a Brazilian date format (DD/MM/YYYY) with optional time.
 *
 * @param date - The date string to be converted.
 * @param showSeconds - Optional. Whether to include seconds in the time. Defaults to true.
 * @param showTime - Optional. Whether to include time in the output. Defaults to true.
 * @returns The formatted date string in Brazilian format.
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
 * @deprecated ao invés desse utilize:
 * ```js
 * toString(toDate(date, 'BR'))
 * ```
 */
export const dateBRToJS = (date: string) => toString(toDate(date, 'BR'));

/**
 * Formats a given Date object into a time string.
 *
 * @param date - The Date object to format.
 * @param hideSecond - Optional boolean to hide the seconds in the formatted string. Defaults to false.
 * @returns A string representing the formatted time in "HH:MM:SS" or "HH:MM" format.
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
 * @param csharpDate String no padrão /Date(<timestamp><offset>)/
 * @returns Instância de Date correspondente
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

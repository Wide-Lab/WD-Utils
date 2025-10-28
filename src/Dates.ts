import { WDNumbers } from '.';
import { padTo2Digits } from './Numbers';

/**
 * Get the current date in the 'YYYY-MM-DD' format.
 *
 * @returns The current date in the 'YYYY-MM-DD' format.
 */
export const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Returns a string representing yesterday's date in the format YYYY-MM-DD.
 *
 * This function creates a new Date object, subtracts 1 from the current day to get yesterday's date,
 * and then formats the date into a string with leading zeros for the month and day if necessary.
 *
 * @returns {string} A string representing yesterday's date in the format YYYY-MM-DD.
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
  const month = yesterdayDate.getMonth() + 1;
  const day = yesterdayDate.getDate();

  const smonth = String(month).padStart(2, '0');
  const sday = String(day).padStart(2, '0');

  return `${year}-${smonth}-${sday}`;
};

/**
 * getFirstDayOfMonth
 *
 * This function returns a string representing the first day of the current month in the format 'YYYY-MM-DD'.
 * It uses the Date object to get the current year and month, and then formats the month as a 2-digit string with a leading zero if necessary.
 *
 * @returns {string} - A string representing the first day of the current month in the format 'YYYY-MM-DD'.
 */
export const getFirstDayOfMonth = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const smonth = String(month).padStart(2, '0');
  return `${year}-${smonth}-01`;
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
 * @returns {string} The last day of the previous month in the format YYYY-MM-DD.
 */
export const getLastDayPreviousMonth = () => {
  const now = new Date();
  // Get the last day of the previous month
  const date = new Date(now.getFullYear(), now.getMonth(), 0);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const smonth = String(month).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${smonth}-${day}`;
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

  return String(date.getDate()).padStart(2, '0');
};

/**
 * Get the current date in the Brazilian format 'DD/MM/YYYY'.
 *
 * @returns The current date in the 'DD/MM/YYYY' format.
 */
export const getTodayBR = () => dateToBR(getToday());

/**
 * Convert a date in 'MM/DD/YYYY' format to the Brazilian format 'DD/MM/YYYY'.
 *
 * @param date - The date in 'MM/DD/YYYY' format.
 * @returns The date in the Brazilian 'DD/MM/YYYY' format.
 * @throws An error if the date is in an invalid format.
 */
export const dateUSAtoBR = (date: string) => {
  if (!date) {
    return '';
  }

  const dateParts = date.split('/');

  if (!dateParts.length || dateParts.length !== 3) {
    throw new Error(`Invalid date ${date}`);
  }

  const [month, day, year] = dateParts;

  if (!day || !month || !year) {
    throw new Error(`Invalid date ${date}`);
  }

  return `${day}/${month}/${year}`;
};

/**
 * Convert a date in 'YYYY-MM-DD' format to the Brazilian format 'DD/MM/YYYY'.
 *
 * @param date - The date in 'YYYY-MM-DD' format.
 * @returns The date in the Brazilian 'DD/MM/YYYY' format.
 */
export const dateToBR = (date: string) => {
  if (!date) {
    return '';
  }

  const dateParts = date.split('-');

  if (dateParts.length !== 3) {
    return '';
  }

  const [year, month, day] = dateParts;

  return `${padTo2Digits(Number(day))}/${padTo2Digits(Number(month))}/${year}`;
};

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

  const time = formatTime(dateTime, !showSeconds);

  if (!showTime) {
    return `${day}/${month}/${year}`;
  }

  return `${day}/${month}/${year}  ${time}`;
};

/**
 * Convert a date in the Brazilian format 'DD/MM/YYYY' to the 'YYYY-MM-DD' format.
 *
 * @param date - The date in the 'DD/MM/YYYY' format.
 * @returns The date in the 'YYYY-MM-DD' format.
 */
export const dateBRToJS = (date: string) => {
  if (!date) {
    return '';
  }

  const dateParts = date.split('/');

  if (dateParts.length !== 3) {
    return '';
  }

  const [day, month, year] = dateParts;

  if (!day || !month || !year) {
    return '';
  }

  return `${year}-${month}-${day}`;
};

/**
 * Get the current hour and minute separated by colon
 * @returns The curent time in the format `hh:mm`
 */
export const getNowTime = () => formatTime(new Date(), true);

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

/**
 * Formats a given Date object into a time string.
 *
 * @param date - The Date object to format.
 * @param hideSecond - Optional boolean to hide the seconds in the formatted string. Defaults to false.
 * @returns A string representing the formatted time in "HH:MM:SS" or "HH:MM" format.
 */
export const dateToTime = (date: Date, hideSecond = false) => {
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

export const formatTime = dateToTime;

/**
 * Converts a JavaScript `Date` object to a string in the format `YYYY-MM-DD`.
 *
 * @param date - The `Date` object to be converted.
 * @returns A string representing the date in `YYYY-MM-DD` format.
 */
export const dateToJS = (date: Date) => {
  const year = date.getFullYear();
  const month = WDNumbers.padTo2Digits(date.getMonth() + 1);
  const day = WDNumbers.padTo2Digits(date.getDate());
  return `${year}-${month}-${day}`;
};

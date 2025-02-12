/**
 * -----------------------------
 * FUNÇÕES UTILIZADAS NOS INPUTS
 * -----------------------------
 */

import { padTo2Digits } from './Numbers';

/**
 * Applyes a mask to the CPF and returns in `###.###.###-##` format
 * @param cpf - The CPF number to be formatted
 * @returns The formatted CPF
 */
export const formatCPF = (cpf?: string | number) =>
  String(cpf)
    .replace(/\D/g, '') // Remove caracteres não numéricos
    .replace(/(\d{3})(\d)/, '$1.$2') // Insere ponto após os primeiros 3 dígitos
    .replace(/(\d{3})(\d)/, '$1.$2') // Insere ponto após os próximos 3 dígitos
    .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Insere traço após os próximos 3 dígitos
    .replace(/(-\d{2})\d+?$/, '$1'); // Mantém apenas os 2 últimos dígitos

/**
 * Applies a maks to the CNPJ and returns in `##.###.###/####-##` format
 * @param cnpj - The CNPJ number to be formatted
 * @returns The formatted CNPJ
 */
export const formatCNPJ = (cnpj?: string | number) =>
  String(cnpj)
    .replace(/\D/g, '') // Remove caracteres não numéricos
    .replace(/(\d{2})(\d)/, '$1.$2') // Insere ponto após os primeiros 2 dígitos
    .replace(/(\d{3})(\d)/, '$1.$2') // Insere ponto após os próximos 3 dígitos
    .replace(/(\d{3})(\d)/, '$1/$2') // Insere barra após os próximos 3 dígitos
    .replace(/(\d{4})(\d{1,2})/, '$1-$2') // Insere traço após os próximos 4 dígitos
    .replace(/(-\d{2})\d+?$/, '$1'); // Mantém apenas os 2 últimos dígitos

/**
 * Applies a mask to the CEP and returns in `#####-###` format
 * @param value - The CEP number to be formatted
 * @returns The formated CEP
 */
export const formatCEP = (value?: string) =>
  String(value)
    .replace(/\D/g, '')
    .substring(0, 8) // Limita a 8 dígitos
    .replace(/^(\d{5})(\d)/, '$1-$2'); // Insere traço após os primeiros 5 dígitos

/**
 * Applies a mask to the date and returns in `dd/mm/aaaa` format
 * @param value - The date to be formatted
 * @returns The formated date
 */
export const formatDate = (value?: string | Date) => {
  if (!value) {
    return '';
  }

  if (value instanceof Date) {
    const dateArray = [
      padTo2Digits(value.getDate()),
      padTo2Digits(value.getMonth() + 1),
      value.getFullYear(),
    ];
    return dateArray.join('/');
  }

  return String(value)
    .replace(/\D/g, '')
    .substring(0, 8) // Limita a 8 dígitos
    .replace(/(\d{2})(\d)/, '$1/$2') // Insere barra após os primeiros 2 dígitos
    .replace(/(\d{2})(\d)/, '$1/$2'); // Insere barra após os próximos 2 dígitos
};

/**
 * Formats an input string into a time format, specifically hours and minutes, in the format HH:MM.
 * @param {} [value] - The input string to be formatted. If not provided, an empty string is returned.
 * @returns The formatted time string in the format HH:MM.
 * @example
 * formatHourMinute('1234'); // returns '12:34'
 * formatHourMinute('12345'); // returns '12:34' (ignores extra digits)
 * formatHourMinute('abc1234'); // returns '12:34' (removes non-digit characters)
 * formatHourMinute(''); // returns ''
 */
export const formatHourMinute = (value: string) => {
  if (!value) {
    return '';
  }

  return String(value)
    .replace(/\D/g, '')
    .substring(0, 4) // Limita a 8 dígitos
    .replace(/(\d)(\d{2})$/, '$1:$2'); // Insere barra após os primeiros 2 dígitos
};

/**
 * Formats a date and time string from a given value.
 *
 * @param {} [value] - The value to format. Can be a Date object or a string.
 * @returns The formatted date and time string.
 */
export const formatDateTime = (value?: string | Date) => {
  if (!value) {
    return '';
  }

  if (value instanceof Date) {
    const dateArray = [
      padTo2Digits(value.getDate()),
      padTo2Digits(value.getMonth() + 1),
      value.getFullYear(),
    ];
    return dateArray.join('/') + ' ' + value.toLocaleTimeString();
  }

  return String(value)
    .replace(/\D/g, '')
    .substring(0, 12) // Limita a 12 dígitos
    .replace(/(\d{2})(\d)/, '$1/$2') // Insere barra após os primeiros 2 dígitos
    .replace(/(\d{2})(\d)/, '$1/$2') // Insere barra após os próximos 2 dígitos
    .replace(/(\d{4})(\d)/, '$1 $2') // Insere barra após os próximos 2 dígitos
    .replace(/(\d{4}) (\d{2})(\d)/, '$1 $2:$3'); // Insere barra após os próximos 2 dígitos
};

/**
 * Applies a mask to the telephone number and returns in `(##) #####-####` format
 * @param value - The telephone number to be formatted
 * @returns The formatted telephone number
 */
export const formatPhone = (value?: string) =>
  String(value)
    .replace(/\D/g, '') // Remove caracteres não numéricos
    .replace(/^0/, '') // Remove zero à esquerda
    .substring(0, 11) // Limita a 11 dígitos
    .replace(/(\d{2})(\d)/, '($1) $2') // Insere parênteses e espaço após os primeiros 2 dígitos
    .replace(/(\d{4})(\d+)/, '$1-$2') // Insere traço após os próximos 4 dígitos
    .replace(/-(\d)(\d{4})/, '$1-$2'); // Mantém o traço e insere traço após os 2 últimos dígitos

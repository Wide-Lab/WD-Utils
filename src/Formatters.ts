/**
 * -----------------------------
 * FUNÇÕES UTILIZADAS NOS INPUTS
 * -----------------------------
 */

import { padTo2Digits } from './Numbers';

/**
 * Aplica uma máscara ao CPF e retorna no formato `###.###.###-##`.
 *
 * Esta função remove caracteres não numéricos, insere pontos e traço nos locais apropriados,
 * e limita a 11 dígitos.
 *
 * @param cpf - O número do CPF a ser formatado.
 * @returns O CPF formatado.
 *
 * @example
 * formatCPF('12345678901'); // retorna '123.456.789-01'
 */
export const formatCPF = (cpf?: string | number) =>
  String(cpf)
    .replace(/\D/g, '') // Remove caracteres não numéricos
    .replace(/(\d{3})(\d)/, '$1.$2') // Insere ponto após os primeiros 3 dígitos
    .replace(/(\d{3})(\d)/, '$1.$2') // Insere ponto após os próximos 3 dígitos
    .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Insere traço após os próximos 3 dígitos
    .replace(/(-\d{2})\d+?$/, '$1'); // Mantém apenas os 2 últimos dígitos

/**
 * Aplica uma máscara ao CNPJ e retorna no formato `##.###.###/####-##`.
 *
 * Esta função remove caracteres não numéricos, insere pontos, barra e traço nos locais apropriados,
 * e limita a 14 dígitos.
 *
 * @param cnpj - O número do CNPJ a ser formatado.
 * @returns O CNPJ formatado.
 *
 * @example
 * formatCNPJ('12345678000123'); // retorna '12.345.678/0001-23'
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
 * Aplica uma máscara ao CEP e retorna no formato `#####-###`.
 *
 * Esta função remove caracteres não numéricos, limita a 8 dígitos e insere o traço.
 *
 * @param value - O número do CEP a ser formatado.
 * @returns O CEP formatado.
 *
 * @example
 * formatCEP('12345678'); // retorna '12345-678'
 */
export const formatCEP = (value?: string) =>
  String(value)
    .replace(/\D/g, '')
    .substring(0, 8) // Limita a 8 dígitos
    .replace(/^(\d{5})(\d)/, '$1-$2'); // Insere traço após os primeiros 5 dígitos

/**
 * Aplica uma máscara à data e retorna no formato `dd/mm/aaaa`.
 *
 * Esta função remove caracteres não numéricos, limita a 8 dígitos e insere barras.
 * Também suporta objetos Date.
 *
 * @param value - A data a ser formatada.
 * @returns A data formatada.
 *
 * @example
 * formatDate('15102023'); // retorna '15/10/2023'
 * formatDate(new Date('2023-10-15')); // retorna '15/10/2023'
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
 * Formata uma string de entrada em um formato de hora, especificamente horas e minutos, no formato HH:MM.
 *
 * Esta função remove caracteres não numéricos, limita a 4 dígitos e insere dois pontos.
 *
 * @param value - A string de entrada a ser formatada. Se não fornecida, retorna uma string vazia.
 * @returns A string de tempo formatada no formato HH:MM.
 *
 * @example
 * formatHourMinute('1234'); // retorna '12:34'
 * formatHourMinute('12345'); // retorna '12:34' (ignora dígitos extras)
 * formatHourMinute('abc1234'); // retorna '12:34' (remove caracteres não numéricos)
 * formatHourMinute(''); // retorna ''
 */
export const formatHourMinute = (value: string) => {
  if (!value) {
    return '';
  }

  return String(value)
    .replace(/\D/g, '')
    .substring(0, 4) // Limita a 4 dígitos
    .replace(/(\d)(\d{2})$/, '$1:$2'); // Insere dois pontos após o primeiro dígito
};

/**
 * Formata uma string de data e hora.
 *
 * Esta função converte uma string de data em uma string de data e hora formatada.
 *
 * @param value - O valor a ser formatado. Pode ser um objeto Date ou uma string.
 * @returns A string de data e hora formatada.
 *
 * @example
 * formatDateTime('2023-10-15T10:30:00'); // retorna '15/10/2023 10:30:00'
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
    .replace(/(\d{4})(\d)/, '$1 $2') // Insere espaço após os próximos 4 dígitos
    .replace(/(\d{4}) (\d{2})(\d)/, '$1 $2:$3'); // Insere dois pontos
};

/**
 * Aplica uma máscara ao número de telefone e retorna no formato `(##) #####-####`.
 *
 * Esta função remove caracteres não numéricos, remove zero à esquerda, limita a 11 dígitos
 * e insere parênteses, espaço e traço.
 *
 * @param value - O número de telefone a ser formatado.
 * @returns O número de telefone formatado.
 *
 * @example
 * formatPhone('11987654321'); // retorna '(11) 98765-4321'
 */
export const formatPhone = (value?: string) =>
  String(value)
    .replace(/\D/g, '') // Remove caracteres não numéricos
    .replace(/^0/, '') // Remove zero à esquerda
    .substring(0, 11) // Limita a 11 dígitos
    .replace(/(\d{2})(\d)/, '($1) $2') // Insere parênteses e espaço após os primeiros 2 dígitos
    .replace(/(\d{4})(\d+)/, '$1-$2') // Insere traço após os próximos 4 dígitos
    .replace(/-(\d)(\d{4})/, '$1-$2'); // Mantém o traço e insere traço após os 2 últimos dígitos

/**
 * Formata um valor numérico para moeda brasileira no formato `R$ #.###,##`.
 *
 * Esta função usa a API de internacionalização para formatar o valor como moeda brasileira.
 *
 * @param value - O valor a ser formatado.
 * @returns O valor formatado como moeda brasileira.
 *
 * @example
 * formatCurrency(1234.56); // retorna 'R$ 1.234,56'
 */
export const formatCurrency = (value: number) =>
  value
    .toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    .replace(/\s/g, ' '); // Remove espaços em branco adicionais

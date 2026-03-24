/**
 * Verifica se um número dado é par.
 *
 * Esta função determina se o número fornecido é par, ou seja, se é divisível por 2 sem resto.
 *
 * @param n - O número a ser verificado quanto à paridade.
 * @returns `true` se o número for par, `false` caso contrário.
 *
 * @example
 * isEven(4); // retorna true
 * isEven(5); // retorna false
 */
export const isEven = (n: number) => n % 2 === 0;

/**
 * Garante que um valor esteja dentro de um intervalo específico.
 *
 * Esta função limita o valor fornecido entre os valores mínimo e máximo especificados.
 * Se o valor for menor que o mínimo, retorna o mínimo. Se for maior que o máximo, retorna o máximo.
 * Caso contrário, retorna o valor original.
 *
 * @param value - O valor a ser verificado e ajustado.
 * @param min - O valor mínimo permitido.
 * @param max - O valor máximo permitido.
 * @returns O valor ajustado dentro do intervalo [min, max].
 *
 * @example
 * numberClamp(5, 0, 10); // retorna 5
 * numberClamp(-1, 0, 10); // retorna 0
 * numberClamp(15, 0, 10); // retorna 10
 */
export const numberClamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/**
 * Preenche um número com zeros à esquerda para garantir que tenha pelo menos o número especificado de dígitos.
 *
 * Esta função converte o número em string e adiciona zeros à esquerda até atingir o comprimento desejado.
 *
 * @param num - O número a ser preenchido.
 * @param maxLength - O comprimento desejado da string resultante. O padrão é 2.
 * @returns A representação em string do número preenchido com zeros à esquerda.
 *
 * @example
 * padTo2Digits(5, 3); // retorna "005"
 * padTo2Digits(123, 2); // retorna "123"
 */
export const padTo2Digits = (num: number | string, maxLength = 2) =>
  String(num).padStart(maxLength, '0');

/**
 * Interpola um valor de entrada de um intervalo para outro.
 *
 * Esta função mapeia um valor de entrada de um intervalo de origem para um intervalo de destino,
 * mantendo a proporção relativa. O valor de entrada é limitado ao intervalo de entrada antes da interpolação.
 *
 * @param input - O valor de entrada a ser interpolado.
 * @param inputStart - O início do intervalo de entrada.
 * @param inputEnd - O fim do intervalo de entrada.
 * @param outputStart - O início do intervalo de saída.
 * @param outputEnd - O fim do intervalo de saída.
 * @returns O valor interpolado dentro do intervalo de saída.
 * @throws Lança um erro se inputStart e inputEnd forem iguais.
 *
 * @example
 * interpolate(5, 0, 10, 0, 100); // retorna 50
 * interpolate(2.5, 0, 10, 0, 100); // retorna 25
 */
export const interpolate = (
  input: number,
  inputStart: number,
  inputEnd: number,
  outputStart: number,
  outputEnd: number,
) => {
  if (inputStart === inputEnd) {
    throw new Error(
      'entrada inicial e entrada final não podem ter o mesmo valor',
    );
  }

  // Clamp the input to be within the input range
  const clampedInput = numberClamp(input, inputStart, inputEnd);

  // Calculate the differences
  const inputRange = inputEnd - inputStart;
  const outputRange = outputEnd - outputStart;

  // Calculate the normalized input
  const normalizedInput = (clampedInput - inputStart) / inputRange;

  // Calculate the interpolated output
  return normalizedInput * outputRange + outputStart;
};

/**
 * Trunca um número para um número especificado de casas decimais sem arredondamento.
 *
 * Esta função remove as casas decimais além do número especificado, sem arredondar o valor.
 *
 * @param num - O número a ser truncado.
 * @param decimalPlaces - O número de casas decimais a serem mantidas. O padrão é 2.
 * @returns O número truncado com o número especificado de casas decimais.
 *
 * @example
 * truncDecimals(3.14159, 2); // retorna 3.14
 * truncDecimals(10.999, 1); // retorna 10.9
 */
export const truncDecimals = (num: number, decimalPlaces = 2) => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.trunc(num * factor) / factor;
};

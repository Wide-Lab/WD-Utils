/**
 * Checks if a given number is even.
 *
 * @param n - The number to be checked for evenness.
 * @returns `true` if the number is even, `false` otherwise.
 */
export const isEven = (n: number) => n % 2 === 0;

/**
 * Ensures that a value is within a especific range
 * @param value - The value to check and change
 * @param min - The minimum value allowed
 * @param max - The maximum value allowed
 * @returns The ajusted value within the range [min, max].
 */
export const numberClamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/**
 * Pads a number with leading zeros to ensure it has at least the specified number of digits.
 *
 * @param num - The number to pad.
 * @param maxLength - The desired length of the resulting string. Defaults to 2.
 * @returns The padded string representation of the number.
 */
export const padTo2Digits = (num: number, maxLength = 2) =>
  num.toString().padStart(maxLength, '0');

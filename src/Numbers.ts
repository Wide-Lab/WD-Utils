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

/**
 * Interpolates a given input number from one range to another.
 *
 * @param input - The input number to be interpolated.
 * @param inputStart - The start of the input range.
 * @param inputEnd - The end of the input range.
 * @param outputStart - The start of the output range.
 * @param outputEnd - The end of the output range.
 * @returns The interpolated number within the output range.
 * @throws Will throw an error if the inputStart and inputEnd are the same.
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
 * Truncates a number to a specified number of decimal places without rounding.
 *
 * @param num - The number to truncate.
 * @param decimalPlaces - The number of decimal places to keep. Defaults to 2.
 * @returns The truncated number with the specified number of decimal places.
 */
export const truncDecimals = (num: number, decimalPlaces = 2) => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.trunc(num * factor) / factor;
};

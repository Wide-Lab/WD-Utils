import { numberClamp } from "./Numbers";

/**
 * Converts a hexadecimal color to its RGB component
 * @param color Hexadecimal color to be converted
 * @returns An array containing the R, G and B components (0-255) of the color
 */
export const hexToRgb = (hex: string): [number, number, number] => {
  const shorthandRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  const result = shorthandRegex.exec(hex);

  if (!result) {
    return [0, 0, 0];
  }

  const [, r, g, b] = result;
  return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
};

/**
 * Converts a color component value to its hexadeciaml representation
 * @param component - The value of the color component (0-255).
 * @returns A hexadeciaml representation of the color component
 */
export const decColorToHex = (component: number): string => {
  const clampedComponent = numberClamp(component, 0, 255);
  const hex = clampedComponent.toString(16).toLocaleUpperCase();
  return hex.length === 1 ? "0" + hex : hex;
};

/**
 * Apply a shading to a color component (R, G or B) based on a percentage value
 * @param component - The color component to be shaded (0-255).
 * @param percent - The percentage value of shading (-100 a 100).
 * @returns The shaded color component in the interval [0, 255].
 */
export const shadeColorComponent = (
  component: number,
  percent: number,
): number => numberClamp(Math.round(component * (1 + percent / 100)), 0, 255);

/**
 * Shades a hexadecimal color by changing its luminosity based on a percentage value
 * @param color - The hexadecimal color to shade
 * @param percent - The percentage value of shading (-100 a 100).
 * @returns The shaded hexadecimal color
 */
export const shadeHexColor = (color: string, percent: number) => {
  const [R, G, B] = hexToRgb(color);
  const shadedR = shadeColorComponent(R, percent);
  const shadedG = shadeColorComponent(G, percent);
  const shadedB = shadeColorComponent(B, percent);

  return `#${decColorToHex(shadedR)}${decColorToHex(shadedG)}${decColorToHex(
    shadedB,
  )}`;
};

/**
 * Generates a color palette based on a reference color, using the shading variations
 * @param baseColor - The reference color in hexadecimal format
 * @returns An object that represents the color palette, where the keys are indexes (from 50 to 900)
 * and the values are shaded colors based on the reference color
 */
export const generatePalette = (
  baseColor: string,
): { [key: number]: string } => {
  let colorPalette: { [key: number]: string } = {};

  const baseIndex = 600;
  const colorSteps = 20;

  for (let i = 0; i <= 9; i++) {
    let index = i === 0 ? 50 : i * 100;
    let shadePercent = (baseIndex - index) / colorSteps;
    colorPalette[index] =
      baseIndex === index ? baseColor : shadeHexColor(baseColor, shadePercent);
  }

  return colorPalette;
};

/**
 * Converts an RGB color string to an array of RGB values.
 *
 * @param  rgb - The RGB color string (e.g., "rgb(255, 0, 0)").
 * @returns An array containing the RGB values.
 * @throws  If the provided string is not a valid RGB color.
 */
export const parseRgbToArray = (rgb: string): [number, number, number] => {
  const result = rgb.match(/-?\d+/g);

  if (!result || result.length < 3) {
    throw new Error("Invalid RGB color");
  }

  const rgbValues = result.map(Number);

  const [r, g, b] = rgbValues;

  if (![r, g, b].every((value) => value >= 0 && value <= 255)) {
    throw new Error("Invalid RGB color values");
  }

  return [r, g, b];
};

/**
 * Checks if a given string is a valid hexadecimal color code.
 *
 * A valid hexadecimal color code is a string that starts with a '#' symbol,
 * followed by either 3 or 6 hexadecimal digits (0-9, A-F, a-f).
 *
 * @param color The string to be checked.
 * @returns True if the string is a valid hexadecimal color code, false otherwise.
 */
export const isHexColor = (color: string) =>
  /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);

/**
 * Checks if a given string is a valid RGB color code.
 *
 * A valid RGB color code is a string that starts with 'rgb(', followed by three comma-separated decimal values (0-255) and ends with a ')'.
 *
 * @param color The string to be checked.
 * @returns True if the string is a valid RGB color code, false otherwise.
 */
export const isRgbColor = (color: string): boolean => {
  const rgbPattern = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;

  if (!rgbPattern.test(color)) {
    return false;
  }

  try {
    const rgbParts = parseRgbToArray(color);
    return rgbParts.every((value) => value >= 0 && value <= 255);
  } catch (error) {
    return false;
  }
};

/**
 * Checks if a given string is a valid RGBA color code.
 *
 * A valid RGBA color code is a string that starts with 'rgba(', followed by three comma-separated decimal values (0-255) and a fourth value between 0.0 and 1.0 (inclusive) for the alpha channel, and ends with a ')'.
 *
 * @param color The string to be checked.
 * @returns True if the string is a valid RGBA color code, false otherwise.
 */
export const isRgbaColor = (color: string): boolean => {
  const rgbaPattern =
    /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(1|0?\.\d+)\)$/;

  if (!rgbaPattern.test(color)) {
    return false;
  }

  try {
    const rgbParts = parseRgbToArray(color);
    return rgbParts.every((value) => value >= 0 && value <= 255);
  } catch (error) {
    return false;
  }
};

/**
 * Converts a color string to RGB values and calculates its luminance.
 *
 * @param color - The color string (HEX, RGB, or RGBA).
 * @returns The luminance of the color.
 * @throws If the provided color format is invalid.
 */
export const getHexColorLuminance = (color: string) => {
  let rgb: [number, number, number];

  if (isHexColor(color)) {
    rgb = hexToRgb(color);
  } else if (isRgbColor(color) || isRgbaColor(color)) {
    rgb = parseRgbToArray(color);
  } else {
    throw new Error("Invalid color format. Expected HEX, RGB or RGBA.");
  }

  return getColorLuminance(...rgb);
};

/**
 * Calculates the luminance of a color based on its RGB values.
 *
 * @param r - The red component of the color (0-255).
 * @param g - The green component of the color (0-255).
 * @param b - The blue component of the color (0-255).
 * @returns The luminance of the color.
 */
export const getColorLuminance = (r: number, g: number, b: number): number => {
  const clampedR = numberClamp(r, 0, 255);
  const clampedG = numberClamp(g, 0, 255);
  const clampedB = numberClamp(b, 0, 255);

  const redLuminance = 0.299 * clampedR;
  const greenLuminance = 0.587 * clampedG;
  const blueLuminance = 0.114 * clampedB;

  return (redLuminance + greenLuminance + blueLuminance) / 255;
};

/**
 * Determines if a given color is considered light based on its luminance.
 *
 * @param color - The color in hexadecimal format (e.g., "#FFFFFF").
 * @returns `true` if the color's luminance is greater than 0.64, otherwise `false`.
 */
export const isLightColor = (color: string): boolean =>
  getHexColorLuminance(color) > 0.64;

/**
 * Returns a contrasting text color (black or white) based on the luminance of the provided color.
 *
 * @param color - The color string (HEX, RGB, or RGBA).
 * @returns The contrasting text color, either black or white.
 */
export const getContrastingTextColor = (color: string): string =>
  isLightColor(color) ? "#000000" : "#FFFFFF";

/**
 * Compares the luminance of two colors and returns the absolute difference.
 *
 * @param colorA - The first color string (HEX, RGB, or RGBA).
 * @param colorB - The second color string (HEX, RGB, or RGBA).
 * @returns The absolute difference in luminance between the two colors.
 */
const compareColorLuminance = (colorA: string, colorB: string): number =>
  Math.abs(getHexColorLuminance(colorA) - getHexColorLuminance(colorB));

/**
 * Determines the best active color to use based on the luminance difference with the background color.
 *
 * @param backgroundColor - The background color string (HEX, RGB, or RGBA).
 * @param active - The active color string (HEX, RGB, or RGBA).
 * @returns The best active color to use, either the contrasting text color (black or white) or the original active color.
 */
export const getBestActiveColor = (
  backgroundColor: string,
  active: string,
): string => {
  const diffColors = compareColorLuminance(active, backgroundColor);
  const activeColorCorrect =
    diffColors < 0.25 ? getContrastingTextColor(backgroundColor) : active;
  return activeColorCorrect;
};

/**
 * Adjusts the opacity of a color and returns the color with the new opacity.
 *
 * @param color - The base color string (HEX, RGB, or RGBA).
 * @param opacity - The desired opacity value (0.0 to 1.0).
 * @returns The color string with the new opacity.
 */
export const getColorOpacity = (color: string, opacity: number): string => {
  const correctOpacity = numberClamp(opacity, 0, 1);
  const rgbOpacity = Math.round(correctOpacity * 255);
  const hexOpacity = decColorToHex(rgbOpacity);

  return color + hexOpacity;
};

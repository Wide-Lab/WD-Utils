import {
  decColorToHex,
  generatePalette,
  getBestActiveColor,
  getColorLuminance,
  getColorOpacity,
  getContrastingTextColor,
  getHexColorLuminance,
  hexToRgb,
  isHexColor,
  isLightColor,
  isRgbaColor,
  isRgbColor,
  parseRgbToArray,
  shadeColorComponent,
  shadeHexColor,
} from '../Colors';

describe('utils/colors', () => {
  describe('hexToRgb', () => {
    it('should convert a valid hex color to RGB', () => {
      expect(hexToRgb('#FF5733')).toEqual([255, 87, 51]);
      expect(hexToRgb('#00FF00')).toEqual([0, 255, 0]);
    });

    it('should handle invalid input', () => {
      expect(hexToRgb('#')).toEqual([0, 0, 0]);
    });
  });

  describe('decColorToHex', () => {
    it('should convert a decimal color component to hex', () => {
      expect(decColorToHex(255)).toBe('FF');
      expect(decColorToHex(0)).toBe('00');
      expect(decColorToHex(-50)).toBe('00'); // Negative value clamped to 0
      expect(decColorToHex(300)).toBe('FF'); // Value above 255 clamped to 255
    });
  });

  describe('shadeColorComponent', () => {
    it('should shade a color component correctly', () => {
      expect(shadeColorComponent(128, 50)).toBe(192);
      expect(shadeColorComponent(64, -50)).toBe(32);
      expect(shadeColorComponent(-2, -50)).toBe(0);
      expect(shadeColorComponent(-2, 20)).toBe(0);
    });

    it('should clamp values to the [0, 255] range', () => {
      expect(shadeColorComponent(255, 100)).toBe(255);
      expect(shadeColorComponent(0, -100)).toBe(0);
      expect(shadeColorComponent(300, 40)).toBe(255);
      expect(shadeColorComponent(256, -40)).toBe(154);
    });
  });

  describe('shadeHexColor', () => {
    it('should shade a hex color correctly', () => {
      expect(shadeHexColor('#FF5733', 50)).toBe('#FF834D');
      expect(shadeHexColor('#00FF00', -50)).toBe('#008000');
      expect(shadeHexColor('#G12345', 50)).toBe('#000000'); // Invalid hex
      expect(shadeHexColor('#FF5733', 150)).toBe('#FFDA80'); // Shading exceeds 100%
    });
  });

  describe('generatePalette', () => {
    it('should generate a color palette', () => {
      const baseColor = '#3498db';
      const palette = generatePalette(baseColor);
      expect(palette[50]).toBe('#42C2FF');
      expect(palette[100]).toBe('#41BEFF');
      expect(palette[500]).toBe('#37A0E6');
      expect(palette[600]).toBe(baseColor);
      expect(palette[900]).toBe('#2C81BA');
    });
  });

  describe('parseRgbToArray', () => {
    it('should correctly parse a valid RGB color string', () => {
      expect(parseRgbToArray('rgb(255, 0, 0)')).toEqual([255, 0, 0]);
      expect(parseRgbToArray('rgb(0, 255, 0)')).toEqual([0, 255, 0]);
      expect(parseRgbToArray('rgb(0, 0, 255)')).toEqual([0, 0, 255]);
      expect(parseRgbToArray('rgb(123, 45, 67)')).toEqual([123, 45, 67]);
    });

    it('should correctly parse a valid RGBA color string', () => {
      expect(parseRgbToArray('rgba(255, 255, 255, 1')).toEqual([255, 255, 255]);
    });

    it('should throw an error for an invalid RGB color string', () => {
      expect(() => parseRgbToArray('rgb(256, 0, 0)')).toThrow(
        'Invalid RGB color values'
      );
      expect(() => parseRgbToArray('rgb(-1, 0, 0)')).toThrow(
        'Invalid RGB color values'
      );
      expect(() => parseRgbToArray('rgb(255, 255)')).toThrow(
        'Invalid RGB color'
      );
      expect(() => parseRgbToArray('rgb(abc, def, ghi)')).toThrow(
        'Invalid RGB color'
      );
    });
  });

  describe('isHexColor', () => {
    it('should return true for valid hex colors', () => {
      expect(isHexColor('#FFFFFF')).toBe(true);
      expect(isHexColor('#FFF')).toBe(true);
      expect(isHexColor('#000000')).toBe(true);
    });

    it('should return false for invalid hex colors', () => {
      expect(isHexColor('#GGGGGG')).toBe(false);
      expect(isHexColor('123456')).toBe(false);
      expect(isHexColor('#FFFF')).toBe(false);
    });
  });

  describe('isRgbColor', () => {
    it('should return true for valid RGB colors', () => {
      expect(isRgbColor('rgb(255, 255, 255)')).toBe(true);
      expect(isRgbColor('rgb(0, 0, 0)')).toBe(true);
      expect(isRgbColor('rgb(123, 45, 67)')).toBe(true);
    });

    it('should return false for invalid RGB colors', () => {
      expect(isRgbColor('rgb(256, 256, 256)')).toBe(false);
      expect(isRgbColor('rgb(-1, 0, 0)')).toBe(false);
      expect(isRgbColor('rgb(255, 255)')).toBe(false);
    });
  });

  describe('isRgbaColor', () => {
    it('should return true for valid RGBA colors', () => {
      expect(isRgbaColor('rgba(255, 255, 255, 1)')).toBe(true);
      expect(isRgbaColor('rgba(0, 0, 0, 0.5)')).toBe(true);
      expect(isRgbaColor('rgba(123, 45, 67, 0.75)')).toBe(true);
    });

    it('should return false for invalid RGBA colors', () => {
      expect(isRgbaColor('rgba(256, 256, 256, 1)')).toBe(false);
      expect(isRgbaColor('rgba(-1, 0, 0, 0)')).toBe(false);
      expect(isRgbaColor('rgba(255, 255, 255)')).toBe(false);
    });
  });

  describe('getHexColorLuminance', () => {
    it('should calculate the luminance of a hex color', () => {
      expect(getHexColorLuminance('#FFFFFF')).toBe(1);
      expect(getHexColorLuminance('#000000')).toBe(0);
      expect(getHexColorLuminance('#42c2ff')).toBeCloseTo(0.637, 2);
      expect(getHexColorLuminance('#2c81ba')).toBeCloseTo(0.431, 2);
    });

    it('should calculate the luminance of an RGB color', () => {
      expect(getHexColorLuminance('rgb(255, 255, 255)')).toBe(1);
      expect(getHexColorLuminance('rgb(0, 0, 0)')).toBe(0);
      expect(getHexColorLuminance('rgb(66, 194, 255)')).toBeCloseTo(0.637, 2);
      expect(getHexColorLuminance('rgb(44, 129, 186)')).toBeCloseTo(0.431, 2);
    });

    it('should calculate the luminance of an RGBA color', () => {
      expect(getHexColorLuminance('rgba(255, 255, 255, 1)')).toBe(1);
      expect(getHexColorLuminance('rgba(0, 0, 0, 0.5)')).toBe(0);
      expect(getHexColorLuminance('rgba(66, 194, 255, 0.75)')).toBeCloseTo(
        0.637,
        2
      );
      expect(getHexColorLuminance('rgba(44, 129, 186, 0.25)')).toBeCloseTo(
        0.431,
        2
      );
    });

    it('should throw an error for invalid color formats', () => {
      expect(() => getHexColorLuminance('#G12345')).toThrow(
        'Invalid color format. Expected HEX, RGB or RGBA.'
      );
      expect(() => getHexColorLuminance('rgb(256, 0, 0)')).toThrow(
        'Invalid color format. Expected HEX, RGB or RGBA.'
      );
      expect(() => getHexColorLuminance('rgba(255, 255, 255, 2)')).toThrow(
        'Invalid color format. Expected HEX, RGB or RGBA.'
      );
      expect(() => getHexColorLuminance('invalid-color')).toThrow(
        'Invalid color format. Expected HEX, RGB or RGBA.'
      );
    });

    it('should throw an error for invalid hex color', () => {
      expect(() => getHexColorLuminance('#G12345')).toThrow(
        'Invalid color format. Expected HEX, RGB or RGBA.'
      );
    });
  });

  describe('getColorLuminance', () => {
    it('should calculate the luminance of a color', () => {
      expect(getColorLuminance(255, 255, 255)).toBe(1);
      expect(getColorLuminance(0, 0, 0)).toBe(0);

      expect(getColorLuminance(-1, 128, 255)).toBeCloseTo(
        (0.299 * 0 + 0.587 * 128 + 0.114 * 255) / 255,
        2
      ); // Negative R value
      expect(getColorLuminance(256, 128, 255)).toBeCloseTo(
        (0.299 * 255 + 0.587 * 128 + 0.114 * 255) / 255,
        2
      ); // R value above 255
    });
  });

  describe('isLightColor', () => {
    it('should determine if a color needs contrast', () => {
      expect(isLightColor('#FFFFFF')).toBe(true);
      expect(isLightColor('#1d5982')).toBe(false);
      expect(isLightColor('#79b3db')).toBe(true);
      expect(isLightColor('#000000')).toBe(false);
    });

    it('should throw an error for invalid hex color', () => {
      expect(() => isLightColor('#G12345')).toThrow(
        'Invalid color format. Expected HEX, RGB or RGBA.'
      );
    });
  });

  describe('getContrastingTextColor', () => {
    it('should return contrasting text color', () => {
      expect(getContrastingTextColor('#FFFFFF')).toBe('#000000');
      expect(getContrastingTextColor('#000000')).toBe('#FFFFFF');
      expect(getContrastingTextColor('#1d5982')).toBe('#FFFFFF');
      expect(getContrastingTextColor('#79b3db')).toBe('#000000');
    });

    it('should throw an error for invalid hex color', () => {
      expect(() => getContrastingTextColor('#G12345')).toThrow(
        'Invalid color format. Expected HEX, RGB or RGBA.'
      );
    });
  });

  describe('getBestActiveColor', () => {
    it('should return the contrasting text color if luminance difference is less than 0.25', () => {
      expect(getBestActiveColor('#FFFFFF', '#FFFFFF')).toBe('#000000');
      expect(getBestActiveColor('#000000', '#111111')).toBe('#FFFFFF');
    });

    it('should return the active color if luminance difference is 0.25 or more', () => {
      expect(getBestActiveColor('#FFFFFF', '#000000')).toBe('#000000');
      expect(getBestActiveColor('#FF5733', '#075E16')).toBe('#075E16');
      expect(getBestActiveColor('#FFFFFF', '#FF5733')).toBe('#FF5733');
      expect(getBestActiveColor('#000000', '#FF5733')).toBe('#FF5733');
    });

    it('should handle various edge cases', () => {
      expect(getBestActiveColor('#123456', '#654321')).toBe('#FFFFFF');
      expect(getBestActiveColor('#ABCDEF', '#FEDCBA')).toBe('#000000');
      expect(getBestActiveColor('#112233', '#223344')).toBe('#FFFFFF');
    });

    it('should return the correct color for similar tones', () => {
      expect(getBestActiveColor('#336699', '#3366AA')).toBe('#FFFFFF');
      expect(getBestActiveColor('#6699CC', '#99CCFF')).toBe('#FFFFFF');
    });
  });

  describe('getColorOpacity', () => {
    it('should apply the correct opacity to the color', () => {
      expect(getColorOpacity('#FFFFFF', 0.5)).toBe('#FFFFFF80');
      expect(getColorOpacity('#000000', 1)).toBe('#000000FF');
      expect(getColorOpacity('#FF5733', 0.75)).toBe('#FF5733BF');
    });

    it('should clamp opacity values correctly', () => {
      expect(getColorOpacity('#FFFFFF', -0.5)).toBe('#FFFFFF00');
      expect(getColorOpacity('#000000', 1.5)).toBe('#000000FF');
    });

    it('should handle edge cases for opacity', () => {
      expect(getColorOpacity('#123456', 0)).toBe('#12345600');
      expect(getColorOpacity('#ABCDEF', 1)).toBe('#ABCDEFFF');
    });
  });
});

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
    it('deve converter uma cor hexadecimal válida para RGB', () => {
      expect(hexToRgb('#FF5733')).toEqual([255, 87, 51]);
      expect(hexToRgb('#00FF00')).toEqual([0, 255, 0]);
    });

    it('deve lidar com entrada inválida', () => {
      expect(hexToRgb('#')).toEqual([0, 0, 0]);
    });
  });

  describe('decColorToHex', () => {
    it('deve converter um componente de cor decimal para hexadecimal', () => {
      expect(decColorToHex(255)).toBe('FF');
      expect(decColorToHex(0)).toBe('00');
      expect(decColorToHex(-50)).toBe('00'); // Negative value clamped to 0
      expect(decColorToHex(300)).toBe('FF'); // Value above 255 clamped to 255
    });
  });

  describe('shadeColorComponent', () => {
    it('deve sombrear corretamente um componente de cor', () => {
      expect(shadeColorComponent(128, 50)).toBe(192);
      expect(shadeColorComponent(64, -50)).toBe(32);
      expect(shadeColorComponent(-2, -50)).toBe(0);
      expect(shadeColorComponent(-2, 20)).toBe(0);
    });

    it('deve limitar valores ao intervalo [0, 255]', () => {
      expect(shadeColorComponent(255, 100)).toBe(255);
      expect(shadeColorComponent(0, -100)).toBe(0);
      expect(shadeColorComponent(300, 40)).toBe(255);
      expect(shadeColorComponent(256, -40)).toBe(154);
    });
  });

  describe('shadeHexColor', () => {
    it('deve sombrear corretamente uma cor hexadecimal', () => {
      expect(shadeHexColor('#FF5733', 50)).toBe('#FF834D');
      expect(shadeHexColor('#00FF00', -50)).toBe('#008000');
      expect(shadeHexColor('#G12345', 50)).toBe('#000000'); // Invalid hex
      expect(shadeHexColor('#FF5733', 150)).toBe('#FFDA80'); // Shading exceeds 100%
    });
  });

  describe('generatePalette', () => {
    it('deve gerar uma paleta de cores', () => {
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
    it('deve analisar corretamente uma string RGB válida', () => {
      expect(parseRgbToArray('rgb(255, 0, 0)')).toEqual([255, 0, 0]);
      expect(parseRgbToArray('rgb(0, 255, 0)')).toEqual([0, 255, 0]);
      expect(parseRgbToArray('rgb(0, 0, 255)')).toEqual([0, 0, 255]);
      expect(parseRgbToArray('rgb(123, 45, 67)')).toEqual([123, 45, 67]);
    });

    it('deve analisar corretamente uma string RGBA válida', () => {
      expect(parseRgbToArray('rgba(255, 255, 255, 1')).toEqual([255, 255, 255]);
    });

    it('deve lançar erro para uma string RGB inválida', () => {
      expect(() => parseRgbToArray('rgb(256, 0, 0)')).toThrow(
        'Invalid RGB color values',
      );
      expect(() => parseRgbToArray('rgb(-1, 0, 0)')).toThrow(
        'Invalid RGB color values',
      );
      expect(() => parseRgbToArray('rgb(255, 255)')).toThrow(
        'Invalid RGB color',
      );
      expect(() => parseRgbToArray('rgb(abc, def, ghi)')).toThrow(
        'Invalid RGB color',
      );
    });
  });

  describe('isHexColor', () => {
    it('deve retornar verdadeiro para cores hexadecimais válidas', () => {
      expect(isHexColor('#FFFFFF')).toBe(true);
      expect(isHexColor('#FFF')).toBe(true);
      expect(isHexColor('#000000')).toBe(true);
    });

    it('deve retornar falso para cores hexadecimais inválidas', () => {
      expect(isHexColor('#GGGGGG')).toBe(false);
      expect(isHexColor('123456')).toBe(false);
      expect(isHexColor('#FFFF')).toBe(false);
    });
  });

  describe('isRgbColor', () => {
    it('deve retornar verdadeiro para cores RGB válidas', () => {
      expect(isRgbColor('rgb(255, 255, 255)')).toBe(true);
      expect(isRgbColor('rgb(0, 0, 0)')).toBe(true);
      expect(isRgbColor('rgb(123, 45, 67)')).toBe(true);
    });

    it('deve retornar falso para cores RGB inválidas', () => {
      expect(isRgbColor('rgb(256, 256, 256)')).toBe(false);
      expect(isRgbColor('rgb(-1, 0, 0)')).toBe(false);
      expect(isRgbColor('rgb(255, 255)')).toBe(false);
    });
  });

  describe('isRgbaColor', () => {
    it('deve retornar verdadeiro para cores RGBA válidas', () => {
      expect(isRgbaColor('rgba(255, 255, 255, 1)')).toBe(true);
      expect(isRgbaColor('rgba(0, 0, 0, 0.5)')).toBe(true);
      expect(isRgbaColor('rgba(123, 45, 67, 0.75)')).toBe(true);
    });

    it('deve retornar falso para cores RGBA inválidas', () => {
      expect(isRgbaColor('rgba(256, 256, 256, 1)')).toBe(false);
      expect(isRgbaColor('rgba(-1, 0, 0, 0)')).toBe(false);
      expect(isRgbaColor('rgba(255, 255, 255)')).toBe(false);
    });
  });

  describe('getHexColorLuminance', () => {
    it('deve calcular a luminância de uma cor hexadecimal', () => {
      expect(getHexColorLuminance('#FFFFFF')).toBe(1);
      expect(getHexColorLuminance('#000000')).toBe(0);
      expect(getHexColorLuminance('#42c2ff')).toBeCloseTo(0.637, 2);
      expect(getHexColorLuminance('#2c81ba')).toBeCloseTo(0.431, 2);
    });

    it('deve calcular a luminância de uma cor RGB', () => {
      expect(getHexColorLuminance('rgb(255, 255, 255)')).toBe(1);
      expect(getHexColorLuminance('rgb(0, 0, 0)')).toBe(0);
      expect(getHexColorLuminance('rgb(66, 194, 255)')).toBeCloseTo(0.637, 2);
      expect(getHexColorLuminance('rgb(44, 129, 186)')).toBeCloseTo(0.431, 2);
    });

    it('deve calcular a luminância de uma cor RGBA', () => {
      expect(getHexColorLuminance('rgba(255, 255, 255, 1)')).toBe(1);
      expect(getHexColorLuminance('rgba(0, 0, 0, 0.5)')).toBe(0);
      expect(getHexColorLuminance('rgba(66, 194, 255, 0.75)')).toBeCloseTo(
        0.637,
        2,
      );
      expect(getHexColorLuminance('rgba(44, 129, 186, 0.25)')).toBeCloseTo(
        0.431,
        2,
      );
    });

    it('deve lançar erro para formatos de cor inválidos', () => {
      expect(() => getHexColorLuminance('#G12345')).toThrow(
        'Invalid color format. Expected HEX, RGB or RGBA.',
      );
      expect(() => getHexColorLuminance('rgb(256, 0, 0)')).toThrow(
        'Invalid color format. Expected HEX, RGB or RGBA.',
      );
      expect(() => getHexColorLuminance('rgba(255, 255, 255, 2)')).toThrow(
        'Invalid color format. Expected HEX, RGB or RGBA.',
      );
      expect(() => getHexColorLuminance('invalid-color')).toThrow(
        'Invalid color format. Expected HEX, RGB or RGBA.',
      );
    });

    it('deve lançar erro para cor hexadecimal inválida', () => {
      expect(() => getHexColorLuminance('#G12345')).toThrow(
        'Invalid color format. Expected HEX, RGB or RGBA.',
      );
    });
  });

  describe('getColorLuminance', () => {
    it('deve calcular a luminância de uma cor', () => {
      expect(getColorLuminance(255, 255, 255)).toBe(1);
      expect(getColorLuminance(0, 0, 0)).toBe(0);

      expect(getColorLuminance(-1, 128, 255)).toBeCloseTo(
        (0.299 * 0 + 0.587 * 128 + 0.114 * 255) / 255,
        2,
      ); // Negative R value
      expect(getColorLuminance(256, 128, 255)).toBeCloseTo(
        (0.299 * 255 + 0.587 * 128 + 0.114 * 255) / 255,
        2,
      ); // R value above 255
    });
  });

  describe('isLightColor', () => {
    it('deve determinar se uma cor precisa de contraste', () => {
      expect(isLightColor('#FFFFFF')).toBe(true);
      expect(isLightColor('#1d5982')).toBe(false);
      expect(isLightColor('#79b3db')).toBe(true);
      expect(isLightColor('#000000')).toBe(false);
    });

    it('deve lançar erro para cor hexadecimal inválida', () => {
      expect(() => isLightColor('#G12345')).toThrow(
        'Invalid color format. Expected HEX, RGB or RGBA.',
      );
    });
  });

  describe('getContrastingTextColor', () => {
    it('deve retornar a cor de texto contrastante', () => {
      expect(getContrastingTextColor('#FFFFFF')).toBe('#000000');
      expect(getContrastingTextColor('#000000')).toBe('#FFFFFF');
      expect(getContrastingTextColor('#1d5982')).toBe('#FFFFFF');
      expect(getContrastingTextColor('#79b3db')).toBe('#000000');
    });

    it('deve lançar erro para cor hexadecimal inválida', () => {
      expect(() => getContrastingTextColor('#G12345')).toThrow(
        'Invalid color format. Expected HEX, RGB or RGBA.',
      );
    });
  });

  describe('getBestActiveColor', () => {
    it('deve retornar a cor de texto contrastante se a diferença de luminância for menor que 0.25', () => {
      expect(getBestActiveColor('#FFFFFF', '#FFFFFF')).toBe('#000000');
      expect(getBestActiveColor('#000000', '#111111')).toBe('#FFFFFF');
    });

    it('deve retornar a cor ativa se a diferença de luminância for 0.25 ou maior', () => {
      expect(getBestActiveColor('#FFFFFF', '#000000')).toBe('#000000');
      expect(getBestActiveColor('#FF5733', '#075E16')).toBe('#075E16');
      expect(getBestActiveColor('#FFFFFF', '#FF5733')).toBe('#FF5733');
      expect(getBestActiveColor('#000000', '#FF5733')).toBe('#FF5733');
    });

    it('deve lidar com vários casos de borda', () => {
      expect(getBestActiveColor('#123456', '#654321')).toBe('#FFFFFF');
      expect(getBestActiveColor('#ABCDEF', '#FEDCBA')).toBe('#000000');
      expect(getBestActiveColor('#112233', '#223344')).toBe('#FFFFFF');
    });

    it('deve retornar a cor correta para tons semelhantes', () => {
      expect(getBestActiveColor('#336699', '#3366AA')).toBe('#FFFFFF');
      expect(getBestActiveColor('#6699CC', '#99CCFF')).toBe('#FFFFFF');
    });
  });

  describe('getColorOpacity', () => {
    it('deve aplicar a opacidade correta à cor', () => {
      expect(getColorOpacity('#FFFFFF', 0.5)).toBe('#FFFFFF80');
      expect(getColorOpacity('#000000', 1)).toBe('#000000FF');
      expect(getColorOpacity('#FF5733', 0.75)).toBe('#FF5733BF');
    });

    it('deve limitar corretamente os valores de opacidade', () => {
      expect(getColorOpacity('#FFFFFF', -0.5)).toBe('#FFFFFF00');
      expect(getColorOpacity('#000000', 1.5)).toBe('#000000FF');
    });

    it('deve lidar com casos extremos de opacidade', () => {
      expect(getColorOpacity('#123456', 0)).toBe('#12345600');
      expect(getColorOpacity('#ABCDEF', 1)).toBe('#ABCDEFFF');
    });
  });
});

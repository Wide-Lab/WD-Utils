import { isEven, numberClamp, padTo2Digits } from '../Numbers';

describe('utils/Numbers', () => {
  describe('isEven', () => {
    it('should return true for even numbers', () => {
      expect(isEven(2)).toBeTruthy();
      expect(isEven(4)).toBeTruthy();
      expect(isEven(6)).toBeTruthy();
      expect(isEven(100)).toBeTruthy();
      expect(isEven(54761898)).toBeTruthy();
    });

    it('should return false for odd numbers', () => {
      expect(isEven(1)).toBeFalsy();
      expect(isEven(3)).toBeFalsy();
      expect(isEven(5)).toBeFalsy();
      expect(isEven(99)).toBeFalsy();
      expect(isEven(54761891)).toBeFalsy();
    });
  });

  describe('numberClamp', () => {
    it('should clamp a number to the specified range', () => {
      // Test when value is less than the minimum
      expect(numberClamp(-1, 0, 1)).toBe(0);

      // Test when value is within the range
      expect(numberClamp(0.5, 0, 1)).toBe(0.5);

      // Test when value is greater than the maximum
      expect(numberClamp(2, 0, 1)).toBe(1);

      // Test with negative range
      expect(numberClamp(-3, -1, 1)).toBe(-1);
    });
  });

  describe('padTo2Digits', () => {
    it('should pad single digit numbers with a leading zero', () => {
      expect(padTo2Digits(0)).toBe('00');
      expect(padTo2Digits(3)).toBe('03');
      expect(padTo2Digits(9)).toBe('09');
    });

    it('should return double digit numbers as strings without changes', () => {
      expect(padTo2Digits(10)).toBe('10');
      expect(padTo2Digits(23)).toBe('23');
      expect(padTo2Digits(99)).toBe('99');
    });

    it('should handle numbers with more than two digits', () => {
      expect(padTo2Digits(100)).toBe('100');
      expect(padTo2Digits(1234)).toBe('1234');
    });
  });
});

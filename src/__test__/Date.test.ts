import { dateBRToJS, dateToBR, dateUSAtoBR, formatTime } from '../Date';

describe('utils/Date', () => {
  describe('dateUSAtoBR', () => {
    it('should return an empty string for an empty input', () =>
      expect(dateUSAtoBR('')).toBe(''));

    it('09/22/2023 -> 22/09/2023', () =>
      expect(dateUSAtoBR('09/22/2023')).toBe('22/09/2023'));

    describe('Should throw an error', () => {
      it('Invalid no Slash 09222023', () =>
        expect(() => dateUSAtoBR('09222023')).toThrow(`Invalid date 09222023`));
      it('No Year 09/22', () =>
        expect(() => dateUSAtoBR('09/22')).toThrow(`Invalid date 09/22`));
      it('No Year with slash 09/22/', () =>
        expect(() => dateUSAtoBR('09/22/')).toThrow(`Invalid date 09/22/`));
      it('No Month 22/2023', () =>
        expect(() => dateUSAtoBR('22/2023')).toThrow(`Invalid date 22/2023`));
      it('No Month with slash /22/2023', () =>
        expect(() => dateUSAtoBR('/22/2023')).toThrow(`Invalid date /22/2023`));
    });
  });

  describe('dateToBR', () => {
    it('should return an empty string for an empty input', () =>
      expect(dateToBR('')).toBe(''));

    it('2023-10-14 -> 14/10/2023', () =>
      expect(dateToBR('2023-10-14')).toBe('14/10/2023'));
    it('2023-10-09 -> 09/10/2023', () =>
      expect(dateToBR('2023-10-09')).toBe('09/10/2023'));
    it('2023-12-31 -> 31/12/2023', () =>
      expect(dateToBR('2023-12-31')).toBe('31/12/2023'));
  });

  describe('dateBRToJS', () => {
    it('should return an empty string for an empty input', () =>
      expect(dateBRToJS('')).toBe(''));

    describe('Invalid dates', () => {
      it('14/10', () => expect(dateBRToJS('')).toBe(''));
      it('10/2023', () => expect(dateBRToJS('')).toBe(''));
      it('14/2023', () => expect(dateBRToJS('')).toBe(''));
      it('14', () => expect(dateBRToJS('')).toBe(''));
      it('14/', () => expect(dateBRToJS('')).toBe(''));
      it('14/10/', () => expect(dateBRToJS('')).toBe(''));
      it('/10/2023', () => expect(dateBRToJS('')).toBe(''));
      it('14//2023', () => expect(dateBRToJS('')).toBe(''));
    });

    it('29/12/2023 -> 2023-12-29', () =>
      expect(dateBRToJS('29/12/2023')).toBe('2023-12-29'));
    it('07/04/2023 -> 2023-04-07', () =>
      expect(dateBRToJS('07/04/2023')).toBe('2023-04-07'));
    it('02/02/2023 -> 2023-02-02', () =>
      expect(dateBRToJS('02/02/2023')).toBe('2023-02-02'));
  });

  describe('formatTime', () => {
    it('should format the time correctly without hiding seconds', () => {
      const date = new Date(2022, 0, 1, 14, 30, 15); // 14:30:15
      expect(formatTime(date)).toBe('14:30:15');
    });

    it('should format the time correctly and hide seconds', () => {
      const date = new Date(2022, 0, 1, 14, 30, 15); // 14:30:15
      expect(formatTime(date, true)).toBe('14:30');
    });

    it('should handle single digit hours, minutes, and seconds correctly', () => {
      const date = new Date(2022, 0, 1, 8, 5, 7); // 08:05:07
      expect(formatTime(date)).toBe('08:05:07');
      expect(formatTime(date, true)).toBe('08:05');
    });

    it('should handle edge cases for midnight correctly', () => {
      const date = new Date(2022, 0, 1, 0, 59, 59); // 00:59:59
      expect(formatTime(date)).toBe('00:59:59');
      expect(formatTime(date, true)).toBe('00:59');
    });

    it('should handle edge cases for noon correctly', () => {
      const date = new Date(2022, 0, 1, 12, 0, 0); // 12:00:00
      expect(formatTime(date)).toBe('12:00:00');
      expect(formatTime(date, true)).toBe('12:00');
    });
  });
});

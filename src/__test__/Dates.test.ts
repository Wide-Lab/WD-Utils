import {
  dateBRToJS,
  dateToBR,
  dateToBRDate,
  dateToJS,
  dateToTime,
  dateUSAtoBR,
  getFirstDayOfMonth,
  getLastDayPreviousMonth,
  getToday,
  getYesterday,
} from '../Dates';

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

    it('2023-12-3 => 03/12/2023', () =>
      expect(dateToBR('2023-12-3')).toBe('03/12/2023'));

    describe('Should return empty for incomplete dates', () => {
      it('2023-12', () => expect(dateToBR('2023-12')).toBe(''));
      it('2023-1', () => expect(dateToBR('2023-1')).toBe(''));
      it('2023', () => expect(dateToBR('2023')).toBe(''));
      it('202', () => expect(dateToBR('202')).toBe(''));
    });
  });

  describe('dateBRToJS', () => {
    it('should return an empty string for an empty input', () =>
      expect(dateBRToJS('')).toBe(''));

    describe('Invalid dates', () => {
      it('14/10', () => expect(dateBRToJS('14/10')).toBe(''));
      it('10/2023', () => expect(dateBRToJS('10/2023')).toBe(''));
      it('14/2023', () => expect(dateBRToJS('14/2023')).toBe(''));
      it('14', () => expect(dateBRToJS('14')).toBe(''));
      it('14/', () => expect(dateBRToJS('14/')).toBe(''));
      it('14/10/', () => expect(dateBRToJS('14/10/')).toBe(''));
      it('/10/2023', () => expect(dateBRToJS('/10/2023')).toBe(''));
      it('14//2023', () => expect(dateBRToJS('14//2023')).toBe(''));
    });

    it('29/12/2023 -> 2023-12-29', () =>
      expect(dateBRToJS('29/12/2023')).toBe('2023-12-29'));
    it('07/04/2023 -> 2023-04-07', () =>
      expect(dateBRToJS('07/04/2023')).toBe('2023-04-07'));
    it('02/02/2023 -> 2023-02-02', () =>
      expect(dateBRToJS('02/02/2023')).toBe('2023-02-02'));
  });

  describe('dateToTime', () => {
    it('should format the time correctly without hiding seconds', () => {
      const date = new Date(2022, 0, 1, 14, 30, 15); // 14:30:15
      expect(dateToTime(date)).toBe('14:30:15');
    });

    it('should format the time correctly and hide seconds', () => {
      const date = new Date(2022, 0, 1, 14, 30, 15); // 14:30:15
      expect(dateToTime(date, true)).toBe('14:30');
    });

    it('should handle single digit hours, minutes, and seconds correctly', () => {
      const date = new Date(2022, 0, 1, 8, 5, 7); // 08:05:07
      expect(dateToTime(date)).toBe('08:05:07');
      expect(dateToTime(date, true)).toBe('08:05');
    });

    it('should handle edge cases for midnight correctly', () => {
      const date = new Date(2022, 0, 1, 0, 59, 59); // 00:59:59
      expect(dateToTime(date)).toBe('00:59:59');
      expect(dateToTime(date, true)).toBe('00:59');
    });

    it('should handle edge cases for noon correctly', () => {
      const date = new Date(2022, 0, 1, 12, 0, 0); // 12:00:00
      expect(dateToTime(date)).toBe('12:00:00');
      expect(dateToTime(date, true)).toBe('12:00');
    });
  });

  describe('getToday', () => {
    it('should return correct today of 2021-02-26', () => {
      const mockDateObject = new Date('2021-02-26T22:42:16.652Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);

      const mocketToday = getToday();
      spy.mockRestore();
      expect(mocketToday).toBe('2021-02-26');
    });

    it('should return correct today of 2023-01-31', () => {
      const mockDateObject = new Date('2023-01-31T23:57:57.999Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);

      const mocketToday = getToday();
      spy.mockRestore();
      expect(mocketToday).toBe('2023-01-31');
    });
  });

  describe('getYesterday', () => {
    it('should return correct yesterday of 2021-02-25', () => {
      const mockDateObject = new Date('2021-02-26T02:42:16.652Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);

      const mocketYesterday = getYesterday();
      spy.mockRestore();
      expect(mocketYesterday).toBe('2021-02-25');
    });

    it('should return correct yesterday of 2023-01-01', () => {
      const mockDateObject = new Date('2023-01-02T01:00:00.000Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);

      const mocketYesterday = getYesterday();
      spy.mockRestore();
      expect(mocketYesterday).toBe('2023-01-01');
    });

    it('should return correct yesterday of 2020-02-28 (leap year)', () => {
      const mockDateObject = new Date('2020-02-29T01:00:00.000Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);

      const mocketYesterday = getYesterday();
      spy.mockRestore();
      expect(mocketYesterday).toBe('2020-02-28');
    });

    it('should return correct yesterday of 2021-03-01 (non-leap year)', () => {
      const mockDateObject = new Date('2021-03-01T01:00:00.000Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);

      const mocketYesterday = getYesterday();
      spy.mockRestore();
      expect(mocketYesterday).toBe('2021-02-28');
    });

    it('should return correct yesterday of 2021-01-31', () => {
      const mockDateObject = new Date('2021-02-01T01:00:00.000Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);

      const mocketYesterday = getYesterday();
      spy.mockRestore();
      expect(mocketYesterday).toBe('2021-01-31');
    });

    it('should return correct yesterday of 2021-12-31', () => {
      const mockDateObject = new Date('2022-01-01T01:00:00.000Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);

      const mocketYesterday = getYesterday();
      spy.mockRestore();
      expect(mocketYesterday).toBe('2021-12-31');
    });
  });

  describe('getFirstDayOfMonth', () => {
    it('should return correct first day of 2021-02', () => {
      const mockDateObject = new Date('2021-02-26T02:42:16.652Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);

      const mocketYesterday = getFirstDayOfMonth();
      spy.mockRestore();
      expect(mocketYesterday).toBe('2021-02-01');
    });

    it('should return correct first day of 2023-01', () => {
      const mockDateObject = new Date('2023-01-14T01:00:00.000Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);

      const mocketYesterday = getFirstDayOfMonth();
      spy.mockRestore();
      expect(mocketYesterday).toBe('2023-01-01');
    });

    it('should return correct first day of 2021-03 (non-leap year)', () => {
      const mockDateObject = new Date('2021-03-12T01:00:00.000Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);

      const mocketYesterday = getFirstDayOfMonth();
      spy.mockRestore();
      expect(mocketYesterday).toBe('2021-03-01');
    });

    it('should return correct first day of 2021-12', () => {
      const mockDateObject = new Date('2021-12-10T01:00:00.000Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);

      const mocketYesterday = getFirstDayOfMonth();
      spy.mockRestore();
      expect(mocketYesterday).toBe('2021-12-01');
    });
  });

  describe('getLastDayPreviousMonth', () => {
    it('should return correct first day of 2021-01', () => {
      const mockDateObject = new Date('2021-02-26T02:42:16.652Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);

      const mocketYesterday = getLastDayPreviousMonth();
      spy.mockRestore();
      expect(mocketYesterday).toBe('2021-01-31');
    });

    it('should return correct first day of 2022-12', () => {
      const mockDateObject = new Date('2023-01-14T01:00:00.000Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);

      const mocketYesterday = getLastDayPreviousMonth();
      spy.mockRestore();
      expect(mocketYesterday).toBe('2022-12-31');
    });

    it('should return correct first day of 2021-02 (non-leap year)', () => {
      const mockDateObject = new Date('2021-03-12T01:00:00.000Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);

      const mocketYesterday = getLastDayPreviousMonth();
      spy.mockRestore();
      expect(mocketYesterday).toBe('2021-02-28');
    });

    it('should return correct first day of 2021-12', () => {
      const mockDateObject = new Date('2021-12-10T01:00:00.000Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);

      const mocketYesterday = getLastDayPreviousMonth();
      spy.mockRestore();
      expect(mocketYesterday).toBe('2021-11-30');
    });

    it('should return correct first day of 2024-03', () => {
      const mockDateObject = new Date('2024-03-10T01:00:00.000Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);

      const mocketYesterday = getLastDayPreviousMonth();
      spy.mockRestore();
      expect(mocketYesterday).toBe('2024-02-29');
    });
  });

  describe('dateToBRDate', () => {
    it('should return an empty string for an empty input', () =>
      expect(dateToBRDate('')).toBe(''));

    it('should return correct date and time with seconds', () => {
      const date = '2023-10-14T14:30:15';
      expect(dateToBRDate(date)).toBe('14/10/2023  14:30:15');
    });

    it('should return correct date and time without seconds', () => {
      const date = '2023-10-14T14:30:15';
      expect(dateToBRDate(date, false)).toBe('14/10/2023  14:30');
    });

    it('should return correct date without time', () => {
      const date = '2023-10-14T14:30:15';
      expect(dateToBRDate(date, true, false)).toBe('14/10/2023');
    });

    it('should handle edge cases for midnight correctly', () => {
      const date = '2023-10-14T00:59:59';
      expect(dateToBRDate(date)).toBe('14/10/2023  00:59:59');
      expect(dateToBRDate(date, false)).toBe('14/10/2023  00:59');
      expect(dateToBRDate(date, true, false)).toBe('14/10/2023');
    });

    it('should handle edge cases for noon correctly', () => {
      const date = '2023-10-14T12:00:00';
      expect(dateToBRDate(date)).toBe('14/10/2023  12:00:00');
      expect(dateToBRDate(date, false)).toBe('14/10/2023  12:00');
      expect(dateToBRDate(date, true, false)).toBe('14/10/2023');
    });

    describe('dateToJS', () => {
      it('should return the correct date in YYYY-MM-DD format', () => {
        const date = new Date(2023, 9, 14); // October 14, 2023
        const result = dateToJS(date);
        expect(result).toBe('2023-10-14');
      });

      it('should handle single-digit months and days correctly', () => {
        const date = new Date(2023, 0, 5); // January 5, 2023
        const result = dateToJS(date);
        expect(result).toBe('2023-01-05');
      });

      it('should handle edge cases for the end of the year', () => {
        const date = new Date(2023, 11, 31); // December 31, 2023
        const result = dateToJS(date);
        expect(result).toBe('2023-12-31');
      });

      it('should handle edge cases for the start of the year', () => {
        const date = new Date(2023, 0, 1); // January 1, 2023
        const result = dateToJS(date);
        expect(result).toBe('2023-01-01');
      });

      it('should handle leap years correctly', () => {
        const date = new Date(2024, 1, 29); // February 29, 2024 (leap year)
        const result = dateToJS(date);
        expect(result).toBe('2024-02-29');
      });
    });
  });
});

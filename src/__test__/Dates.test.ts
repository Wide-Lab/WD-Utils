import {
  dateToBRDate,
  daysInMonth,
  getFirstDayOfMonth,
  getLastDayNumberOfMonth,
  getLastDayPreviousMonth,
  getYesterday,
  isLeapYear,
  parseCSharpDate,
  toDate,
  toString,
  toTime,
} from '../Dates';

describe('utils/Date', () => {
  describe('toTime', () => {
    it('deve formatar a hora corretamente sem ocultar os segundos', () => {
      const date = new Date(2022, 0, 1, 14, 30, 15);
      expect(toTime(date)).toBe('14:30:15');
    });

    it('deve formatar a hora corretamente e ocultar os segundos', () => {
      const date = new Date(2022, 0, 1, 14, 30, 15);
      expect(toTime(date, true)).toBe('14:30');
    });

    it('deve lidar corretamente com horas, minutos e segundos de um dígito', () => {
      const date = new Date(2022, 0, 1, 8, 5, 7);
      expect(toTime(date)).toBe('08:05:07');
      expect(toTime(date, true)).toBe('08:05');
    });

    it('deve lidar corretamente com casos de meia-noite', () => {
      const date = new Date(2022, 0, 1, 0, 59, 59);
      expect(toTime(date)).toBe('00:59:59');
      expect(toTime(date, true)).toBe('00:59');
    });

    it('deve lidar corretamente com casos de meio-dia', () => {
      const date = new Date(2022, 0, 1, 12, 0, 0);
      expect(toTime(date)).toBe('12:00:00');
      expect(toTime(date, true)).toBe('12:00');
    });
  });

  describe('getYesterday', () => {
    it('deve retornar o dia anterior correto de 2021-02-25', () => {
      const mockDateObject = new Date('2021-02-26T02:42:16.652Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);
      const mocketYesterday = getYesterday();
      spy.mockRestore();
      expect(mocketYesterday).toBe('2021-02-25');
    });

    it('deve retornar o dia anterior correto de 2023-01-01', () => {
      const mockDateObject = new Date('2023-01-02T01:00:00.000Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);
      const mocketYesterday = getYesterday();
      spy.mockRestore();
      expect(mocketYesterday).toBe('2023-01-01');
    });

    it('deve retornar o dia anterior correto de 2020-02-28 (ano bissexto)', () => {
      const mockDateObject = new Date('2020-02-29T01:00:00.000Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);
      const mocketYesterday = getYesterday();
      spy.mockRestore();
      expect(mocketYesterday).toBe('2020-02-28');
    });

    it('deve retornar o dia anterior correto de 2021-03-01 (não bissexto)', () => {
      const mockDateObject = new Date('2021-03-01T01:00:00.000Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);
      const mocketYesterday = getYesterday();
      spy.mockRestore();
      expect(mocketYesterday).toBe('2021-02-28');
    });

    it('deve retornar o dia anterior correto de 2021-01-31', () => {
      const mockDateObject = new Date('2021-02-01T01:00:00.000Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);
      const mocketYesterday = getYesterday();
      spy.mockRestore();
      expect(mocketYesterday).toBe('2021-01-31');
    });

    it('deve retornar o dia anterior correto de 2021-12-31', () => {
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
    it('deve retornar o primeiro dia correto de 2021-02', () => {
      const mockDateObject = new Date('2021-02-26T02:42:16.652Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);
      const mocketYesterday = getFirstDayOfMonth();
      spy.mockRestore();
      expect(mocketYesterday).toBe('2021-02-01');
    });

    it('deve retornar o primeiro dia correto de 2023-01', () => {
      const mockDateObject = new Date('2023-01-14T01:00:00.000Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);
      const mocketYesterday = getFirstDayOfMonth();
      spy.mockRestore();
      expect(mocketYesterday).toBe('2023-01-01');
    });

    it('deve retornar o primeiro dia correto de 2021-03 (não bissexto)', () => {
      const mockDateObject = new Date('2021-03-12T01:00:00.000Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);
      const mocketYesterday = getFirstDayOfMonth();
      spy.mockRestore();
      expect(mocketYesterday).toBe('2021-03-01');
    });

    it('deve retornar o primeiro dia correto de 2021-12', () => {
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
    it('deve retornar o último dia correto de 2021-01', () => {
      const mockDateObject = new Date('2021-02-26T02:42:16.652Z');
      jest.useFakeTimers().setSystemTime(new Date(mockDateObject));
      const mocketYesterday = getLastDayPreviousMonth();
      expect(mocketYesterday).toBe('2021-01-31');
    });

    it('deve retornar o último dia correto de 2022-12', () => {
      const mockDateObject = new Date('2023-01-14T01:00:00.000Z');
      jest.useFakeTimers().setSystemTime(new Date(mockDateObject));
      const mocketYesterday = getLastDayPreviousMonth();
      expect(mocketYesterday).toBe('2022-12-31');
    });

    it('deve retornar o último dia correto de 2021-02 (não bissexto)', () => {
      const mockDateObject = new Date('2021-03-12T01:00:00.000Z');
      jest.useFakeTimers().setSystemTime(new Date(mockDateObject));
      const mocketYesterday = getLastDayPreviousMonth();
      expect(mocketYesterday).toBe('2021-02-28');
    });

    it('deve retornar o último dia correto de 2021-12', () => {
      const mockDateObject = new Date('2021-12-10T01:00:00.000Z');
      jest.useFakeTimers().setSystemTime(new Date(mockDateObject));
      const mocketYesterday = getLastDayPreviousMonth();
      expect(mocketYesterday).toBe('2021-11-30');
    });

    it('deve retornar o último dia correto de 2024-03', () => {
      const mockDateObject = new Date('2024-03-10T01:00:00.000Z');
      jest.useFakeTimers().setSystemTime(new Date(mockDateObject));
      const mocketYesterday = getLastDayPreviousMonth();
      expect(mocketYesterday).toBe('2024-02-29');
    });
  });

  describe('dateToBRDate', () => {
    it('deve retornar uma string vazia para uma entrada vazia', () =>
      expect(dateToBRDate('')).toBe(''));

    it('deve retornar a data e hora corretas com segundos', () => {
      const date = '2023-10-14T14:30:15';
      expect(dateToBRDate(date)).toBe('14/10/2023  14:30:15');
    });

    it('deve retornar a data e hora corretas sem segundos', () => {
      const date = '2023-10-14T14:30:15';
      expect(dateToBRDate(date, false)).toBe('14/10/2023  14:30');
    });

    it('deve retornar a data correta sem hora', () => {
      const date = '2023-10-14T14:30:15';
      expect(dateToBRDate(date, true, false)).toBe('14/10/2023');
    });

    it('deve lidar corretamente com casos de meia-noite', () => {
      const date = '2023-10-14T00:59:59';
      expect(dateToBRDate(date)).toBe('14/10/2023  00:59:59');
      expect(dateToBRDate(date, false)).toBe('14/10/2023  00:59');
      expect(dateToBRDate(date, true, false)).toBe('14/10/2023');
    });

    it('deve lidar corretamente com casos de meio-dia', () => {
      const date = '2023-10-14T12:00:00';
      expect(dateToBRDate(date)).toBe('14/10/2023  12:00:00');
      expect(dateToBRDate(date, false)).toBe('14/10/2023  12:00');
      expect(dateToBRDate(date, true, false)).toBe('14/10/2023');
    });
  });

  describe('toString', () => {
    describe('format to USA', () => {
      it('deve formatar a data no formato padrão JS (YYYY-MM-DD)', () => {
        const date = new Date(2023, 9, 14); // Outubro 14, 2023
        expect(toString(date)).toBe('2023-10-14');
      });

      it('deve formatar a data no formato USA (MM/DD/YYYY)', () => {
        const date = new Date(2023, 9, 14); // Outubro 14, 2023
        expect(toString(date, 'USA')).toBe('10/14/2023');
      });

      it('deve formatar a data no formato BR (DD/MM/YYYY)', () => {
        const date = new Date(2023, 9, 14); // Outubro 14, 2023
        expect(toString(date, 'BR')).toBe('14/10/2023');
      });

      it('deve formatar a data com hora no formato USA', () => {
        const date = new Date(2023, 9, 14, 14, 30, 45); // Outubro 14, 2023 14:30:45
        expect(toString(date, 'USA', true)).toBe('10/14/2023 14:30');
      });

      it('deve formatar a data com hora e segundos no formato USA', () => {
        const date = new Date(2023, 9, 14, 14, 30, 45); // Outubro 14, 2023 14:30:45
        expect(toString(date, 'USA', 'andSeconds')).toBe('10/14/2023 14:30:45');
      });

      it('deve lançar erro para data inválida', () => {
        const invalidDate = new Date('invalid');
        expect(() => toString(invalidDate)).toThrow('Data inválida');
      });

      it('deve lidar com meses e dias de um dígito no formato USA', () => {
        const date = new Date(2023, 0, 5); // Janeiro 5, 2023
        expect(toString(date, 'USA')).toBe('01/05/2023');
      });

      it('deve lidar com o final do ano no formato USA', () => {
        const date = new Date(2023, 11, 31); // Dezembro 31, 2023
        expect(toString(date, 'USA')).toBe('12/31/2023');
      });
    });

    describe('date to JS', () => {
      it('deve retornar a data correta no formato YYYY-MM-DD', () => {
        const date = new Date(2023, 9, 14);
        const result = toString(date);
        expect(result).toBe('2023-10-14');
      });

      it('deve lidar corretamente com meses e dias de um dígito', () => {
        const date = new Date(2023, 0, 5);
        const result = toString(date);
        expect(result).toBe('2023-01-05');
      });

      it('deve lidar corretamente com o final do ano', () => {
        const date = new Date(2023, 11, 31);
        const result = toString(date);
        expect(result).toBe('2023-12-31');
      });

      it('deve lidar corretamente com o início do ano', () => {
        const date = new Date(2023, 0, 1);
        const result = toString(date);
        expect(result).toBe('2023-01-01');
      });

      it('deve lidar corretamente com anos bissextos', () => {
        const date = new Date(2024, 1, 29);
        const result = toString(date);
        expect(result).toBe('2024-02-29');
      });
    });

    describe('date to JS with Time', () => {
      it('deve formatar a data com segundos', () => {
        const date = new Date(2023, 9, 14, 14, 30, 15);
        expect(toString(date, 'JS', 'andSeconds')).toBe('2023-10-14 14:30:15');
      });

      it('deve formatar a data sem segundos quando hideSecond for true', () => {
        const date = new Date(2023, 9, 14, 14, 30, 15);
        expect(toString(date, 'JS', true)).toBe('2023-10-14 14:30');
      });

      it('deve preencher horas, minutos e segundos de um dígito corretamente', () => {
        const date = new Date(2023, 0, 5, 8, 5, 7);
        expect(toString(date, 'JS', 'andSeconds')).toBe('2023-01-05 08:05:07');
        expect(toString(date, 'JS', true)).toBe('2023-01-05 08:05');
      });

      it('deve lidar corretamente com hora da meia-noite com e sem segundos', () => {
        const date = new Date(2023, 0, 1, 0, 0, 0);
        expect(toString(date, 'JS', 'andSeconds')).toBe('2023-01-01 00:00:00');
        expect(toString(date, 'JS', true)).toBe('2023-01-01 00:00');
      });

      it('deve lidar corretamente com hora do meio-dia com e sem segundos', () => {
        const date = new Date(2023, 0, 1, 12, 0, 12);
        expect(toString(date, 'JS', 'andSeconds')).toBe('2023-01-01 12:00:12');
        expect(toString(date, 'JS', true)).toBe('2023-01-01 12:00');
      });

      it('deve lidar corretamente com hora próxima da meia-noite com e sem segundos', () => {
        const date = new Date(2023, 0, 1, 23, 59, 59);
        expect(toString(date, 'JS', 'andSeconds')).toBe('2023-01-01 23:59:59');
        expect(toString(date, 'JS', true)).toBe('2023-01-01 23:59');
      });
    });

    describe('date to BR', () => {
      it('deve formatar corretamente uma data válida', () => {
        const date = new Date(2025, 10, 10); // 10 de novembro de 2025
        expect(toString(date, 'BR')).toBe('10/11/2025');
      });

      it('deve adicionar zeros à esquerda em dias e meses menores que 10', () => {
        const date = new Date(2025, 0, 5); // 5 de janeiro de 2025
        expect(toString(date, 'BR')).toBe('05/01/2025');
      });

      it('deve formatar corretamente o último dia do ano', () => {
        const date = new Date(2025, 11, 31); // 31 de dezembro de 2025
        expect(toString(date, 'BR')).toBe('31/12/2025');
      });

      it('deve lançar erro para data inválida (new Date("invalid"))', () => {
        const invalidDate = new Date('invalid');
        expect(() => toString(invalidDate, 'BR')).toThrow('Data inválida');
      });

      it('deve funcionar corretamente com datas antigas', () => {
        const date = new Date(1999, 11, 31);
        expect(toString(date, 'BR')).toBe('31/12/1999');
      });

      it('deve funcionar corretamente com datas futuras', () => {
        const date = new Date(2100, 0, 1);
        expect(toString(date, 'BR')).toBe('01/01/2100');
      });

      it('deve retornar o mesmo valor para objetos Date clonados', () => {
        const original = new Date(2024, 6, 15);
        const clone = new Date(original.getTime());
        expect(toString(original, 'BR')).toBe(toString(clone, 'BR'));
      });
    });
  });

  describe('getLastDayOfMonth', () => {
    it('deve retornar "31" para dezembro de 2023', () => {
      expect(getLastDayNumberOfMonth(2023, 12)).toBe('31');
    });

    it('deve retornar "29" para fevereiro de 2024 (ano bissexto)', () => {
      expect(getLastDayNumberOfMonth(2024, 2)).toBe('29');
    });

    it('deve retornar "28" para fevereiro de 2023 (não bissexto)', () => {
      expect(getLastDayNumberOfMonth(2023, 2)).toBe('28');
    });

    it('deve retornar "30" para abril de 2023', () => {
      expect(getLastDayNumberOfMonth(2023, 4)).toBe('30');
    });

    it('deve retornar "31" para julho de 2023', () => {
      expect(getLastDayNumberOfMonth(2023, 7)).toBe('31');
    });

    it('deve preencher dias de um dígito com zero à esquerda', () => {
      expect(getLastDayNumberOfMonth(2021, 2)).toBe('28');
      expect(getLastDayNumberOfMonth(2021, 4)).toBe('30');
    });

    it('deve lidar com valores de mês maiores que 12 (ex: 13)', () => {
      expect(getLastDayNumberOfMonth(2023, 13)).toBe('31');
    });

    it('deve lidar com valor de mês 1 (janeiro)', () => {
      expect(getLastDayNumberOfMonth(2023, 1)).toBe('31');
    });

    it('deve lidar com valor de mês 0 (dezembro do ano anterior)', () => {
      expect(getLastDayNumberOfMonth(2023, 0)).toBe('31');
    });
  });

  describe('parseCSharpDate', () => {
    it('deve converter data com offset negativo (-0300)', () => {
      const input = '/Date(1731320280000-0300)/';
      const result = parseCSharpDate(input);

      const expected = new Date(1731320280000 + 3 * 60 * 60 * 1000); // +3h no UTC
      expect(result.getTime()).toBe(expected.getTime());
    });

    it('deve converter data com offset positivo (+0200)', () => {
      const input = '/Date(1731320280000+0200)/';
      const result = parseCSharpDate(input);

      const expected = new Date(1731320280000 - 2 * 60 * 60 * 1000); // -2h no UTC
      expect(result.getTime()).toBe(expected.getTime());
    });

    it('deve converter corretamente quando o offset possui minutos (ex: -0330)', () => {
      const input = '/Date(1731320280000-0330)/';
      const result = parseCSharpDate(input);

      const expected = new Date(1731320280000 + (3 * 60 + 30) * 60 * 1000); // +3h30 UTC
      expect(result.getTime()).toBe(expected.getTime());
    });

    it('deve converter corretamente quando o offset possui minutos positivos (+0545)', () => {
      const input = '/Date(1731320280000+0545)/';
      const result = parseCSharpDate(input);

      const expected = new Date(1731320280000 - (5 * 60 + 45) * 60 * 1000); // -5h45 UTC
      expect(result.getTime()).toBe(expected.getTime());
    });

    it('deve lidar com timestamp zero corretamente', () => {
      const input = '/Date(0-0000)/';
      const result = parseCSharpDate(input);

      const expected = new Date(0);
      expect(result.getTime()).toBe(expected.getTime());
    });

    it('deve aceitar offset +0000 e não alterar o valor', () => {
      const input = '/Date(1731320280000+0000)/';
      const result = parseCSharpDate(input);

      const expected = new Date(1731320280000);
      expect(result.getTime()).toBe(expected.getTime());
    });

    it('deve lançar erro quando o formato for inválido', () => {
      const invalidInputs = [
        '/Date(ABC)/',
        '/Date(1731320280000)/', // sem offset
        '/Date(1731320280000-030)/', // offset inválido (3 dígitos)
        '1731320280000-0300',
        '/Date1731320280000-0300/',
        '',
        null as any,
        undefined as any,
      ];

      invalidInputs.forEach((value) => {
        expect(() => parseCSharpDate(value)).toThrow(
          /Formato de data inválido/i,
        );
      });
    });

    it('deve converter corretamente valores muito grandes', () => {
      const input = '/Date(9999999999999-0200)/';
      const result = parseCSharpDate(input);

      const expected = new Date(9999999999999 + 2 * 60 * 60 * 1000);

      expect(result.getTime()).toBe(expected.getTime());
    });
  });

  describe('toDate', () => {
    /**
     * Datas válidas no formato JS (YYYY-MM-DD)
     */
    describe('Formato JS', () => {
      it('deve converter uma data válida', () => {
        const date = toDate('2023-12-31');
        expect(date).toEqual(new Date(2023, 11, 31));
      });

      it('deve aceitar ano bissexto em 29/02', () => {
        const date = toDate('2024-02-29');
        expect(date).toEqual(new Date(2024, 1, 29));
      });

      it('deve lançar erro para 29/02 em ano não bissexto', () => {
        expect(() => toDate('2023-02-29')).toThrow('Data inválida');
      });

      it('deve lançar erro para mês zero', () => {
        expect(() => toDate('2023-00-10')).toThrow('Data inválida');
      });

      it('deve lançar erro para mês maior que 12', () => {
        expect(() => toDate('2023-13-10')).toThrow('Data inválida');
      });

      it('deve lançar erro para dia zero', () => {
        expect(() => toDate('2023-01-00')).toThrow('Data inválida');
      });

      it('deve lançar erro para dia maior que o permitido no mês', () => {
        expect(() => toDate('2023-04-31')).toThrow('Data inválida');
      });

      it('deve lançar erro para formato incompleto', () => {
        expect(() => toDate('2023-12')).toThrow('Data inválida');
      });

      it('deve converter corretamente 1º de Janeiro', () => {
        const date = toDate('2023-01-01');
        expect(date).toEqual(new Date(2023, 0, 1));
      });

      it('deve converter corretamente Janeiro no fim do mês', () => {
        const date = toDate('2023-01-31');
        expect(date).toEqual(new Date(2023, 0, 31));
      });

      it('deve converter corretamente uma data intermediária em Janeiro', () => {
        const date = toDate('2024-01-15');
        expect(date).toEqual(new Date(2024, 0, 15));
      });
    });

    /**
     * Datas válidas no formato BR (DD/MM/YYYY)
     */
    describe('Formato BR', () => {
      it('deve converter uma data válida', () => {
        const date = toDate('31/12/2023', 'BR');
        expect(date).toEqual(new Date(2023, 11, 31));
      });

      it('deve lançar erro para dia inválido', () => {
        expect(() => toDate('32/01/2023', 'BR')).toThrow('Data inválida');
      });

      it('deve lançar erro para mês inválido', () => {
        expect(() => toDate('10/13/2023', 'BR')).toThrow('Data inválida');
      });

      it('deve lançar erro para fevereiro inválido em ano não bissexto', () => {
        expect(() => toDate('29/02/2021', 'BR')).toThrow('Data inválida');
      });

      it('deve lançar erro para mês zero', () => {
        expect(() => toDate('10/00/2023', 'BR')).toThrow('Data inválida');
      });

      it('deve lançar erro para dia maior que 31', () => {
        expect(() => toDate('35/01/2023', 'BR')).toThrow('Data inválida');
      });

      it('deve lançar erro para separador incorreto', () => {
        expect(() => toDate('10-01-2023', 'BR')).toThrow('Data inválida');
      });

      it('deve lançar erro para valor parcial', () => {
        expect(() => toDate('10/01', 'BR')).toThrow('Data inválida');
      });

      it('deve converter corretamente 01/01/YYYY', () => {
        const date = toDate('01/01/2023', 'BR');
        expect(date).toEqual(new Date(2023, 0, 1));
      });

      it('deve converter corretamente final de Janeiro', () => {
        const date = toDate('31/01/2023', 'BR');
        expect(date).toEqual(new Date(2023, 0, 31));
      });

      it('deve converter corretamente Janeiro em ano bissexto', () => {
        const date = toDate('10/01/2024', 'BR');
        expect(date).toEqual(new Date(2024, 0, 10));
      });
    });

    /**
     * Datas válidas no formato USA (MM/DD/YYYY)
     */
    describe('Formato USA', () => {
      it('deve converter uma data válida', () => {
        const date = toDate('12/31/2023', 'USA');
        expect(date).toEqual(new Date(2023, 11, 31));
      });

      it('deve lançar erro para fevereiro inválido', () => {
        expect(() => toDate('02/30/2024', 'USA')).toThrow('Data inválida');
      });

      it('deve lançar erro para mês inválido', () => {
        expect(() => toDate('13/10/2023', 'USA')).toThrow('Data inválida');
      });

      it('deve lançar erro para dia inválido', () => {
        expect(() => toDate('01/32/2023', 'USA')).toThrow('Data inválida');
      });

      it('deve lançar erro para abril com 31 dias', () => {
        expect(() => toDate('04/31/2023', 'USA')).toThrow('Data inválida');
      });

      it('deve lançar erro para ano não numérico', () => {
        expect(() => toDate('12/10/AAAA', 'USA')).toThrow('Data inválida');
      });

      it('deve lançar erro para formato incorreto', () => {
        expect(() => toDate('12-10-2023', 'USA')).toThrow('Data inválida');
      });

      it('deve converter corretamente 01/01/YYYY', () => {
        const date = toDate('01/01/2023', 'USA');
        expect(date).toEqual(new Date(2023, 0, 1));
      });

      it('deve converter corretamente Janeiro no último dia', () => {
        const date = toDate('01/31/2023', 'USA');
        expect(date).toEqual(new Date(2023, 0, 31));
      });

      it('deve converter corretamente uma data comum em Janeiro', () => {
        const date = toDate('01/20/2025', 'USA');
        expect(date).toEqual(new Date(2025, 0, 20));
      });
    });

    /**
     * Validações gerais
     */
    describe('Validações gerais', () => {
      it('deve lançar erro para string vazia', () => {
        expect(() => toDate('')).toThrow('Data inválida');
      });

      it('deve lançar erro para formato incorreto', () => {
        expect(() => toDate('2023/12/31')).toThrow('Data inválida');
      });

      it('deve lançar erro para valores não numéricos', () => {
        expect(() => toDate('AA/BB/CCCC', 'BR')).toThrow('Data inválida');
      });

      it('deve lançar erro para ano menor que 1', () => {
        expect(() => toDate('00/01/0000', 'BR')).toThrow('Data inválida');
      });

      it('Janeiro deve sempre resultar em month === 0', () => {
        const dateJS = toDate('2023-01-10');
        const dateBR = toDate('10/01/2023', 'BR');
        const dateUSA = toDate('01/10/2023', 'USA');

        expect(dateJS.getMonth()).toBe(0);
        expect(dateBR.getMonth()).toBe(0);
        expect(dateUSA.getMonth()).toBe(0);
      });
    });
  });

  describe('isLeapYear', () => {
    it('deve retornar true para anos divisíveis por 4', () => {
      expect(isLeapYear(2024)).toBe(true);
      expect(isLeapYear(2020)).toBe(true);
    });

    it('deve retornar false para anos não divisíveis por 4', () => {
      expect(isLeapYear(2023)).toBe(false);
      expect(isLeapYear(2019)).toBe(false);
    });

    it('deve retornar false para anos divisíveis por 100 mas não por 400', () => {
      expect(isLeapYear(1900)).toBe(false);
      expect(isLeapYear(2100)).toBe(false);
    });

    it('deve retornar true para anos divisíveis por 400', () => {
      expect(isLeapYear(2000)).toBe(true);
      expect(isLeapYear(2400)).toBe(true);
    });

    it('deve funcionar corretamente para anos antigos', () => {
      expect(isLeapYear(1600)).toBe(true);
      expect(isLeapYear(1700)).toBe(false);
    });

    it('deve retornar false para ano zero ou negativos', () => {
      expect(isLeapYear(0)).toBe(false);
      expect(isLeapYear(-4)).toBe(false);
    });
  });

  describe('daysInMonth', () => {
    /**
     * Fevereiro
     */
    describe('Fevereiro (mês 2)', () => {
      it('deve retornar 29 dias para ano bissexto', () => {
        expect(daysInMonth(2, 2024)).toBe(29);
        expect(daysInMonth(2, 2000)).toBe(29);
      });

      it('deve retornar 28 dias para ano não bissexto', () => {
        expect(daysInMonth(2, 2023)).toBe(28);
        expect(daysInMonth(2, 1900)).toBe(28);
      });
    });

    /**
     * Meses com 30 dias
     */
    describe('Meses com 30 dias', () => {
      it('deve retornar 30 dias para Abril (4)', () => {
        expect(daysInMonth(4, 2023)).toBe(30);
      });

      it('deve retornar 30 dias para Junho (6)', () => {
        expect(daysInMonth(6, 2023)).toBe(30);
      });

      it('deve retornar 30 dias para Setembro (9)', () => {
        expect(daysInMonth(9, 2023)).toBe(30);
      });

      it('deve retornar 30 dias para Novembro (11)', () => {
        expect(daysInMonth(11, 2023)).toBe(30);
      });
    });

    /**
     * Meses com 31 dias
     */
    describe('Meses com 31 dias', () => {
      it('deve retornar 31 dias para Janeiro (1)', () => {
        expect(daysInMonth(1, 2023)).toBe(31);
      });

      it('deve retornar 31 dias para Março (3)', () => {
        expect(daysInMonth(3, 2023)).toBe(31);
      });

      it('deve retornar 31 dias para Maio (5)', () => {
        expect(daysInMonth(5, 2023)).toBe(31);
      });

      it('deve retornar 31 dias para Julho (7)', () => {
        expect(daysInMonth(7, 2023)).toBe(31);
      });

      it('deve retornar 31 dias para Agosto (8)', () => {
        expect(daysInMonth(8, 2023)).toBe(31);
      });

      it('deve retornar 31 dias para Outubro (10)', () => {
        expect(daysInMonth(10, 2023)).toBe(31);
      });

      it('deve retornar 31 dias para Dezembro (12)', () => {
        expect(daysInMonth(12, 2023)).toBe(31);
      });
    });

    /**
     * Casos de borda
     */
    describe('Casos de borda', () => {
      it('deve retornar 31 dias para mês inválido (0)', () => {
        expect(daysInMonth(0, 2023)).toBe(31);
      });

      it('deve retornar 31 dias para mês inválido (>12)', () => {
        expect(daysInMonth(13, 2023)).toBe(31);
      });

      it('deve funcionar corretamente mesmo com ano inválido', () => {
        expect(daysInMonth(2, 0)).toBe(28);
        expect(daysInMonth(2, -2023)).toBe(28);
      });
    });
  });
});

console.log(toString(new Date(), 'BR'));

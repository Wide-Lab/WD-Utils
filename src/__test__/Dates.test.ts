import {
  dateBRToJS,
  dateToBR,
  dateToBRDate,
  dateToDateTime,
  dateToJS,
  dateToTime,
  dateUSAtoBR,
  formatDate,
  formatDateToBR,
  getFirstDayOfMonth,
  getLastDayNumberOfMonth,
  getLastDayPreviousMonth,
  getNowTime,
  getToday,
  getTodayBR,
  getYesterday,
  parseCSharpDate,
} from '../Dates';

describe('utils/Date', () => {
  describe('dateUSAtoBR', () => {
    it('deve retornar uma string vazia para uma entrada vazia', () =>
      expect(dateUSAtoBR('')).toBe(''));

    it('09/22/2023 -> 22/09/2023', () =>
      expect(dateUSAtoBR('09/22/2023')).toBe('22/09/2023'));

    describe('Deve lançar um erro', () => {
      it('Inválido sem barra 09222023', () =>
        expect(() => dateUSAtoBR('09222023')).toThrow(`Invalid date 09222023`));
      it('Sem ano 09/22', () =>
        expect(() => dateUSAtoBR('09/22')).toThrow(`Invalid date 09/22`));
      it('Sem ano com barra 09/22/', () =>
        expect(() => dateUSAtoBR('09/22/')).toThrow(`Invalid date 09/22/`));
      it('Sem mês 22/2023', () =>
        expect(() => dateUSAtoBR('22/2023')).toThrow(`Invalid date 22/2023`));
      it('Sem mês com barra /22/2023', () =>
        expect(() => dateUSAtoBR('/22/2023')).toThrow(`Invalid date /22/2023`));
    });
  });

  describe('dateToBR', () => {
    it('deve retornar uma string vazia para uma entrada vazia', () =>
      expect(dateToBR('')).toBe(''));

    it('2023-10-14 -> 14/10/2023', () =>
      expect(dateToBR('2023-10-14')).toBe('14/10/2023'));
    it('2023-10-09 -> 09/10/2023', () =>
      expect(dateToBR('2023-10-09')).toBe('09/10/2023'));
    it('2023-12-31 -> 31/12/2023', () =>
      expect(dateToBR('2023-12-31')).toBe('31/12/2023'));

    it('2023-12-3 => 03/12/2023', () =>
      expect(dateToBR('2023-12-3')).toBe('03/12/2023'));

    describe('Deve retornar vazio para datas incompletas', () => {
      it('2023-12', () => expect(dateToBR('2023-12')).toBe(''));
      it('2023-1', () => expect(dateToBR('2023-1')).toBe(''));
      it('2023', () => expect(dateToBR('2023')).toBe(''));
      it('202', () => expect(dateToBR('202')).toBe(''));
    });
  });

  describe('dateBRToJS', () => {
    it('deve retornar uma string vazia para uma entrada vazia', () =>
      expect(dateBRToJS('')).toBe(''));

    describe('Datas inválidas', () => {
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
    it('deve formatar a hora corretamente sem ocultar os segundos', () => {
      const date = new Date(2022, 0, 1, 14, 30, 15);
      expect(dateToTime(date)).toBe('14:30:15');
    });

    it('deve formatar a hora corretamente e ocultar os segundos', () => {
      const date = new Date(2022, 0, 1, 14, 30, 15);
      expect(dateToTime(date, true)).toBe('14:30');
    });

    it('deve lidar corretamente com horas, minutos e segundos de um dígito', () => {
      const date = new Date(2022, 0, 1, 8, 5, 7);
      expect(dateToTime(date)).toBe('08:05:07');
      expect(dateToTime(date, true)).toBe('08:05');
    });

    it('deve lidar corretamente com casos de meia-noite', () => {
      const date = new Date(2022, 0, 1, 0, 59, 59);
      expect(dateToTime(date)).toBe('00:59:59');
      expect(dateToTime(date, true)).toBe('00:59');
    });

    it('deve lidar corretamente com casos de meio-dia', () => {
      const date = new Date(2022, 0, 1, 12, 0, 0);
      expect(dateToTime(date)).toBe('12:00:00');
      expect(dateToTime(date, true)).toBe('12:00');
    });
  });

  describe('getToday', () => {
    it('deve retornar o dia atual correto de 2021-02-26', () => {
      const mockDateObject = new Date('2021-02-26T22:42:16.652Z');
      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDateObject);
      const mocketToday = getToday();
      spy.mockRestore();
      expect(mocketToday).toBe('2021-02-26');
    });

    it('deve retornar o dia atual correto de 2023-01-31', () => {
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

  describe('formatDate', () => {
    describe('format to USA', () => {
      it('deve formatar a data no formato padrão JS (YYYY-MM-DD)', () => {
        const date = new Date(2023, 9, 14); // Outubro 14, 2023
        expect(formatDate(date)).toBe('2023-10-14');
      });

      it('deve formatar a data no formato USA (MM/DD/YYYY)', () => {
        const date = new Date(2023, 9, 14); // Outubro 14, 2023
        expect(formatDate(date, 'USA')).toBe('10/14/2023');
      });

      it('deve formatar a data no formato BR (DD/MM/YYYY)', () => {
        const date = new Date(2023, 9, 14); // Outubro 14, 2023
        expect(formatDate(date, 'BR')).toBe('14/10/2023');
      });

      it('deve formatar a data com hora no formato USA', () => {
        const date = new Date(2023, 9, 14, 14, 30, 45); // Outubro 14, 2023 14:30:45
        expect(formatDate(date, 'USA', true)).toBe('10/14/2023 14:30');
      });

      it('deve formatar a data com hora e segundos no formato USA', () => {
        const date = new Date(2023, 9, 14, 14, 30, 45); // Outubro 14, 2023 14:30:45
        expect(formatDate(date, 'USA', 'andSeconds')).toBe(
          '10/14/2023 14:30:45',
        );
      });

      it('deve lançar erro para data inválida', () => {
        const invalidDate = new Date('invalid');
        expect(() => formatDate(invalidDate)).toThrow('Data inválida');
      });

      it('deve lidar com meses e dias de um dígito no formato USA', () => {
        const date = new Date(2023, 0, 5); // Janeiro 5, 2023
        expect(formatDate(date, 'USA')).toBe('01/05/2023');
      });

      it('deve lidar com o final do ano no formato USA', () => {
        const date = new Date(2023, 11, 31); // Dezembro 31, 2023
        expect(formatDate(date, 'USA')).toBe('12/31/2023');
      });
    });

    describe('date to JS', () => {
      it('deve retornar a data correta no formato YYYY-MM-DD', () => {
        const date = new Date(2023, 9, 14);
        const result = formatDate(date);
        expect(result).toBe('2023-10-14');
      });

      it('deve lidar corretamente com meses e dias de um dígito', () => {
        const date = new Date(2023, 0, 5);
        const result = formatDate(date);
        expect(result).toBe('2023-01-05');
      });

      it('deve lidar corretamente com o final do ano', () => {
        const date = new Date(2023, 11, 31);
        const result = formatDate(date);
        expect(result).toBe('2023-12-31');
      });

      it('deve lidar corretamente com o início do ano', () => {
        const date = new Date(2023, 0, 1);
        const result = formatDate(date);
        expect(result).toBe('2023-01-01');
      });

      it('deve lidar corretamente com anos bissextos', () => {
        const date = new Date(2024, 1, 29);
        const result = formatDate(date);
        expect(result).toBe('2024-02-29');
      });
    });

    describe('date to JS with Time', () => {
      it('deve formatar a data com segundos', () => {
        const date = new Date(2023, 9, 14, 14, 30, 15);
        expect(formatDate(date, 'JS', 'andSeconds')).toBe(
          '2023-10-14 14:30:15',
        );
      });

      it('deve formatar a data sem segundos quando hideSecond for true', () => {
        const date = new Date(2023, 9, 14, 14, 30, 15);
        expect(formatDate(date, 'JS', true)).toBe('2023-10-14 14:30');
      });

      it('deve preencher horas, minutos e segundos de um dígito corretamente', () => {
        const date = new Date(2023, 0, 5, 8, 5, 7);
        expect(formatDate(date, 'JS', 'andSeconds')).toBe(
          '2023-01-05 08:05:07',
        );
        expect(formatDate(date, 'JS', true)).toBe('2023-01-05 08:05');
      });

      it('deve lidar corretamente com hora da meia-noite com e sem segundos', () => {
        const date = new Date(2023, 0, 1, 0, 0, 0);
        expect(formatDate(date, 'JS', 'andSeconds')).toBe(
          '2023-01-01 00:00:00',
        );
        expect(formatDate(date, 'JS', true)).toBe('2023-01-01 00:00');
      });

      it('deve lidar corretamente com hora do meio-dia com e sem segundos', () => {
        const date = new Date(2023, 0, 1, 12, 0, 12);
        expect(formatDate(date, 'JS', 'andSeconds')).toBe(
          '2023-01-01 12:00:12',
        );
        expect(formatDate(date, 'JS', true)).toBe('2023-01-01 12:00');
      });

      it('deve lidar corretamente com hora próxima da meia-noite com e sem segundos', () => {
        const date = new Date(2023, 0, 1, 23, 59, 59);
        expect(formatDate(date, 'JS', 'andSeconds')).toBe(
          '2023-01-01 23:59:59',
        );
        expect(formatDate(date, 'JS', true)).toBe('2023-01-01 23:59');
      });
    });

    describe('date to BR', () => {
      it('deve formatar corretamente uma data válida', () => {
        const date = new Date(2025, 10, 10); // 10 de novembro de 2025
        expect(formatDate(date, 'BR')).toBe('10/11/2025');
      });

      it('deve adicionar zeros à esquerda em dias e meses menores que 10', () => {
        const date = new Date(2025, 0, 5); // 5 de janeiro de 2025
        expect(formatDate(date, 'BR')).toBe('05/01/2025');
      });

      it('deve formatar corretamente o último dia do ano', () => {
        const date = new Date(2025, 11, 31); // 31 de dezembro de 2025
        expect(formatDate(date, 'BR')).toBe('31/12/2025');
      });

      it('deve lançar erro para data inválida (new Date("invalid"))', () => {
        const invalidDate = new Date('invalid');
        expect(() => formatDate(invalidDate, 'BR')).toThrow('Data inválida');
      });

      it('deve funcionar corretamente com datas antigas', () => {
        const date = new Date(1999, 11, 31);
        expect(formatDate(date, 'BR')).toBe('31/12/1999');
      });

      it('deve funcionar corretamente com datas futuras', () => {
        const date = new Date(2100, 0, 1);
        expect(formatDate(date, 'BR')).toBe('01/01/2100');
      });

      it('deve retornar o mesmo valor para objetos Date clonados', () => {
        const original = new Date(2024, 6, 15);
        const clone = new Date(original.getTime());
        expect(formatDate(original, 'BR')).toBe(formatDate(clone, 'BR'));
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

  describe('getTodayBR', () => {
    it('deve retornar a data atual no formato brasileiro', () => {
      const mockDate = new Date('2023-10-14T12:00:00Z');

      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDate as any);

      expect(getTodayBR()).toBe('14/10/2023');

      spy.mockRestore();
    });

    it('deve lidar corretamente com meses e dias de um dígito', () => {
      const mockDate = new Date('2023-01-05T04:00:00Z');

      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDate as any);

      expect(getTodayBR()).toBe('05/01/2023');

      spy.mockRestore();
    });
  });

  describe('getNowTime', () => {
    it('deve retornar a hora atual no formato HH:MM', () => {
      const mockDate = new Date(2023, 0, 1, 14, 5, 30);

      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDate as any);

      expect(getNowTime()).toBe('14:05');

      spy.mockRestore();
    });

    it('deve preencher zeros corretamente em horas/minutos de um dígito', () => {
      const mockDate = new Date(2023, 0, 1, 8, 3, 9);

      const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDate as any);

      expect(getNowTime()).toBe('08:03');

      spy.mockRestore();
    });
  });
});

// TODO Remover essses testes futuramente
describe('deprecated utils/Date', () => {
  describe('dateToJS', () => {
    it('deve retornar a data correta no formato YYYY-MM-DD', () => {
      const date = new Date(2023, 9, 14);
      const result = dateToJS(date);
      expect(result).toBe('2023-10-14');
    });

    it('deve lidar corretamente com meses e dias de um dígito', () => {
      const date = new Date(2023, 0, 5);
      const result = dateToJS(date);
      expect(result).toBe('2023-01-05');
    });

    it('deve lidar corretamente com o final do ano', () => {
      const date = new Date(2023, 11, 31);
      const result = dateToJS(date);
      expect(result).toBe('2023-12-31');
    });

    it('deve lidar corretamente com o início do ano', () => {
      const date = new Date(2023, 0, 1);
      const result = dateToJS(date);
      expect(result).toBe('2023-01-01');
    });

    it('deve lidar corretamente com anos bissextos', () => {
      const date = new Date(2024, 1, 29);
      const result = dateToJS(date);
      expect(result).toBe('2024-02-29');
    });
  });

  describe('dateToDateTime', () => {
    it('deve formatar a data com segundos', () => {
      const date = new Date(2023, 9, 14, 14, 30, 15);
      expect(dateToDateTime(date)).toBe('2023-10-14 14:30:15');
    });

    it('deve formatar a data sem segundos quando hideSecond for true', () => {
      const date = new Date(2023, 9, 14, 14, 30, 15);
      expect(dateToDateTime(date, true)).toBe('2023-10-14 14:30');
    });

    it('deve preencher horas, minutos e segundos de um dígito corretamente', () => {
      const date = new Date(2023, 0, 5, 8, 5, 7);
      expect(dateToDateTime(date)).toBe('2023-01-05 08:05:07');
      expect(dateToDateTime(date, true)).toBe('2023-01-05 08:05');
    });

    it('deve lidar corretamente com hora da meia-noite com e sem segundos', () => {
      const date = new Date(2023, 0, 1, 0, 0, 0);
      expect(dateToDateTime(date)).toBe('2023-01-01 00:00:00');
      expect(dateToDateTime(date, true)).toBe('2023-01-01 00:00');
    });

    it('deve lidar corretamente com hora do meio-dia com e sem segundos', () => {
      const date = new Date(2023, 0, 1, 12, 0, 12);
      expect(dateToDateTime(date)).toBe('2023-01-01 12:00:12');
      expect(dateToDateTime(date, true)).toBe('2023-01-01 12:00');
    });

    it('deve lidar corretamente com hora próxima da meia-noite com e sem segundos', () => {
      const date = new Date(2023, 0, 1, 23, 59, 59);
      expect(dateToDateTime(date)).toBe('2023-01-01 23:59:59');
      expect(dateToDateTime(date, true)).toBe('2023-01-01 23:59');
    });
  });

  describe('formatDateToBR', () => {
    it('deve formatar corretamente uma data válida', () => {
      const date = new Date(2025, 10, 10); // 10 de novembro de 2025
      expect(formatDateToBR(date)).toBe('10/11/2025');
    });

    it('deve adicionar zeros à esquerda em dias e meses menores que 10', () => {
      const date = new Date(2025, 0, 5); // 5 de janeiro de 2025
      expect(formatDateToBR(date)).toBe('05/01/2025');
    });

    it('deve formatar corretamente o último dia do ano', () => {
      const date = new Date(2025, 11, 31); // 31 de dezembro de 2025
      expect(formatDateToBR(date)).toBe('31/12/2025');
    });

    it('deve lançar erro para data inválida (new Date("invalid"))', () => {
      const invalidDate = new Date('invalid');
      expect(() => formatDateToBR(invalidDate)).toThrow('Data inválida');
    });

    it('deve funcionar corretamente com datas antigas', () => {
      const date = new Date(1999, 11, 31);
      expect(formatDateToBR(date)).toBe('31/12/1999');
    });

    it('deve funcionar corretamente com datas futuras', () => {
      const date = new Date(2100, 0, 1);
      expect(formatDateToBR(date)).toBe('01/01/2100');
    });

    it('deve retornar o mesmo valor para objetos Date clonados', () => {
      const original = new Date(2024, 6, 15);
      const clone = new Date(original.getTime());
      expect(formatDateToBR(original)).toBe(formatDateToBR(clone));
    });
  });
});

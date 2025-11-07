import {
  formatCEP,
  formatCNPJ,
  formatCPF,
  formatCurrency,
  formatDate,
  formatDateTime,
  formatHourMinute,
  formatPhone,
} from '../Formatters';

describe('utils/Masks', () => {
  describe('formatCPF', () => {
    it('deve formatar um CPF com entrada válida', () => {
      expect(formatCPF('39633061067')).toBe('396.330.610-67');
      expect(formatCPF('53512417060')).toBe('535.124.170-60');
      expect(formatCPF('577566160')).toBe('577.566.160');
      expect(formatCPF('764984')).toBe('764.984');
    });

    it('deve lidar com entradas ausentes e vazias', () => {
      expect(formatCPF('')).toBe('');
      expect(formatCPF()).toBe('');
    });
  });

  describe('formatCNPJ', () => {
    it('deve formatar um CNPJ com entrada válida', () => {
      expect(formatCNPJ('89748855000109')).toBe('89.748.855/0001-09');
      expect(formatCNPJ('7529905100016')).toBe('75.299.051/0001-6');
      expect(formatCNPJ('913965870001')).toBe('91.396.587/0001');
      expect(formatCNPJ('47506157')).toBe('47.506.157');
      expect(formatCNPJ('78359')).toBe('78.359');
    });

    it('deve lidar com entradas ausentes e vazias', () => {
      expect(formatCNPJ('')).toBe('');
      expect(formatCNPJ()).toBe('');
    });
  });

  describe('formatCEP', () => {
    it('deve formatar um CEP com entrada válida', () => {
      expect(formatCEP('29130278')).toBe('29130-278');
      expect(formatCEP('7169305')).toBe('71693-05');
      expect(formatCEP('693084')).toBe('69308-4');
      expect(formatCEP('40352')).toBe('40352');
    });

    it('deve lidar com entradas ausentes e vazias', () => {
      expect(formatCEP('')).toBe('');
      expect(formatCEP()).toBe('');
    });
  });

  describe('formatDate', () => {
    it('deve formatar uma data com entrada válida', () => {
      expect(formatDate('03021999')).toBe('03/02/1999');
      expect(formatDate('2301202')).toBe('23/01/202');
      expect(formatDate('300320')).toBe('30/03/20');
      expect(formatDate('28022')).toBe('28/02/2');
      expect(formatDate('1504')).toBe('15/04');
    });

    it('deve lidar com entradas ausentes e vazias', () => {
      expect(formatDate('')).toBe('');
      expect(formatDate()).toBe('');
    });

    it('deve formatar um objeto Date do JavaScript', () => {
      const date = new Date(1687804798229);
      expect(formatDate(date)).toBe('26/06/2023');
    });
  });

  describe('formatPhone', () => {
    it('deve formatar um número de telefone com entrada válida', () => {
      expect(formatPhone('62994920570')).toBe('(62) 99492-0570');
      expect(formatPhone('6892566033')).toBe('(68) 9256-6033');
      expect(formatPhone('499916339')).toBe('(49) 9916-339');
    });

    it('deve lidar com entradas ausentes e vazias', () => {
      expect(formatPhone('')).toBe('');
      expect(formatPhone()).toBe('');
    });
  });

  describe('formatHourMinute', () => {
    it('deve formatar um horário com entrada válida', () => {
      expect(formatHourMinute('1234')).toBe('12:34');
      expect(formatHourMinute('0830')).toBe('08:30');
      expect(formatHourMinute('2359')).toBe('23:59');
      expect(formatHourMinute('0715')).toBe('07:15');
    });

    it('deve lidar com entrada contendo caracteres não numéricos', () => {
      expect(formatHourMinute('12a34')).toBe('12:34');
      expect(formatHourMinute('08:30')).toBe('08:30');
      expect(formatHourMinute('ab2359')).toBe('23:59');
      expect(formatHourMinute('07-15')).toBe('07:15');
    });

    it('deve lidar com entradas ausentes e vazias', () => {
      expect(formatHourMinute('')).toBe('');
    });

    it('deve formatar um horário com entrada curta', () => {
      expect(formatHourMinute('12')).toBe('12');
      expect(formatHourMinute('8')).toBe('8');
      expect(formatHourMinute('23')).toBe('23');
      expect(formatHourMinute('7')).toBe('7');
    });

    it('deve formatar um horário com entrada de 3 caracteres', () => {
      expect(formatHourMinute('123')).toBe('1:23');
      expect(formatHourMinute('830')).toBe('8:30');
      expect(formatHourMinute('715')).toBe('7:15');
    });
  });

  describe('formatDateTime', () => {
    it('deve formatar uma data e hora com entrada válida', () => {
      expect(formatDateTime('030219991230')).toBe('03/02/1999 12:30');
      expect(formatDateTime('230120212345')).toBe('23/01/2021 23:45');
      expect(formatDateTime('300320201200')).toBe('30/03/2020 12:00');
      expect(formatDateTime('2802202015')).toBe('28/02/2020 15');
      expect(formatDateTime('150420201')).toBe('15/04/2020 1');
    });

    it('deve formatar uma data e hora com entrada curta', () => {
      expect(formatDateTime('0101')).toBe('01/01');
      expect(formatDateTime('010120')).toBe('01/01/20');
      expect(formatDateTime('01012012')).toBe('01/01/2012');
      expect(formatDateTime('0101201212')).toBe('01/01/2012 12');
      expect(formatDateTime('010120121230')).toBe('01/01/2012 12:30');
    });

    it('deve lidar com entradas ausentes e vazias', () => {
      expect(formatDateTime('')).toBe('');
      expect(formatDateTime()).toBe('');
    });

    it('deve formatar um objeto Date do JavaScript', () => {
      const date = new Date(1687804798229);
      expect(formatDateTime(date)).toBe('26/06/2023 15:39:58');
    });
  });

  describe('formatCurrency', () => {
    it('deve formatar valores monetários corretamente', () => {
      expect(formatCurrency(0)).toBe('R$ 0,00');
      expect(formatCurrency(2)).toBe('R$ 2,00');
      expect(formatCurrency(10)).toBe('R$ 10,00');
      expect(formatCurrency(0.65)).toBe('R$ 0,65');
      expect(formatCurrency(0.123)).toBe('R$ 0,12');
      expect(formatCurrency(0.13)).toBe('R$ 0,13');
      expect(formatCurrency(1_165_799.9985)).toBe('R$ 1.165.800,00');
    });
  });
});

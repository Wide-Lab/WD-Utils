import {
  interpolate,
  isEven,
  numberClamp,
  padTo2Digits,
  truncDecimals,
} from '../Numbers';

describe('utils/Numbers', () => {
  describe('isEven', () => {
    it('deve retornar verdadeiro para números pares', () => {
      expect(isEven(2)).toBeTruthy();
      expect(isEven(4)).toBeTruthy();
      expect(isEven(6)).toBeTruthy();
      expect(isEven(100)).toBeTruthy();
      expect(isEven(54761898)).toBeTruthy();
    });

    it('deve retornar falso para números ímpares', () => {
      expect(isEven(1)).toBeFalsy();
      expect(isEven(3)).toBeFalsy();
      expect(isEven(5)).toBeFalsy();
      expect(isEven(99)).toBeFalsy();
      expect(isEven(54761891)).toBeFalsy();
    });
  });

  describe('numberClamp', () => {
    it('deve limitar um número ao intervalo especificado', () => {
      expect(numberClamp(-1, 0, 1)).toBe(0);
      expect(numberClamp(0.5, 0, 1)).toBe(0.5);
      expect(numberClamp(2, 0, 1)).toBe(1);
      expect(numberClamp(-3, -1, 1)).toBe(-1);
    });
  });

  describe('padTo2Digits', () => {
    it('deve preencher números de um dígito com zero à esquerda', () => {
      expect(padTo2Digits(0)).toBe('00');
      expect(padTo2Digits(3)).toBe('03');
      expect(padTo2Digits(9)).toBe('09');
    });

    it('deve retornar números de dois dígitos como strings sem alterações', () => {
      expect(padTo2Digits(10)).toBe('10');
      expect(padTo2Digits(23)).toBe('23');
      expect(padTo2Digits(99)).toBe('99');
    });

    it('deve lidar com números com mais de dois dígitos', () => {
      expect(padTo2Digits(100)).toBe('100');
      expect(padTo2Digits(1234)).toBe('1234');
    });

    describe('interpolate', () => {
      it('deve interpolar um número dentro do intervalo fornecido', () => {
        expect(interpolate(5, 0, 10, 0, 100)).toBe(50);
        expect(interpolate(0, 0, 10, 0, 100)).toBe(0);
        expect(interpolate(10, 0, 10, 0, 100)).toBe(100);
      });

      it('deve limitar a entrada fora do intervalo de entrada', () => {
        expect(interpolate(-5, 0, 10, 0, 100)).toBe(0);
        expect(interpolate(15, 0, 10, 0, 100)).toBe(100);
      });

      test('interpola corretamente dentro do intervalo', () => {
        expect(interpolate(5, 0, 10, 0, 100)).toBe(50);
        expect(interpolate(2.5, 0, 10, 0, 100)).toBe(25);
        expect(interpolate(7.5, 0, 10, 0, 100)).toBe(75);
      });

      test('lida com números de ponto flutuante', () => {
        expect(interpolate(0.5, 0, 1, 0, 10)).toBe(5);
        expect(interpolate(0.25, 0, 1, 0, 10)).toBe(2.5);
        expect(interpolate(0.75, 0, 1, 0, 10)).toBe(7.5);
      });

      test('lança um erro se inputStart e inputEnd forem iguais', () => {
        expect(() => interpolate(5, 10, 10, 0, 100)).toThrow(
          'entrada inicial e entrada final não podem ter o mesmo valor',
        );
      });

      test('interpola corretamente com intervalos negativos', () => {
        expect(interpolate(-5, -10, 0, 0, 100)).toBe(50);
        expect(interpolate(-7.5, -10, 0, 0, 100)).toBe(25);
        expect(interpolate(-2.5, -10, 0, 0, 100)).toBe(75);
      });

      test('interpola corretamente com intervalos mistos positivos e negativos', () => {
        expect(interpolate(0, -10, 10, -100, 100)).toBe(0);
        expect(interpolate(-5, -10, 10, -100, 100)).toBe(-50);
        expect(interpolate(5, -10, 10, -100, 100)).toBe(50);
      });

      describe('truncDecimals', () => {
        test('trunca para 2 casas decimais por padrão', () => {
          expect(truncDecimals(3.14159)).toBe(3.14);
          expect(truncDecimals(2.999)).toBe(2.99);
          expect(truncDecimals(-1.23789)).toBe(-1.23);
        });

        test('trunca para o número especificado de casas decimais', () => {
          expect(truncDecimals(3.14159, 3)).toBe(3.141);
          expect(truncDecimals(2.999, 1)).toBe(2.9);
          expect(truncDecimals(-1.23789, 4)).toBe(-1.2378);
        });

        test('lida com números inteiros', () => {
          expect(truncDecimals(5)).toBe(5);
          expect(truncDecimals(100, 3)).toBe(100);
        });

        test('lida com zero', () => {
          expect(truncDecimals(0)).toBe(0);
          expect(truncDecimals(0, 5)).toBe(0);
        });

        test('lida com números muito pequenos', () => {
          expect(truncDecimals(0.0000123, 5)).toBe(0.00001);
          expect(truncDecimals(0.0000123, 7)).toBe(0.0000123);
        });
      });
    });
  });
});

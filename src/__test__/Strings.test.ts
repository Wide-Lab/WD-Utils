import {
  accentsRemove,
  compareStrings,
  convertString,
  extractFormattedName,
  getInitials,
  isContentMatchingSearch,
  isStringWebLink,
  pluralizeWord,
  replaceBetween,
  specialCharactersConvert,
  ucfirst,
  ucwords,
} from '../Strings';

describe('utils/String', () => {
  describe('accentsRemove', () => {
    describe('Words with ´ accent ', () => {
      it('should remove accent from "sofá"', () =>
        expect(accentsRemove('sofá')).toBe('sofa'));
      it('should remove accent from "refém"', () =>
        expect(accentsRemove('refém')).toBe('refem'));
      it('should remove accent from "Piauí"', () =>
        expect(accentsRemove('Piauí')).toBe('Piaui'));
      it('should remove accent from "herói"', () =>
        expect(accentsRemove('herói')).toBe('heroi'));
      it('should remove accent from "penúltima"', () =>
        expect(accentsRemove('penúltima')).toBe('penultima'));
    });

    describe('Words with ^ accent ', () => {
      it('should remove accent from "Câmara"', () =>
        expect(accentsRemove('Câmara')).toBe('Camara'));
      it('should remove accent from "bambolê"', () =>
        expect(accentsRemove('bambolê')).toBe('bambole'));
      it('should remove accent from "metrô"', () =>
        expect(accentsRemove('metrô')).toBe('metro'));
    });

    describe('Words with ~ accent ', () => {
      it('should remove accent from "compreensão"', () =>
        expect(accentsRemove('compreensão')).toBe('compreensao'));
      it('should remove accent from "limões"', () =>
        expect(accentsRemove('limões')).toBe('limoes'));
    });

    it('should remove accents from a sentence', () =>
      expect(accentsRemove('Ligo-te hoje à noite')).toBe(
        'Ligo-te hoje a noite'
      ));

    it('should remove accents from another sentence', () =>
      expect(accentsRemove('A MISSA COMEÇARÁ À MEIA-NOITE')).toBe(
        'A MISSA COMECARA A MEIA-NOITE'
      ));

    it('should remove accents from a longer sentence', () =>
      expect(
        accentsRemove(
          'O SEGREDO NÃO ESTÁ NO QUE VOCÊ DIZ, MAS NA MANEIRA COMO VOCÊ DIZ'
        )
      ).toBe(
        'O SEGREDO NAO ESTA NO QUE VOCE DIZ, MAS NA MANEIRA COMO VOCE DIZ'
      ));

    it('should remove accents from a quote', () =>
      expect(accentsRemove('A MÚSICA É O VERBO DO FUTURO')).toBe(
        'A MUSICA E O VERBO DO FUTURO'
      ));

    it('should remove accents from another quote', () =>
      expect(
        accentsRemove(
          'O QUE ME PREOCUPA NÃO É O GRITO DOS MAUS. É O SILÊNCIO DOS BONS.'
        )
      ).toBe(
        'O QUE ME PREOCUPA NAO E O GRITO DOS MAUS. E O SILENCIO DOS BONS.'
      ));

    it('should remove accents from a saying', () =>
      expect(accentsRemove('AS PALAVRAS SÃO A VOZ DO CORAÇÃO')).toBe(
        'AS PALAVRAS SAO A VOZ DO CORACAO'
      ));

    it('should return an empty string for an empty input', () =>
      expect(accentsRemove('')).toBe(''));
  });

  describe('specialCharactersConvert', () => {
    it('should convert special HTML characters to their original forms', () => {
      expect(specialCharactersConvert('&quot;&apos;&amp;&lt;&gt;')).toBe(
        '"\'&<>'
      );
      expect(
        specialCharactersConvert('&iexcl;&cent;&pound;&curren;&yen;')
      ).toBe('¡¢£¤¥');
      expect(specialCharactersConvert('&copy;&reg;&deg;&plusmn;&sup2;')).toBe(
        '©®°±²'
      );
    });

    it('should handle strings with no special characters', () => {
      expect(specialCharactersConvert('Hello World')).toBe('Hello World');
      expect(specialCharactersConvert('1234567890')).toBe('1234567890');
    });

    it('should handle mixed strings', () => {
      expect(specialCharactersConvert('Hello &amp; World')).toBe(
        'Hello & World'
      );
      expect(specialCharactersConvert('Price: &yen;100')).toBe('Price: ¥100');
      expect(specialCharactersConvert('© 2021')).toBe('© 2021');
    });

    it('should handle empty strings', () => {
      expect(specialCharactersConvert('')).toBe('');
    });
  });

  describe('ucfirst', () => {
    it('should return an empty string for an empty input', () =>
      expect(ucfirst('')).toBe(''));

    it('should capitalize the first letter of "feliz"', () =>
      expect(ucfirst('feliz')).toBe('Feliz'));
    it('should capitalize the first letter of "ímpeto"', () =>
      expect(ucfirst('ímpeto')).toBe('Ímpeto'));

    it('should capitalize the first letter of the first word in a sentence', () =>
      expect(ucfirst('as palavras são a voz do coração')).toBe(
        'As palavras são a voz do coração'
      ));

    it('should capitalize the first letter of the first word in another sentence', () =>
      expect(ucfirst('é o silêncio dos bons')).toBe('É o silêncio dos bons'));
  });

  describe('ucwords', () => {
    it('should return an empty string for an empty input', () =>
      expect(ucwords('')).toBe(''));

    it('should capitalize the first letter of "feliz"', () =>
      expect(ucwords('feliz')).toBe('Feliz'));
    it('should capitalize the first letter of "ímpeto"', () =>
      expect(ucwords('ímpeto')).toBe('Ímpeto'));

    it('should capitalize the first letter of each word in a sentence', () =>
      expect(ucwords('a missa começará à meia-noite')).toBe(
        'A Missa Começará À Meia-Noite'
      ));

    it('should capitalize the first letter of each word in another sentence', () =>
      expect(ucwords('palavras não bastam, não dá pra entender')).toBe(
        'Palavras Não Bastam, Não Dá Pra Entender'
      ));

    it('should capitalize the first letter of each word in a text with dots in the name', () => {
      expect(ucwords('a.m.c textil-ltda')).toBe('A.M.C Textil-Ltda');
      expect(ucwords('j.r.r tolkien')).toBe('J.R.R Tolkien');
      expect(ucwords('u.s.a corporation')).toBe('U.S.A Corporation');
    });

    it('should handle mixed cases with dots and hyphens', () => {
      expect(ucwords('a.b.c-d.e.f')).toBe('A.B.C-D.E.F');
      expect(ucwords('x.y.z company-ltd')).toBe('X.Y.Z Company-Ltd');
    });

    it('should handle edge cases with multiple spaces and dots', () => {
      expect(ucwords('  a.b.c   textil-ltda  ')).toBe('  A.B.C   Textil-Ltda  ');
      expect(ucwords('  j.r.r   tolkien  ')).toBe('  J.R.R   Tolkien  ');
    });

    it('should return an empty string for an empty input', () => {
      expect(ucwords('')).toBe('');
    });

    it('should handle single words with dots', () => {
      expect(ucwords('a.b.c')).toBe('A.B.C');
      expect(ucwords('x.y.z')).toBe('X.Y.Z');
    });
  });

  describe('getInitials', () => {
    it('should return first name and initial of last name', () => {
      expect(getInitials('John Doe')).toBe('JD');
    });

    it('should return one initial of single names', () => {
      expect(getInitials('Alice')).toBe('A');
    });

    it('should return an empty string for an empty input', () => {
      expect(getInitials('')).toBe('');
    });

    it('should return an empty string if input is only spaces', () => {
      expect(getInitials('   ')).toBe('');
    });

    it('Should remove leading/trailing spaces', () => {
      expect(getInitials('   Gabriel Alvez  ')).toBe('GA');
    });

    it('Should remove leading/trailing spaces in single name', () => {
      expect(getInitials('   Jonathan  ')).toBe('J');
    });
  });

  describe('extractFormattedName', () => {
    it('should return the first name if there is only one part', () => {
      expect(extractFormattedName('John')).toBe('John');
      expect(extractFormattedName('  John  ')).toBe('John');
    });

    it('should return the first and second name followed by the last letter of the last name', () => {
      expect(extractFormattedName('John Doe Smith')).toBe('John D. Smith');
      expect(extractFormattedName('Jane Mary Doe')).toBe('Jane M. Doe');
      expect(extractFormattedName('John Doe')).toBe('John D.');
    });

    it('should return the first name followed by the first letter of the last name if the second name is the same as the last name', () => {
      expect(extractFormattedName('John John')).toBe('John J.');
      expect(extractFormattedName('Jane Jane')).toBe('Jane J.');
    });

    it('should handle edge cases with extra spaces', () => {
      expect(extractFormattedName('  John  Doe  ')).toBe('John D.');
      expect(extractFormattedName('  Jane   Doe  ')).toBe('Jane D.');
    });

    it('should return an empty string for an empty input', () => {
      expect(extractFormattedName('')).toBe('');
      expect(extractFormattedName('    ')).toBe('');
    });
  });

  describe('isContentMatchingSearch', () => {
    it('should return true if the content matches the search term', () => {
      expect(isContentMatchingSearch('Hello World', 'hello')).toBe(true);
      expect(isContentMatchingSearch('TypeScript Jest Testing', 'jest')).toBe(
        true
      );
      expect(isContentMatchingSearch('JavaScript is awesome', 'Awesome')).toBe(
        true
      );
    });

    it('should return false if the content does not match the search term', () => {
      expect(isContentMatchingSearch('Hello World', 'goodbye')).toBe(false);
      expect(isContentMatchingSearch('TypeScript Jest Testing', 'java')).toBe(
        false
      );
      expect(isContentMatchingSearch('JavaScript is awesome', 'bad')).toBe(
        false
      );
    });

    it('should handle accented characters correctly', () => {
      expect(isContentMatchingSearch('Café com leite', 'cafe')).toBe(true);
      expect(isContentMatchingSearch('Jalapeño', 'jalapeno')).toBe(true);
    });

    it('should handle case differences and whitespace correctly', () => {
      expect(isContentMatchingSearch('  Hello World  ', 'hello')).toBe(true);
      expect(
        isContentMatchingSearch('TypeScript Jest Testing', '  jest  ')
      ).toBe(true);
    });

    it('should return true for empty search terms', () => {
      expect(isContentMatchingSearch('Hello World', '')).toBe(true);
      expect(isContentMatchingSearch('', '')).toBe(true);
      expect(isContentMatchingSearch('', ' ')).toBe(true);
      expect(isContentMatchingSearch('Hello World', ' ')).toBe(true);
      expect(isContentMatchingSearch('-', '')).toBe(true);
    });
  });

  describe('compareStrings', () => {
    it('should return true for identical strings', () => {
      expect(compareStrings('hello', 'hello')).toBe(true);
      expect(compareStrings('Test', 'Test')).toBe(true);
    });

    it('should return false for different strings', () => {
      expect(compareStrings('hello', 'world')).toBe(false);
      expect(compareStrings('Test', 'testing')).toBe(false);
    });

    it('should return true for strings that are equal after conversion', () => {
      expect(compareStrings('hello ', 'hello')).toBe(true);
      expect(compareStrings('  Test', 'test')).toBe(true);
    });

    it('should handle strings with different cases', () => {
      expect(compareStrings('HELLO', 'hello')).toBe(true);
      expect(compareStrings('TeSt', 'test')).toBe(true);
    });

    it('should handle strings with spaces correctly', () => {
      expect(compareStrings('hello world', 'helloworld')).toBe(true);
      expect(compareStrings('Type Script', 'typescript')).toBe(true);
    });

    it('should handle accented characters correctly', () => {
      expect(compareStrings('café', 'cafe')).toBe(true);
      expect(compareStrings('jalapeño', 'jalapeno')).toBe(true);
    });

    it('should handle strings with special characters correctly', () => {
      expect(compareStrings('hello-world', 'hello_world')).toBe(true);
      expect(compareStrings('Type-Script', 'Type_Script')).toBe(true);
    });
  });

  describe('pluralizeWord', () => {
    it('should return the singular form if count is 1', () => {
      expect(pluralizeWord('apple', 'apples', 1)).toBe('apple');
      expect(pluralizeWord('car', 'cars', 1)).toBe('car');
      expect(pluralizeWord('child', 'children', 1)).toBe('child');
      expect(pluralizeWord('mouse', 'mice', 1)).toBe('mouse');
      expect(pluralizeWord('goose', 'geese', 1)).toBe('goose');
    });

    it('should return the plural form if count is greater than 1', () => {
      expect(pluralizeWord('apple', 'apples', 2)).toBe('apples');
      expect(pluralizeWord('car', 'cars', 3)).toBe('cars');
      expect(pluralizeWord('child', 'children', 2)).toBe('children');
      expect(pluralizeWord('mouse', 'mice', 3)).toBe('mice');
      expect(pluralizeWord('goose', 'geese', 4)).toBe('geese');
    });

    it('should return the plural form if count is greater than 1 even for higher numbers', () => {
      expect(pluralizeWord('apple', 'apples', 10)).toBe('apples');
      expect(pluralizeWord('car', 'cars', 100)).toBe('cars');
      expect(pluralizeWord('child', 'children', 50)).toBe('children');
      expect(pluralizeWord('mouse', 'mice', 75)).toBe('mice');
      expect(pluralizeWord('goose', 'geese', 20)).toBe('geese');
    });

    it('should return the singular form if count is less than or equal to 1', () => {
      expect(pluralizeWord('apple', 'apples', 0)).toBe('apple');
      expect(pluralizeWord('car', 'cars', -1)).toBe('car');
      expect(pluralizeWord('child', 'children', 1)).toBe('child');
      expect(pluralizeWord('mouse', 'mice', 1)).toBe('mouse');
      expect(pluralizeWord('goose', 'geese', 1)).toBe('goose');
    });

    it('should handle edge cases with zero and negative counts', () => {
      expect(pluralizeWord('apple', 'apples', 0)).toBe('apple');
      expect(pluralizeWord('car', 'cars', -1)).toBe('car');
      expect(pluralizeWord('child', 'children', 0)).toBe('child');
      expect(pluralizeWord('mouse', 'mice', -2)).toBe('mouse');
      expect(pluralizeWord('goose', 'geese', 0)).toBe('goose');
    });
  });

  describe('getInitials', () => {
    it('should return an empty string if no fullName is provided', () => {
      expect(getInitials('')).toBe('');
      expect(getInitials(null as any)).toBe('');
      expect(getInitials(undefined as any)).toBe('');
    });

    it('should return the first initial for a single-part name', () => {
      expect(getInitials('John')).toBe('J');
      expect(getInitials('Alice')).toBe('A');
    });

    it('should return the first and last initials for a multi-part name', () => {
      expect(getInitials('John Doe')).toBe('JD');
      expect(getInitials('Jane Mary Smith')).toBe('JS');
      expect(getInitials('John Michael Doe')).toBe('JD');
    });

    it('should handle names with extra spaces', () => {
      expect(getInitials('  John  Doe  ')).toBe('JD');
      expect(getInitials('  Jane   Mary Smith ')).toBe('JS');
    });

    it('should handle names with mixed case', () => {
      expect(getInitials('john doe')).toBe('JD');
      expect(getInitials('Jane MARY Smith')).toBe('JS');
    });

    it('should return initials in uppercase', () => {
      expect(getInitials('john doe')).toBe('JD');
      expect(getInitials('Jane Smith')).toBe('JS');
    });

    it('should handle edge cases with special characters and multiple spaces', () => {
      expect(getInitials('  John-  Doe  ')).toBe('JD');
      expect(getInitials('Jane   M. Smith')).toBe('JS');
    });
  });

  describe('replaceBetween', () => {
    it('should replace the text between the given indices with the new value', () => {
      const text = 'Hello, world!';
      const selection = { start: 7, end: 12 };
      const value = 'everyone';

      expect(replaceBetween(text, selection, value)).toBe('Hello, everyone!');
    });

    it('should handle replacing from the start of the text', () => {
      const text = 'Hello, world!';
      const selection = { start: 0, end: 5 };
      const value = 'Hi';

      expect(replaceBetween(text, selection, value)).toBe('Hi, world!');
    });

    it('should handle replacing to the end of the text', () => {
      const text = 'Hello, world!';
      const selection = { start: 7, end: 13 };
      const value = 'there';

      expect(replaceBetween(text, selection, value)).toBe('Hello, there');
    });

    it('should handle replacing with an empty string', () => {
      const text = 'Hello, world!';
      const selection = { start: 5, end: 12 };
      const value = '';

      expect(replaceBetween(text, selection, value)).toBe('Hello!');
    });

    it('should handle edge cases with empty text', () => {
      const text = '';
      const selection = { start: 0, end: 0 };
      const value = 'Hello';

      expect(replaceBetween(text, selection, value)).toBe('Hello');
    });

    it('should handle edge cases with start and end being the same', () => {
      const text = 'Hello, world!';
      const selection = { start: 5, end: 5 };
      const value = ' dear';

      expect(replaceBetween(text, selection, value)).toBe('Hello dear, world!');
    });
  });

  describe('isStringWebLink', () => {
    it('should return true for valid HTTP links', () => {
      expect(isStringWebLink('http://www.example.com')).toBe(true);
      expect(isStringWebLink('https://example.com')).toBe(true);
    });

    it('should return true for valid FTP links', () => {
      expect(isStringWebLink('ftp://ftp.example.com')).toBe(true);
    });

    it('should return false for invalid links', () => {
      expect(isStringWebLink('http//example.com')).toBe(false);
      expect(isStringWebLink('www.example.com')).toBe(false);
      expect(isStringWebLink('example')).toBe(false);
    });

    it('should return false for private network IP address links', () => {
      expect(isStringWebLink('http://127.0.0.1')).toBe(false);
      expect(isStringWebLink('http://192.168.0.1')).toBe(false);
      expect(isStringWebLink('http://10.0.0.1')).toBe(false);
      expect(isStringWebLink('http://192.168.1.1')).toBe(false);
      expect(isStringWebLink('http://172.16.0.1')).toBe(false);
    });

    it('should handle links with ports correctly', () => {
      expect(isStringWebLink('http://example.com:8080')).toBe(true);
      expect(isStringWebLink('https://example.com:443')).toBe(true);
    });

    it('should handle links with authentication correctly', () => {
      expect(isStringWebLink('http://user:pass@example.com')).toBe(true);
      expect(isStringWebLink('ftp://user:pass@ftp.example.com')).toBe(true);
    });

    it('should return false for strings without protocol', () => {
      expect(isStringWebLink('www.example.com')).toBe(false);
      expect(isStringWebLink('example.com')).toBe(false);
    });

    it('should return false for empty strings', () => {
      expect(isStringWebLink('')).toBe(false);
    });
  });

  describe('convertString', () => {
    it('should remove accents and convert to lowercase', () => {
      expect(convertString('ÀÁÂÃÄÅ')).toBe('aaaaaa');
      expect(convertString('àáâãäå')).toBe('aaaaaa');
    });

    it('should remove spaces', () => {
      expect(convertString('a b c')).toBe('abc');
      expect(convertString('  a   b   c  ')).toBe('abc');
    });

    it('should replace multiple hyphens with a single hyphen', () => {
      expect(convertString('a--b---c')).toBe('a-b-c');
    });

    it('should handle mixed cases', () => {
      expect(convertString('ÀÁ ÂÃ ÄÅ')).toBe('aaaaaa');
      expect(convertString('àá âã äå')).toBe('aaaaaa');
    });

    it('should handle empty strings', () => {
      expect(convertString('')).toBe('');
    });

    it('should handle strings without accents or spaces', () => {
      expect(convertString('abc')).toBe('abc');
    });
  });
});

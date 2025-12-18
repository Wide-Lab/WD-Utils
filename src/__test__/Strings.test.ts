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
    describe('Palavras com acento ´', () => {
      it('deve remover acento de "sofá"', () =>
        expect(accentsRemove('sofá')).toBe('sofa'));
      it('deve remover acento de "refém"', () =>
        expect(accentsRemove('refém')).toBe('refem'));
      it('deve remover acento de "Piauí"', () =>
        expect(accentsRemove('Piauí')).toBe('Piaui'));
      it('deve remover acento de "herói"', () =>
        expect(accentsRemove('herói')).toBe('heroi'));
      it('deve remover acento de "penúltima"', () =>
        expect(accentsRemove('penúltima')).toBe('penultima'));
    });

    describe('Palavras com acento ^', () => {
      it('deve remover acento de "Câmara"', () =>
        expect(accentsRemove('Câmara')).toBe('Camara'));
      it('deve remover acento de "bambolê"', () =>
        expect(accentsRemove('bambolê')).toBe('bambole'));
      it('deve remover acento de "metrô"', () =>
        expect(accentsRemove('metrô')).toBe('metro'));
    });

    describe('Palavras com acento ~', () => {
      it('deve remover acento de "compreensão"', () =>
        expect(accentsRemove('compreensão')).toBe('compreensao'));
      it('deve remover acento de "limões"', () =>
        expect(accentsRemove('limões')).toBe('limoes'));
    });

    it('deve remover acentos de uma frase', () =>
      expect(accentsRemove('Ligo-te hoje à noite')).toBe(
        'Ligo-te hoje a noite',
      ));

    it('deve remover acentos de outra frase', () =>
      expect(accentsRemove('A MISSA COMEÇARÁ À MEIA-NOITE')).toBe(
        'A MISSA COMECARA A MEIA-NOITE',
      ));

    it('deve remover acentos de uma frase longa', () =>
      expect(
        accentsRemove(
          'O SEGREDO NÃO ESTÁ NO QUE VOCÊ DIZ, MAS NA MANEIRA COMO VOCÊ DIZ',
        ),
      ).toBe(
        'O SEGREDO NAO ESTA NO QUE VOCE DIZ, MAS NA MANEIRA COMO VOCE DIZ',
      ));

    it('deve remover acentos de uma citação', () =>
      expect(accentsRemove('A MÚSICA É O VERBO DO FUTURO')).toBe(
        'A MUSICA E O VERBO DO FUTURO',
      ));

    it('deve remover acentos de outra citação', () =>
      expect(
        accentsRemove(
          'O QUE ME PREOCUPA NÃO É O GRITO DOS MAUS. É O SILÊNCIO DOS BONS.',
        ),
      ).toBe(
        'O QUE ME PREOCUPA NAO E O GRITO DOS MAUS. E O SILENCIO DOS BONS.',
      ));

    it('deve remover acentos de um ditado', () =>
      expect(accentsRemove('AS PALAVRAS SÃO A VOZ DO CORAÇÃO')).toBe(
        'AS PALAVRAS SAO A VOZ DO CORACAO',
      ));

    it('deve retornar uma string vazia para uma entrada vazia', () =>
      expect(accentsRemove('')).toBe(''));
  });

  describe('specialCharactersConvert', () => {
    it('deve converter caracteres HTML especiais para suas formas originais', () => {
      expect(specialCharactersConvert('&quot;&apos;&amp;&lt;&gt;')).toBe(
        '"\'&<>',
      );
      expect(
        specialCharactersConvert('&iexcl;&cent;&pound;&curren;&yen;'),
      ).toBe('¡¢£¤¥');
      expect(specialCharactersConvert('&copy;&reg;&deg;&plusmn;&sup2;')).toBe(
        '©®°±²',
      );
    });

    it('deve lidar com strings sem caracteres especiais', () => {
      expect(specialCharactersConvert('Hello World')).toBe('Hello World');
      expect(specialCharactersConvert('1234567890')).toBe('1234567890');
    });

    it('deve lidar com strings mistas', () => {
      expect(specialCharactersConvert('Hello &amp; World')).toBe(
        'Hello & World',
      );
      expect(specialCharactersConvert('Price: &yen;100')).toBe('Price: ¥100');
      expect(specialCharactersConvert('© 2021')).toBe('© 2021');
    });

    it('deve lidar com strings vazias', () => {
      expect(specialCharactersConvert('')).toBe('');
    });
  });

  describe('ucfirst', () => {
    it('deve retornar string vazia para entrada vazia', () =>
      expect(ucfirst('')).toBe(''));

    it('deve capitalizar a primeira letra de "feliz"', () =>
      expect(ucfirst('feliz')).toBe('Feliz'));
    it('deve capitalizar a primeira letra de "ímpeto"', () =>
      expect(ucfirst('ímpeto')).toBe('Ímpeto'));

    it('deve capitalizar a primeira palavra de uma frase', () =>
      expect(ucfirst('as palavras são a voz do coração')).toBe(
        'As palavras são a voz do coração',
      ));

    it('deve capitalizar a primeira palavra de outra frase', () =>
      expect(ucfirst('é o silêncio dos bons')).toBe('É o silêncio dos bons'));
  });

  describe('ucwords', () => {
    it('deve retornar string vazia para entrada vazia', () =>
      expect(ucwords('')).toBe(''));

    it('deve capitalizar a primeira letra de "feliz"', () =>
      expect(ucwords('feliz')).toBe('Feliz'));
    it('deve capitalizar a primeira letra de "ímpeto"', () =>
      expect(ucwords('ímpeto')).toBe('Ímpeto'));

    it('deve capitalizar a primeira letra de cada palavra em uma frase', () =>
      expect(ucwords('a missa começará à meia-noite')).toBe(
        'A Missa Começará À Meia-Noite',
      ));

    it('deve capitalizar a primeira letra de cada palavra em outra frase', () =>
      expect(ucwords('palavras não bastam, não dá pra entender')).toBe(
        'Palavras Não Bastam, Não Dá Pra Entender',
      ));

    it('deve capitalizar a primeira letra de cada palavra com pontos no nome', () => {
      expect(ucwords('a.m.c textil-ltda')).toBe('A.M.C Textil-Ltda');
      expect(ucwords('j.r.r tolkien')).toBe('J.R.R Tolkien');
      expect(ucwords('u.s.a corporation')).toBe('U.S.A Corporation');
    });

    it('deve lidar com casos mistos com pontos e hífens', () => {
      expect(ucwords('a.b.c-d.e.f')).toBe('A.B.C-D.E.F');
      expect(ucwords('x.y.z company-ltd')).toBe('X.Y.Z Company-Ltd');
    });

    it('deve lidar com múltiplos espaços e pontos', () => {
      expect(ucwords('  a.b.c   textil-ltda  ')).toBe(
        '  A.B.C   Textil-Ltda  ',
      );
      expect(ucwords('  j.r.r   tolkien  ')).toBe('  J.R.R   Tolkien  ');
    });

    it('deve retornar uma string vazia para uma entrada vazia', () => {
      expect(ucwords('')).toBe('');
    });

    it('deve lidar com palavras únicas com pontos', () => {
      expect(ucwords('a.b.c')).toBe('A.B.C');
      expect(ucwords('x.y.z')).toBe('X.Y.Z');
    });
  });

  describe('getInitials', () => {
    it('deve retornar as iniciais do primeiro e último nome', () => {
      expect(getInitials('John Doe')).toBe('JD');
    });

    it('deve retornar apenas uma inicial para nomes únicos', () => {
      expect(getInitials('Alice')).toBe('A');
    });

    it('deve retornar string vazia para entrada vazia', () => {
      expect(getInitials('')).toBe('');
    });

    it('deve retornar string vazia para entrada com apenas espaços', () => {
      expect(getInitials('   ')).toBe('');
    });

    it('deve remover espaços extras no início/fim', () => {
      expect(getInitials('   Gabriel Alvez  ')).toBe('GA');
    });

    it('deve remover espaços extras em nome único', () => {
      expect(getInitials('   Jonathan  ')).toBe('J');
    });
  });

  describe('extractFormattedName', () => {
    it('deve retornar o primeiro nome se houver apenas uma parte', () => {
      expect(extractFormattedName('John')).toBe('John');
      expect(extractFormattedName('  John  ')).toBe('John');
    });

    it('deve retornar o primeiro e segundo nome seguidos pela inicial do último', () => {
      expect(extractFormattedName('John Doe Smith')).toBe('John D. Smith');
      expect(extractFormattedName('Jane Mary Doe')).toBe('Jane M. Doe');
      expect(extractFormattedName('John Doe')).toBe('John Doe');
    });

    it('deve retornar o primeiro nome seguido da inicial do último se ambos forem iguais', () => {
      expect(extractFormattedName('John John')).toBe('John John');
      expect(extractFormattedName('Jane Jane')).toBe('Jane Jane');
    });

    it('deve lidar com espaços extras', () => {
      expect(extractFormattedName('  John  Doe  ')).toBe('John Doe');
      expect(extractFormattedName('  Jane   Doe  ')).toBe('Jane Doe');
    });

    it('deve retornar string vazia para entrada vazia', () => {
      expect(extractFormattedName('')).toBe('');
      expect(extractFormattedName('    ')).toBe('');
    });

    it('deve formatar "emanuelle dos santos" corretamente', () => {
      expect(extractFormattedName('emanuelle dos santos')).toBe(
        'Emanuelle Santos',
      );
    });

    it('deve formatar "fabiana da cruz" corretamente', () => {
      expect(extractFormattedName('fabiana da cruz')).toBe('Fabiana Cruz');
    });

    it('deve formatar "camila gonçalvez" corretamente', () => {
      expect(extractFormattedName('camila gonçalvez')).toBe('Camila Gonçalvez');
    });

    it('deve formatar "maria do canto" corretamente', () => {
      expect(extractFormattedName('maria do canto')).toBe('Maria Canto');
    });

    it('deve formatar "fiorentina das cruzes" corretamente', () => {
      expect(extractFormattedName('fiorentina das cruzes')).toBe(
        'Fiorentina Cruzes',
      );
    });

    it('deve formatar "leopoldo de brança" corretamente', () => {
      expect(extractFormattedName('leopoldo de brança')).toBe(
        'Leopoldo Brança',
      );
    });

    it('deve formatar "emanuelle dos santos extra" corretamente', () => {
      expect(extractFormattedName('emanuelle dos santos extra')).toBe(
        'Emanuelle S. Extra',
      );
    });

    it('deve formatar "fabiana da cruz extra" corretamente', () => {
      expect(extractFormattedName('fabiana da cruz extra')).toBe(
        'Fabiana C. Extra',
      );
    });

    it('deve formatar "maria do canto extra" corretamente', () => {
      expect(extractFormattedName('maria do canto extra')).toBe(
        'Maria C. Extra',
      );
    });

    it('deve formatar "fiorentina das cruzes extra" corretamente', () => {
      expect(extractFormattedName('fiorentina das cruzes extra')).toBe(
        'Fiorentina C. Extra',
      );
    });

    it('deve formatar "leopoldo de brança neves" corretamente', () => {
      expect(extractFormattedName('leopoldo de brança neves')).toBe(
        'Leopoldo B. Neves',
      );
    });

    it('deve formatar "richardison silva e silva" corretamente', () => {
      expect(extractFormattedName('richardison silva e silva')).toBe(
        'Richardison S. Silva',
      );
    });
  });

  describe('isContentMatchingSearch', () => {
    it('deve retornar verdadeiro se o conteúdo corresponder ao termo de busca', () => {
      expect(isContentMatchingSearch('Hello World', 'hello')).toBe(true);
      expect(isContentMatchingSearch('TypeScript Jest Testing', 'jest')).toBe(
        true,
      );
      expect(isContentMatchingSearch('JavaScript is awesome', 'Awesome')).toBe(
        true,
      );
    });

    it('deve retornar falso se o conteúdo não corresponder ao termo de busca', () => {
      expect(isContentMatchingSearch('Hello World', 'goodbye')).toBe(false);
      expect(isContentMatchingSearch('TypeScript Jest Testing', 'java')).toBe(
        false,
      );
      expect(isContentMatchingSearch('JavaScript is awesome', 'bad')).toBe(
        false,
      );
    });

    it('deve lidar corretamente com caracteres acentuados', () => {
      expect(isContentMatchingSearch('Café com leite', 'cafe')).toBe(true);
      expect(isContentMatchingSearch('Jalapeño', 'jalapeno')).toBe(true);
    });

    it('deve lidar com diferenças de caixa e espaços em branco', () => {
      expect(isContentMatchingSearch('  Hello World  ', 'hello')).toBe(true);
      expect(
        isContentMatchingSearch('TypeScript Jest Testing', '  jest  '),
      ).toBe(true);
    });

    it('deve retornar verdadeiro para termos de busca vazios', () => {
      expect(isContentMatchingSearch('Hello World', '')).toBe(true);
      expect(isContentMatchingSearch('', '')).toBe(true);
      expect(isContentMatchingSearch('', ' ')).toBe(true);
      expect(isContentMatchingSearch('Hello World', ' ')).toBe(true);
      expect(isContentMatchingSearch('-', '')).toBe(true);
    });
  });

  describe('compareStrings', () => {
    it('deve retornar verdadeiro para strings idênticas', () => {
      expect(compareStrings('hello', 'hello')).toBe(true);
      expect(compareStrings('Test', 'Test')).toBe(true);
    });

    it('deve retornar falso para strings diferentes', () => {
      expect(compareStrings('hello' as string, 'world')).toBe(false);
      expect(compareStrings('Test' as string, 'testing')).toBe(false);
    });

    it('deve retornar verdadeiro para strings iguais após conversão', () => {
      expect(compareStrings('hello ' as string, 'hello')).toBe(true);
      expect(compareStrings('  Test' as string, 'test')).toBe(true);
    });

    it('deve lidar com diferenças de maiúsculas/minúsculas', () => {
      expect(compareStrings('HELLO' as string, 'hello')).toBe(true);
      expect(compareStrings('TeSt' as string, 'test')).toBe(true);
    });

    it('deve lidar com espaços corretamente', () => {
      expect(compareStrings('hello world' as string, 'helloworld')).toBe(true);
      expect(compareStrings('Type Script' as string, 'typescript')).toBe(true);
    });

    it('deve lidar corretamente com caracteres acentuados', () => {
      expect(compareStrings('café' as string, 'cafe')).toBe(true);
      expect(compareStrings('jalapeño' as string, 'jalapeno')).toBe(true);
    });

    it('deve lidar corretamente com caracteres especiais', () => {
      expect(compareStrings('hello-world' as string, 'hello_world')).toBe(true);
      expect(compareStrings('Type-Script' as string, 'Type_Script')).toBe(true);
    });
  });

  describe('pluralizeWord', () => {
    it('deve retornar a forma singular se o contador for 1', () => {
      expect(pluralizeWord('apple', 'apples', 1)).toBe('apple');
      expect(pluralizeWord('car', 'cars', 1)).toBe('car');
      expect(pluralizeWord('child', 'children', 1)).toBe('child');
      expect(pluralizeWord('mouse', 'mice', 1)).toBe('mouse');
      expect(pluralizeWord('goose', 'geese', 1)).toBe('goose');
    });

    it('deve retornar a forma plural se o contador for maior que 1', () => {
      expect(pluralizeWord('apple', 'apples', 2)).toBe('apples');
      expect(pluralizeWord('car', 'cars', 3)).toBe('cars');
      expect(pluralizeWord('child', 'children', 2)).toBe('children');
      expect(pluralizeWord('mouse', 'mice', 3)).toBe('mice');
      expect(pluralizeWord('goose', 'geese', 4)).toBe('geese');
    });

    it('deve retornar a forma plural se a contagem for maior que 1, mesmo para números altos', () => {
      expect(pluralizeWord('apple', 'apples', 10)).toBe('apples');
      expect(pluralizeWord('car', 'cars', 100)).toBe('cars');
      expect(pluralizeWord('child', 'children', 50)).toBe('children');
      expect(pluralizeWord('mouse', 'mice', 75)).toBe('mice');
      expect(pluralizeWord('goose', 'geese', 20)).toBe('geese');
    });

    it('deve retornar a forma singular se o contador for menor ou igual a 1', () => {
      expect(pluralizeWord('apple', 'apples', 0)).toBe('apple');
      expect(pluralizeWord('car', 'cars', -1)).toBe('car');
      expect(pluralizeWord('child', 'children', 1)).toBe('child');
      expect(pluralizeWord('mouse', 'mice', 1)).toBe('mouse');
      expect(pluralizeWord('goose', 'geese', 1)).toBe('goose');
    });

    it('deve lidar com casos extremos com contagens zero e negativas', () => {
      expect(pluralizeWord('apple', 'apples', 0)).toBe('apple');
      expect(pluralizeWord('car', 'cars', -1)).toBe('car');
      expect(pluralizeWord('child', 'children', 0)).toBe('child');
      expect(pluralizeWord('mouse', 'mice', -2)).toBe('mouse');
      expect(pluralizeWord('goose', 'geese', 0)).toBe('goose');
    });
  });

  describe('getInitials', () => {
    it('deve retornar uma string vazia se nenhum nome completo for fornecido', () => {
      expect(getInitials('')).toBe('');
      expect(getInitials(null as any)).toBe('');
      expect(getInitials(undefined as any)).toBe('');
    });

    it('deve retornar a primeira inicial para um nome com uma única parte', () => {
      expect(getInitials('John')).toBe('J');
      expect(getInitials('Alice')).toBe('A');
    });

    it('deve retornar as iniciais do primeiro e último nome para nomes compostos', () => {
      expect(getInitials('John Doe')).toBe('JD');
      expect(getInitials('Jane Mary Smith')).toBe('JS');
      expect(getInitials('John Michael Doe')).toBe('JD');
    });

    it('deve lidar com nomes contendo espaços extras', () => {
      expect(getInitials('  John  Doe  ')).toBe('JD');
      expect(getInitials('  Jane   Mary Smith ')).toBe('JS');
    });

    it('deve lidar com nomes em diferentes formatos de maiúsculas/minúsculas', () => {
      expect(getInitials('john doe')).toBe('JD');
      expect(getInitials('Jane MARY Smith')).toBe('JS');
    });

    it('deve retornar as iniciais em letras maiúsculas', () => {
      expect(getInitials('john doe')).toBe('JD');
      expect(getInitials('Jane Smith')).toBe('JS');
    });

    it('deve lidar com casos extremos com caracteres especiais e múltiplos espaços', () => {
      expect(getInitials('  John-  Doe  ')).toBe('JD');
      expect(getInitials('Jane   M. Smith')).toBe('JS');
    });
  });

  describe('replaceBetween', () => {
    it('deve substituir o texto entre os índices informados pelo novo valor', () => {
      const text = 'Hello, world!';
      const selection = { start: 7, end: 12 };
      const value = 'everyone';

      expect(replaceBetween(text, selection, value)).toBe('Hello, everyone!');
    });

    it('deve substituir desde o início do texto', () => {
      const text = 'Hello, world!';
      const selection = { start: 0, end: 5 };
      const value = 'Hi';

      expect(replaceBetween(text, selection, value)).toBe('Hi, world!');
    });

    it('deve substituir até o final do texto', () => {
      const text = 'Hello, world!';
      const selection = { start: 7, end: 13 };
      const value = 'there';

      expect(replaceBetween(text, selection, value)).toBe('Hello, there');
    });

    it('deve lidar com substituição por uma string vazia', () => {
      const text = 'Hello, world!';
      const selection = { start: 5, end: 12 };
      const value = '';

      expect(replaceBetween(text, selection, value)).toBe('Hello!');
    });

    it('deve lidar com casos extremos de texto vazio', () => {
      const text = '';
      const selection = { start: 0, end: 0 };
      const value = 'Hello';

      expect(replaceBetween(text, selection, value)).toBe('Hello');
    });

    it('deve lidar com casos extremos onde início e fim são iguais', () => {
      const text = 'Hello, world!';
      const selection = { start: 5, end: 5 };
      const value = ' dear';

      expect(replaceBetween(text, selection, value)).toBe('Hello dear, world!');
    });
  });

  describe('isStringWebLink', () => {
    it('deve retornar verdadeiro para links HTTP válidos', () => {
      expect(isStringWebLink('http://www.example.com')).toBe(true);
      expect(isStringWebLink('https://example.com')).toBe(true);
    });

    it('deve retornar verdadeiro para links FTP válidos', () => {
      expect(isStringWebLink('ftp://ftp.example.com')).toBe(true);
    });

    it('deve retornar falso para links inválidos', () => {
      expect(isStringWebLink('http//example.com')).toBe(false);
      expect(isStringWebLink('www.example.com')).toBe(false);
      expect(isStringWebLink('example')).toBe(false);
    });

    it('deve retornar falso para endereços IP de rede privada', () => {
      expect(isStringWebLink('http://127.0.0.1')).toBe(false);
      expect(isStringWebLink('http://192.168.0.1')).toBe(false);
      expect(isStringWebLink('http://10.0.0.1')).toBe(false);
      expect(isStringWebLink('http://192.168.1.1')).toBe(false);
      expect(isStringWebLink('http://172.16.0.1')).toBe(false);
    });

    it('deve lidar corretamente com links contendo portas', () => {
      expect(isStringWebLink('http://example.com:8080')).toBe(true);
      expect(isStringWebLink('https://example.com:443')).toBe(true);
    });

    it('deve lidar corretamente com links contendo autenticação', () => {
      expect(isStringWebLink('http://user:pass@example.com')).toBe(true);
      expect(isStringWebLink('ftp://user:pass@ftp.example.com')).toBe(true);
    });

    it('deve retornar falso para strings sem protocolo', () => {
      expect(isStringWebLink('www.example.com')).toBe(false);
      expect(isStringWebLink('example.com')).toBe(false);
    });

    it('deve retornar falso para strings vazias', () => {
      expect(isStringWebLink('')).toBe(false);
    });
  });

  describe('convertString', () => {
    it('deve remover acentos e converter para minúsculas', () => {
      expect(convertString('ÀÁÂÃÄÅ')).toBe('aaaaaa');
      expect(convertString('àáâãäå')).toBe('aaaaaa');
    });

    it('deve remover espaços', () => {
      expect(convertString('a b c')).toBe('abc');
      expect(convertString('  a   b   c  ')).toBe('abc');
    });

    it('deve substituir múltiplos hífens por um único hífen', () => {
      expect(convertString('a--b---c')).toBe('a-b-c');
    });

    it('deve lidar com casos mistos', () => {
      expect(convertString('ÀÁ ÂÃ ÄÅ')).toBe('aaaaaa');
      expect(convertString('àá âã äå')).toBe('aaaaaa');
    });

    it('deve lidar com strings vazias', () => {
      expect(convertString('')).toBe('');
    });

    it('deve lidar com strings sem acentos ou espaços', () => {
      expect(convertString('abc')).toBe('abc');
    });
  });
});

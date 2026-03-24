/**
 * Substitui caracteres em uma string com base em um mapeamento fornecido.
 *
 * @param value - A string na qual os caracteres serão substituídos.
 * @param map - Um objeto que mapeia os caracteres a serem substituídos para seus respectivos valores.
 *               As chaves representam os caracteres a serem substituídos e os valores representam
 *               os caracteres que substituirão as chaves.
 * @returns A string resultante após a substituição dos caracteres.
 */
export function replaceCharacters(
  value: string,
  map: { [key: string]: string },
): string {
  // Itera sobre o mapeamento e substitui os caracteres correspondentes.
  for (const pattern in map) {
    value = value.replace(new RegExp(map[pattern], 'g'), pattern);
  }

  return value;
}

/**
 * Remove acentos e caracteres especiais de uma string.
 *
 * Esta função converte caracteres acentuados e especiais para suas formas básicas,
 * removendo acentos, cedilhas, etc.
 *
 * @param value - A string da qual acentos e caracteres especiais serão removidos.
 * @returns A string sem acentos e caracteres especiais.
 *
 * @example
 * accentsRemove('café naïve résumé'); // retorna 'cafe naive resume'
 */
export const accentsRemove = (value: string): string => {
  // Mapeia os caracteres a serem substituídos e seus equivalentes.
  const map: { [key: string]: string } = {
    '-': '_',
    A: 'À|Á|Ã|Â|Ä|Å|Æ|Ā',
    a: 'á|à|ã|â|ä|å|æ|ā',
    E: 'É|È|Ê|Ë|Ē|Ė|Ę|Ě|Ĕ',
    e: 'é|è|ê|ë|ē|ė|ę|ě|ĕ',
    I: 'Í|Ì|Î|Ï|Ī',
    i: 'í|ì|î|ï|ī',
    O: 'Ó|Ò|Ô|Õ|Ö|Ő|Ō|Ø',
    o: 'ó|ò|ô|õ|ö|ő|ō|ø',
    U: 'Ú|Ù|Û|Ü|Ų|Ű|Ů|Ū',
    u: 'ú|ù|û|ü|ų|ű|ů|ū',
    C: 'Ç',
    c: 'ç',
    N: 'Ñ',
    n: 'ñ',
  };

  return replaceCharacters(value, map);
};

/**
 * Converte caracteres especiais HTML para sua forma original na string.
 *
 * Esta função substitui entidades HTML por seus caracteres correspondentes.
 *
 * @param value - A string contendo caracteres especiais HTML.
 * @returns A string com os caracteres especiais convertidos para sua forma original.
 *
 * @example
 * specialCharactersConvert('café &amp; naïve'); // retorna 'café & naïve'
 */
export const specialCharactersConvert = (value: string): string => {
  // Mapeia os caracteres especiais HTML e suas formas originais.
  const map: { [key: string]: string } = {
    '"': '&quot;',
    "'": '&apos;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    ' ': 'nbsp;',
    '¡': '&iexcl;',
    '¢': '&cent;',
    '£': '&pound;',
    '¤': '&curren;',
    '¥': '&yen;',
    '¦': '&brvbar;',
    '§': '&sect;',
    '¨': '&uml;',
    '©': '&copy;',
    ª: '&ordf;',
    '«': '&laquo;',
    '¬': '&not;',
    _: '&shy;',
    '®': '&reg;',
    '¯': '&macr;',
    '°': '&deg;',
    '±': '&plusmn;',
    '²': '&sup2;',
    '³': '&sup3;',
    '`': '&acute;',
    µ: '&micro;',
    '¶': '&para;',
    '·': '&middot;',
    ',': '&cedil;',
    '¹': '&sup1;',
    º: '&ordm;',
    '»': '&raquo;',
    '¼': '&frac14;',
    '½': '&frac12;',
    '¾': '&frac34;',
    '¿': '&iquest;',
    x: '&times;',
    '÷': '&divide;',
    À: '&Agrave;',
    Á: '&Aacute;',
    Â: '&Acirc;',
    Ã: '&Atilde;',
    Ä: '&Auml;',
    Å: '&Aring;',
    Æ: '&AElig;',
    Ç: '&Ccedil;',
    È: '&Egrave;',
    É: '&Eacute;',
    Ê: '&Ecirc;',
    Ë: '&Euml;',
    Ì: '&Igrave;',
    Í: '&Iacute;',
    Î: '&Icirc;',
    Ï: '&Iuml;',
    Ð: '&ETH;',
    Ñ: '&Ntilde;',
    Ò: '&Ograve;',
    Ó: '&Oacute;',
    Ô: '&Ocirc;',
    Õ: '&Otilde;',
    Ö: '&Ouml;',
    Ø: '&Oslash;',
    Ù: '&Ugrave;',
    Ú: '&Uacute;',
    Û: '&Ucirc;',
    Ü: '&Uuml;',
    Ý: '&Yacute;',
    Þ: '&THORN;',
    ß: '&szlig;',
    à: '&agrave;',
    á: '&aacute;',
    â: '&acirc;',
    ã: '&atilde;',
    ä: '&auml;',
    å: '&aring;',
    æ: '&aelig;',
    ç: '&ccedil;',
    è: '&egrave;',
    é: '&eacute;',
    ê: '&ecirc;',
    ë: '&euml;',
    ì: '&igrave;',
    í: '&iacute;',
    î: '&icirc;',
    ï: '&iuml;',
    ð: '&eth;',
    ñ: '&ntilde;',
    ò: '&ograve;',
    ó: '&oacute;',
    ô: '&ocirc;',
    õ: '&otilde;',
    ö: '&ouml;',
    ø: '&oslash;',
    ù: '&ugrave;',
    ú: '&uacute;',
    û: '&ucirc;',
    ü: '&uuml;',
    ý: '&yacute;',
    þ: '&thorn;',
    ÿ: '&yuml;',
  };

  return replaceCharacters(value, map);
};

/**
 * Converte a primeira letra de um texto para maiúsculas com opção de capitalizar cada palavra.
 *
 * @param text - O texto a ser convertido
 * @param everyWord - Se verdadeiro, capitaliza a primeira letra de cada palavra ou após hífens e pontos. Padrão é falso.
 * @returns O texto convertido em maiúsculas. Retorna uma string vazia se o texto for vazio ou nulo.
 *
 */
export function uppercaseFirst(text: string, everyWord = false) {
  if (!text) {
    return '';
  }

  const lowerText = text.toLowerCase();

  if (everyWord) {
    return lowerText.replace(/(^|[ -\.])[a-záàâãéèêíïóôõöúçñ]/g, (s) =>
      s.toUpperCase(),
    );
  }

  return lowerText.charAt(0).toUpperCase() + lowerText.slice(1);
}

/**
 * Obtém as iniciais das primeiras e últimas letras do nome de um nome completo.
 *
 * Esta função divide o nome em partes, pega a primeira letra do primeiro nome e a primeira letra do último nome.
 *
 * @param name - O nome completo.
 * @returns As iniciais das primeiras e últimas letras do nome, ou uma string vazia se o nome for inválido.
 *
 * @example
 * getInitials('João Silva'); // retorna 'JS'
 * getInitials('Maria Santos Pereira'); // retorna 'MP'
 */
export const getInitials = (fullName: string) => {
  if (!fullName) {
    return '';
  }

  const nameParts = fullName.trim().split(/\s+/);
  const [firstName, ...rest] = nameParts;
  const lastName = rest.pop() || '';
  const firstLetter = firstName[0] ?? '';
  const lastLetter = lastName[0] ?? '';

  return (firstLetter + lastLetter).toUpperCase();
};

/**
 * Extrai e formata um nome completo em um formato abreviado.
 *
 * A função processa uma string de nome removendo espaços em excesso e
 * preposições comuns (des, dos, das, de, e), retornando o nome formatado
 * com a inicial do segundo nome.
 *
 * @param name - O nome completo a ser formatado
 * @returns O nome formatado. Possíveis retornos:
 *   - Se apenas 1 parte: retorna a primeira parte
 *   - Se 2 partes: retorna "Primeiro Segundo"
 *   - Se 3+ partes: retorna "Primeiro I. Último" (onde I é a inicial do segundo)
 *
 * @example
 * extractFormattedName("João dos Santos Silva")
 * // retorna "João S. Silva"
 *
 * @example
 * extractFormattedName("Maria de Jesus")
 * // retorna "Maria Jesus"
 *
 * @example
 * extractFormattedName("Pedro")
 * // retorna "Pedro"
 */
export const extractFormattedName = (name: string) => {
  // Normaliza espaços múltiplos em um único espaço, remove preposições comuns
  // (des, dos, das, de, e) e divide o nome em partes
  const nameParts = name
    .replace(/\sdes?\s|\sdos?\s|\sdas?\s|\se\s/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ');

  // Se houver apenas uma parte no nome, retorna ela formatada
  if (nameParts.length < 2) {
    return nameParts[0] || '';
  }

  // Extrai o primeiro nome e a inicial do segundo nome
  const [firstName, secondName] = nameParts;
  const secondNameLetter = secondName[0];

  // Obtém o último nome (último elemento do array)
  const lastName = nameParts[nameParts.length - 1];

  // Se houver apenas 2 partes, retorna "Primeiro Último"
  if (nameParts.length < 3) {
    return `${uppercaseFirst(firstName)} ${uppercaseFirst(lastName)}`;
  }

  // Se houver 3 ou mais partes, retorna "Primeiro I. Último"
  return `${uppercaseFirst(firstName)} ${secondNameLetter.toUpperCase()}. ${uppercaseFirst(lastName)}`;
};

/**
 * Remove acentos, converte para minúsculas e remove espaços de uma string.
 *
 * Esta função combina remoção de acentos, conversão para minúsculas e remoção de espaços.
 *
 * @param value - A string de entrada.
 * @returns Uma string modificada com acentos removidos, convertida para minúsculas e espaços removidos.
 *
 * @example
 * convertString('Café naïve'); // retorna 'cafenaive'
 */
export const convertString = (value: string): string =>
  accentsRemove(value.toLowerCase().replace(/\s/g, '')).replace(/-+/g, '-');

/**
 * Verifica se uma string de busca está presente na string de conteúdo, ignorando maiúsculas, acentos e espaços.
 *
 * Esta função converte ambas as strings usando convertString e verifica se a busca está incluída no conteúdo.
 *
 * @param content - A string de conteúdo a ser pesquisada.
 * @param search - A string de busca a ser localizada no conteúdo.
 * @returns `true` se a string de busca for encontrada no conteúdo, `false` caso contrário.
 *
 * @example
 * isContentMatchingSearch('Café naïve', 'cafe'); // retorna true
 * isContentMatchingSearch('Hello world', 'goodbye'); // retorna false
 */
export const isContentMatchingSearch = (
  content: string,
  search: string,
): boolean => convertString(content).includes(convertString(search));

/**
 * Compara duas strings ignorando maiúsculas, acentos e espaços.
 *
 * Esta função converte ambas as strings usando convertString e as compara.
 *
 * @param a - A primeira string a ser comparada.
 * @param b - A segunda string a ser comparada.
 * @returns `true` se as strings forem iguais após remover acentos, converter para minúsculas e remover espaços, caso contrário `false`.
 *
 * @example
 * compareStrings('Café', 'cafe'); // retorna true
 * compareStrings('Hello', 'world'); // retorna false
 */
export const compareStrings = <T extends string>(a: T, b: NoInfer<T>) => {
  return convertString(a) === convertString(b);
};

/**
 * Retorna a forma apropriada de uma palavra baseada na contagem fornecida.
 *
 * Esta função retorna a forma singular se a contagem for 1, caso contrário a forma plural.
 *
 * @param singularWord - A forma singular da palavra.
 * @param pluralWord - A forma plural da palavra.
 * @param count - A contagem para determinar qual forma usar.
 * @returns A forma singular se a contagem for maior que 1, caso contrário a forma plural.
 *
 * @example
 * pluralizeWord('item', 'items', 1); // retorna 'item'
 * pluralizeWord('item', 'items', 2); // retorna 'items'
 */
export const pluralizeWord = (
  singularWord: string,
  pluralWord: string,
  count: number,
) => (count > 1 ? pluralWord : singularWord);

/**
 * Substitui uma porção de uma string entre os índices inicial e final especificados por um novo valor.
 *
 * Esta função substitui o texto entre start e end pelo valor fornecido.
 *
 * @param text - A string original.
 * @param selection - Um objeto contendo os índices inicial e final da porção a ser substituída.
 * @param selection.start - O índice inicial da porção a ser substituída.
 * @param selection.end - O índice final da porção a ser substituída.
 * @param value - O novo valor a ser inserido entre os índices especificados.
 * @returns A string modificada com a porção especificada substituída pelo novo valor.
 *
 * @example
 * replaceBetween('Hello world', { start: 6, end: 11 }, 'TypeScript'); // retorna 'Hello TypeScript'
 */
export const replaceBetween = (
  text: string,
  selection: { start: number; end: number },
  value: string,
) => text.substring(0, selection.start) + value + text.substring(selection.end);

/**
 * Checks if the given text is a valid web link.
 *
 * This function uses a regular expression to validate the format of the input string
 * as a web link. It supports protocols such as HTTP, HTTPS, and FTP, and includes
 * validation for IP addresses, hostnames, domain names, and optional port numbers.
 *
 * @param text - The input string to be validated as a web link.
 * @returns `true` if the input string is a valid web link, `false` otherwise.
 */
export const isStringWebLink = (text: string): boolean => {
  const regexValidator = new RegExp(
    '^' +
      // protocol identifier
      '(?:(?:https?|ftp)://)' +
      // user:pass authentication
      '(?:\\S+(?::\\S*)?@)?' +
      '(?:' +
      // IP address exclusion
      // private & local networks
      '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
      '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
      '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
      // IP address dotted notation octets
      // excludes loopback network 0.0.0.0
      // excludes reserved space >= 224.0.0.0
      // excludes network & broacast addresses
      // (first & last IP address of each class)
      '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
      '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
      '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
      '|' +
      // host name
      '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +
      // domain name
      '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' +
      // TLD identifier
      '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +
      // TLD may end with dot
      '\\.?' +
      ')' +
      // port number
      '(?::\\d{2,5})?' +
      // resource path
      '(?:[/?#]\\S*)?' +
      '$',
    'i',
  );

  const pattern = regexValidator;
  return pattern.test(text);
};

// TODO Remover essas funções futuramente

/**
 * @deprecated Use **uppercase** no lugar
 */
export const ucfirst = (word: string) => uppercaseFirst(word);
/**
 * @deprecated Use **uppercase** no lugar
 */
export const capitalizeFirstLetter = (word: string) => uppercaseFirst(word);
/**
 * @deprecated Use **uppercase** no lugar
 */
export const ucwords = (text: string) => uppercaseFirst(text, true);
/**
 * @deprecated Use **uppercase** no lugar
 */
export const capitalizeAllFirstLetter = (text: string) =>
  uppercaseFirst(text, true);

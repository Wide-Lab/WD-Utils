/**
 * Remove accents and especial characters from a string
 * @param value - The string from which accents and especial characters will be removed
 * @returns The string without accents and especial characters
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

  // Itera sobre o mapeamento e substitui os caracteres correspondentes.
  for (const pattern in map) {
    value = value.replace(new RegExp(map[pattern], 'g'), pattern);
  }

  return value;
};

/**
 * Converts HTML special characters to their original form in the string
 * @param value - The string containing HTML special characters
 * @returns The string with the special character converted to their original form
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

  // Itera sobre o mapeamento e substitui os caracteres especiais HTML por suas formas originais.
  for (var pattern in map) {
    value = value.replace(new RegExp(map[pattern], 'g'), pattern);
  }

  return value;
};

/**
 * Capitalize the first letter of the word or sentence and lowercase the rest
 * @param word - The word or setence to format
 * @returns The word or setence whit the first letter capitalized and the rest in lowercase
 */
export const ucfirst = (word: string) =>
  !word ? '' : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

/**
 * Capitalizes the first letter of each word in a text.
 *
 * @param text - The text to be formatted.
 * @returns The text with the first letter of each word capitalized.
 */
export const ucwords = (text: string) =>
  (text || '')
    .toLowerCase()
    .replace(/(^|[ -])[a-záàâãéèêíïóôõöúçñ]/g, (s) => s.toUpperCase());

/**
 * Get the initial letters of the first name and last name from a full name.
 *
 * @param name - The full name.
 * @returns The initial letters of the first name and last name, or an empty string if the name is invalid.
 */
export const getNameInitialLetters = (name: string) => {
  const nameParts = name.toUpperCase().trim().split(' ');

  const firstLetter = nameParts[0][0];

  if (nameParts.length < 2) {
    return firstLetter || '';
  }

  const lastName = nameParts[nameParts.length - 1];
  const lastLetter = lastName[0];

  return firstLetter + lastLetter;
};

/**
 * Get the first name followed by the first letter of the last name from a full name.
 *
 * @param name - The full name.
 * @returns The first name and the first letter of the last name, or an empty string if the name is invalid.
 */
export const getFirstName = (name: string) => {
  const nameParts = name.trim().split(' ');

  if (nameParts.length < 2) {
    return nameParts[0] || '';
  }

  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  let lastLetter = lastName[0];

  if (!/[a-zA-Z]/g.test(lastLetter)) {
    const previousName = nameParts[nameParts.length - 2];
    lastLetter =
      previousName && previousName !== firstName ? previousName[0] : '';
  }

  lastLetter = lastLetter.toUpperCase();

  return `${firstName} ${lastLetter}.`;
};

/**
 * Get the first and second name followed by the first letter of the last name from a full name.
 * If there is just two names get the first name followed  by the first letter of the last name from a full name.
 *
 * @param name - The full name.
 * @returns The first and second name and the first letter of the last name, or an empty string if the name is invalid.
 */
export const getFirstSecondName = (name: string) => {
  const nameParts = name.trim().replace(/\s+/g, ' ').split(' ');

  if (nameParts.length < 2) {
    return nameParts[0] || '';
  }

  const [firstName, secondName] = nameParts;
  const lastName = nameParts[nameParts.length - 1];
  const lastLetter = lastName[0];

  if (secondName === lastName) {
    return `${firstName} ${lastLetter}.`;
  }

  return `${firstName} ${secondName} ${lastLetter}.`;
};

/**
 * Removes accents, converts to lowercase, and removes spaces from a string.
 *
 * @param value - The input string.
 * @returns A modified string with accents removed, converted to lowercase, and spaces removed.
 */
export const convertString = (value: string): string =>
  accentsRemove(value.toLowerCase().replace(/\s/g, '')).replace(/-+/g, '-');

/**
 * Check if a search string is present in the content string, ignoring case, accents, and spaces.
 *
 * @param content - The content string to search within.
 * @param search - The search string to look for in the content.
 * @returns `true` if the search string is found in the content, `false` otherwise.
 */
export const isContentMatchingSearch = (
  content: string,
  search: string
): boolean => convertString(content).includes(convertString(search));

/**
 * Compare two strings while ignoring case, accents, and spaces.
 *
 * @param a - The first string to compare.
 * @param b - The second string to compare.
 * @returns `true` if the strings are equal after removing accents, converting to lowercase, and spaces, otherwise `false`.
 */
export const compareStrings = <T extends string>(a: T, b: T) => {
  return convertString(a) === convertString(b);
};

export const pluralizeWord = (
  singularWord: string,
  pluralWord: string,
  count: number
) => (count > 1 ? pluralWord : singularWord);

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

export const replaceBetween = (
  text: string,
  selection: { start: number; end: number },
  value: string
) => text.substring(0, selection.start) + value + text.substring(selection.end);

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
    'i'
  );

  const pattern = regexValidator;
  return pattern.test(text);
};

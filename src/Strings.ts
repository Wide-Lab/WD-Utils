/**
 * Remove accents and especial characters from a string
 * @param value - The string from which accents and especial characters will be removed
 * @returns The string without accents and especial characters
 */
export const accentsRemove = (value: string): string => {
  // Mapeia os caracteres a serem substituídos e seus equivalentes.
  const map: { [key: string]: string } = {
    "-": "_",
    A: "À|Á|Ã|Â|Ä|Å|Æ|Ā",
    a: "á|à|ã|â|ä|å|æ|ā",
    E: "É|È|Ê|Ë|Ē|Ė|Ę|Ě|Ĕ",
    e: "é|è|ê|ë|ē|ė|ę|ě|ĕ",
    I: "Í|Ì|Î|Ï|Ī",
    i: "í|ì|î|ï|ī",
    O: "Ó|Ò|Ô|Õ|Ö|Ő|Ō|Ø",
    o: "ó|ò|ô|õ|ö|ő|ō|ø",
    U: "Ú|Ù|Û|Ü|Ų|Ű|Ů|Ū",
    u: "ú|ù|û|ü|ų|ű|ů|ū",
    C: "Ç",
    c: "ç",
    N: "Ñ",
    n: "ñ",
  };

  // Itera sobre o mapeamento e substitui os caracteres correspondentes.
  for (const pattern in map) {
    value = value.replace(new RegExp(map[pattern], "g"), pattern);
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
    '"': "&quot;",
    "'": "&apos;",
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    " ": "nbsp;",
    "¡": "&iexcl;",
    "¢": "&cent;",
    "£": "&pound;",
    "¤": "&curren;",
    "¥": "&yen;",
    "¦": "&brvbar;",
    "§": "&sect;",
    "¨": "&uml;",
    "©": "&copy;",
    ª: "&ordf;",
    "«": "&laquo;",
    "¬": "&not;",
    _: "&shy;",
    "®": "&reg;",
    "¯": "&macr;",
    "°": "&deg;",
    "±": "&plusmn;",
    "²": "&sup2;",
    "³": "&sup3;",
    "`": "&acute;",
    µ: "&micro;",
    "¶": "&para;",
    "·": "&middot;",
    ",": "&cedil;",
    "¹": "&sup1;",
    º: "&ordm;",
    "»": "&raquo;",
    "¼": "&frac14;",
    "½": "&frac12;",
    "¾": "&frac34;",
    "¿": "&iquest;",
    x: "&times;",
    "÷": "&divide;",
    À: "&Agrave;",
    Á: "&Aacute;",
    Â: "&Acirc;",
    Ã: "&Atilde;",
    Ä: "&Auml;",
    Å: "&Aring;",
    Æ: "&AElig;",
    Ç: "&Ccedil;",
    È: "&Egrave;",
    É: "&Eacute;",
    Ê: "&Ecirc;",
    Ë: "&Euml;",
    Ì: "&Igrave;",
    Í: "&Iacute;",
    Î: "&Icirc;",
    Ï: "&Iuml;",
    Ð: "&ETH;",
    Ñ: "&Ntilde;",
    Ò: "&Ograve;",
    Ó: "&Oacute;",
    Ô: "&Ocirc;",
    Õ: "&Otilde;",
    Ö: "&Ouml;",
    Ø: "&Oslash;",
    Ù: "&Ugrave;",
    Ú: "&Uacute;",
    Û: "&Ucirc;",
    Ü: "&Uuml;",
    Ý: "&Yacute;",
    Þ: "&THORN;",
    ß: "&szlig;",
    à: "&agrave;",
    á: "&aacute;",
    â: "&acirc;",
    ã: "&atilde;",
    ä: "&auml;",
    å: "&aring;",
    æ: "&aelig;",
    ç: "&ccedil;",
    è: "&egrave;",
    é: "&eacute;",
    ê: "&ecirc;",
    ë: "&euml;",
    ì: "&igrave;",
    í: "&iacute;",
    î: "&icirc;",
    ï: "&iuml;",
    ð: "&eth;",
    ñ: "&ntilde;",
    ò: "&ograve;",
    ó: "&oacute;",
    ô: "&ocirc;",
    õ: "&otilde;",
    ö: "&ouml;",
    ø: "&oslash;",
    ù: "&ugrave;",
    ú: "&uacute;",
    û: "&ucirc;",
    ü: "&uuml;",
    ý: "&yacute;",
    þ: "&thorn;",
    ÿ: "&yuml;",
  };

  // Itera sobre o mapeamento e substitui os caracteres especiais HTML por suas formas originais.
  for (var pattern in map) {
    value = value.replace(new RegExp(map[pattern], "g"), pattern);
  }

  return value;
};

/**
 * Capitalize the first letter of the word or sentence and lowercase the rest
 * @param word - The word or setence to format
 * @returns The word or setence whit the first letter capitalized and the rest in lowercase
 */
export const ucfirst = (word: string) =>
  !word ? "" : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

export const capitalizeFirstLetter = ucfirst;

/**
 * Capitalizes the first letter of each word in a text.
 *
 * @param text - The text to be formatted.
 * @returns The text with the first letter of each word capitalized.
 */
export const ucwords = (text: string) =>
  (text || "")
    .toLowerCase()
    .replace(/(^|[ -\.])[a-záàâãéèêíïóôõöúçñ]/g, (s) => s.toUpperCase());

export const capitalizeAllFirstLetter = ucwords;

/**
 * Get the initial letters of the first name and last name from a full name.
 *
 * @param name - The full name.
 * @returns The initial letters of the first name and last name, or an empty string if the name is invalid.
 */
export const getInitials = (fullName: string) => {
  if (!fullName) {
    return "";
  }

  const nameParts = fullName.trim().split(/\s+/);
  const [firstName, ...rest] = nameParts;
  const lastName = rest.pop() || "";
  const firstLetter = firstName[0] ?? "";
  const lastLetter = lastName[0] ?? "";

  return (firstLetter + lastLetter).toUpperCase();
};

/**
 * Extracts and formats the first and second names from a given full name string.
 *
 * @param name - The full name string to process.
 * @returns A formatted string containing the first name and either the second name or the initial of the last name.
 *
 * @example
 * ```typescript
 * getFirstSecondName("John Doe Smith"); // "John D. Smith"
 * getFirstSecondName("Jane"); // "Jane"
 * getFirstSecondName("Alice Bob"); // "Alice B."
 * getFirstSecondName("Charlie Brown Brown"); // "Charlie B."
 * ```
 */
export const extractFormattedName = (name: string) => {
  const nameParts = name.replace(/\s+/g, " ").trim().split(" ");

  if (nameParts.length < 2) {
    return nameParts[0] || "";
  }

  const [firstName, secondName] = nameParts;
  const secondNameLetter = secondName[0];
  const lastName = nameParts[nameParts.length - 1];

  if (nameParts.length < 3) {
    return `${ucfirst(firstName)} ${secondNameLetter.toUpperCase()}.`;
  }

  return `${ucfirst(firstName)} ${secondNameLetter.toUpperCase()}. ${lastName}`;
};

/**
 * Removes accents, converts to lowercase, and removes spaces from a string.
 *
 * @param value - The input string.
 * @returns A modified string with accents removed, converted to lowercase, and spaces removed.
 */
export const convertString = (value: string): string =>
  accentsRemove(value.toLowerCase().replace(/\s/g, "")).replace(/-+/g, "-");

/**
 * Check if a search string is present in the content string, ignoring case, accents, and spaces.
 *
 * @param content - The content string to search within.
 * @param search - The search string to look for in the content.
 * @returns `true` if the search string is found in the content, `false` otherwise.
 */
export const isContentMatchingSearch = (
  content: string,
  search: string,
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

/**
 * Returns the appropriate form of a word based on the given count.
 *
 * @param singularWord - The singular form of the word.
 * @param pluralWord - The plural form of the word.
 * @param count - The count to determine which form to use.
 * @returns The singular form if the count is 1, otherwise the plural form.
 */
export const pluralizeWord = (
  singularWord: string,
  pluralWord: string,
  count: number,
) => (count > 1 ? pluralWord : singularWord);

/**
 * Replaces a portion of a string between the specified start and end indices with a new value.
 *
 * @param text - The original string.
 * @param selection - An object containing the start and end indices of the portion to be replaced.
 * @param selection.start - The starting index of the portion to be replaced.
 * @param selection.end - The ending index of the portion to be replaced.
 * @param value - The new value to insert between the specified indices.
 * @returns The modified string with the specified portion replaced by the new value.
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
    "^" +
      // protocol identifier
      "(?:(?:https?|ftp)://)" +
      // user:pass authentication
      "(?:\\S+(?::\\S*)?@)?" +
      "(?:" +
      // IP address exclusion
      // private & local networks
      "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
      "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
      "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
      // IP address dotted notation octets
      // excludes loopback network 0.0.0.0
      // excludes reserved space >= 224.0.0.0
      // excludes network & broacast addresses
      // (first & last IP address of each class)
      "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
      "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
      "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
      "|" +
      // host name
      "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
      // domain name
      "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
      // TLD identifier
      "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
      // TLD may end with dot
      "\\.?" +
      ")" +
      // port number
      "(?::\\d{2,5})?" +
      // resource path
      "(?:[/?#]\\S*)?" +
      "$",
    "i",
  );

  const pattern = regexValidator;
  return pattern.test(text);
};

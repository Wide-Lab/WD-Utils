import { truncDecimals } from './Numbers';

/**
 * A mapping of file extensions to their corresponding MIME types.
 *
 * This object provides a comprehensive list of common file extensions
 * and their associated MIME types, which can be used for file type
 * identification and handling in various applications.
 *
 * Example usage:
 * ```typescript
 * const mimeType = types['jpg']; // Returns 'image/jpeg'
 * ```
 *
 * Supported file extensions include, but are not limited to:
 * - Video formats: `3g2`, `3gp`, `avi`, `mp4`, `webm`, etc.
 * - Audio formats: `aac`, `mp3`, `wav`, `ogg`, etc.
 * - Image formats: `bmp`, `gif`, `jpeg`, `png`, `svg`, etc.
 * - Document formats: `doc`, `pdf`, `txt`, `xlsx`, etc.
 * - Archive formats: `zip`, `rar`, `7z`, etc.
 * - Web formats: `html`, `css`, `js`, `json`, etc.
 *
 * > It's crucial that the order of the items in the list is not changed.
 * @constant
 */
const mimeTypesExtensions = {
  '3g2': 'video/3gpp2',
  '3gp': 'video/3gpp',
  '7z': 'application/x-7z-compressed',
  aac: 'audio/aac',
  abw: 'application/x-abiword',
  arc: 'application/x-freearc',
  avi: 'video/x-msvideo',
  avif: 'image/avif',
  azw: 'application/vnd.amazon.ebook',
  bin: 'application/octet-stream',
  bmp: 'image/bmp',
  bz: 'application/x-bzip',
  bz2: 'application/x-bzip2',
  cda: 'application/x-cdf',
  cmx: 'image/x-cmx',
  cod: 'image/cis-cod',
  csh: 'application/x-csh',
  css: 'text/css',
  csv: 'text/csv',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  eot: 'application/vnd.ms-fontobject',
  epub: 'application/epub+zip',
  gif: 'image/gif',
  gz: 'application/gzip',
  html: 'text/html',
  htm: 'text/html',
  ico: 'image/x-icon',
  ics: 'text/calendar',
  ief: 'image/ief',
  jar: 'application/java-archive',
  jfi: 'image/pipeg',
  jpg: 'image/jpeg',
  jpe: 'image/jpeg',
  jpeg: 'image/jpeg',
  js: 'text/javascript',
  json: 'application/json',
  jsonld: 'application/ld+json',
  mid: 'audio/midi',
  midi: 'audio/midi',
  mjs: 'text/javascript',
  mp3: 'audio/mpeg',
  mp4: 'video/mp4',
  mpeg: 'video/mpeg',
  mpkg: 'application/vnd.apple.installer+xml',
  odp: 'application/vnd.oasis.opendocument.presentation',
  ods: 'application/vnd.oasis.opendocument.spreadsheet',
  odt: 'application/vnd.oasis.opendocument.text',
  oga: 'audio/ogg',
  ogv: 'video/ogg',
  ogx: 'application/ogg',
  opus: 'audio/opus',
  otf: 'font/otf',
  pbm: 'image/x-portable-bitmap',
  pdf: 'application/pdf',
  pgm: 'image/x-portable-graymap',
  php: 'application/x-httpd-php',
  png: 'image/png',
  pnm: 'image/x-portable-anymap',
  ppm: 'image/x-portable-pixmap',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  rar: 'application/vnd.rar',
  ras: 'image/x-cmu-raster',
  rgb: 'image/x-rgb',
  rtf: 'application/rtf',
  sh: 'application/x-sh',
  svg: 'image/svg+xml',
  tar: 'application/x-tar',
  tif: 'image/tiff',
  tiff: 'image/tiff',
  ts: 'video/mp2t',
  ttf: 'font/ttf',
  txt: 'text/plain',
  vsd: 'application/vnd.visio',
  wav: 'audio/wav',
  weba: 'audio/webm',
  webm: 'video/webm',
  webp: 'image/webp',
  woff: 'font/woff',
  woff2: 'font/woff2',
  xbm: 'image/x-xbitmap',
  xhtml: 'application/xhtml+xml',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  xml: 'application/xml',
  xpm: 'image/x-xpixmap',
  xul: 'application/vnd.mozilla.xul+xml',
  xwd: 'image/x-xwindowdump',
  zip: 'application/zip',
};

/**
 * Converte a extensão de um arquivo em seu tipo MIME correspondente.
 * Converts a file's extension to its corresponding MIME type
 * @param extension - The file's extension
 * @returns O tipo MIME correspondente à extensão ou 'text/plain' se não for encontrado.
 * @returns The MIME type corresponding to the extension or 'text/plain' if not found
 */
export const extensionToMimeType = (extension: string): string => {
  const typeValue =
    mimeTypesExtensions[extension as keyof typeof mimeTypesExtensions];

  if (typeValue) {
    return typeValue;
  }

  return 'text/plain';
};

/**
 * Converts a MIME type to its corresponding file extension.
 *
 * This function iterates through a mapping of file extensions to MIME types
 * and returns the file extension that matches the provided MIME type. If no
 * match is found, it attempts to extract the extension from the MIME type
 * string by splitting it at the '/' character.
 *
 * @param mimeType - The MIME type to convert (e.g., "image/png").
 * @returns The corresponding file extension (e.g., "png"). If no match is found,
 *          the function returns the part of the MIME type after the '/' character.
 */
export const mimeTypeToExtension = (mimeType: string): string => {
  for (const [extension, type] of Object.entries(mimeTypesExtensions)) {
    if (type === mimeType) {
      return extension;
    }
  }

  const [mime, ext] = mimeType.split('/');

  return ext;
};

/**
 * Gets a extension of a file name
 * @param fileName - The name of the file to be converted
 * @returns The file extension (without the dot), or an empty string if there is no extension
 */
export const getFileNameExtension = (fileName: string) => {
  const fileNameParts = fileName.split('.');

  if (fileNameParts.length < 2) {
    return '';
  }

  const ext = fileNameParts.pop();
  return ext || '';
};

/**
 * Converts a file extension to its corresponding Uniform Type Identifier (UTI).
 *
 * @param extension - The file extension (e.g., 'pdf', 'doc', 'xlsx').
 * @returns The corresponding UTI string if the extension is recognized, otherwise `undefined`.
 *
 * @example
 * ```typescript
 * const uti = extensionToUTI('pdf');
 * console.log(uti); // Output: 'com.adobe.pdf'
 * ```
 */
export const extensionToUTI = (extension: string) => {
  const UTItypes = {
    pdf: 'com.adobe.pdf',
    doc: 'com.microsoft.word.doc',
    docx: 'com.microsoft.word.document',
    xls: 'com.microsoft.excel.xls',
    xlsx: 'com.microsoft.excel.spreadsheet',
    ppt: 'com.microsoft.powerpoint.ppt',
    pptx: 'com.microsoft.powerpoint.presentation',
    mobi: 'com.amazon.mobi',
  };

  const extensionTyped = extension as keyof typeof UTItypes;

  const typeValue = UTItypes[extensionTyped];

  if (typeValue) {
    return typeValue;
  }
};

/**
 * Gets a Blob object from the URI of a file
 * @param fileUri - The URI of the file to be converted to Blob
 * @returns A Blob object representing the file
 */
export const getBlob = async (fileUri: string) => {
  const resp = await fetch(fileUri);
  return await resp.blob();
};

/**
 * Formats a byte count into a human-readable string using 1024-based units.
 *
 * @param bytes - The number of bytes to format. Expected to be a non-negative number.
 * @returns A string containing the numeric value rounded to two decimal places
 *          (trailing zeros trimmed) followed by a space and the unit ("B", "KB", "MB", "GB").
 *
 * @remarks
 * - Returns "0 B" when `bytes` is 0.
 * - Uses 1024 as the unit base.
 * - Supported units: B, KB, MB, GB. Values that require units larger than GB may yield an undefined unit suffix
 *   because only four units are defined in the implementation.
 *
 * @example
 * formatFileSize(0);        // "0 B"
 * @example
 * formatFileSize(1024);     // "1 KB"
 * @example
 * formatFileSize(1536);     // "1.5 KB"
 * @example
 * formatFileSize(1048576);  // "1 MB"
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return truncDecimals(bytes / Math.pow(k, i)) + ' ' + sizes[i];
};

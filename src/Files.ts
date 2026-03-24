import { truncDecimals } from './Numbers';

/**
 * Um mapeamento de extensões de arquivo para seus tipos MIME correspondentes.
 *
 * Este objeto fornece uma lista abrangente de extensões de arquivo comuns
 * e seus tipos MIME associados, que podem ser usados para identificação de tipo de arquivo
 * e manipulação em várias aplicações.
 *
 * Exemplo de uso:
 * ```typescript
 * const mimeType = types['jpg']; // Retorna 'image/jpeg'
 * ```
 *
 * Extensões de arquivo suportadas incluem, mas não se limitam a:
 * - Formatos de vídeo: `3g2`, `3gp`, `avi`, `mp4`, `webm`, etc.
 * - Formatos de áudio: `aac`, `mp3`, `wav`, `ogg`, etc.
 * - Formatos de imagem: `bmp`, `gif`, `jpeg`, `png`, `svg`, etc.
 * - Formatos de documento: `doc`, `pdf`, `txt`, `xlsx`, etc.
 * - Formatos de arquivo: `zip`, `rar`, `7z`, etc.
 * - Formatos web: `html`, `css`, `js`, `json`, etc.
 *
 * > É crucial que a ordem dos itens na lista não seja alterada.
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
 *
 * Esta função busca no mapeamento de tipos MIME a extensão fornecida e retorna o tipo correspondente.
 * Se não encontrar, retorna 'text/plain'.
 *
 * @param extension - A extensão do arquivo (sem ponto).
 * @returns O tipo MIME correspondente à extensão ou 'text/plain' se não for encontrado.
 *
 * @example
 * extensionToMimeType('jpg'); // retorna 'image/jpeg'
 * extensionToMimeType('txt'); // retorna 'text/plain'
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
 * Converte um tipo MIME em sua extensão de arquivo correspondente.
 *
 * Esta função itera através de um mapeamento de extensões de arquivo para tipos MIME
 * e retorna a extensão de arquivo que corresponde ao tipo MIME fornecido. Se não encontrar correspondência,
 * tenta extrair a extensão da string do tipo MIME dividindo-a em '/'.
 *
 * @param mimeType - O tipo MIME a ser convertido (ex: "image/png").
 * @returns A extensão de arquivo correspondente (ex: "png"). Se não encontrar correspondência,
 *          a função retorna a parte do tipo MIME após a '/'.
 *
 * @example
 * mimeTypeToExtension('image/png'); // retorna 'png'
 * mimeTypeToExtension('application/json'); // retorna 'json'
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
 * Obtém a extensão de um nome de arquivo.
 *
 * Esta função divide o nome do arquivo por pontos e retorna a última parte como extensão,
 * removendo o ponto. Se não houver extensão, retorna uma string vazia.
 *
 * @param fileName - O nome do arquivo a ser convertido.
 * @returns A extensão do arquivo (sem o ponto), ou uma string vazia se não houver extensão.
 *
 * @example
 * getFileNameExtension('document.pdf'); // retorna 'pdf'
 * getFileNameExtension('image.png'); // retorna 'png'
 * getFileNameExtension('file'); // retorna ''
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
 * Converte uma extensão de arquivo em seu Identificador de Tipo Uniforme (UTI) correspondente.
 *
 * Esta função mapeia extensões de arquivo comuns para seus UTIs correspondentes,
 * usados principalmente em sistemas Apple.
 *
 * @param extension - A extensão do arquivo (ex: 'pdf', 'doc', 'xlsx').
 * @returns A string UTI correspondente se a extensão for reconhecida, caso contrário `undefined`.
 *
 * @example
 * extensionToUTI('pdf'); // retorna 'com.adobe.pdf'
 * extensionToUTI('docx'); // retorna 'com.microsoft.word.document'
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
 * Converte a URI de um arquivo em um Blob utilizando fetch.
 *
 * Esta função faz uma requisição fetch para a URI fornecida e retorna o conteúdo como um Blob.
 *
 * @param uri Caminho ou URL do arquivo.
 * @returns Promise contendo o Blob correspondente ao conteúdo baixado.
 * @throws Erro caso o fetch falhe ou a URI seja inválida.
 *
 * @example
 * getBlobFromUri('https://example.com/image.png'); // retorna Promise<Blob>
 */
export const getBlobFromUri = async (uri: string) => {
  if (!uri || typeof uri !== 'string') {
    throw new Error('URI inválida: é necessário fornecer uma string.');
  }

  const response = await fetch(uri);

  if (!response.ok) {
    throw new Error(
      `Falha ao buscar o arquivo: ${response.status} ${response.statusText}`,
    );
  }

  return response.blob();
};

/**
 * @deprecated Use getBlobFromUri ao invés dessa
 */
export const getBlob = getBlobFromUri;

/**
 * Formata um tamanho de arquivo em bytes em uma string legível por humanos usando unidades baseadas em 1024.
 *
 * Esta função converte um número de bytes em uma string com o valor numérico arredondado para duas casas decimais
 * (zeros à direita removidos) seguido de um espaço e da unidade ("B", "KB", "MB", "GB").
 *
 * @param bytes - O número de bytes a ser formatado. Espera-se um número não negativo.
 * @returns Uma string contendo o valor numérico arredondado para duas casas decimais
 *          (zeros à direita removidos) seguido de um espaço e da unidade ("B", "KB", "MB", "GB").
 *
 * @remarks
 * - Retorna "0 B" quando `bytes` é 0.
 * - Usa 1024 como base da unidade.
 * - Unidades suportadas: B, KB, MB, GB. Valores que requerem unidades maiores que GB podem resultar em um sufixo de unidade indefinido
 *   porque apenas quatro unidades são definidas na implementação.
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

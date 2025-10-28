import {
  extensionToMimeType,
  extensionToUTI,
  getFileNameExtension,
  mimeTypeToExtension,
} from '../Files';

describe('extensionToMimeType', () => {
  it('should return the correct MIME type for known extensions', () => {
    expect(extensionToMimeType('mp4')).toBe('video/mp4');
    expect(extensionToMimeType('jpeg')).toBe('image/jpeg');
    expect(extensionToMimeType('pdf')).toBe('application/pdf');
    expect(extensionToMimeType('html')).toBe('text/html');
  });

  it('should return "text/plain" for unknown extensions', () => {
    expect(extensionToMimeType('unknown')).toBe('text/plain');
    expect(extensionToMimeType('random')).toBe('text/plain');
  });

  it('should handle edge cases', () => {
    expect(extensionToMimeType('')).toBe('text/plain');
  });
});

describe('mimeTypeToExtension', () => {
  it('should return the correct extension for known MIME types', () => {
    expect(mimeTypeToExtension('video/mp4')).toBe('mp4');
    expect(mimeTypeToExtension('image/jpeg')).toBe('jpg');
    expect(mimeTypeToExtension('application/pdf')).toBe('pdf');
    expect(mimeTypeToExtension('text/html')).toBe('html');
  });

  it('should return the part after "/" for unknown MIME types', () => {
    expect(mimeTypeToExtension('application/unknown')).toBe('unknown');
    expect(mimeTypeToExtension('custom/type')).toBe('type');
  });

  it('should handle edge cases', () => {
    expect(mimeTypeToExtension('')).toBeUndefined();
    expect(mimeTypeToExtension('invalid')).toBeUndefined();
  });

  describe('getFileNameExtension', () => {
    it('should return the correct extension for a file name with a single extension', () => {
      expect(getFileNameExtension('document.pdf')).toBe('pdf');
      expect(getFileNameExtension('image.jpeg')).toBe('jpeg');
      expect(getFileNameExtension('archive.zip')).toBe('zip');
    });

    it('should return the correct extension for a file name with multiple dots', () => {
      expect(getFileNameExtension('archive.tar.gz')).toBe('gz');
      expect(getFileNameExtension('photo.edit.v2.png')).toBe('png');
    });

    it('should return an empty string for a file name with no extension', () => {
      expect(getFileNameExtension('README')).toBe('');
      expect(getFileNameExtension('Makefile')).toBe('');
    });

    it('should handle edge cases', () => {
      expect(getFileNameExtension('.gitignore')).toBe('gitignore');
      expect(getFileNameExtension('.hiddenfile')).toBe('hiddenfile');
      expect(getFileNameExtension('')).toBe('');
      expect(getFileNameExtension('.')).toBe('');
    });

    describe('extensionToUTI', () => {
      it('should return the correct UTI for known extensions', () => {
        expect(extensionToUTI('pdf')).toBe('com.adobe.pdf');
        expect(extensionToUTI('doc')).toBe('com.microsoft.word.doc');
        expect(extensionToUTI('docx')).toBe('com.microsoft.word.document');
        expect(extensionToUTI('xls')).toBe('com.microsoft.excel.xls');
        expect(extensionToUTI('xlsx')).toBe('com.microsoft.excel.spreadsheet');
        expect(extensionToUTI('ppt')).toBe('com.microsoft.powerpoint.ppt');
        expect(extensionToUTI('pptx')).toBe(
          'com.microsoft.powerpoint.presentation',
        );
        expect(extensionToUTI('mobi')).toBe('com.amazon.mobi');
      });

      it('should return undefined for unknown extensions', () => {
        expect(extensionToUTI('unknown')).toBeUndefined();
        expect(extensionToUTI('random')).toBeUndefined();
      });

      it('should handle edge cases', () => {
        expect(extensionToUTI('')).toBeUndefined();
        expect(extensionToUTI('.')).toBeUndefined();
      });
    });
  });
});

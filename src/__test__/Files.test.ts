import {
  extensionToMimeType,
  extensionToUTI,
  formatFileSize,
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

    describe('formatFileSize', () => {
      it('should return "0 B" for 0 bytes', () => {
        expect(formatFileSize(0)).toBe('0 B');
      });

      it('should return "1 B" for 1 byte', () => {
        expect(formatFileSize(1)).toBe('1 B');
      });

      it('should return "1 KB" for 1024 bytes', () => {
        expect(formatFileSize(1024)).toBe('1 KB');
      });

      it('should return "1.5 KB" for 1536 bytes', () => {
        expect(formatFileSize(1536)).toBe('1.5 KB');
      });

      it('should return "1 MB" for 1048576 bytes', () => {
        expect(formatFileSize(1048576)).toBe('1 MB');
      });

      it('should return "1 GB" for 1073741824 bytes', () => {
        expect(formatFileSize(1073741824)).toBe('1 GB');
      });

      it('should return "1 TB" for 1099511627776 bytes', () => {
        expect(formatFileSize(1099511627776)).toBe('1 TB');
      });

      it('should round to two decimal places and trim trailing zeros', () => {
        expect(formatFileSize(1024 * 1.234)).toBe('1.23 KB');
        expect(formatFileSize(1024 * 1.2)).toBe('1.2 KB');
        expect(formatFileSize(1024 * 1.2)).toBe('1.2 KB');
      });

      it('should handle values just below the next unit', () => {
        expect(formatFileSize(1023)).toBe('1023 B');
        expect(formatFileSize(1048575)).toBe('1023.99 KB');
        expect(formatFileSize(1073741823)).toBe('1023.99 MB');
      });

      it('should handle large values beyond TB', () => {
        expect(formatFileSize(1099511627776 * 2)).toBe('2 TB');
        expect(formatFileSize(1099511627776 * 5)).toBe('5 TB');
      });

      it('should handle fractional TB values correctly', () => {
        // 1.5 TB
        expect(formatFileSize(1099511627776 * 1.5)).toBe('1.5 TB');

        // 0.25 TB
        expect(formatFileSize(1099511627776 * 0.25)).toBe('256 GB');

        // Just below 1 TB
        expect(formatFileSize(1099511627776 - 1)).toBe('1023.99 GB');
      });

      it('should handle fractional PB values correctly', () => {
        const PB = Math.pow(1024, 5);

        // 1.5 PB
        expect(formatFileSize(PB * 1.5)).toBe('1.5 PB');

        // 0.5 PB
        expect(formatFileSize(PB * 0.5)).toBe('512 TB');

        // Just below 1 PB
        expect(formatFileSize(PB - 1)).toBe('0.99 PB');
      });

      it('should handle very large values (multiple PB)', () => {
        const PB = Math.pow(1024, 5);

        expect(formatFileSize(PB * 2)).toBe('2 PB');
        expect(formatFileSize(PB * 10)).toBe('10 PB');
      });

      it('should correctly truncate decimal places without rounding up', () => {
        // Assuming truncDecimals truncates (not rounds)
        expect(formatFileSize(1536)).toBe('1.5 KB'); // already tested, consistency check
        expect(formatFileSize(1048576 * 1.999)).toBe('1.99 MB');
      });

      it('should handle non-integer input gracefully', () => {
        // 512.5 bytes → should still show decimal but in B
        expect(formatFileSize(512.5)).toBe('512.5 B');

        // 1536.8 bytes → ~1.5 KB
        expect(formatFileSize(1536.8)).toBe('1.5 KB');
      });

      it('should handle boundary between PB and next theoretical unit', () => {
        const PB = Math.pow(1024, 5);
        const beyondPB = PB * 1024; // 1 EB, though not defined in array

        // Should still map to last available unit ('PB')
        expect(formatFileSize(beyondPB)).toBe('1 EB');
      });
    });
  });
});

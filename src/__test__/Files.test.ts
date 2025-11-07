import {
  extensionToMimeType,
  extensionToUTI,
  formatFileSize,
  getFileNameExtension,
  mimeTypeToExtension,
} from '../Files';

describe('extensionToMimeType', () => {
  it('deve retornar o tipo MIME correto para extensões conhecidas', () => {
    expect(extensionToMimeType('mp4')).toBe('video/mp4');
    expect(extensionToMimeType('jpeg')).toBe('image/jpeg');
    expect(extensionToMimeType('pdf')).toBe('application/pdf');
    expect(extensionToMimeType('html')).toBe('text/html');
  });

  it('deve retornar "text/plain" para extensões desconhecidas', () => {
    expect(extensionToMimeType('unknown')).toBe('text/plain');
    expect(extensionToMimeType('random')).toBe('text/plain');
  });

  it('deve lidar com casos extremos', () => {
    expect(extensionToMimeType('')).toBe('text/plain');
  });
});

describe('mimeTypeToExtension', () => {
  it('deve retornar a extensão correta para tipos MIME conhecidos', () => {
    expect(mimeTypeToExtension('video/mp4')).toBe('mp4');
    expect(mimeTypeToExtension('image/jpeg')).toBe('jpg');
    expect(mimeTypeToExtension('application/pdf')).toBe('pdf');
    expect(mimeTypeToExtension('text/html')).toBe('html');
  });

  it('deve retornar a parte após "/" para tipos MIME desconhecidos', () => {
    expect(mimeTypeToExtension('application/unknown')).toBe('unknown');
    expect(mimeTypeToExtension('custom/type')).toBe('type');
  });

  it('deve lidar com casos extremos', () => {
    expect(mimeTypeToExtension('')).toBeUndefined();
    expect(mimeTypeToExtension('invalid')).toBeUndefined();
  });

  describe('getFileNameExtension', () => {
    it('deve retornar a extensão correta para um nome de arquivo com uma única extensão', () => {
      expect(getFileNameExtension('document.pdf')).toBe('pdf');
      expect(getFileNameExtension('image.jpeg')).toBe('jpeg');
      expect(getFileNameExtension('archive.zip')).toBe('zip');
    });

    it('deve retornar a extensão correta para um nome de arquivo com múltiplos pontos', () => {
      expect(getFileNameExtension('archive.tar.gz')).toBe('gz');
      expect(getFileNameExtension('photo.edit.v2.png')).toBe('png');
    });

    it('deve retornar uma string vazia para um nome de arquivo sem extensão', () => {
      expect(getFileNameExtension('README')).toBe('');
      expect(getFileNameExtension('Makefile')).toBe('');
    });

    it('deve lidar com casos extremos', () => {
      expect(getFileNameExtension('.gitignore')).toBe('gitignore');
      expect(getFileNameExtension('.hiddenfile')).toBe('hiddenfile');
      expect(getFileNameExtension('')).toBe('');
      expect(getFileNameExtension('.')).toBe('');
    });

    describe('extensionToUTI', () => {
      it('deve retornar o UTI correto para extensões conhecidas', () => {
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

      it('deve retornar indefinido para extensões desconhecidas', () => {
        expect(extensionToUTI('unknown')).toBeUndefined();
        expect(extensionToUTI('random')).toBeUndefined();
      });

      it('deve lidar com casos extremos', () => {
        expect(extensionToUTI('')).toBeUndefined();
        expect(extensionToUTI('.')).toBeUndefined();
      });
    });

    describe('formatFileSize', () => {
      it('deve retornar "0 B" para 0 bytes', () => {
        expect(formatFileSize(0)).toBe('0 B');
      });

      it('deve retornar "1 B" para 1 byte', () => {
        expect(formatFileSize(1)).toBe('1 B');
      });

      it('deve retornar "1 KB" para 1024 bytes', () => {
        expect(formatFileSize(1024)).toBe('1 KB');
      });

      it('deve retornar "1.5 KB" para 1536 bytes', () => {
        expect(formatFileSize(1536)).toBe('1.5 KB');
      });

      it('deve retornar "1 MB" para 1048576 bytes', () => {
        expect(formatFileSize(1048576)).toBe('1 MB');
      });

      it('deve retornar "1 GB" para 1073741824 bytes', () => {
        expect(formatFileSize(1073741824)).toBe('1 GB');
      });

      it('deve retornar "1 TB" para 1099511627776 bytes', () => {
        expect(formatFileSize(1099511627776)).toBe('1 TB');
      });

      it('deve arredondar para duas casas decimais e remover zeros finais', () => {
        expect(formatFileSize(1024 * 1.234)).toBe('1.23 KB');
        expect(formatFileSize(1024 * 1.2)).toBe('1.2 KB');
        expect(formatFileSize(1024 * 1.2)).toBe('1.2 KB');
      });

      it('deve lidar com valores logo abaixo da próxima unidade', () => {
        expect(formatFileSize(1023)).toBe('1023 B');
        expect(formatFileSize(1048575)).toBe('1023.99 KB');
        expect(formatFileSize(1073741823)).toBe('1023.99 MB');
      });

      it('deve lidar com valores grandes além de TB', () => {
        expect(formatFileSize(1099511627776 * 2)).toBe('2 TB');
        expect(formatFileSize(1099511627776 * 5)).toBe('5 TB');
      });

      it('deve lidar corretamente com valores fracionários em TB', () => {
        expect(formatFileSize(1099511627776 * 1.5)).toBe('1.5 TB');
        expect(formatFileSize(1099511627776 * 0.25)).toBe('256 GB');
        expect(formatFileSize(1099511627776 - 1)).toBe('1023.99 GB');
      });

      it('deve lidar corretamente com valores fracionários em PB', () => {
        const PB = Math.pow(1024, 5);
        expect(formatFileSize(PB * 1.5)).toBe('1.5 PB');
        expect(formatFileSize(PB * 0.5)).toBe('512 TB');
        expect(formatFileSize(PB - 1)).toBe('0.99 PB');
      });

      it('deve lidar com valores muito grandes (múltiplos de PB)', () => {
        const PB = Math.pow(1024, 5);
        expect(formatFileSize(PB * 2)).toBe('2 PB');
        expect(formatFileSize(PB * 10)).toBe('10 PB');
      });

      it('deve truncar corretamente as casas decimais sem arredondar para cima', () => {
        expect(formatFileSize(1536)).toBe('1.5 KB');
        expect(formatFileSize(1048576 * 1.999)).toBe('1.99 MB');
      });

      it('deve lidar graciosamente com entrada não inteira', () => {
        expect(formatFileSize(512.5)).toBe('512.5 B');
        expect(formatFileSize(1536.8)).toBe('1.5 KB');
      });

      it('deve lidar com o limite entre PB e a próxima unidade teórica', () => {
        const PB = Math.pow(1024, 5);
        const beyondPB = PB * 1024;
        expect(formatFileSize(beyondPB)).toBe('1 EB');
      });
    });
  });
});

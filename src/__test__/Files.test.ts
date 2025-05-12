import { extensionToMimeType, mimeTypeToExtension } from "../Files";

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
});
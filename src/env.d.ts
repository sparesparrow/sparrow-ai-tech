/// <reference types="astro/client" />

interface Window {
  generateTitleCode: () => void;
  generateDescCode: () => void;
  generateOGCode: () => void;
  generateAltText: () => void;
  generateCTACode: () => void;
  generateI18nConfig: () => void;
  showFileCode: (fileType: string) => void;
  generateAllFiles: () => void;
  downloadFiles: () => void;
  copyFileCode: () => void;
}

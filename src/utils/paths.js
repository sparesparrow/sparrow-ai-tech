/**
 * Return URL prefix for current language ('' for default 'cs', '/en' for English).
 * Always includes the leading slash but never the trailing slash.
 */
export const langPrefix = (lang) => (lang && lang !== 'cs' ? `/${lang}` : '');
/**
 * Build an internal link that works on GitHub Pages.
 * Example: link('en', '/infographics/Infographic1') → '/en/infographics/Infographic1'
 */
export const link = (lang, target) =>
  `${langPrefix(lang)}${target.startsWith('/') ? target : `/${target}`}`;

// Get the base URL for the current environment
export const getBaseUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.BASE_URL || '/sparrow-ai-tech';
  }
  return '/sparrow-ai-tech';
};

// Create proper asset URLs
export const assetUrl = (path) => {
  const base = getBaseUrl();
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}/${cleanPath}`;
};

// Create proper page URLs with language support
export const pageUrl = (path, lang = '') => {
  const base = getBaseUrl();
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  if (lang && lang !== 'cs') {
    return `${base}/${lang}/${cleanPath}`;
  }
  return `${base}/${cleanPath}`;
};

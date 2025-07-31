export function link(language, path) {
  const base = '/sparrow-ai-tech';
  const langPrefix = language === 'cs' ? '/cs' : '';
  return `${base}${langPrefix}${path}`;
}

export function getCurrentPath() {
  if (typeof window === 'undefined') return '/';
  return window.location.pathname.replace('/sparrow-ai-tech', '');
}
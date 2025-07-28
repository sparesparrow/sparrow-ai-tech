/**
 * URL helper for consistent routing across the application
 * Handles base path for GitHub Pages deployment
 */
export function url(path) {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${baseUrl}${cleanPath}`.replace(/\/+/g, '/');
}

export function getBaseUrl() {
  return import.meta.env.BASE_URL || '/';
}

/**
 * Centralized URL utilities for sparrow-ai-tech
 * Single source of truth for all URL handling
 */

// Base URL konstanta pro GitHub Pages
export const BASE_URL = '/sparrow-ai-tech';

/**
 * Get the base URL for current environment
 */
export function getBaseUrl() {
  // V produkci nebo pokud není nastaveno, použij GitHub Pages base
  return import.meta.env.BASE_URL || BASE_URL;
}

/**
 * Create asset URL with proper base path
 */
export function assetUrl(path) {
  const base = getBaseUrl();
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}/${cleanPath}`;
}

/**
 * Create page URL with optional language support
 */
export function pageUrl(path, lang = '') {
  const base = getBaseUrl();
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  if (lang && lang !== 'cs') {
    return `${base}/${lang}/${cleanPath}`;
  }
  return `${base}/${cleanPath}`;
}

/**
 * General URL builder with base path
 */
export function url(path) {
  const baseUrl = getBaseUrl();
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${baseUrl}${cleanPath}`.replace(/\/+/g, '/');
}

/**
 * Language prefix helper
 */
export function langPrefix(lang) {
  return lang && lang !== 'cs' ? `/${lang}` : '';
}

/**
 * Build internal link with language support
 */
export function link(lang, target) {
  return `${langPrefix(lang)}${target.startsWith('/') ? target : `/${target}`}`;
}

/**
 * Add base path to any src (backward compatibility)
 */
export function withBase(src) {
  const baseUrl = getBaseUrl();
  return baseUrl && !src.startsWith('http')
    ? `${baseUrl.replace(/\/$/, '')}${src.startsWith('/') ? '' : '/'}${src}`
    : src;
}

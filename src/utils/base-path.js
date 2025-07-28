export const withBase = (src) =>
  import.meta.env.BASE_URL && !src.startsWith('http')
    ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}${src.startsWith('/') ? '' : '/'}${src}`
    : src;

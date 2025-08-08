/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    safelist: [
      'fade-in','visible','cyber-glitch','cyber-card','cyber-stat-item','skill-progress',
      'notification','notification--success','notification--error','nav-link','active'
    ],
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: 'inherit',
              opacity: 0.75,
              fontWeight: '500',
              textDecoration: 'underline',
              '&:hover': {
                opacity: 1,
                color: '#60a5fa'
              }
            }
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

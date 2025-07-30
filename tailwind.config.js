/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  // The `content` array is the most important part.
  // It tells Tailwind which files to scan for class names.
  // This setup is configured for an Astro project using React components.
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
  ],

  // The `theme` object is where you define your project's color palette,
  // typography, spacing, and other design tokens.
  theme: {
    // We use `extend` to add our custom values to Tailwind's defaults,
    // rather than completely replacing them.
    extend: {
      // Extending the color palette with the "Warm Neutral" theme.
      colors: {
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        amber: {
          400: '#fcd34d',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
      },
      // Setting up the custom fonts used in the portfolio design.
      // 'Inter' is the primary sans-serif font.
      // 'Roboto Mono' is the primary monospace font.
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['Roboto Mono', ...defaultTheme.fontFamily.mono],
      },
      // Add custom typography theme for both light and dark mode
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.stone.800'),
            a: {
              color: theme('colors.sky.700'),
              '&:hover': {
                color: theme('colors.sky.900'),
              },
              'textDecoration': 'underline',
            },
            h1: { color: theme('colors.stone.900') },
            h2: { color: theme('colors.stone.900') },
            h3: { color: theme('colors.stone.900') },
            code: { color: theme('colors.amber.700') },
            blockquote: { color: theme('colors.stone.700') },
          },
        },
        invert: {
          css: {
            color: theme('colors.stone.100'),
            a: {
              color: theme('colors.sky.300'),
              '&:hover': {
                color: theme('colors.sky.100'),
              },
              'textDecoration': 'underline',
            },
            h1: { color: theme('colors.stone.100') },
            h2: { color: theme('colors.stone.100') },
            h3: { color: theme('colors.stone.100') },
            code: { color: theme('colors.amber.400') },
            blockquote: { color: theme('colors.stone.200') },
          },
        },
      }),
    },
  },

  // The `plugins` array allows you to add official or third-party plugins
  // to extend Tailwind's functionality. For this project, no extra plugins
  // are required initially.
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

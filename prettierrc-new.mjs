/** @type {import("prettier").Config} */
export default {
  // Basic formatting
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'lf',

  // Plugin configuration
  plugins: ['prettier-plugin-astro'],
  
  // Plugin search directories (for compatibility)
  pluginSearchDirs: ['.'],

  // Overrides for specific file types
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
        printWidth: 120,
      }
    },
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      options: {
        printWidth: 100,
        singleQuote: true,
      }
    },
    {
      files: '*.md',
      options: {
        printWidth: 80,
        proseWrap: 'always',
      }
    },
    {
      files: '*.json',
      options: {
        printWidth: 120,
      }
    }
  ]
};
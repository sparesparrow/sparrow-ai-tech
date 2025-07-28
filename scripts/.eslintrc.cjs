module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'script',
  },
  extends: [
    'eslint:recommended',
  ],
  rules: {
    '@typescript-eslint/no-require-imports': 'off',
    'no-console': 'off',
  },
  globals: {
    console: true,
    require: true,
    module: true,
    exports: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true,
    global: true,
  },
};

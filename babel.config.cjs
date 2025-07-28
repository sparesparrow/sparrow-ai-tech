// @ts-nocheck
/* eslint-env node */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
  ],
};

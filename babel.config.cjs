/* eslint-env node */
/* eslint-disable no-undef */

module.exports = {
  presets: [
    ['@babel/preset-env', { 
      targets: { node: 'current' },
      modules: process.env.NODE_ENV === 'test' ? 'auto' : false
    }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
  ],
  plugins: [
    // Plugin pro transformaci import.meta v testech
    function() {
      return {
        visitor: {
          MetaProperty(path) {
            if (path.node.meta.name === 'import' && path.node.property.name === 'meta') {
              // V test prostředí nahradíme import.meta globální proměnnou
              if (process.env.NODE_ENV === 'test') {
                path.replaceWithSourceString('global.importMeta || { env: { BASE_URL: "/" } }');
              }
            }
          }
        }
      };
    }
  ],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' }, modules: 'auto' }],
        ['@babel/preset-react', { runtime: 'automatic' }],
        ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
      ]
    }
  }
};

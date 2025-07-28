module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: [
    // Plugin pro transformaci import.meta v test prostředí
    function () {
      return {
        visitor: {
          MemberExpression(path) {
            if (path.node.meta && path.node.meta.name === 'import' && path.node.property.name === 'meta') {
              // V test prostředí nahradíme import.meta globální proměnnou
              if (process.env.NODE_ENV === 'test') {
                path.replaceWithSourceString('global.importMeta || { env: { BASE_URL: "/sparrow-ai-tech" } }');
              }
            }
          }
        }
      };
    }
  ],
};

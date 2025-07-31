export default {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: ['http://localhost:4321/'],
      numberOfRuns: 3,
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:recommended',
    },
  },
};

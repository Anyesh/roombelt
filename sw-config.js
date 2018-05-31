module.exports = {
  staticFileGlobs: [
    'build/**/*.js',
    'build/**/*.css',
    'build/**/*.png',
    'build/**/*.woff',
    'build/**/*.woff2',
    'build/index.html'
  ],
  navigateFallback: '/index.html',
  navigateFallbackWhitelist: [/^\/$/, /^\/admin$/, /^\/device$/],
  cacheId: 'roombelt-cache'
};
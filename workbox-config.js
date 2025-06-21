module.exports = {
    globDirectory: 'build/',
    globPatterns: ['**/*.{html,js,css,json,png,svg}'],
    swDest: 'build/service-worker.js',
    runtimeCaching: [{
      urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
      handler: 'CacheFirst'
    }]
  };
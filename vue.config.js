/* eslint-disable import/no-extraneous-dependencies */

// Webpack

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  pwa: {
    themeColor: '#64c250',
    name: 'Pokedex',
    msTileColor: '#64c250',
    appleMobileWebAppCapable: 'true',
    workboxPluginMode: 'InjectManifest',
    manifestOptions: {
      name: 'Pokedex',
      short_name: 'Pokedex',
      start_url: '/',
      display: 'standalone',
      theme_color: '#64c250',
      background_color: '#ffffff',
      description: 'Choose your Pokemon!',
      orientation: 'portrait',
    },
    workboxOptions: {
      swSrc: 'public/service-worker.js',
    },
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 9000,
        maxSize: 140000,
      },
    },
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/base/_colors.scss";
        @import "@/assets/base/_variables.scss";
        @import "@/assets/base/_breakpoints.scss";
        @import "@/assets/base/_mixins.scss";
        `,
      },
    },
  },
};

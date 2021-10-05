module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            assets: './src/assets',
            auth: './src/auth/',
            components: './src/components',
            context: './src/context',
            pages: './src/pages',
            services: './src/services',
            styles: './src/styles',
          },
        },
      ],
    ],
  };
};

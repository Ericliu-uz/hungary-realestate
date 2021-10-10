const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#CD2A3E', '@height-lg': '50px' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

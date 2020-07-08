const withImages = require("next-images");
const withCSS = require("@zeit/next-css");
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins(
  [
    [withImages],
    [
      withCSS,
      {
        cssLoaderOptions: {
          url: false,
        },
      },
    ],
  ],
  {
    publicRuntimeConfig: {
      API_URL: process.env.API_URL,
    },
  }
);

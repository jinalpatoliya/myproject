const withImages = require("next-images");
const withCSS = require("@zeit/next-css");

module.exports = withImages(
  withCSS({
    cssLoaderOptions: {
      url: false,
    },
    webpack: (config, { isServer }) => {
      // Fixes npm packages that depend on `fs` module
      if (!isServer) {
        config.node = {
          fs: "empty",
          net: "empty",
          express: "empty",
        };
      }
      return config;
    },
  })
);

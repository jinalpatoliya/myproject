const withImages = require("next-images");
const withCSS = require("@zeit/next-css");
const withPlugins = require("next-compose-plugins");
const fs = require("fs");
const envirment = process.env.NODE_ENV || "development";

const envFilePath = `.env.${envirment}`;

if (fs.existsSync(envFilePath)) {
  require("dotenv").config({ path: envFilePath });
} else {
  require("dotenv").config();
}

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

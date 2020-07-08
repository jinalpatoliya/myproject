module.exports = {
  apps: [
    {
      name: "examsolutionlab",
      script: "./build/index.js",
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};

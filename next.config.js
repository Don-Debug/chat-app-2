const nextConfig = {
  experimental: {
    appDir: true,
  },
};

const Dotenv = require('dotenv-webpack');

module.exports = {
  ...nextConfig,
  webpack: (config) => {
    config.plugins.push(new Dotenv());
    return config;
  },
};

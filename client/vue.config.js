const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  configureWebpack: config => {
    config.mode = 'development';
    config.optimization = undefined;
    config.node = {
      global: true,
      __filename: true,
      __dirname: true,
    }
  },
  filenameHashing: false,
  chainWebpack: config => {
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
  }
}

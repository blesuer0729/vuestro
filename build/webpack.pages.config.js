const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.prod.config');

//
// special setup for github pages, sets the path to /vuestro/
//
const webpackConfig = merge(baseWebpackConfig, {
  output: {
    publicPath: '/vuestro/',
    filename: 'static/js/[name].[chunkhash].js',
    chunkFilename: 'static/js/[name].[chunkhash].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      ROUTER_BASE: JSON.stringify('/vuestro'),
    }),
  ],
});

module.exports = webpackConfig;

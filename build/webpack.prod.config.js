const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../',
            },
          },
          'css-loader'
        ]
      },
    ],
  },
  output: {
    publicPath: '',
    filename: 'static/js/[name].[chunkhash].js',
    chunkFilename: 'static/js/[name].[chunkhash].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css'
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
      }),
    ],
    // split vendor js files into separate chunks
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        leafletVendor: {
          test: /[\\/]node_modules[\\/](leaflet.*)[\\/]/,
          name: "leaflet",
        },
        utilsVendor: {
          test: /[\\/]node_modules[\\/](lodash|moment|vuedraggable)[\\/]/,
          name: "utils",
        },
        iconVendor: {
          test: /[\\/]node_modules[\\/](vue\-awesome)[\\/]/,
          name: "icons",
        },
        aceVendor: {
          test: /[\\/]node_modules[\\/](brace)[\\/]/,
          name: "ace",
        },
        d3Vendor: {
          test: /[\\/]node_modules[\\/](d3.*)[\\/]/,
          name: "d3",
        },
      },
    },
    runtimeChunk: {
      name: "manifest",
    },
  },
  performance: {
    hints: false
  },
});

module.exports = webpackConfig;

const path = require('path');
const webpack = require('webpack');
const Html = require('html-webpack-plugin');
const PATHS = require('./misc').PATHS;
const VENDOR_PACKAGES = require('./vendorPackages');
const bundle = require('./bundle');

function output(target = PATHS.dist) {
  return {
    output: {
      path: target,
      filename: '[name].js',
    },
  };
}

function devServer(host = 'localhost', port = 8080) {
  return {
    plugins: [new webpack.HotModuleReplacementPlugin({ multiStep: true })],
    devServer: {
      host, port,
      inline: true,
      hot: true,
      historyApiFallback: true,
      stats: 'errors-only',
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  };
}

function generateHtml() {
  return {
    plugins: [
      new Html({
        title: 'Example project',
        template: path.join(PATHS.src, 'template.html'),
      }),
    ],
  };
}

function uglifyJs() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: { drop_console: true },
        mangle: {
          except: ['webpackJsonp'],
          screw_ie8: true,
        },
      }),
    ],
  };
}

module.exports = { PATHS, VENDOR_PACKAGES, output, bundle, devServer, generateHtml, uglifyJs };

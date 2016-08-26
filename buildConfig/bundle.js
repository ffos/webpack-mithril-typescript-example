const ExtractText = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const PATHS = require('./misc').PATHS;
const PKG = require('../package.json');

function typeScript() {
  const BABEL_CONFIG = Object.assign({}, PKG.babel, {
    sourceMap: true,
    cacheDirectory: true,
  });
  return {
    module: {
      loaders: [
        {
          test: /\.ts$/,
          loader: `babel-loader?${JSON.stringify(BABEL_CONFIG)}!ts-loader`,
          include: PATHS.src,
        },
      ],
    },
  };
}

function style(generateFile = false) {
  const LOADER_STRING = 'css?sourceMap!resolve-url!postcss!sass?sourceMap';
  let file;
  let bundleConfig = { postcss: () => [autoprefixer(PKG.config.supportedBrowsers)] };
  if (generateFile) {
    file = new ExtractText('[name].css');
    bundleConfig.plugins = [file];
  }
  bundleConfig.module = {
    loaders: [
      {
        test: /\.s?css/,
        loader: file ? file.extract('style', LOADER_STRING) : `style!${LOADER_STRING}`,
        include: PATHS.src,
      },
    ],
  };
  return bundleConfig;
}

module.exports = { typeScript, style };
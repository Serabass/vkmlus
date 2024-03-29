/**
 * Created by axetroy on 16-9-15.
 */

const webpack = require('webpack');
const path = require('path');
const moment = require('moment');

const pkg = require('./package.json');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// webpack.config.js
module.exports = {
  entry: {
    "index": path.join(__dirname, 'src/index.ts'),
    "index.min": path.join(__dirname, 'src/index.ts')
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].user.js'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.coffee', '.js', '.ts']
  },
  module: {
    loaders: [
      {test: /\.tsx?$/, loader: 'ts-loader'}
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      sourceMap: false,
      test: /\.min\.user\.js$/
    }),
    new webpack.BannerPlugin({
      banner: `// ==UserScript==
// @name              ${pkg.name} (typescript)
// @author            ${pkg.author}
// @collaborator      ${pkg.author}
// @description       ${pkg.description}
// @version           ${pkg.version}
// @update            ${moment().format('YYYY-MM-DD HH:mm:ss')}
// @grant             GM_xmlhttpRequest
// @include           *www.vk.com*
// @include           *vk.com*
// @connect           *
// @compatible        chrome  完美运行
// @compatible        firefox  完美运行
// @supportURL        http://www.burningall.com
// @run-at            document-start
// @contributionURL   troy450409405@gmail.com|alipay.com
// @downloadURL       https://github.com/axetroy/anti-redirect/raw/master/dist/anti-redirect.min.user.js
// @namespace         https://greasyfork.org/zh-CN/users/3400-axetroy
// @license           The MIT License (MIT); http://opensource.org/licenses/MIT
// ==/UserScript==

// Github源码:https://github.com/axetroy/anti-redirect

`, entryOnly: true, raw: true
    }),
    new BundleAnalyzerPlugin({
      // Can be `server`, `static` or `disabled`.
      // In `server` mode analyzer will start HTTP server to show bundle report.
      // In `static` mode single HTML file with bundle report will be generated.
      // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
      analyzerMode: 'static',
      // Port that will be used in `server` mode to start HTTP server.
      // analyzerPort: 8888,
      // Path to bundle report file that will be generated in `static` mode.
      // Relative to bundles output directory.
      reportFilename: 'index.html',
      // Automatically open report in default browser
      openAnalyzer: false,
      // If `true`, Webpack Stats JSON file will be generated in bundles output directory
      generateStatsFile: true,
      // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
      // Relative to bundles output directory.
      statsFilename: 'stats.json',
      // Options for `stats.toJson()` method.
      // For example you can exclude sources of your modules from stats file with `source: false` option.
      // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
      statsOptions: null
    })
  ]
};

// {entryOnly: true, raw: true}

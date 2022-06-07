process.traceDeprecation = true
var path = require('path')
var webpack = require('webpack')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const Webpackbar = require("webpackbar")

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

var args = process.argv.splice(2);
var moduleNames = args.length ? args : [];
var entries = {};

if (!moduleNames.length) {
  for (var key in config.build.pages) {
    entries[key] = ['babel-polyfill', './src/pages/' + key + '/main.js'];
  }
} else {
  for (var i = 0, len = moduleNames.length; i < len; i++) {
    entries[moduleNames[i]] = ['babel-polyfill', './src/pages/' + moduleNames[i] + '/main.js']
  }
}

// const vue = process.env.NODE_ENV == 'development' ? 'vue/dist/vue.esm.js' : 'vue/dist/vue.runtime.esm.js';
const vue = 'vue/dist/vue.esm.js'

module.exports = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV == 'development' ? config.dev.assetsPublicPath : config.build.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': vue,
      '@': resolve('src'),
      'api': resolve('src/apis'),
      'common': resolve('src/common'),
      'components': resolve('src/components'),
      'assets': resolve('src/assets'),
      'static': resolve('static'),
      'page': resolve('src/pages'),
      '@qwH5Views': resolve('src/pages/qwH5/views'),
      '@sidebarViews': resolve('src/pages/sidebar/views'),
      '@wcH5Views': resolve('src/pages/wcH5/views'),
    },

  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        antv: {
          name: 'chunk-antv',
          test: /[/]node_modules[/]@antv(.*)/,
          priority: 10
        },
        common: { //不局限于node_modules
          name: 'common',
          chunks: 'all',
          priority: 2,
          minChunks: 2,
        }
      },
    }
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')],
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          esModule: false,
          limit: 1000, // limit 1k
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
          publicPath: '/'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 1000, // limit 1k
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },

    ]
  },
  performance: {
    hints: 'warning',
    // 入口起点的最大体积
    maxEntrypointSize: 50000000,
    // 生成文件的最大体积
    maxAssetSize: 30000000,
    // 只给出 js 文件的性能提示
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js')
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CleanWebpackPlugin(),
    new Webpackbar(),
    new webpack.HotModuleReplacementPlugin(),
  ],
}

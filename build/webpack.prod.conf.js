var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
// var ExtractTextPlugin = require('extract-text-webpack-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var path = require('path')

// var env = process.env.NODE_ENV === 'testing'
//   ? require('../config/test.env')
//   : config.build.env
var env = process.env.NODE_ENV === 'test'? require('../config/pre.env'): process.env.NODE_ENV === 'uat'?require('../config/uat.env'): require('../config/prod.env')
var pages = [];
for(var key in config.build.pages){
  // var page = config.build.pages[key];
  pages.push(
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      // filename: process.env.NODE_ENV === 'testing'
      //   ? 'index.html'
      //   : config.build.index,
      filename: path.resolve(__dirname, '../dist/'+key+'.html'),
      // template: page.template,
      template: path.resolve(__dirname, '../src/pages/'+key+'/main.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      chunks: ['manifest', 'vendor', key],
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'auto'
    })
  )
}

var webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: [
      ...utils.styleLoaders({
        sourceMap: config.build.productionSourceMap,
        extract: true
      })
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ]
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[hash].js'),
    chunkFilename: utils.assetsPath('js/[id].[hash].js')
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 50000,
      cacheGroups: {
        // defaultVendors default 默认的
        // defaultVendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   priority: -10,
        // },
        // default: {
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true,
        // },
        common: { //不局限于node_modules
          name: 'common',
          chunks: 'all',
          priority: 2,
          minChunks: 2,
        }
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
      ignoreOrder: true
    }),
    new webpack.DefinePlugin({
      'process.env': env,
      // 'process.env.VUE_ENV': JSON.stringify(process.env.VUE_ENV)
    }),
    ...pages,
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
  ]
})

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig

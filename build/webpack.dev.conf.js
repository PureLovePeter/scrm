var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var path = require('path')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var pages = [];
for(var key in config.build.pages){
  pages.push(
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: key + '.html',
      template: path.resolve(__dirname, '../src/pages/'+key+'/main.html'),
      inject: true,
      chunks: [key]
    })
  )
}

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
      // 'process.env.VUE_ENV': JSON.stringify(process.env.VUE_ENV) // 解决vue-pdf在打包时报错
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    ...pages,
    new FriendlyErrorsPlugin({
      // 成功的时候输出
      compilationSuccessInfo: {
        messages: [`Your application is running here: ${config.dev.port}`]
      },
      // 是否每次都清空控制台
      clearConsole: true,
    })
  ]
})

// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var fs = require('fs')

var pages = {};

(function () {
  var pagePath = path.resolve(__dirname, '../src/pages');
  var dirs = fs.readdirSync(pagePath);
  for (var i = 0; i < dirs.length; i++) {
    if (fs.statSync(path.resolve(pagePath, dirs[i])).isDirectory()) {
      pages[dirs[i]] = {};
    }
  }
})();

module.exports = {
  build: {
    // env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    pages: pages,
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: './',
    assetsPublicPath: './',
    cdnPublicPath: 'https://tservice.71360.com/download/scrm/scrm-qw-h5@1.0.0/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8070,
    autoOpenBrowser: true,
    assetsSubDirectory: './',
    assetsPublicPath: '/',
    // quiet: true, // 如果使用webpack-dev-server，需要设为true，禁止显示devServer的console信息
    proxyTable: {
      // '/': {
      //   // target: 'https://preapiconsole.71360.com/api/app',
      //   target: 'http://localhost:8080',
      //   changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
      //   pathRewrite: {
      //     //'^/api': '/crm-controller'
      //   }
      // },
      // '/app': {
      //   target: 'http://192.168.0.155:8080',
      //   pathRewrite: {
      //     //'^/api': '/crm-controller'
      //   }
      // },
      
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
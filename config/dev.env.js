var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

const VUE_APP_BASE_API ='"https://testapiconsole.71360.com/api/app/tcloud-crm-wechat"'

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_BASE_API
})

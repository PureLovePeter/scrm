var merge = require('webpack-merge')
var devEnv = require('./dev.env')

const VUE_APP_BASE_API ='"https://preapiconsole.71360.com/api/app/tcloud-crm-wechat"'

module.exports = merge(devEnv, {
  NODE_ENV: `"${process.env.NODE_ENV}"`,
  VUE_APP_BASE_API
})

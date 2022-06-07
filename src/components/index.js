import Vue from 'vue'

const requireComponent = require.context(
  // 组件的相对路径
  './',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式， 这里匹配文件名为xxx.vue格式
  /index.vue$/
)
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 剥去文件名开头的 `./` 和结尾的扩展名 eg: ./food-header.vue -> foodHeader
  const componentName = fileName.replace(/^\.\//, '').replace(/\/index.vue$/, '')
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

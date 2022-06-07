import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import { demoRoute } from '@/pages/zhendao/views/demo/router' // 引入模块路由
let routes = [].concat(demoRoute)
/*创建一个路由器实例
 并且配置路由规则*/
 console.log("====>",routes)
const router = new VueRouter({
  mode: 'hash',
  // base: __dirname,
  routes
})

export default router


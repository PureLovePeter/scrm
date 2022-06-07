import Vue from 'vue'
import App from './App'
import router from './routers/router'
import store from './store'
import Vant, { Lazyload } from 'vant'
import Global from '@/utils/global'
import './permission'
import '@/utils/rem'

import '@/styles/index.scss'
import VConsole from 'vconsole'

Vue.prototype.Global = new Global(Vue)
Vue.config.productionTip = true

/*使用Vant-ui框架*/
Vue.use(Vant)
Vue.prototype.$vconsole = new VConsole()

console.log("======>",router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
